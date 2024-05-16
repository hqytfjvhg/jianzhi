<template>
  <div class="login-body">
    <div class="login-container">
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
                v-model="username"
                placeholder="请输入微信号"
                clearable
                :prefix-icon="User"
                style="height: 40px; width: 100%"
              >
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <User />
                  </el-icon> </template
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="password"
                type="password"
                placeholder="请输入本系统密码"
                show-password
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
              <div style="width: 100%; display: flex; justify-content: space-between">
                <div><el-checkbox v-model="isRemember" label="自动保存" /></div>
                <div>
                  <router-link to="forgetPassword">忘记密码</router-link>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loginSubmit" style="width: 100%">登录</el-button>
            </el-form-item>
            <el-fotm-item> <router-link to="register">注册</router-link></el-fotm-item>
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
import { ElButton, ElMessage } from "element-plus";
import { login } from "@/api/login/index";
import { User, Lock } from "@element-plus/icons-vue";

export default {
  components: { User, Lock },
  data() {
    return {
      username: "",
      password: "",
      isRemember: false,
      // isLoading: false,
    };
  },
  mounted() {
    const savedUsername = localStorage.getItem("wechatNo");
    const savedPassword = localStorage.getItem("password");
    console.log(savedUsername, savedPassword);
    if (savedPassword && savedUsername) {
      console.log(1);
      (this.username = savedUsername), (this.password = savedPassword), (this.isRemember = true);
    }
  },
  methods: {
    async loginSubmit() {
      if (this.username == "" || this.password == "") {
        ElMessage.error("账号/密码不能为空");
      } else {
        const LoginForm = {
          wechatNo: this.username,
          userPassword: this.password,
        };

        console.log(LoginForm);
        await login(LoginForm);
        // alert("如果遇到文章中没有二维码的，学习码“文章中首个二维码下的首个汉字”填文章最后一个汉字即可，和“文章最后一个汉字”是同一个字（同一个学习码")
        if (this.isRemember) {
          // 如果用户选择了“记住我”，则将账号和密码保存到localStorage中
          localStorage.setItem("wechatNo", this.username);
          localStorage.setItem("password", this.password);
        }
      }
    },
    // getUuid() {
    //   uuid();
    // },
    components: { ElButton },
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
  // background-image: url("@/assets/background.jpg");
  background-image: url("@/assets/login.gif");
  background-size: cover;
  // background-size: auto;
  // background-size: 100%;
  background-repeat: no-repeat;
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
  padding-left: 15%;

  // flex-direction: column;
  // position: relative;
  // top: 30%;
  // left: 33%;
  .login-form {
    width: 360px;
    // background-color: #fff;
    // background: rgb(255, 255, 255, 0.5);
    padding: 20px;
    // border-radius: 10px;
    background: rgba(255, 255, 255, 0.5);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-radius: 25px;
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
  }

  .login-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    // text-align: right;
    margin: 0.7rem 0;
  }

  h2 {
    // color: rgb(153, 153, 153);
    margin: 15px 0;
  }
}

.el-button {
  width: 15rem;
  margin: 0.7rem 0;
}

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
