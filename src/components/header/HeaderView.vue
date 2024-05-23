<template>
  <div class="headerUser">
    <el-breadcrumb :separator-icon="ArrowRight">
      <!-- <el-breadcrumb-item :to="{ path: '/homeView' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in this.getBreadList()" :key="item" :to="item.path">
        {{ item.info }}
      </el-breadcrumb-item> -->
    </el-breadcrumb>
    <!-- <div>{{ $store.state.name }}+{{ $store.state.userId }}+{{ $store.state.number }}+{{ number }}</div> -->

    <div class="header-right">
      <span style="margin-right: 10px; vertical-align: middle; line-height: 32px"
        >{{ JSON.parse($store.state.userInfo).name }}&nbsp;{{ JSON.parse($store.state.userInfo).wechatNo }}&nbsp;
        <span
          ><el-button type="text" @click="open">
            <span :style="{ color: isVip ? 'red' : '#808080' }">已停止开通新会员</span>
          </el-button></span
        >
      </span>
      <!-- <el-icon
        :size="20"
        class="bellIcon"
        v-if="$store.state.role != 'ROOT'"
        @click="$router.push({ name: 'aboutInfo' })"
      >
        <BellFilled />
      </el-icon>
      <div class="redPoint" v-if="$store.state.role != 'ROOT'">{{ $store.state.number2 }}</div> -->

      <el-dropdown trigger="click">
        <!-- <a class="el-dropdown-link" @click.prevent>
          <el-avatar style="font-size: 0.5rem">zzzz</el-avatar>
        </a> -->

        <img
          style="border-radius: 10%; width: 32px; height: 32px"
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          alt=""
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              @click="$router.push({ name: 'userInfo', params: { info: 'basicInfo' } })"
              v-if="Number($store.state.userRole) !== 0"
            >
              基本信息</el-dropdown-item
            >
            <el-dropdown-item
              @click="$router.push({ name: 'userInfo', params: { info: 'security' } })"
              v-if="Number($store.state.userRole) !== 0"
            >
              修改密码</el-dropdown-item
            >
            <!-- <el-dropdown-item @click="$router.push({ name: 'userInfo' })" v-if="$store.state.role != 'ROOT'">
              个人信息
            </el-dropdown-item> -->
            <el-dropdown-item @click.prevent="doLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { ElMessageBox, ElMessage } from "element-plus";
// import { BellFilled } from "@element-plus/icons-vue";
// import { useRouter } from "vue-router";
// import axios from "axios";
// import store from "@/store";
import { logout } from "@/api/logout/index";
// import emitter from "@/utils/eventbus.js";

