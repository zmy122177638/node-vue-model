import axios from "axios";
import qs from "qs";
import { Toast } from "vant";

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

let vanToast: any = null;

// 发起请求前
axios.interceptors.request.use(
  (config: any) => {
    // 使用express.json()情况下,可以不需要qs转换
    // 使用express.urlencoded()情况下,必须qs转换
    if (config.method.toUpperCase() !== "GET") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (error: any) => {
    Toast.fail("加载超时");
    if (vanToast) {
      vanToast.clear();
    }
    return Promise.reject(error);
  }
);
// 发起请求后
axios.interceptors.response.use(
  (res: any) => {
    if (vanToast) {
      vanToast.clear();
    }
    const { success, payload, error } = res.data;
    if (!success) {
      setTimeout(() => {
        Toast({
          message: `${(error && error.message) || "服务器繁忙"}`,
          duration: 2000
        });
      });
      return Promise.reject(error);
    }
    return payload;
  },
  (error: any) => {
    if (vanToast) {
      vanToast.clear();
    }
    if (error) {
      // 请求配置发生的错误
      if (!error.response) {
        return console.error("Error", error.message);
      }
      // 获取状态码
      const status = error.response.status;
      const errorText = codeMessage[status] || error.response.statusText;
      console.log(status);
      // 提示错误信息
      setTimeout(() => {
        Toast.fail(errorText);
      });
    }
    return Promise.reject(error);
  }
);

interface Tconfig {
  /** 是否显示加载Toast */
  ISLOADSHOW?: boolean;
  [propName: string]: any;
}

/**
 *
 * @param method 请求方法 GET POST PUT...
 * @param url 请求地址
 * @param params 请求参数
 * @param isloadShow 是否展示加载中...
 * @param config 合并axios配置
 */
export default function http(
  method: string,
  url: string,
  params?: any,
  isloadShow?: boolean,
  config?: any
) {
  return new Promise((resolve, reject) => {
    if (typeof params !== "object") {
      params = {};
    }
    const option: any = Object.assign(
      {
        method,
        url,
        timeout: 10000,
        headers: {},
        withCredentials: true // 是否携带cookies发起请求
      },
      config
    );
    // 添加token
    option.headers.authorization = "auth " + "anles";
    // 处理get、post传参问题
    method.toUpperCase() !== "GET"
      ? (option.data = {
          ...params
        })
      : (option.params = {
          ...params
        });
    /** 展示加载 */
    if (isloadShow) {
      vanToast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
    }
    // 请求成功后服务器返回二次处理
    axios
      .request(option)
      .then((payload: any) => {
        if (vanToast) {
          vanToast.clear();
        }
        resolve(payload);
      })
      .catch((error: any) => {
        if (vanToast) {
          vanToast.clear();
        }
        reject(error);
      });
  });
}
