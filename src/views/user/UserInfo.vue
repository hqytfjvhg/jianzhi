<template>
  <div class="userInfo" v-if="$store.state.userRole !== 0">

    <el-card>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form label-position="right" :model="form" label-width="150px" style="max-width: 460px">
            <el-form-item label="本人姓名">
              <span v-if="isEdit">{{ form.name }} 
                <!-- <span><el-button  type="text" @click="open"><span :style="{ color: form.vip === 1 ? 'red' : '#808080' }"> VIP</span></el-button></span> -->
              </span> 
              <el-input v-else v-model="form.name" disabled clearable> </el-input>
            </el-form-item>
            <el-form-item label="微信号">
              <span v-if="isEdit">{{ form.wechatNo }}</span>
              <el-input v-else v-model="form.wechatNo" disabled></el-input>
            </el-form-item>
            <el-form-item label="微信昵称">
              <span v-if="isEdit">{{ form.phoneNum }}</span>
              <el-input v-else v-model="form.phoneNum"></el-input>
            </el-form-item>

            <el-form-item label="收款支付宝实名姓名">
              <span v-if="isEdit">{{ form.alipayName }}</span>
              <el-input v-else v-model="form.alipayName" clearable> </el-input>
            </el-form-item>
            <el-form-item label="收款支付宝账号">
              <span v-if="isEdit">{{ form.alipayNum }}</span>
              <el-input v-else v-model="form.alipayNum" clearable> </el-input>
            </el-form-item>
            <!-- <el-form-item style="color:red!important" label="vip">
              <span>{{ form.vip == 1? '是':'否' }}</span>
            </el-form-item> -->
            <!-- <el-form-item v-if="form.vip == 1" label="vip有效期">
              <span >{{ form.vipExpiryDate  }}</span>
            </el-form-item> -->
            <el-form-item>
              <el-button v-if="isEdit" @click="isEdit = false">修改</el-button>
              <el-button v-else @click="updataUserInfo">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="安全设置" name="second">
          <el-form label-width="150px">
            <el-form-item label="登录密码" v-if="isEditPassword">
              <div style="display: flex; justify-content: space-between; width: 30vw">
                <div>********</div>
                <div @click="isEditPassword = false" style="color: blue">修改</div>
              </div>
            </el-form-item>
            <el-form-item label="新密码" v-if="!isEditPassword">
              <el-input v-model="form.userPassword" clearable style="width: 30vw;"> </el-input>
            </el-form-item>
            <el-form-item label="密保问题">
              <div style="display: flex; justify-content: space-between; width: 30vw">
                <div>
                  <span v-if="isEditSecurityQuestion">{{ form.securityProblem }}</span>
                  <el-input v-else v-model="form.securityProblem" clearable style="width: 30vw;"> </el-input>
                </div>
                <div v-if="isEditSecurityQuestion" @click="isEditSecurityQuestion = false" style="color: blue">
                  修改
                </div>
              </div>
            </el-form-item>
            <el-form-item label="密保答案">
              <div style="display: flex; justify-content: space-between; width: 30vw">
                <div>
                  <span v-if="isEditSecurityAnswer">{{ form.problemPassword }}</span>
                  <el-input v-else v-model="form.problemPassword" clearable style="width: 30vw;"> </el-input>
                </div>
                <div v-if="isEditSecurityAnswer" @click="isEditSecurityAnswer = false" style="color: blue">修改</div>
              </div>
            </el-form-item>
            <el-form-item v-if="!isEditSecurityAnswer || !isEditSecurityQuestion || !isEditPassword"><el-button
                @click="updataUserInfo">保存</el-button></el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs></el-card>

  </div>
</template>

<script>
import store from "@/store/index"
import { changeUserInfo, getUserInfo } from "@/api/user/index"
export default {
  data() {
    return {
      activeName: "first",
      form: {},
      isEdit: true,
      isEditPassword: true,
      isEditSecurityQuestion: true,
      isEditSecurityAnswer: true,
      // surePassword: ""
    };
  },
  mounted() {
    if (this.$route.params.info == 'basicInfo') {
      this.activeName = 'first'
    } else {
      this.activeName = 'second'
    }
    this.getLoginUserInfo()
  },
  methods: {
    getLoginUserInfo() {
      getUserInfo().then(res => {
        if (res.data.code == 200) {
          this.form = res.data.data
        }
      })
    },
    //更新信息
    updataUserInfo() {
      console.log(this.form);
      this.form.id = store.state.userId
      changeUserInfo(this.form)
      store.commit("changeUserInfo", JSON.stringify(this.form))
      this.isEdit = true;
      this.isEditPassword = true;
      (this.isEditSecurityAnswer = true), (this.isEditSecurityQuestion = true);
    },
    open() {
        this.$alert('光启平台VIP，年费49元，有效期自充值起算 <br/><br/>VIP权益：每日学习篇数上限提高到55篇（非VIP上限30篇） <br/><br/>充值方式：企业支付宝<br/><br/>账号名称：梅州市字节悦动科技有限公司 <br/> <br/>账号：zijieyuedong@126.com <br/><br/>金额：49.00元 <br/><br/>备注：填写光启账号（即微信号）<br/> <br/>如有疑问请联系客服微信zj230907001', 'VIP', {
          dangerouslyUseHTMLString: true
        });
      }
  },

};
</script>

<style lang="scss" scoped></style>
