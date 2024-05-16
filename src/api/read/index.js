import axios from "@/utils/http";
import { ElMessage } from "element-plus";
import store from "@/store";

//用户获取文章列表
export function selectArticle(data) {
    return axios({
        url: "/api/api/article/listPageByUserId?current=" + data.current + "&pageSize=" + data.pageSize + "&userId=" + store.state.userId

    })
}


//发布文章
export function publishArticle(data, _this) {
    return axios({
        url: "/api/api/article/addArticle",
        method: "post",
        data
    }).then(res => {
        if (res.data.code == 200) {
            ElMessage.success("发布成功")
            _this.isGuangGao = null,
                _this.bindingForm = {

                    officialAccountName: "",
                    qrcode: "",
                    scheduledPublishTime: "",
                    signCode1: "",
                    signCode2: "",
                    title: ""
                },
                _this.bangdingVX()
            _this.sevenNoPushArticle()
        }
    })
}

//修改公众号名字
export function changeVXName(data) {
    return axios({
        url: "/api/api/Xcyofficialaccount/update",
        method: "post",
        data
    }).then(res => {
        if (res.data.code == 200) {
            ElMessage.success("修改成功")
        }
    })
}
//上传图片
export function saveImg(data) {
    return axios({
        url: "/api/api/article/uploadImage",
        method: "post",
        data

    })
}
//获取学习信息
export function getSignInfo(data) {
    return axios({
        url: "/api/api/userarticle/signIn?id=" + data,

    })
}

//学习
export function signInArticle(data) {
    return axios({
        url: "/api/api/userarticle/signInArticle",
        method: "post",
        data
    })
}

//宣传员请求绑定的公众号信息
export function getBangDing() {
    return axios({
        url: "/api/api/Xcyofficialaccount/get?userid=" + store.state.userId,

    })
}
//绑定公众号信息
export function bindingVx(data) {
    return axios({
        url: "/api/api/Xcyofficialaccount/add",
        method: "post",
        data
    })
}
//用户打卡
export function userClock() {
    return axios({
        url: "/api/api/userarticle/getPushInfo?userId=" + store.state.userId
    })
}
//宣传员打卡详情
export function sevenClock(data) {
    return axios({
        url: "/api/api/article/getArticleBySeven?current=" + data.current + "&pageSize=" + data.pageSize
    })
}
//宣传员删除已发布文章
export function deleteArticleByPush(data){
    return axios({
        url:"/api/api/article/delArticle?id="+data,
        method:"delete"
    })
}
//宣传员删除文章
export function deleteArticle(data) {
    return axios({
        url: "/api/api/release/delete?id=" + data,
        method: "delete"
    })
}
//宣传员未发布文章
export function sevenNoPushArticle(data) {
    return axios({
        url: "/api/api/release/releaseByPlugger?current=" + data.current + "&pageSize=" + data.pageSize + "&userId=" + store.state.userId
    })
}
//修改学习码
export function saveSignCode(data) {
    return axios({ url: "/api/api/release/update", method: "post", data },)
}
//用户签到前请求是否需要检测阅读量
export function checkReadings() {
    return axios({
        url: "/api/api/detection/firstCheck?id=" + store.state.userId,

    })
}
//判断检测是否通过
export function passReadings(data) {
    return axios({
        url: "/api/api/detection/checkAfter10Seconds?userID=" + data.userID + "&articleId=" + data.articleId + "&prevReadCount=" + data.prevReadCount,
        method: "post",
    })
}