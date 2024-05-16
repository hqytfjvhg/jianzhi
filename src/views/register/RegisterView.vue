<template>
  <div class="register-body">
    <div class="register-container">
      <div class="img"></div>
      <div class="register-box">
        <div class="register-form">
          <div class="register-logo">
            <h3><img src="../../assets/logo.jpg" width="50" style="border-radius: 50%" />学习强国</h3>
          </div>

          <el-form class="formStyle" :model="form" label-position="right" label-width="120">
            <el-form-item label="本人姓名">
              <el-input v-model="form.name" placeholder="请输入本人姓名" clearable> </el-input>
            </el-form-item>

            <el-form-item label="微信号">
              <el-input v-model="form.wechatNo" placeholder="请输入用于学习文章的微信号" clearable> </el-input>
            </el-form-item>
            <el-form-item label="微信昵称">
              <el-input v-model="form.wechatName" placeholder="请输入用于学习文章的微信昵称" clearable> </el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="form.userPassword"
                type="password"
                placeholder="请设置本系统密码"
                show-password
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input
                v-model="surePassword"
                type="password"
                placeholder="请再次设置本系统密码"
                show-password
                clearable
              >
              </el-input>
            </el-form-item>

            <!-- <el-form-item label="支付宝实名姓名">
              <el-input v-model="form.alipayName" placeholder="请输入收款支付宝实名姓名" clearable> </el-input>
            </el-form-item>
            <el-form-item label="支付宝账号">
              <el-input v-model="form.alipayNum" placeholder="请输入收款支付宝账号" clearable> </el-input>
            </el-form-item> -->
            <el-form-item label="密保问题">
              <el-input v-model="form.securityProblem" placeholder="请设置密保问题" clearable> </el-input>
            </el-form-item>
            <el-form-item label="密保答案">
              <el-input v-model="form.problemPassword" placeholder="请设置密保答案" clearable> </el-input>
            </el-form-item>
            <el-form-item label="邀请码">
              <el-input v-model="inviteCode" placeholder="请输入邀请码" clearable> </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="registerSubmit">注册</el-button>
            </el-form-item>
            <el-form-item>
              <RouterLink to="login">已有账号？</RouterLink>
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
import { ElMessage } from "element-plus";
import { register } from "@/api/register/index";

export default {
  data() {
    return {
      surePassword: "",
      form: {
        wechatNo: "",
        wechatName: "",
        userPassword: "",
        name: "",

        // alipayName: "",
        // alipayNum: "",
        securityProblem: "",
        problemPassword: "",
      },
      inviteCode: "", //邀请码
    };
  },
  methods: {
    registerSubmit() {
      console.log(this.form);
      const reg = /^wxid/;
      console.log(reg.test(this.form.wechatNo));
      if (reg.test(this.form.wechatNo)) {
        ElMessage.error("请输入能搜索到微信账号的微信号，而非注册微信时系统默认的原始微信号。");
      } else if (this.form.userPassword != this.surePassword) {
        ElMessage.error("两次密码输入不匹配，请修改。");
      } else {
        //   console.log(Object.values(this.form));
        let errorNumber = 0;
        Object.values(this.form).find((item) => {
          if (item == "") {
            errorNumber++;
            console.log(item);
          }
        });
        if (errorNumber > 0) {
          ElMessage.error("请输入注册信息！");
        } else {
          //向后端请求
          console.log(this.form);
          (this.form.phoneNum = this.form.wechatName),
            (this.form.alipayName = "1111"),
            (this.form.alipayNum = "111"),
            (this.form.inviteCode = this.inviteCode);
          register(this.form, this);
          // this.$router.push({ name: "login" });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register-body {
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

.register-container {
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

.register-box {
  display: flex;
  align-items: center;
  text-align: center;
  padding-right: 2rem;

  .register-logo {
    text-align: right;
    padding-left: 100px;
  }

  h3 {
    display: flex;
    align-content: end;
    align-items: center;

    color: rgb(153, 153, 153);
    margin: 15px 0;
  }
}

.register-form {
  width: 360px;
}
</style>
