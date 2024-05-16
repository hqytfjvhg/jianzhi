import axios from "@/utils/http";
import store from "@/store";
import { ElMessage } from "element-plus";
// import router from "@/router";

//修改用户信息
export function changeUserInfo(data) {
    return axios({
        url: "/api/api/user/update",
        method: "post",
        data
    }).then(res => {
        if (res.data.code == 200 && res.data.data) {
            ElMessage.success("修改成功")
        }
    })
}

//获取用户信息
export function getUserInfo() {
    return axios({
        url: "/api/api/user/get/login",
    })
}
//获取用户邀请码
export function getUserInviteCode() {
    return axios({
        url: "/api/api/userInvite/getCode?userId=" + store.state.userId
    })
}