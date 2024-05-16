// import axios from "axios";
import axios from "@/utils/http";
import store from "@/store";
import { ElMessage } from "element-plus";

export function logout() {
  axios({
    url: "/api/api/user/logout",
    method: "post",
  })
    .then((res) => {
      if (res.data.code == 0) return ElMessage.success("成功退出登录");
      localStorage.removeItem("wechatNo");
      localStorage.clear();
      this.$router.replace({ name: "login" });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "退出失败",
      });
    });
}
