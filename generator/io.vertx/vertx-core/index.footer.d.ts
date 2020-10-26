
/**
 * Current module filename (undefined for ESM).
 */
declare var __filename: string | undefined;

/**
 * Current module dirname (undefined for ESM).
 */
declare var __dirname: string | undefined;

// The globally defined objects that are provided by the loader runtime
declare global {

  const vertx: Vertx;

  /**
   * commonjs require function (undefined for ESM).
   */
  // @ts-ignore
  const require: {
    (id: string): any;
    resolve(): string;
    cache: any;
    extensions: any;
  } | undefined;

  const process: {
    env: { [key: string]: string };
    pid: String;
    engine: String;
    exit: (exitCode: number) => void;
    nextTick: (callback: (...args: any[]) => void) => void;
    stdout: any;
    stderr: any;
    stdin: any;
    cwd: () => string;
  };

  const Java: {
    /**
     * The type function loads the specified Java class and provides it as an object.
     *
     * Fields of this object can be read directly from it, and new instances can be created with the
     * JavaScript new keyword.
     *
     * @param className
     */
    type(className: string): any;

    /**
     * The from function creates a shallow copy of the Java datastructure (Array, List) as a JavaScript array.
     *
     * In many cases, this is not necessary, you can typically use the Java datastructure directly
     * from JavaScript.
     *
     * @param value
     */
    from(value: any): any;

    /**
     * The to function converts the argument to a Java dataype.
     *
     * When no toType is provided, Object[] is assumed.
     *
     * @param jsValue
     * @param javaType
     */
    to(jsValue: any, javaType: any): any;

    /**
     * The isJavaObject method returns whether obj is an object of the Java language.
     *
     * It returns false for native JavaScript objects, as well as for objects of other polyglot languages.
     *
     * @param obj
     */
    isJavaObject(obj: any): boolean;

    /**
     * The isType method returns whether obj is an object of the Java language,
     * representing a Java Class instance. It returns false for all other arguments.
     *
     * @param obj
     */
    isType(obj: any): boolean;

    /**
     * The typeName method returns the Java Class name of obj. obj is expected to represent
     * a Java Class instance, i.e., isType(obj) should return true; otherwise, undefined is returned.
     *
     * @param obj
     */
    typeName(obj: any): string | undefined;
  };

  function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): number;

  function clearTimeout(timeoutId: Number): any;

  function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): number;

  function clearInterval(intervalId: Number): any;

  function setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;

  /**
   * The Throwable class is the superclass of all errors and exceptions in the Java language.
   * Only objects that are instances of this class (or one of its subclasses) are thrown by
   * the Java Virtual Machine or can be thrown by the Java throw statement.
   *
   * Similarly, only this class or one of its subclasses can be the argument type in a catch clause.
   * For the purposes of compile-time checking of exceptions, Throwable and any subclass of Throwable
   * that is not also a subclass of either RuntimeException or Error are regarded as checked exceptions.
   */
  abstract class Throwable {
    /**
     * The constructor is disabled to avoid creation of Throwables from
     * the JavaScript side.
     */
    private constructor();

    /**
     * Prints this throwable and its backtrace to the standard error stream.
     */
    printStackTrace() : void;

    /**
     * Fills in the execution stack trace.
     */
    fillInStackTrace() : Throwable;

    /**
     * Returns the cause of this throwable or null if the cause is nonexistent or unknown.
     */
    getCause() : Throwable;

    /**
     * Returns the detail message string of this throwable.
     */
    getMessage() : string;

    /**
     * Returns an array containing all of the exceptions that were suppressed, typically by the
     * try-with-resources statement, in order to deliver this exception.
     */
    getSuppressed() : Throwable[];

    /**
     * Creates a localized description of this throwable.
     */
    getLocalizedMessage() : string;
  }

  interface ErrorConstructor {
    new(message?: string): Error;
    (message?: string): Error;
    readonly prototype: Error;
    asyncTrace: (error: Error | Throwable | string | any) => Error | Throwable;
  }

  var Error: ErrorConstructor;
}