export default {
  data() {
    return {
      number: null,
      sumnumber: null,
      isVip: false,
      // activeIndex: 1,
      // isRouterAlive: true,
      // openTab: [
      //   {
      //     title: "首页",
      //     name: "/home", //路由
      //     closable: false, //首页不可关闭
      //     componentName: "index", //组件名称用于keepalive缓存
      //   },
      // ],
    };
  },
  created() {
    this.checkVipStatus();
  },
  // watch: {
  //   $route(to) {
  //     console.log(to);
  //     //当路由更新进行tab切换
  //     var flag = false;
  //     // 当前页面菜单已打开,直接切换过去
  //     if (this.openTab) {
  //       for (let i = 0; i < this.openTab.length; i++) {
  //         if (to.path == this.openTab[i].name || to.path.includes(this.openTab[i].name)) {
  //           //openTab中已存在？
  //           this.activeIndex = this.openTab[i].name;
  //           flag = true;
  //           break;
  //         }
  //       }
  //     }

  //     // 打开新的页面tab
  //     if (!flag) {
  //       let obj = {
  //         title: to.meta.info,
  //         name: to.path,
  //         closable: true,
  //         componentName: to.matched[1].components.default.name, //路由只缓存到第1层，更深层的视图不考虑
  //       };
  //       this.activeIndex = to.path;
  //       this.openTab.push(obj);
  //     }
  //   },
  // },
  methods: {
    //退出登录
    doLogout() {
      ElMessageBox.confirm("确定退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // localStorage.removeItem("userRole");
          // localStorage.removeItem("username");
          // localStorage.clear();
          // window.location.reload();
          logout();
          // this.$router.replace({ name: "login" });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消退出",
          });
        });
    },

    //检查vip状态
    checkVipStatus() {
      const vip = JSON.parse(this.$store.state.userInfo).vip;
      const currentDate = new Date();
      const expiryDate = new Date(JSON.parse(this.$store.state.userInfo).vipExpiryDate);
      if (vip === 1 && expiryDate > currentDate) {
        this.isVip = true;
      }
    },

    open() {
      let message;
      if (this.isVip) {
        message = `<span style="color:red">过期时间：${JSON.parse(this.$store.state.userInfo).vipExpiryDate}</span>`;
      }
      this.$alert(
        "学习强国平台VIP，59元有效期三年，有效期自充值起算 <br/><br/>VIP权益：每日学习篇数上限提高到55篇（非VIP上限30篇） <br/><br/>充值方式：企业支付宝<br/>户名：梅州市字节悦动科技有限公司 <br/>账号：zijieyuedong@126.com <br/>金额：59.00元 <br/>备注：填写学习强国账号（即微信号）<br/>" +
          message +
          "<br/> <br/>充值后会在24小时内升级为VIP用户，如有疑问请联系客服微信zj230907001",
        "VIP",
        {
          dangerouslyUseHTMLString: true,
        },
      );
    },
    // getBreadList() {
    //   let currentPath = this.$route.path;
    //   let routes = this.$router.options.routes[3].children;
    //   // console.log(currentPath, routes);
    //   return this.breadListSearch(routes, currentPath);
    // },
    // breadListSearch(routes, currentPath, breadList) {
    //   breadList = breadList || [];
    //   breadList = [...breadList];
    //   for (let i = routes.length - 1; i >= 0; i--) {
    //     if (routes[i].path === currentPath) {
    //       // console.log(routes[i]);
    //       if (routes[i].meta && routes[i].meta.info)
    //         breadList.push({ path: routes[i].path, info: routes[i].meta.info });
    //       // console.log(breadList);
    //       return breadList;
    //     } else {
    //       if (routes[i].children != undefined) {
    //         const index = routes[i].children.filter((item) => item.path === currentPath);
    //         // console.log(index);
    //         if (index.meta && index.meta.info) {
    //           breadList.push({ path: index.path, info: index.meta.info });
    //           // console.log(breadList);
    //           return breadList;
    //         }
    //       }

    //       // if (routes[i].children != undefined && currentPath.indexOf(routes[i].children.path) === 0) {
    //       //   breadList.push({ path: routes[i].path, info: routes[i].meta.info });
    //       //   return this.breadListSearch(routes[i].children, currentPath, breadList);
    //       // }
    //     }
    //   }
    // },
  },
  // removeTab(target) {
  //   // 删除的是当前选中的页面
  //   if (this.activeIndex === target) {
  //     this.openTab.forEach((item, index) => {
  //       if (item.name == target) {
  //         let nextTab = item[index + 1] || item[index - 1];
  //         if (nextTab) {
  //           this.activeIndex = nextTab.name;
  //         }
  //       }
  //     });
  //   }
  //   var i = 0;
  //   this.openTab.forEach((item, index) => {
  //     if (item.name == target) {
  //       return (i = index);
  //     }
  //   });
  //   this.openTab.splice(i, 1);

  //   // 更新路由
  //   this.$router.push({ path: this.openTab[this.openTab.length - 1].name });
  // },

  // clickTab(tab) {
  //   this.activeIndex = tab.paneName;
  //   this.$router.push({ path: this.activeIndex });
  // },
};
</script>
<style lang="scss" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.headerUser {
  width: 100vw;
  height: 3.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .bellIcon {
    height: 3.75rem;
    padding-right: 1rem;
    position: relative;
  }

  .el-dropdown-link {
    line-height: 3.75rem;
  }
}

.header-right {
  display: flex;

  .redPoint {
    width: 1rem;
    height: 1rem;
    background-color: red;
    border-radius: 50%;
    z-index: 1;
    position: absolute;
    margin-top: 0.6rem;
    margin-left: 0.6rem;
    font-size: 14px;
    color: aliceblue;
  }
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
