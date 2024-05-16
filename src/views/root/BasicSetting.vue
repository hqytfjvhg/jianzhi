<template>
  <div v-if="Number($store.state.userRole) == 0">
    <div class="formStyle">
      <div class="title">基础信息配置</div>
      <el-form :data="form" label-width="200px">
        <el-form-item label="积分设置：" class="pointStyle">
          <div>
            <el-input v-model="form.xtime" style="width: 60px">
            </el-input>分钟前积分：
            <el-input v-model="form.rewardPoints1" style="width:50px">
            </el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <el-input v-model="form.xtime" style="width: 60px"></el-input>分钟~
            <el-input v-model="form.ytime" style="width:60px">
            </el-input>分钟积分：
            <el-input v-model="form.rewardPoints2" style="width:50px">
            </el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <el-input v-model="form.ytime" style="width: 60px">
            </el-input>分钟后积分：
            <el-input v-model="form.rewardPoints3" style="width: 50px">
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="选择“是”广告推送区间重置："><el-input v-model="form.adPushPercentageMin" style="width: 50px">
          </el-input>
          % ~
          <el-input v-model="form.adPushPercentageMax" style="width: 50px"></el-input> %</el-form-item>
        <el-form-item label="选择“否”广告推送区间重置："><el-input v-model="form.nonAdPushPercentageMin"
            style="width: 50px"></el-input> % ~
          <el-input v-model="form.nonAdPushPercentageMax" style="width: 50px"></el-input> %</el-form-item>
        <el-form-item label="操作："><el-button type="primary" @click="updataBasicInfo">更新</el-button></el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getBasicInfo, updataBasicInfo } from "@/api/root/index"
import store from "@/store"
export default {
  data() {
    return {
      form: {},
    };
  },
  mounted() {
    this.getBasicInfo()
  },
  methods: {
    getBasicInfo() {
      getBasicInfo().then(res => {
        if (res.data.code == 200) {
          this.form = res.data.data
        }
      })
    },
    updataBasicInfo() {
      this.form.id = store.state.userId
      updataBasicInfo(this.form)
    }
  }
};
</script>

<style lang="scss" scoped>
.formStyle {
  background-color: #fff;
  padding: 20px 20px;
}

.title {
  text-align: left;
  padding: 0 20px 20px 20px;
  font-weight: 600;
}

// .pointStyle {
//   display: block;
// }
.el-form-item__content:first-child {
  display: block;
}
</style>
