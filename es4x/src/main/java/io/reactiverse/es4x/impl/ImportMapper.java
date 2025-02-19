package io.reactiverse.es4x.impl;

import io.vertx.core.json.JsonObject;
import io.vertx.core.impl.logging.Logger;
import io.vertx.core.impl.logging.LoggerFactory;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;

public class ImportMapper {

  private final Map<String, URL> imports;
  private final Map<String, Map<String, URL>> scopes;
  private final URL baseURL;

  private static final Logger LOGGER = LoggerFactory.getLogger(ImportMapper.class);

  public ImportMapper(JsonObject config, URL baseURL) {
    imports = config.containsKey("imports") ?
      sortAndNormalizeSpecifierMap(config.getJsonObject("imports"), baseURL) :
      Collections.emptyMap();

    scopes = config.containsKey("scopes") ?
      sortAndNormalizeScopes(config.getJsonObject("scopes"), baseURL) :
      Collections.emptyMap();

    this.baseURL = baseURL;
  }

  public URL resolve(String specifier) {
    final URL asURL = tryURLLikeSpecifierParse(specifier, baseURL);
    final String normalizedSpecifier = asURL != null ? asURL.toExternalForm() : specifier;
    final String scriptURLString = baseURL.toExternalForm();

    for (Map.Entry<String, Map<String, URL>> kv : scopes.entrySet()) {
      final String scopePrefix = kv.getKey();
      final Map<String, URL> scopeImports = kv.getValue();

      if (scopePrefix.equals(scriptURLString) || (scopePrefix.endsWith("/") && scriptURLString.startsWith(scopePrefix))) {
        final URL scopeImportsMatch = resolveImportsMatch(normalizedSpecifier, asURL, scopeImports);
        if (scopeImportsMatch != null) {
          return scopeImportsMatch;
        }
      }
    }

    final URL topLevelImportsMatch = resolveImportsMatch(normalizedSpecifier, asURL, imports);
    if (topLevelImportsMatch != null) {
      return topLevelImportsMatch;
    }

    // The specifier was able to be turned into a URL, but wasn't remapped into anything.
    if (asURL != null) {
      return asURL;
    }

    throw new RuntimeException("Unmapped bare specifier " + specifier);
  }

  private Map<String, URL> sortAndNormalizeSpecifierMap(JsonObject obj, URL baseURL) {
    final Map<String, URL> normalized = new HashMap<>();

    for (Map.Entry<String, Object> kv : obj) {
      final String normalizedSpecifierKey = normalizeSpecifierKey(kv.getKey(), baseURL);
      if (normalizedSpecifierKey == null) {
        continue;
      }

      if (!(kv.getValue() instanceof String)) {
        LOGGER.warn("Invalid address " + kv.getValue() + " for the specifier key " + kv.getKey() + ". Addresses must be strings.");
        normalized.put(normalizedSpecifierKey, null);
        continue;
      }

      final URL addressURL = tryURLLikeSpecifierParse((String) kv.getValue(), baseURL);
      if (addressURL == null) {
        LOGGER.warn("Invalid address " + kv.getValue() + " for the specifier key " + kv.getKey() + ".");
        normalized.put(normalizedSpecifierKey, null);
        continue;
      }

      if (kv.getKey().endsWith("/") && !addressURL.toExternalForm().endsWith("/")) {
        LOGGER.warn("Invalid address " + addressURL.toExternalForm() + " for package specifier key " + kv.getKey() + ". Package addresses must end with \"/\".");
        normalized.put(normalizedSpecifierKey, null);
        continue;
      }

      normalized.put(normalizedSpecifierKey, addressURL);
    }

    // will sort by key in lexicographic order
    return new TreeMap<>(normalized);
  }

  private Map<String, Map<String, URL>> sortAndNormalizeScopes(JsonObject obj, URL baseURL) {
    final Map<String, Map<String, URL>> normalized = new HashMap<>();
    for (Map.Entry<String, Object> kv : obj) {
      if (!(kv.getValue() instanceof JsonObject)) {
        throw new RuntimeException("The value for the " + kv.getKey() + " scope prefix must be an object.");
      }

      final URL scopePrefixURL = tryURLParse(kv.getKey(), baseURL);
      if (scopePrefixURL == null) {
        LOGGER.warn("Invalid scope " + kv.getKey() + " (parsed against base URL " + baseURL + ").");
        continue;
      }

      final String normalizedScopePrefix = scopePrefixURL.toExternalForm();
      normalized.put(normalizedScopePrefix, sortAndNormalizeSpecifierMap((JsonObject) kv.getValue(), baseURL));
    }

    // will sort by key in lexicographic order
    return new TreeMap<>(normalized);
  }

  private static String normalizeSpecifierKey(String specifierKey, URL baseURL) {
    // Ignore attempts to use the empty string as a specifier key
    if ("".equals(specifierKey)) {
      LOGGER.warn("Invalid empty string specifier key.");
      return null;
    }

    final URL url = tryURLLikeSpecifierParse(specifierKey, baseURL);
    if (url != null) {
      return url.toExternalForm();
    }

    return specifierKey;
  }

  private static URL tryURLParse(String string, URL baseURL) {
    try {
      if (baseURL != null) {
        return new URL(baseURL, string);
      }
      return new URL(string);
    } catch (MalformedURLException e) {
      return null;
    }
  }

  private URL resolveImportsMatch(String normalizedSpecifier, URL asURL, Map<String, URL> specifierMap) {

    for (Map.Entry<String, URL> kv : specifierMap.entrySet()) {
      final String specifierKey = kv.getKey();
      final URL resolutionResult = kv.getValue();
      // Exact-match case
      if (specifierKey.equals(normalizedSpecifier)) {
        if (resolutionResult == null) {
          throw new RuntimeException("Blocked by a null entry for " + specifierKey);
        }
        return resolutionResult;
      }

      // Package prefix-match case
      if (specifierKey.endsWith("/") && normalizedSpecifier.startsWith(specifierKey) && (asURL == null || isSpecial(asURL))) {
        if (resolutionResult == null) {
          throw new RuntimeException("Blocked by a null entry for " + specifierKey);
        }

        final String afterPrefix = normalizedSpecifier.substring(specifierKey.length());

        // Enforced by parsing
        assert (resolutionResult.toExternalForm().endsWith("/"));

        final URL url = tryURLParse(afterPrefix, resolutionResult);

        if (url == null) {
          throw new RuntimeException("Failed to resolve prefix - match relative URL for " + specifierKey);
        }

        return url;
      }
    }
    return null;
  }

  private static URL tryURLLikeSpecifierParse(String specifier, URL baseURL) {
    if (specifier.startsWith("/") || specifier.startsWith("./") || specifier.startsWith("../")) {
      return tryURLParse(specifier, baseURL);
    }

    return tryURLParse(specifier, null);
  }

  // https://url.spec.whatwg.org/#special-scheme
  private static final Set<String> specialProtocols = new HashSet<>(Arrays.asList("ftp", "file", "http", "https", "ws", "wss"));

  private static boolean isSpecial(URL url) {
    return specialProtocols.contains(url.getProtocol());
  }
}
