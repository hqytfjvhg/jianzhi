// import axios from "axios";
import axios from "@/utils/http";
import store from "@/store";
import { ElMessage } from "element-plus";
import router from "@/router";

export function login(data) {
  axios({
    url: "/api/api/user/login",
    method: "post",
    data,
  })
    .then((res) => {
      // console.log(res);
      if (res.data.code == 200) {
        console.log(res.data.data);
        const wechatNo = res.data.data.wechatNo;
        store.commit("changeWechatNo", wechatNo);
        const userId = res.data.data.id;
        store.commit("changeUserId", userId);
        const userRole = res.data.data.userRole;
        store.commit("changeUserRole", userRole);
        const userInfo = {
          wechatNo: res.data.data.wechatNo,
          userPassword: res.data.data.userPassword,
          name: res.data.data.name,
          phoneNum: res.data.data.phoneNum,
          alipayName: res.data.data.alipayName,
          alipayNum: res.data.data.alipayNum,
          securityProblem: res.data.data.securityProblem,
          problemPassword: res.data.data.problemPassword,
          userRole: res.data.data.userRole,
          vip: res.data.data.vip,
          vipExpiryDate: res.data.data.vipExpiryDate,
        };
        store.commit("changeUserInfo", JSON.stringify(userInfo));

        // console.log(token, userId);

        ElMessage.success("登录成功!");
        if (res.data.data.userRole == 0) {
          router.push("/rootHomeView");
          // store.commit("pushtags", { path: "/rootHomeView", name: "rootHomeView", info: "主页" });
        } else {
          router.push("/homeView");

          // store.commit("pushtags", { path: "/homeView", name: "homeView", info: "主页" });
        }
        //修改通知在这里
        // ElMessageBox.alert(
        //   "如果遇到文章中没有二维码的，学习码“文章中首个二维码下的首个汉字”填文章最后一个汉字即可，和“文章最后一个汉字”是同一个字（同一个学习码）",
        //   "提示",
        //   {
        //     confirmButtonText: "确定",
        //   },
        // );
        // _this.isLoading = false;
      }
    })
    .catch(function (error) {
      ElMessage.error("登录失败");
      console.log(error.message);
    });
}

export function uuid() {
  axios
    .get("/api/ifi-personal/user/getRegisterIdentificationCode")
    .then((res) => {
      if (res.data.code == 0) {
        const registerIdentifyUuid = res.data.data.registerIdentifyUuid;
        console.log(registerIdentifyUuid);
        store.commit("changeUuid", registerIdentifyUuid);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
