// import axios from "axios";
import axios from "@/utils/http";
import store from "@/store";
import router from "@/router";
import { ElMessage } from "element-plus";

export function logout() {
  let data = store.state.wechatNo;
  if (data == null) {
    data = store.state.userInfo.wechatNo;
  }
  axios({
    url: "/api/api/user/logout?wechatNo=" + data,
    method: "post",
  })
    .then((res) => {
      if (res.data.code == 200) {
        ElMessage.success("成功退出登录");
        localStorage.removeItem("wechatNo");
        localStorage.clear();
        router.replace({ name: "login" });
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
