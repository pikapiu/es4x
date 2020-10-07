(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{443:function(a,e,t){"use strict";t.r(e);var s=t(42),n=Object(s.a)({},(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"instalacja"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#instalacja"}},[a._v("#")]),a._v(" Instalacja")]),a._v(" "),t("p",[a._v("Zakładając, że masz już zainstalowany "),t("a",{attrs:{href:"https://nodejs.org/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Node.js"),t("OutboundLink")],1),a._v(", będziesz potrzebował działąjącego JVM. Do\nprawidłowego działania wymagana jest "),t("a",{attrs:{href:"https://adoptopenjdk.net/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Java"),t("OutboundLink")],1),a._v(" lub "),t("a",{attrs:{href:"http://www.graalvm.org/",target:"_blank",rel:"noopener noreferrer"}},[a._v("GraalVM"),t("OutboundLink")],1),a._v(".")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("$ java -version\nopenjdk version "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"1.8.0_265"')]),a._v("\nOpenJDK Runtime Environment "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("build "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1.8")]),a._v(".0_265-8u265-b01-0ubuntu2~20.04-b01"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\nOpenJDK "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("64")]),a._v("-Bit Server VM "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("build "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("25.265")]),a._v("-b01, mixed mode"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),t("p",[a._v("Jeśli widzisz podobny output, znaczy to że obecnie używanym JVM jest "),t("code",[a._v("java")]),a._v(" "),t("strong",[a._v("8")]),a._v(", co nie jest najlepszą opcją ze\nwzględu na gorszą wydajność z jaką może działać silnik "),t("code",[a._v("es4x")]),a._v(" niż w przypadku innego JVM.")]),a._v(" "),t("h2",{attrs:{id:"graalvm-openjdk"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#graalvm-openjdk"}},[a._v("#")]),a._v(" GraalVM/OpenJDK")]),a._v(" "),t("p",[a._v("Aby posiadać kompatybilny runtime rekomenduje się instalację wyższego runtime (np. skorzystać z\n"),t("a",{attrs:{href:"https://github.com/shyiko/jabba",target:"_blank",rel:"noopener noreferrer"}},[a._v("jabby"),t("OutboundLink")],1),a._v("). Instrukcji do poprawnej instalacji "),t("code",[a._v("jabba")]),a._v("należy szukać w oficjalnej\n"),t("a",{attrs:{href:"https://github.com/shyiko/jabba#installation",target:"_blank",rel:"noopener noreferrer"}},[a._v("dokumentacji"),t("OutboundLink")],1),a._v(".")]),a._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),t("p",[a._v("Używając "),t("code",[a._v("jabby")]),a._v(" możesz zainstalować "),t("code",[a._v("openjdk 11")]),a._v(" i/lub "),t("code",[a._v("graalvm")]),a._v(" (tylko raz) wywołując:")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("jabba "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" openjdk@1.11.0\njabba "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" graalvm@20.2.0\n")])])]),t("p",[a._v("A następnie przełączać się między nimi wywołując:")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("jabba use openjdk@1.11 "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# LUB jabba use graalvm@20.2")]),a._v("\n")])])])]),a._v(" "),t("p",[a._v("Po instalacji odpowiedniego JVM możesz również zainstalować project management utilities development tool (opcjonalnie).")]),a._v(" "),t("h2",{attrs:{id:"narzedzia-projektowe"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#narzedzia-projektowe"}},[a._v("#")]),a._v(" Narzędzia projektowe")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" -g @es4x/create "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# LUB yarn global add @es4x/create")]),a._v("\n")])])]),t("p",[a._v("Pakiet zainstaluje globalnie komendę "),t("code",[a._v("es4x")]),a._v(", aby mogła ona zostać użyta przy tworzeniu projektu i przy wykonywaniu\ninnych zadań. Aby dowiedzieć się więcej o narzędziu wywołaj:")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("es4x --help\n")])])]),t("h3",{attrs:{id:"uzywanie-npx"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#uzywanie-npx"}},[a._v("#")]),a._v(" Używanie NPX")]),a._v(" "),t("p",[a._v("Jednorazowo ten sam pakiet może być użyty przy wołaniu za pomocą "),t("code",[a._v("npx")]),a._v(". W takim przypadku należy skorzystać z:")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("npx @es4x/create --help\n")])])]),t("h2",{attrs:{id:"pakiet-os"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#pakiet-os"}},[a._v("#")]),a._v(" Pakiet OS")]),a._v(" "),t("p",[a._v("POdczas pracy na środowiskach CI, gdzie ilość pakietów jest ograniczona, menadżer pakietów może zostać zainstalowany\nprzez rozpakowanie przygotowanego wcześniej pliku o rozszerzeniu tar/zip.")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("ES4X")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'0.9.0'")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -sL "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  https://github.com/reactiverse/es4x/releases/download/"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$ES4X")]),a._v("/es4x-pm-"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$ES4X")]),a._v("-bin.tar.gz "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("tar")]),a._v(" zx --strip-components"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v(" -C /usr/local\n")])])]),t("p",[a._v("Dla systemów Windows można użyć pliku "),t("code",[a._v("zip")]),a._v(", co wywoła ten sam efekt.")]),a._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),t("p",[a._v("Preferowane jest korzystanie z "),t("code",[a._v("npm")]),a._v(" jako sposobu instalacji, gdyż pozwala na łatwe aktualizacje oraz zapewnia\nprzenaszalność względem różnych "),t("em",[a._v("systemów operacyjnych")]),a._v(".")])]),a._v(" "),t("h2",{attrs:{id:"weryfikacja"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#weryfikacja"}},[a._v("#")]),a._v(" Weryfikacja")]),a._v(" "),t("p",[a._v("Do tego momentu powinieneś mieć już działającą komendę "),t("code",[a._v("es4x")]),a._v(". Aby to przetestować wykonaj test wywołując:")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("$ es4x --help\n\nUsage: java -jar /usr/local/bin/es4x-bin.jar [COMMAND] [OPTIONS]\n            [arg...]\n\nCommands:\n    bare         Creates a bare instance of vert.x.\n    dockerfile   Creates a generic Dockerfile for building and deploying the\n                 current project.\n    project      Initializes the 'package.json' to work with ES4X.\n    install      Installs required jars from maven to 'node_modules'.\n    list         List vert.x applications\n    run          Runs a JS script called <main-verticle> in its own instance of\n                 vert.x.\n    start        Start a vert.x application in background\n    stop         Stop a vert.x application\n    version      Displays the version.\n\nRun 'java -jar /usr/local/bin/es4x-bin.jar COMMAND --help' for\nmore information on a command.\n")])])]),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[a._v("WARNING")]),a._v(" "),t("p",[a._v("Dla najlepszych wrażeń i wydajności zainstaluj "),t("a",{attrs:{href:"https://www.graalvm.org",target:"_blank",rel:"noopener noreferrer"}},[a._v("GraalVM"),t("OutboundLink")],1),a._v(". Podczas pracy ze standardowym JDK i\nużywając Javy w wersji < 11 aplikacja zostanie uruchomiona w trybie "),t("code",[a._v("Interpreted")]),a._v(" co nie jest rekomendowane i wydajne\nw przypadku pracy na produkcji.")])])])}),[],!1,null,null,null);e.default=n.exports}}]);