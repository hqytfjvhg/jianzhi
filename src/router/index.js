import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/login/LoginView.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },

  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register/RegisterView.vue"),
  },
  {
    path: "/forgetPassword",
    name: "forgetPassword",
    component: () => import("@/views/forget/ForgetPassword.vue"),
  },

  {
    path: "/homeView",
    name: "homeView",
    component: HomeView,
    redirect: "/readProject",
    meta: {
      info: "首页",
      keepAlive: true,
    },
    children: [
      {
        path: "/readProject",
        name: "readProject",
        component: () => import("@/views/read/ReadProject.vue"),
        meta: { info: "公众号阅读项目" },
      },
      {
        path: "/userScores",
        name: "userScores",
        component: () => import("@/views/scores/UserScores.vue"),
        meta: { info: "我的积分" },
      },
      {
        path: "/userInfo/:info",
        name: "userInfo",
        component: () => import("@/views/user/UserInfo.vue"),
        meta: { info: "个人信息" },
      },
      {
        path: "/articleManagement",
        name: "articleManagement",
        component: () => import("@/views/propagandist/ArticleManagement.vue"),
        meta: { info: "宣传员模块" },
      },
      {
        path: "/inviteUser",
        name: "inviteUser",
        component: () => import("@/views/invite/InviteUser.vue"),
        meta: { info: "邀请好友" },
      },
    ],
  },
  {
    path: "/rootHomeView",
    name: "rootHomeView",
    component: () => import("@/views/RootHomeView.vue"),
    redirect: "/selectUser",
    meta: { info: "主页" },
    children: [
      {
        path: "/selectUser",
        name: "selectUser",
        component: () => import("@/views/root/SelectUser.vue"),
        meta: { info: "查看用户信息", keepAlive: false },
      },

      {
        path: "/selectArticle",
        name: "selectArticle",
        component: () => import("@/views/root/SelectArticle.vue"),
        meta: { info: "查看文章信息" },
      },
      {
        path: "/basicSetting",
        name: "basicSetting",
        component: () => import("@/views/root/BasicSetting.vue"),
        meta: { info: "基础信息配置" },
      },
      {
        path: "/detectionLibrary",
        name: "detectionLibrary",
        component: () => import("@/views/root/DetectionLibrary.vue"),
        meta: { info: "文章检测库" },
      },
      {
        path: "/overView",
        name: "overView",
        component: () => import("@/views/root/OverView.vue"),
        meta: { info: "项目总览" },
      },
      {
        path: "/articleLimit",
        name: "articleLimit",
        component: () => import("@/views/root/articleLimit.vue"),
        meta: { info: "文章上限" },
      },
      {
        path: "/infoPush",
        name: "infoPush",
        component: () => import("@/views/root/infoPush.vue"),
        meta: { info: "通知推送" },
      },
    ],
  },
];

// export const asyncRoutes=[{

// }]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 准备跳到登录页放行
  if (to.path === "/login") return next();
  if (to.path === "/register") return next();
  if (to.path === "/forgetPassword") return next();
  let token = localStorage.getItem("wechatNo");
  // 未登录，没有token
  if (token == "" || token == null) {
    if (to.path == "/login" || to.path == "/register" || to.path == "/forgetPassword") return next();
    console.log("请先登录");
    next("/login");
    // next({ name: "login" });
  } else {
    next();
  }
});

export default router;
