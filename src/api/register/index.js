// import axios from "axios";
import axios from "@/utils/http";
import { ElMessage } from "element-plus";
// import router from "@/router";

export function register(data, _this) {
  return axios({
    url: "/api/api/user/register",
    method: "post",
    data,
  })
    .then(function (res) {
      // console.log(res);
      if (res.data.code == 200) {
        ElMessage.success("注册成功!请等待管理员审核");
        // router.push("/login");
      } else {
        delete _this.form.inviteCode;

      }
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
}

