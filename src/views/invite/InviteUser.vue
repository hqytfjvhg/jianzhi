<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>我的邀请码：{{ inviteCode }}</span>
        </div>
      </template>
      <el-table :data="userFriend.records" border height="62vh">
        <el-table-column label="序号" width="80" type="index"></el-table-column>
        <el-table-column label="微信号" prop="wechatNo"></el-table-column>
        <el-table-column label="微信昵称" prop="name"> </el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="知识点余额" prop="points" align="center"></el-table-column>
      </el-table>
      <el-pagination
        small
        background
        layout="prev, pager, next"
        v-model:total="userFriend.total"
        v-model:current-page="current"
        v-model:page-size="pageSize"
        @current-change="changeCurrentPage"
        style="margin-top: 10px"
      />
    </el-card>
  </div>
</template>

<script>
import { getUserInviteCode } from "@/api/user/index";
import { selectUserFriend } from "@/api/invite/index";
export default {
  data() {
    return {
      userFriend: [], //好友列表
      current: 1,
      pageSize: 50,
      inviteCode: "", //邀请码
    };
  },
  mounted() {
    getUserInviteCode().then((res) => {
      if (res.data.code == 200) {
        this.inviteCode = res.data.data;
      }
    });
    this.selectUserFriend();
  },
  methods: {
    selectUserFriend() {
      selectUserFriend({ current: this.current, pageSize: this.pageSize }).then((res) => {
        if (res.data.code == 200) {
          this.userFriend = res.data.data;
        }
      });
    },
    changeCurrentPage(newVal) {
      this.current = newVal;
      this.selectUserFriend();
    },
    // copyInviteCode() {
    //     document.execCommand("Copy");
    // },
  },
};
</script>

<style lang="scss" scoped>
.card-header {
  text-align: left;
}
</style>
