/**
 * Console interface for logging.
 *
 * Currently logs are only available in the backend logs.
 * See https://docs.caido.io/report_bug.html#1-backend-logs
 */
export declare type Console = {
  debug(message: any): void;
  log(message: any): void;
  warn(message: any): void;
  error(message: any): void;
};

/**
 * The body of a Request or Response.
 *
 * Calling `to<FORMAT>` will try to convert the body to the desired format.
 */
export declare class Body {
  /**
   * Parse the body as a string.
   *
   * Unprintable characters will be replaced with `�`.
   */
  toText(): string;
  /**
   * Try to parse the body as JSON.
   *
   * @throws {SyntaxError} If the body is not valid JSON.
   */
  toJson(): any;
  /**
   * Get the raw body as an array of bytes.
   */
  toRaw(): Uint8Array;
}

/**
 * A saved immutable Request.
 *
 * To modify, use `toSpec` to get a `RequestSpec` object.
 */
export declare type Request = {
  getId(): ID;
  getHost(): string;
  getPort(): number;
  getTls(): boolean;
  getMethod(): string;
  getPath(): string;
  getQuery(): string;
  getHeader(name: string): Array<string> | undefined;
  getBody(): Body | undefined;
  toSpec(): RequestSpec;
};

/**
 * A mutable Request not yet sent.
 */
export declare class RequestSpec {
  getHost(): string;
  setHost(host: string): void;
  getPort(): number;
  setPort(port: number): void;
  getTls(): boolean;
  setTls(tls: boolean): void;
  getMethod(): string;
  setMethod(method: string): void;
  getPath(): string;
  setPath(path: string): void;
  getQuery(): string;
  setQuery(query: string): void;
  getHeader(name: string): Array<string> | undefined;
  setHeader(name: string, value: string): void;
  getBody(): Body | undefined;
  setBody(body: Body | Bytes): void;
}

/**
 * An immutable saved Response.
 */
export declare type Response = {
  getId(): ID;
  getCode(): number;
  getHeader(name: string): Array<string> | undefined;
  getBody(): Body | undefined;
};

/**
 * An immutable saved Request and Response pair.
 */
export declare type RequestReponse = {
  request: Request;
  response: Response;
};

/**
 * The SDK for the Requests service.
 */
export declare type RequestsSDK = {
  /**
   * Sends a request.
   *
   * This respects the upstream proxy settings.
   *
   * @throws {Error} If the request cannot be sent.
   *
   * @example
   * const spec = new RequestSpec("https://example.com");
   * sdk.send(request)
   *   .then((res) => {
   *     console.log(res.request.getId());
   *     console.log(res.response.getCode());
   *   })
   *   .catch((err) => {
   *     console.error(err);
   *   });
   */
  send(request: RequestSpec): Promise<RequestReponse>;
};

/**
 * A saved immutable Finding.
 *
 * To modify, use `toSpec` to get a `FindingSpec` object.
 */
export declare type Finding = {
  getId(): ID;
  getTitle(): string;
  getDescription(): string | undefined;
  getReporter(): string;
};

/**
 * A mutable Finding not yet created.
 */
export declare type FindingSpec = {
  title: string;
  description?: string | undefined;
  reporter: string;
  request: Request;
};

/**
 * The SDK for the Findings service.
 */
export declare type FindingsSDK = {
  /**
   * Creates a new Finding.
   *
   * @throws {Error} If the request cannot be saved.
   *
   * @example
   * sdk.findings.create({
   *   title: "Title",
   *   description: "Description",
   *   reporter: "Reporter",
   *   request,
   * });
   */
  create(spec: FindingSpec): Promise<Finding>;
};

export declare type PassiveInput = {
  request: Request | undefined;
  response: Response | undefined;
};
export declare type ConvertInput = Array<number>;

export declare type ID = string;
export declare type Data = Bytes;
export declare type Decision = boolean;
export declare type Bytes = string | Array<number> | Uint8Array;
export declare type MaybePromise<T> = T | Promise<T>;

/**
 * The SDK object available to all scripts.
 */
export declare type SDK = {
  /**
   * The console.
   *
   * This is currently the same as the global `console`.
   */
  console: Console;
  /**
   * The SDK for the Findings service.
   */
  findings: FindingsSDK;
  /**
   * The SDK for the Requests services
   */
  requests: RequestsSDK;
  /**
   * Converts bytes to a string.
   *
   * Unprintable characters will be replaced with `�`.
   */
  asString(array: Bytes): string;
};
