import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance
} from "axios";
import { Toast } from "vant";
import router from "@/router";

// 状态码错误信息
const codeMessage: any = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

/** 设置公共参数 */
function setCommonParams(config: AxiosRequestConfig, common: object) {
  let { method, data = {}, params = {} } = config;
  if (String(method).toUpperCase() === "GET") {
    if (!params.orgId) {
      config.params = { ...params, ...common };
    }
  } else {
    if (Object.prototype.toString.call(data) === "[object FormData]") {
      Object.entries(common).forEach(([key, val]) => {
        data.append(key, val);
      });
    } else {
      if (!data.orgId) {
        config.data = { ...data, ...common };
      }
    }
  }
}

const CancelToken = axios.CancelToken;
let axiosCancelPromiseMap: Map<any, any> = new Map();
const request: AxiosInstance = axios.create({
  timeout: 10000,
  withCredentials: true
});
/** 发起请求追加参数 */
const commonParams = {
  orgId: 100 /** 渠道ID */
};
// 发起请求前
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    setCommonParams(config, commonParams);
    const cancelMethod = axiosCancelPromiseMap.get(config.url);
    if (cancelMethod) {
      cancelMethod("repeat request");
      axiosCancelPromiseMap.delete(config.url);
    }
    config.cancelToken = new CancelToken(function executor(
      cancelMethod: Function
    ) {
      axiosCancelPromiseMap.set(config.url, cancelMethod);
    });
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
// 发起请求后
request.interceptors.response.use(
  (res: AxiosResponse) => {
    const { success, payload, error } = res.data;
    if (!success) {
      setTimeout(() => {
        if (error && error.code === 3002) {
          router.push({ name: "Login", query: { use: "sign" } });
        }
        Toast({
          message: `${(error && error.message) || "服务器繁忙"}`,
          duration: 2000
        });
      });
      return Promise.reject(error);
    }
    return payload;
  },
  (error: AxiosError) => {
    if (error) {
      // 请求配置发生的错误
      if (!error.response) {
        return console.error("Error", error.message);
      }
      // 获取状态码
      const status = error.response.status;
      const errorText = codeMessage[status] || error.response.statusText;

      // 提示错误信息
      setTimeout(() => {
        Toast.fail(errorText);
      });
    }
    return Promise.reject(error);
  }
);

export default request;
