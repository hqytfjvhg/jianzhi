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
          <el-menu-item index="/overView">
            <el-icon>
              <Tickets />
            </el-icon>
            <template #title> <span>项目总览</span></template>
          </el-menu-item>
          <el-menu-item index="/basicSetting">
            <el-icon>
              <Tickets />
            </el-icon>
            <template #title> <span>基础信息配置</span></template>
          </el-menu-item>
          <el-menu-item index="/selectUser">
            <el-icon>
              <Tickets />
            </el-icon>
            <template #title> <span>查看用户信息</span></template>
          </el-menu-item>

          <el-menu-item index="/selectArticle">
            <el-icon>
              <Tickets />
            </el-icon>
            <template #title> <span>查看文章信息</span></template>
          </el-menu-item>
          <el-menu-item index="/detectionLibrary">
            <el-icon>
              <Tickets />
            </el-icon>
            <template #title> <span>文章检测库</span></template>
          </el-menu-item>
        </el-menu>
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
            href=" https://beian.miit.gov.cn/"
            target="_blank"
            style="text-decoration: none; color: black; font-size: 12px"
          >
            粤ICP备2023148717号</a
          ></el-footer
        >
      </el-container>
    </el-container>
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
    };
  },
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
