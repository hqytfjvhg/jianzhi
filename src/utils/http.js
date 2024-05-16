import axios from "axios";
import { ElMessage, ElLoading } from "element-plus";
import _ from "lodash";
import router from "@/router";

// declare module "axios" {
//   export interface AxiosRequestConfig{
//     showLoading?:boolean;
//   }
// }
const http = axios.create({
  baseURL: process.env.BASE_URL, //设置请求的base url
  timeout: 40000, //超时时长
});

//loading对象
let loading;

//当前正在请求的数量
let needLoadingRequestCount = 0;

//显示loading
export function showLoading(target) {
  // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
  // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
  if (needLoadingRequestCount === 0 && !loading) {
    loading = ElLoading.service({
      lock: true,
      text: "加载中...",
      background: "rgba(255, 255, 255, 0.5)",
      target: target || "body", //所覆盖的节点
    });
  }
  needLoadingRequestCount++;
}

//隐藏loading
export function hideLoading() {
  needLoadingRequestCount--;
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); //做个保护
  if (needLoadingRequestCount === 0) {
    //关闭loading
    toHideLoading();
  }
}

//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
var toHideLoading = _.debounce(() => {
  if (loading != null) {
    loading.close();
    loading = null;
  }
}, 300);

let currentConfig = null;
//添加请求拦截器
http.interceptors.request.use(
  (config) => {
    //获取token
    const wechatNo = localStorage.getItem("wechatNo");
    if (wechatNo) {
      //如果token存在，则添加到请求的头部
      config.headers.wechatNo = wechatNo; //通常，我们将token添加到Authorization头部，而不是自定义的头部如"token"
    }
    //判断当前请求是否设置了不显示Loading
    // if (config.showLoading) {
    //   showLoading(config.headers.loadingTarget);
    //   currentConfig = config;
    // }
    if (config.headers.showLoading !== false) {
      showLoading(config.headers.loadingTarget);
      currentConfig = config;
    }
    // console.log("请求拦截器", config);
    return config;
  },
  (err) => {
    //判断当前请求是否设置了不显示Loading
    if (currentConfig.headers.showLoading !== false) {
      hideLoading();
      currentConfig = null;
    }
    ElMessage.error("请求超时!");
    return Promise.resolve(err);
  },
);

//响应拦截器
http.interceptors.response.use(
  (response) => {
    // console.log(response);
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (response.config.headers.showLoading !== false) {
      hideLoading();
    }
    // if (response.config.showLoading) {
    //   hideLoading();
    // }
    if (response.status && response.status == 200 && response.data) {
      if (response.data && response.data.code && response.data.code != 200) {
        if (response.data.code == 40100) {
          router.replace({ name: "login" });
        }
        //  else if (response.data.code == 6011) {
        //   ElMessageBox.alert(response.data.message, "警告", {
        //     confirmButtonText: "确定",
        //     type: "warning",
        //   });
        // }

        ElMessage.error(response.data.message);

        // if (response.data.code == 5) {
        //   localStorage.removeItem("userId");
        //   localStorage.removeItem("wechatNo");
        //   ElMessage.error("未登录，请重新登录");
        //   router.replace({ name: "login" });
        // } else if (response.data.code == 6) {
        //   router.replace({ name: "aboutInfo" });
        //   ElMessage.error(response.data.message);
        // } else if (response.data.code == 4) {
        //   ElMessage.error("没有权限");
        //   router.replace({ name: "frontView" });
        // } else if (response.data.code == 3) {
        //   ElMessage.error(response.data.message);
        // } else if (response.data.code == 1) {
        //   ElMessage.error(response.data.message);
        // } else {
        //   ElMessage.error("失败");
        // }
        // console.log("响应拦截器", response);
      }
      return response;
    }
  },
  (error) => {
    // console.log(error);
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (error.config.headers.showLoading !== false) {
      hideLoading();
    }
    //response是请求响应返回的数据，没有则是网络错误
    // if (error.response && error.response.data && error.response.data.message) {
    //   var jsonObj = JSON.parse(error.response.data.message);
    //   ElMessage.error(jsonObj.message);
    // } else {
    //   ElMessage.error(error.message);
    // }

    if (error.request.status == 0) {
      // console.log("网络错误");
      // ElMessage.error("网络错误/连接失败");

      // 返回的数据则是axios.catch(err)中接收的数据
      return Promise.reject(error);
    } else if (error.response.status == 401) {
      router.push({ name: "login" });
    }
  },
);

export default http;
