import { createStore } from "vuex";
// import { getToken, saveToken } from "@/utils/storage";

export default createStore({
  state: {

    userId: localStorage.getItem("userId") ? localStorage.getItem("userId") : "",
    userRole: localStorage.getItem("userRole") ? localStorage.getItem("userRole") : "",

    wechatNo: localStorage.getItem("wechatNo") ? localStorage.getItem("token") : "",

    userInfo: localStorage.getItem("userInfo") ? localStorage.getItem("userInfo") : "",



    // currentUserId: localStorage.getItem("currentUserId") ? localStorage.getItem("currentUserId") : "",
    // currentState: localStorage.getItem("currentState") ? localStorage.getItem("currentState") : "",
    // // todoList: (JSON.stringify(undefined) && JSON.parse(localStorage.getItem("todoList"))) || [], //json.parse无法解析undefi
    // approvalData: [], //事件下模板的数据
    // currentName: localStorage.getItem("currentName") ? localStorage.getItem("currentName") : "",
    // // userSelectName: [],
    // userList: [],
    // // selectUser: [], //某一模板存着选中的人名，用于备份做对比
    // modelFinishState: [], //存储当前事件的完成状态和时间线
    // modelFinishPerformance: [], //存储当前事件的业绩excel数据和时间线
    // tags: [], //多页签存的数据
    // //tagsview标签显示隐藏
    isCollapse: false,
  },
  getters: {},
  mutations: {
    changeUserId(state, payload) {
      state.userId = payload;
      localStorage.setItem("userId", payload);
    },
    changeUserRole(state, payload) {
      state.userRole = payload
      localStorage.setItem("userRole", payload
      )
    },
    //微信号就是每次访问的token
    changeWechatNo(state, payload) {
      state.wechatNo = payload;
      localStorage.setItem("wechatNo", payload);
      // saveToken(payload);
    },

    // changeRole(state, payload) {
    //   state.role = payload;
    //   localStorage.setItem("role", payload);
    //   // console.log(payload);
    // },
    changeUserInfo(state, payload) {
      state.userInfo = payload;
      localStorage.setItem("userInfo", payload);
      console.log(payload);
    },






    pushtags(state, val) {
      //如果等于-1说明tabs不存在那么插入，否则什么都不做
      //findindex找角标，循环判断一下，如果等于那么就代表有相同的，就不必添加，如果找不到那就是-1.就添加
      console.log(val);
      let result = state.tags.findIndex((item) => item.name === val.name);
      result === -1 ? state.tags.push(val) : "";
      // console.log(state.tags);
      // localStorage.setItem("tags",  JSON.stringify(state.tags));
    },
    //关闭标签
    closeTab(state, val) {
      //同上，找角标，然后用角标的位置对应删除一位。splice：这是数组的删除方法
      let result = state.tags.findIndex((item) => item.name === val.name);
      state.tags.splice(result, 1);
    },
    //关闭所有tagsview标签
    cleartagsview(state, val) {
      //清空数组
      state.tags = [];
      //跳转到首页,val接受传过来的当前路由
      if (val.path !== "/mainHome") {
        this.$router.push({ path: "/mainHome" });
      }
    },
    //改变tagsview显示隐藏
    changeisshow(state) {
      state.isCollapse = !state.isCollapse;
    },
  },
});
