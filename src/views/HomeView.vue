<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse == false ? '12rem' : '4rem'" class="aside">
        <div class="logo">
          <img src="~@/assets/logo.jpg" alt="" style="border-radius: 50%" />
          <h5 class="title" :style="{ display: isCollapse == false ? '' : 'none' }">学习强国</h5>
        </div>

        <el-menu
          unique-opened
          default-active="this.$route.path"
          :collapse="isCollapse"
          :collapse-transition="false"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          :router="true"
        >
          <el-menu-item index="/readProject">
            <el-icon>
              <Tickets />
            </el-icon>
            <template #title> <span>反诈教育</span></template>
          </el-menu-item>
          <el-menu-item index="/articleManagement" v-if="Number($store.state.userRole) === 2">
            <el-icon>
              <Tickets />
            </el-icon>
            <template #title> <span>宣传员模块</span></template>
          </el-menu-item>
          <el-menu-item index="/userScores">
            <el-icon>
              <Tickets />
            </el-icon>
            <template #title> <span>我的知识点</span></template>
          </el-menu-item>
          <el-menu-item index="/userInfo/basicInfo" v-if="$store.state.userRole !== 0">
            <el-icon>
              <Tickets />
            </el-icon>
            <template #title> <span>个人中心</span></template>
          </el-menu-item>

          <el-menu-item index="/inviteUser" v-if="$store.state.userRole !== 0">
            <el-icon>
              <Tickets />
            </el-icon>
            <template #title> <span>邀请好友</span></template>
          </el-menu-item>
          <!-- <el-menu-item index="" v-if="$store.state.userRole !== 0" @click="isOpenMoney = true">
            <el-icon>
              <Tickets />
            </el-icon>
            <template #title> <span>我要借钱
              </span></template>
          </el-menu-item> -->
        </el-menu>
        <div :style="{ display: isCollapse == false ? '' : 'none' }" class="asiderButtom">
          <img src="@/assets/officical.jpg" alt="" style="width: 120px; height: 120px" />
          <div style="margin-bottom: 10px">官方公众号</div>
          <div>交流Q群：860539124 <br />客服微信：zj230907001</div>
        </div>
      </el-aside>
      <el-container class="mainHeight">
        <el-header>
          <div class="siderOpen">
            <el-icon :size="20" v-if="isCollapse === false" @click="isCollapse = !isCollapse">
              <Expand />
            </el-icon>
            <el-icon :size="20" v-if="isCollapse === true" @click="triggerSidebarOpened">
              <Fold />
            </el-icon>
          </div>
          <Header></Header>
        </el-header>
        <Tagview></Tagview>
        <el-main>
          <router-view v-slot="{ Component }">
            <component :is="Component" :key="$route.name" />

            <!-- <keep-alive>
              <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
            </keep-alive> -->
          </router-view>
        </el-main>
        <el-footer>
          <a
            style="text-decoration: none; color: black; font-size: 12px"
            href=" https://beian.miit.gov.cn/"
            target="_blank"
          >
            粤ICP备2023148717号</a
          >
        </el-footer>
      </el-container>
    </el-container>
    <el-dialog v-model="isOpenMoney" title="微信扫码申请" width="30%">
      <div>
        <img src="@/assets/money.jpg" alt="" style="width: 300px; height: 300px" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  User,
  Expand,
  Fold,
  Tickets,
  List,
  Coordinate,
  Calendar,
  StarFilled,
  Stamp,
  SetUp,
  Orange,
  ScaleToOriginal,
} from "@element-plus/icons-vue";
import Header from "@/components/header/HeaderView.vue";
// import Tagview from "@/components/header/HeaderTagview";
// import Main from "@/components/main/MainHome.vue";
// import store from "@/store";

export default {
  components: {
    Header,
    User,
    Expand,
    Fold,
    Tickets,
    List,
    Coordinate,
    // Tagview,
    Calendar,
    StarFilled,
    Stamp,
    ScaleToOriginal,
    SetUp,
    Orange,
  },
  data() {
    return {
      isCollapse: false,
      width: "200px",
      currentRouteInfo: {},
      collapsed: {
        type: Boolean,
      },
      isOpenMoney: false, //借钱弹窗
    };
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // handleSelect(key, keyPath) {
    //   console.log(keyPath);
    //   let currentPath = key;
    //   let routes = this.$router.options.routes[3].children;
    //   // if (currentPath == "/frontView" || currentPath == "/mainHome") {
    //   //   return;
    //   // }
    //   for (let i = routes.length - 1; i >= 0; i--) {
    //     if (routes[i].path === currentPath) {
    //       // console.log(routes[i]);
    //       const val = {
    //         info: routes[i].meta.info,
    //         path: routes[i].path,
    //         name: routes[i].name,
    //       };
    //       this.$store.commit("pushtags", val);
    //     }
    //   }
    // },
    triggerSidebarOpened() {
      this.isCollapse = !this.isCollapse;
    },

    //点击把菜单的名字传出去
    clickMenu(name, path) {
      const val = {
        name: name,
        path: path,
      };
      this.$store.commit("pushtags", val);
    },
  },
};
</script>
<style lang="scss">
.el-main {
  background-color: #f5f5f5;
  padding: 17px;
}

.common-layout {
  height: 100vh;
}

.title {
  margin-left: 10px;
}

.logo {
  // width: 200/16rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.75rem;
  line-height: 3.75rem;

  // background-color: #fff;
  img {
    height: 2rem;
  }

  h2 {
    color: rgb(191, 203, 217);
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 12rem;
}

.aside {
  height: 100vh;
  background-color: #304156;
  color: rgb(191, 203, 217);
  position: relative;
}

.asiderButtom {
  font-size: 13px;
  position: absolute;
  bottom: 5%;
  left: 32px;
}

.mainHeight {
  height: 100vh;
}

.el-menu {
  border-right: 0 !important;

  .el-sub-menu__title,
  .el-menu-item,
  .el-menu-item .el-menu-tooltip__trigger {
    background-color: #304156;
    color: rgb(191, 203, 217);
  }

  .el-menu-item:hover {
    background-color: rgb(38, 52, 69);
  }

  .el-sub-menu__title:hover {
    background-color: rgb(38, 52, 69);
  }
}

// .el-menu-item {
//   background-color: #304156;
//   color: rgb(191, 203, 217);
// }
.el-header {
  background-color: #fff;
  display: flex;
  align-items: center;

  .siderOpen {
    margin-top: 0.25rem;
    padding-right: 0.5rem;
  }
}

.el-header {
  --el-header-height: 52px;
}

.el-footer {
  font-size: 0.5rem;
  background-color: #f5f5f5;
  height: 5vh !important;
}
</style>
