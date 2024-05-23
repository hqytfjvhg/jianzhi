import axios from "@/utils/http";
import { ElMessage } from "element-plus";
import store from "@/store";

// import store from "@/store";

//获取基本设置信息
export function getBasicInfo() {
  return axios({
    url: "/api/api/settings/list",
  });
}
//修改设置信息
export function updataBasicInfo(data) {
  return axios({
    url: "/api/api/settings/update",
    method: "post",
    data,
  }).then((res) => {
    if (res.data.code == 200) {
      ElMessage.success("更新成功");
    }
  });
}
//获取文章列表
export function articleList(data) {
  return axios({
    url: "/api/api/article/listPage?current=" + data.currentPage + "&pageSize=" + data.pageSize,
  });
}
//获取用户列表
export function getUserList(data) {
  return axios({
    url: "/api/api/user/list/page?current=" + data.current + "&pageSize=" + data.pageSize,
  });
}
//模糊查询用户
export function selectUserList(data) {
  return axios({
    url:
      "/api/api/user/queryListUser?name=" + data.name + "&wechatNo=" + data.wechatNo + "&phoneNum=" + data.wechatName,
  });
}
//获取待审批用户
export function getRegisterList(data) {
  return axios({
    url: "/api/api/user/userRegisterList?current=" + data.current + "&pageSize=" + data.pageSize,
  });
}
//删除用户
export function deleteUser(data) {
  return axios({
    url: "/api/api/user/delete",
    method: "post",
    data,
  }).then((res) => {
    if (res.data.code == 200) {
      ElMessage.success("删除成功");
    }
  });
}
//同意用户
export function agreeUser(data, _this) {
  return axios({
    url: "/api/api/user/update",
    method: "post",
    data,
  }).then((res) => {
    if (res.data.code == 200) {
      _this.getUserList();
      ElMessage.success("操作成功");
    }
  });
}
//批量同意用户
export function agreeMoreUser(data, _this) {
  return axios({
    url: "/api/api/user/batchUpdateReviewStatus",
    method: "post",
    data,
  }).then((res) => {
    if (res.data.code == 200) {
      _this.getUserList();
      ElMessage.success("操作成功");
    }
  });
}
//给宣传员权限
export function givePropagandist(data, _this) {
  return axios({
    url: "/api/api/user/update",
    method: "post",
    data,
  })
    .then((res) => {
      // console.log(res);
      if (res.data.code == 200) {
        _this.getUserList();
        ElMessage.success("操作成功");
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

//给VIP权限
export function giveVIPPermission(data, _this) {
  // debugger
  // data.vip = 1
  return axios({
    url: "/api/api/user/update",
    method: "post",
    data,
  })
    .then((res) => {
      // console.log(res);
      if (res.data.code == 200) {
        _this.getUserList();
        ElMessage.success("操作成功");
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

//获取文章，分页
export function getArticle(data) {
  return axios({ url: "/api/api/article/listPage?currentPage=" + data.currentPage + "&pageSize=" + data.pageSize });
}

//删除文章
// export function deleteArticle(data) {
//     return axios({
//         url: "/api/api/article/delArticle?id=" + data,
//         method: "delete",
//     })
// }
//未发布文章
export function noPushArticle(data) {
  return axios({
    url:
      "/api/api/release/releaseByAdmin?current=" +
      data.current +
      "&pageSize=" +
      data.pageSize +
      "&userId=" +
      store.state.userId,
  });
}
//上传文章检测库
export function detectionArticle(data) {
  return axios({
    // url: "/api/api/detection/add?articleURL=" + data.articleURL + "&articleQRCode=" + data.articleQRCode,
    url: "/api/api/detection/add",
    method: "post",
    data,
  });
}
//检测未通过的名单
export function detectNoPass() {
  return axios({
    url: "/api/api/detection/checkFailUser",
    method: "post",
  });
}
//管理员看到的统计信息
export function selectUserOtherInfo() {
  return axios({
    url: "/api/api/user/statistics",
  });
}
//模糊查询文章信息
export function selectArticleList(data) {
  return axios({
    url: "/api/api/article/queryListArticle?officialAccountName=" + data.officialAccountName + "&title=" + data.title,
  });
}
//一键清空积分
export function clearUserScore() {
  return axios({
    url: "/api/api/user/exportUserPoints",
  });
}

//获取所有用户列表
export function getAllUser() {
  return axios({
    url: "/api/api/user/list",
  });
}

//修改已发布的学习码
export function saveSignCodeByPush(data) {
  return axios({ url: "/api/api/article/update", method: "post", data });
}
//获取广告和非广告的上限
export function getArticleLimit() {
  return axios({
    url: "/api/api/userarticle/GetReadLimitOfRedis",
  });
}

//修改上限
export function saveArticleLimit(data, _this) {
  return axios({
    url: "/api/api/userarticle/ModifyReadLimitOfRedis",
    method: "post",
    data,
  }).then((res) => {
    if (res.data.code == 200) {
      _this.getArticleLimit();
      ElMessage.success("保存成功");
    }
  });
}

//新增通知
export function pushInfo(data, _this) {
  return axios({
    url: "/api/api/notice/add",
    method: "post",
    data,
  }).then((res) => {
    if (res.data.code == 200) {
      ElMessage.success("发布成功");
      _this.selectInfoList();
    }
  });
}
//删除通知
export function deleteInfo(data, _this) {
  return axios({
    url: "/api/api/notice/delete?id=" + data,
    method: "post",
  }).then((res) => {
    if (res.data.code == 200) {
      ElMessage.success("删除成功");
      _this.selectInfoList();
    }
  });
}
//修改通知
export function editInfo(data, _this) {
  return axios({
    url: "/api/api/notice/update",
    method: "post",
    data,
  }).then((res) => {
    if (res.data.code == 200) {
      ElMessage.success("修改成功");
      _this.selectInfoList();
    }
  });
}
//获取通知
export function selectInfo() {
  return axios({
    url: "/api/api/notice/get",
  });
}
