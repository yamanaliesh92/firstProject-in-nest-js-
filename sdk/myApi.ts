/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUserDto {
  /** @example "user@gamil.com" */
  email: string;
  /** @example "yaman21" */
  password: string;
  /** @example "yamanaleash" */
  username: string;
}

export interface TokenSecret {
  value: string;
  /** @format date-time */
  createAt: string;
  /** @format date-time */
  exprieAt: string;
}

export interface User {
  id: number;
  /** @format date-time */
  createAt: string;
  /** @format date-time */
  updateAt: string;
  email: string;
  password: string;
  username: string;
  image: string;
  /** @default "USER" */
  role: 'USER' | 'ADMIN' | 'OWNER';
  follows: string[];
  post: string[];
  /** @default "ACTIVE" */
  state: 'ACTIVE' | 'BLOCk';
  secret?: TokenSecret;
}

export interface RegiseterRes {
  /** @example {"email":"yaman@gmail.com","password":"yaman12","username":"yaman","role":"user","state":"active","id":1} */
  user: User;
  /**
   * jwt token
   * @example {"token":"fkdksdkswq1erkk"}
   */
  token: string;
}

export interface LoginUserDto {
  /** @example "yaman@gamil.com" */
  email: string;
  /** @example "yaman@gamil.com" */
  password: string;
}

export interface LoginRes {
  /**
   * jwt token
   * @example {"token":"fkdksdkswq1erkk"}
   */
  token: string;
}

export interface UpdateUserDto {
  username: string;
}

export interface ForgetPasswordDto {
  email: string;
}

export type ResForgetPassword = object;

export interface RestPassword {
  email: string;
  password: string;
  secret: string;
}

export interface CreateLike {
  /** @example 2 */
  postId: number;
}

export interface Like {
  id: number;
  /** @format date-time */
  createAt: string;
  /** @format date-time */
  updateAt: string;
  userId: number;
  postId: number;
}

export interface ResLike {
  like: Like;
}

export interface CreatePostDto {
  /** @example {"desc":"Desc in dto"} */
  desc: string;
  /** @example {"tilte":"title in dto"} */
  title: string;
}

export interface Post {
  id: number;
  /** @format date-time */
  createAt: string;
  /** @format date-time */
  updateAt: string;
  desc: string;
  title: string;
  user: string[];
  userId: number;
  likes: string[];
  img: string;
}

export interface ResponseCreatePost {
  /** @example {"userId":3,"desc":"desc in swagger","id":44,"title":"hey in test swagger"} */
  post: Post;
}

export interface UpdatePostDto {
  title: string;
}

export interface CreateInfoDto {
  /** @example "spain" */
  livesIn: string;
  /** @example "singal" */
  relationShip: string;
  /** @example "doctor" */
  workAt: string;
  /** @example "spain" */
  country: string;
}

export interface Info {
  id: number;
  /** @format date-time */
  createAt: string;
  /** @format date-time */
  updateAt: string;
  workAt: string;
  livesIn: string;
  country: string;
  relationShip: string;
  userId: number;
}

export interface CreateInfoRes {
  /** @example {"workAt":"teacher","relationShip":"singel","livesIn":"spain","country":"spain"} */
  info: Info;
}

export type UpdateInfoDto = object;

export interface CreateCommetnDto {
  title: string;
  postId: number;
}

export interface Comment {
  id: number;
  /** @format date-time */
  createAt: string;
  /** @format date-time */
  updateAt: string;
  title: string;
  userId: number;
  post: Post;
  postId: number;
}

export interface ResComment {
  comment: Comment;
}

