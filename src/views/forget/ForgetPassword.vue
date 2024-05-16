<template>
  <div class="login-body">
    <div class="login-container">
      <div class="img"></div>
      <div class="login-box">
        <div class="login-form">
          <div class="login-logo">
            <img src="../../assets/logo.jpg" width="50" style="border-radius: 50%" />
          </div>
          <div>
            <h2>学习强国</h2>
          </div>
          <el-form class="formStyle">
            <el-form-item>
              <el-input
                v-model="wechatNo"
                placeholder="请输入微信号"
                clearable
                :prefix-icon="User"
                style="height: 40px"
              >
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <User />
                  </el-icon> </template
              ></el-input>
              <el-button style="margin-left: 4px" @click="selectProblem">查找密保问题</el-button>
            </el-form-item>
            <el-form-item v-if="securityProblem !== ''">
              <span>密保问题:{{ securityProblem }}</span>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="problemPassword"
                placeholder="请输入密保答案"
                clearable
                :prefix-icon="Lock"
                style="height: 40px"
              >
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <Lock /> </el-icon
                ></template>
              </el-input>
              <el-button style="margin-left: 4px" @click="loginSubmit">验证</el-button>
            </el-form-item>

            <el-form-item v-if="security">
              <el-input
                v-model="userPassword"
                placeholder="请输入新密码"
                clearable
                :prefix-icon="Lock"
                style="height: 40px; width: 100%"
              >
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <Lock /> </el-icon
                ></template>
              </el-input>
            </el-form-item>
            <el-form-item v-if="security">
              <el-input
                v-model="sureUserPassword"
                placeholder="请再次输入新密码"
                clearable
                :prefix-icon="Lock"
                style="height: 40px; width: 100%"
              >
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <Lock /> </el-icon
                ></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <div style="width: 100%; text-align: right">
                <router-link to="login">记得密码？</router-link>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changeUserPassword" style="width: 100%">修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="footer">
      <a style="text-decoration: none; color: black" href=" https://beian.miit.gov.cn/" target="_blank">
        粤ICP备2023148717号</a
      >
    </div>
  </div>
</template>
<script>
import { selectProblem, submitProblemPassword, changeNewPassword } from "@/api/forget/index";
import { User, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

export default {
  components: { User, Lock },
  data() {
    return {
      wechatNo: "",
      securityProblem: "",
      problemPassword: "",
      security: false, //判断密保答案是否正确来来修密码
      // surePassword: "",//确认密码
      sureUserPassword: "",
      userPassword: "", //新密码
      // isLoading: false,
    };
  },
  methods: {
    //查找问题
    selectProblem() {
      selectProblem(this.wechatNo)
        .then((res) => {
          //  console.log(res);
          if (res.data.code == 200) {
            this.securityProblem = res.data.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //验证
    loginSubmit() {
      const data = { wechatNo: this.wechatNo, problemPassword: this.problemPassword };
      submitProblemPassword(data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data == true) {
            this.security = res.data.data;
            ElMessage.success("验证成功");
          } else if (res.data.data == false) {
            ElMessage.error("验证错误");
          }

          // ElMessage.success("登录成功")
          // this.$router.replace({ name: "homeView" })
        }
      });
    },
    changeUserPassword() {
      if (this.userPassword != this.sureUserPassword) {
        ElMessage.error("两次密码输入不匹配，请修改。");
      } else {
        changeNewPassword({ wechatNo: this.wechatNo, newPassword: this.userPassword }).then((res) => {
          if (res.data.code == 200) {
            ElMessage.success("修改成功");
            this.$router.replace({ name: "login" });
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login-body {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  position: relative;
}

.footer {
  width: 100%;
  position: absolute;
  bottom: 5%;
  z-index: 10;
}

.login-container {
  gap: 18rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100vh;
  // padding: 0px 2rem;
  background-image: url("@/assets/background.jpg");
  background-size: cover;
  width: 100vw;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.login-box {
  display: flex;
  align-items: center;
  text-align: center;
  padding-right: 2rem;

  // flex-direction: column;
  // position: relative;
  // top: 30%;
  // left: 33%;
  .login-form {
    width: 360px;
  }

  .login-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    // text-align: right;
    margin: 0.7rem 0;
  }

  h2 {
    color: rgb(153, 153, 153);
    margin: 15px 0;
  }
}

// .el-button {
//     width: 15rem;
//     margin: 0.7rem 0;
// }

.el-input {
  width: 15rem;
  margin: 0.7rem 0;
}

.registerLink {
  color: inherit;
  text-decoration: none;
}

.registerLink:hover {
  color: blue;
}

.el-form-item {
  display: flex;
  justify-content: space-between;
}

.el-form-item__content {
  display: flex;
  justify-content: space-between;
}
</style>
