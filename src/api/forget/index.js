import axios from "@/utils/http";
// import { ElMessage } from "element-plus";
// import router from "@/router";

export function selectProblem(data) {
    return axios({
        url: "/api/api/user/api/securityProblem?wechatNo=" + data,


    })
}
export function submitProblemPassword(data) {
    return axios({
        url: "/api/api/user/api/submitProblemPassword?wechatNo=" + data.wechatNo + "&problemPassword=" + data.problemPassword,
        method: "post",

    })
}

export function changeNewPassword(data) {
    return axios({
        url: "/api/api/user/api/directChangePassword?wechatNo=" + data.wechatNo + "&newPassword=" + data.newPassword,
        method: "post"
    })
}