export type CreateFollowDto = object;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title application example
 * @version 1.0
 * @contact
 *
 * The apploectionn API description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: 'GET',
      ...params,
    });

  user = {
    /**
     * No description
     *
     * @name UserControllerGet
     * @request GET:/user
     */
    userControllerGet: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerSignIn
     * @summary test regiseter
     * @request POST:/user/sign
     */
    userControllerSignIn: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<any, RegiseterRes>({
        path: `/user/sign`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerLogin
     * @summary test login
     * @request POST:/user/login
     */
    userControllerLogin: (data: LoginUserDto, params: RequestParams = {}) =>
      this.request<any, LoginRes>({
        path: `/user/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerDeleteUser
     * @request DELETE:/user/del/{id}
     */
    userControllerDeleteUser: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/del/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerUpdatename
     * @request PATCH:/user/update
     */
    userControllerUpdatename: (data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/update`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerForget
     * @summary test forgetPassword
     * @request PATCH:/user/forget
     */
    userControllerForget: (data: ForgetPasswordDto, params: RequestParams = {}) =>
      this.request<any, ResForgetPassword>({
        path: `/user/forget`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerRestPAsswod
     * @summary test restpasswor
     * @request PATCH:/user/rest
     */
    userControllerRestPAsswod: (data: RestPassword, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/user/rest`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerUpdateimag
     * @request PATCH:/user/update/patch
     */
    userControllerUpdateimag: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/update/patch`,
        method: 'PATCH',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerGetUser
     * @request GET:/user/me
     */
    userControllerGetUser: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/me`,
        method: 'GET',
        ...params,
      }),
  };
  like = {
    /**
     * No description
     *
     * @name LikeControllerCreateLike
     * @summary createLike
     * @request POST:/like
     */
    likeControllerCreateLike: (data: CreateLike, params: RequestParams = {}) =>
      this.request<any, ResLike>({
        path: `/like`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name LikeControllerGetLike
     * @request GET:/like/{id}
     */
    likeControllerGetLike: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/like/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name LikeControllerDeleteLike
     * @request DELETE:/like/{id}
     */
    likeControllerDeleteLike: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/like/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
  post = {
    /**
     * No description
     *
     * @name PostControllerCreatePost
     * @summary create post
     * @request POST:/post
     */
    postControllerCreatePost: (data: CreatePostDto, params: RequestParams = {}) =>
      this.request<any, ResponseCreatePost>({
        path: `/post`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name PostControllerUploadImg
     * @request PATCH:/post/update/{id}
     */
    postControllerUploadImg: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/post/update/${id}`,
        method: 'PATCH',
        ...params,
      }),

    /**
     * No description
     *
     * @name PostControllerAllPosts
     * @request GET:/post/all
     */
    postControllerAllPosts: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/post/all`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name PostControllerUpdatePosts
     * @request PUT:/post/{id}
     */
    postControllerUpdatePosts: (id: number, data: UpdatePostDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/post/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name PostControllerGetPost
     * @request GET:/post/{id}
     */
    postControllerGetPost: (id: number, data: UpdatePostDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/post/${id}`,
        method: 'GET',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name PostControllerDeletePosts
     * @request DELETE:/post/del/{id}
     */
    postControllerDeletePosts: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/post/del/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @name PostControllerGetAllPost
     * @request GET:/post/getAll/post
     */
    postControllerGetAllPost: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/post/getAll/post`,
        method: 'GET',
        ...params,
      }),
  };
  info = {
    /**
     * No description
     *
     * @name InfoControllerCreate
     * @summary crateinfo
     * @request POST:/info
     */
    infoControllerCreate: (data: CreateInfoDto, params: RequestParams = {}) =>
      this.request<any, CreateInfoRes>({
        path: `/info`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name InfoControllerGetOwnInfo
     * @request GET:/info
     */
    infoControllerGetOwnInfo: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/info`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name InfoControllerUpdateOwnInfo
     * @request PUT:/info
     */
    infoControllerUpdateOwnInfo: (data: UpdateInfoDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/info`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  comment = {
    /**
     * No description
     *
     * @name CommentControllerCreateComments
     * @summary test comment
     * @request POST:/comment
     */
    commentControllerCreateComments: (data: CreateCommetnDto, params: RequestParams = {}) =>
      this.request<any, ResComment>({
        path: `/comment`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CommentControllerGetAllComment
     * @request GET:/comment/{id}
     */
    commentControllerGetAllComment: (postId: number, id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/comment/${id}`,
        method: 'GET',
        ...params,
      }),
  };
  follow = {
    /**
     * No description
     *
     * @name FollowControllerCreateFollowers
     * @request POST:/follow
     */
    followControllerCreateFollowers: (data: CreateFollowDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/follow`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
