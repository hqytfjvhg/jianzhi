import axios from "@/utils/http";
import store from "@/store";
// import { ElMessage } from "element-plus";

//用户积分明细
export function selectUserFriend(data) {
    return axios({
        url: "/api/api/user/getFriendList?current=" + data.current + "&pageSize=" + data.pageSize + "&userId=" + store.state.userId,
        data
    })
}