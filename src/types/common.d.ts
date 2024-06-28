declare module "caido:utils" {
  /**
   * The body of a Request or Response.
   *
   * Calling `to<FORMAT>` will try to convert the body to the desired format.
   */
  export class Body {
    constructor(data: string | Array<number> | Uint8Array);
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
  export type Request = {
    getId(): ID;
    getHost(): string;
    getPort(): number;
    getTls(): boolean;
    getMethod(): string;
    getPath(): string;
    getQuery(): string;
    getHeaders(): Record<string, Array<string>>;
    getHeader(name: string): Array<string> | undefined;
    getBody(): Body | undefined;
    toSpec(): RequestSpec;
    toSpecRaw(): RequestSpecRaw;
  };

  export type SetBodyOptions = {
    /**
     * Should update the Content-export type header.
     *
     * @default true
     */
    updateContentLength: boolean;
  };

  /**
   * A mutable Request not yet sent.
   */
  export class RequestSpec {
    constructor(url: string);
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
    getHeaders(): Record<string, Array<string>>;
    getHeader(name: string): Array<string> | undefined;
    setHeader(name: string, value: string): void;
    removeHeader(name: string): void;
    getBody(): Body | undefined;
    setBody(body: Body | Bytes, options?: SetBodyOptions): void;
    setRaw(raw: Bytes): RequestSpecRaw;
  }

  /**
   * A mutable raw Request not yet sent.
   */
  export class RequestSpecRaw {
    constructor(url: string);
    getHost(): string;
    setHost(host: string): void;
    getPort(): number;
    setPort(port: number): void;
    getTls(): boolean;
    setTls(tls: boolean): void;
    getRaw(): Uint8Array;
    setRaw(raw: Bytes): void;
  }

  /**
   * An immutable saved Response.
   */
  export type Response = {
    getId(): ID;
    getCode(): number;
    getHeaders(): Record<string, Array<string>>;
    getHeader(name: string): Array<string> | undefined;
    getBody(): Body | undefined;
  };

  /**
   * An immutable saved Request and Response pair.
   */
  export type RequestResponse = {
    request: Request;
    response: Response;
  };

  /**
   * The SDK for the Requests service.
   */
  export type RequestsSDK = {
    /**
     * Sends a request.
     *
     * This respects the upstream proxy settings.
     *
     * @throws {Error} If the request cannot be sent.
     *
     * @example
     * const spec = new RequestSpec("https://example.com");
     * sdk.requests.send(request)
     *   .then((res) => {
     *     console.log(res.request.getId());
     *     console.log(res.response.getCode());
     *   })
     *   .catch((err) => {
     *     console.error(err);
     *   });
     */
    send(request: RequestSpec | RequestSpecRaw): Promise<RequestResponse>;

    /**
     * Checks if a request is in scope.
     *
     * @example
     * if (sdk.requests.inScope(request)) {
     *  console.log("In scope");
     * }
     */
    inScope(request: Request | RequestSpec): boolean;
  };

  /**
   * A saved immutable Finding.
   *
   * To modify, use `toSpec` to get a `FindingSpec` object.
   */
  export type Finding = {
    getId(): ID;
    getTitle(): string;
    getDescription(): string | undefined;
    getReporter(): string;
  };

  /**
   * A mutable Finding not yet created.
   */
  export type FindingSpec = {
    title: string;
    description?: string | undefined;
    reporter: string;
    request: Request;
  };

  /**
   * The SDK for the Findings service.
   */
  export type FindingsSDK = {
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

  export type ID = string;
  export type Bytes = string | Array<number> | Uint8Array;
  export type MaybePromise<T> = T | Promise<T>;
}
