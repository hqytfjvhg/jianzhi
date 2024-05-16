import axios from "@/utils/http";
import store from "@/store";
// import { ElMessage } from "element-plus";

//用户积分明细
export function selectScores(data) {
    return axios({
        url: "/api/api/userpoints/get?currentPage=" + data.currentPage + "&pageSize=" + data.pageSize + "&userId=" + store.state.userId,
        data
    })
}