<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>我的知识点：{{ scoresTotal }}</span>
        </div>
      </template>
      <el-table :data="scoresData.records" border height="62vh">
        <el-table-column label="序号" width="80" type="index"></el-table-column>
        <el-table-column label="活动" prop="action"></el-table-column>
        <el-table-column label="知识点变化" prop="point" align="center"> </el-table-column>
        <el-table-column label="变化后余额" prop="balance" align="center"></el-table-column>
        <el-table-column label="时间" prop="createTime"></el-table-column>
      </el-table>
      <el-pagination
        small
        background
        layout="prev, pager, next"
        v-model:total="scoresData.total"
        v-model:current-page="current"
        v-model:page-size="pageSize"
        @current-change="changeCurrentPage"
        style="margin-top: 10px"
      />
    </el-card>
  </div>
</template>

<script>
import { selectScores } from "@/api/scores/index";
import { getUserInfo } from "@/api/user/index";

export default {
  data() {
    return {
      current: 1,
      pageSize: 50,
      scoresData: [],
      scoresTotal: 0,
    };
  },
  mounted() {
    this.selectScores(), this.getLoginUserInfo();
  },
  methods: {
    selectScores() {
      selectScores({ userId: this.$store.state.userId, currentPage: this.current, pageSize: this.pageSize }).then(
        (res) => {
          if (res.data.code == 200) {
            //TODO
            res.data.data.records = res.data.data.records.map((item) => {
              item.createTime = item.createTime.replace("T", " ");
              item.createTime = item.createTime.split(".")[0];
              // console.log(item.createTime);
              return item;
            });
            res.data.data.records.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime());

            this.scoresData = res.data.data;
            // console.log(this.scoresData.records);
          }
        },
      );
    },
    changeCurrentPage(newVal) {
      this.current = newVal;
      this.selectScores();
    },
    getLoginUserInfo() {
      getUserInfo().then((res) => {
        if (res.data.code == 200) {
          this.scoresTotal = res.data.data.points;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-header {
  text-align: left;
}
</style>
