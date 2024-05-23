<template>
  <div v-if="Number($store.state.userRole) == 0">
    <div class="articleStyle">
      <div class="title">查看文章信息</div>
      <el-tabs>
        <el-tab-pane label="已推送文章列表" activeName="first">
          <div class="selectArticleInfoDiv">
            <el-form class="selectArticleFormStyle">
              <el-form-item label="公众号名称" width="200px">
                <el-input v-model="selectArticlrInfo.officialAccountName" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item label="文章标题" width="200px">
                <el-input v-model="selectArticlrInfo.title" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-form>
            <div>
              <el-button size="small" @click="selectArticleInfoMothod">查询</el-button
              ><el-button size="small" type="primary" @click="getArticleList">刷新</el-button>
            </div>
          </div>
          <el-table :data="articleList1.records" border :height="TableHeight">
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="公众号名称" prop="officialAccountName"></el-table-column>
            <el-table-column label="公众号二维码">
              <template #default="scope"> <img :src="scope.row.qrcode" alt="未找到" width="50" height="50" /></template>
            </el-table-column>
            <el-table-column label="文章标题" prop="title"></el-table-column>

            <el-table-column label="文章发布时间" prop="scheduledPublishTime" width="180px"> </el-table-column>
            <el-table-column label="是否广告" prop="isGuangGao">
              <template #default="scope">
                <el-tag v-if="scope.row.isGuangGao == 0" type="danger">否</el-tag>
                <el-tag v-if="scope.row.isGuangGao == 1" type="primary">是</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="推送次数" prop="pushCount"></el-table-column>
            <el-table-column label="打卡次数" prop="punchTime"></el-table-column>
            <el-table-column label="宣传员姓名" prop="createByName"></el-table-column>
            <el-table-column label="状态" prop="">
              <template #default="scope"
                ><span v-if="scope.row.isDelete === 1" style="color: red">已删除</span
                ><span v-else style="color: green">正常</span></template
              >
            </el-table-column>
            <el-table-column label="学习码1" prop="signCode1">
              <template #default="scope">
                <span v-if="scope.$index === selectedRowIndexByPush && isEditSignCodeByPush">
                  <el-input v-model="scope.row.signCode1"></el-input>
                </span>
                <span v-else> {{ scope.row.signCode1 }} </span>
              </template>
            </el-table-column>
            <el-table-column label="学习码2" prop="signCode2">
              <template #default="scope">
                <span v-if="scope.$index === selectedRowIndexByPush && isEditSignCodeByPush">
                  <el-input v-model="scope.row.signCode2"></el-input>
                </span>
                <span v-else> {{ scope.row.signCode2 }}</span>
              </template> </el-table-column
            ><el-table-column label="操作">
              <template #default="scope">
                <el-button
                  type="danger"
                  size="small"
                  @click="deleteArticleByPush(scope.row)"
                  v-if="scope.row.isDelete !== 1"
                  >删除</el-button
                >
                <el-button
                  v-if="scope.$index === selectedRowIndexByPush && isEditSignCodeByPush"
                  type="warning"
                  size="small"
                  @click="saveSignCodeByPush(scope.row)"
                  >保存</el-button
                >
                <el-button type="primary" size="small" v-else @click="editSignCodeByPush(scope.row, scope.$index)"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            small
            background
            layout="prev, pager, next"
            v-model:total="articleList1.total"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            style="margin-top: 10px"
            @current-change="changeCurrentPage"
          />
        </el-tab-pane>
        <el-tab-pane label="待推送文章列表" activeName="second">
          <el-table :data="noPushArticleInfo.records" height="60vh" border>
            <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
            <el-table-column label="公众号名称" prop="officialAccountName" width="150px"></el-table-column>
            <el-table-column label="文章标题" prop="title"></el-table-column>
            <el-table-column label="发布时间" prop="publicTime" width="180px"></el-table-column>
            <el-table-column label="学习码1" prop="signCode1" width="120px" align="center">
              <template #default="scope">
                <span v-if="scope.$index === selectedRowIndex && isEditSignCode">
                  <el-input v-model="scope.row.signCode1"></el-input>
                </span>
                <span v-else> {{ scope.row.signCode1 }} </span>
              </template>
            </el-table-column>
            <el-table-column label="学习码2" prop="signCode2" width="100" align="center">
              <template #default="scope">
                <span v-if="scope.$index === selectedRowIndex && isEditSignCode">
                  <el-input v-model="scope.row.signCode2"></el-input>
                </span>
                <span v-else> {{ scope.row.signCode2 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80" align="center">
              <template #default="scope">
                <el-button type="danger" size="small" @click="deleteArticle(scope.row)">删除</el-button>
                <el-button
                  v-if="scope.$index === selectedRowIndex && isEditSignCode"
                  type="warning"
                  size="small"
                  @click="saveSignCode(scope.row)"
                  >保存</el-button
                >
                <el-button type="primary" size="small" v-else @click="editSignCode(scope.row, scope.$index)"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            small
            background
            layout="prev, pager, next"
            v-model:total="noPushArticleInfo.total"
            v-model:current-page="sevenCurrent"
            v-model:page-size="pageSize"
            @current-change="changeNoPushCurrentPage"
            style="margin-top: 10px"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { articleList, noPushArticle, selectArticleList, saveSignCodeByPush } from "@/api/root/index";
import { deleteArticle, saveSignCode, deleteArticleByPush } from "@/api/read/index";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  data() {
    return {
      articleList: {},
      articleList1: {},
      currentPage: 1, //当前页面,
      sevenCurrent: 1,
      pageSize: 50,
      selectArticlrInfo: { officialAccountName: "", title: "" },
      TableHeight: "",
      noPushArticleInfo: {}, //未发布文章的信息
      isEditSignCode: false, //编辑
      selectedRowIndex: null, //编辑行当前的索引
      selectedRowIndexByPush: null, //已发布的编辑当前行
      isEditSignCodeByPush: false, //已发布的编辑是否打开
    };
  },
  mounted() {
    this.getArticleList();
    this.noPushArticle();
  },
  created() {
    //动态计算表格高度
    let windowHeight = document.documentElement.clientHeight || document.bodyclientHeight;
    this.TableHeight = windowHeight - 350; //数值"140"根据需要调整
  },
  methods: {
    getArticleList() {
      articleList({ currentPage: this.currentPage, pageSize: this.pageSize }).then((res) => {
        if (res.data.code == 200) {
          this.articleList = res.data.data;
          this.articleList.records.map((item) => {
            item.scheduledPublishTime = item.scheduledPublishTime.replace("T", " ");

            item.scheduledPublishTime = item.scheduledPublishTime.split(".")[0];
          });
          this.articleList.records.sort(
            (a, b) => new Date(b.scheduledPublishTime).getTime() - new Date(a.scheduledPublishTime).getTime(),
          );
          this.articleList1 = { ...this.articleList };
        }
      });
      // this.selectArticleInfoMothod()
    },
    //筛选
    selectArticleInfoMothod() {
      selectArticleList({
        officialAccountName: this.selectArticlrInfo.officialAccountName,
        title: this.selectArticlrInfo.title,
      }).then((res) => {
        if (res.data.code == 200) {
          this.articleList1.records = res.data.data;
          console.log(this.articleList1);
        }
      });
    },
    changeCurrentPage(newVal) {
      console.log(newVal);
      (this.currentPage = newVal), this.getArticleList({ currentPage: this.currentPage, pageSize: this.pageSize });
    },
    //删除已发布文章
    deleteArticleByPush(row) {
      ElMessageBox.confirm("确定删除此文章？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteArticleByPush(row.id).then((res) => {
          if (res.data.code == 200) {
            ElMessage.success("删除成功");
            this.getArticleList();
          }
        });
      });
    },
    //删除文章
    deleteArticle(row) {
      ElMessageBox.confirm("确认删除此文章？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteArticle(row.id).then((res) => {
          if (res.data.code == 200) {
            ElMessage.success("删除成功");
            this.noPushArticle();
          }
        });
      });
    },
    //未发布文章
    noPushArticle() {
      noPushArticle({ current: this.sevenCurrent, pageSize: this.pageSize }).then((res) => {
        if (res.data.code == 200) {
          this.noPushArticleInfo = res.data.data;
        }
      });
    },
    changeNoPushCurrentPage(newVal) {
      console.log(newVal);
      (this.currentPage = newVal), this.noPushArticle();
    },
    //修改学习码
    saveSignCode(row) {
      console.log(row);
      saveSignCode(row).then((res) => {
        if (res.data.code == 200) {
          ElMessage.success("修改成功");
          this.isEditSignCode = false;
        }
      });
    },
    //编辑开放
    editSignCode(row, index) {
      console.log(row, index);
      this.isEditSignCode = true; // 设置为编辑模式
      this.selectedRowIndex = index; // 记录被点击的行的索引
    },
    //修改已发布的学习码
    saveSignCodeByPush(row) {
      saveSignCodeByPush(row).then((res) => {
        if (res.data.code == 200) {
          ElMessage.success("修改成功");
          this.isEditSignCodeByPush = false;
        }
      });
    },
    //编辑开发
    editSignCodeByPush(row, index) {
      this.isEditSignCodeByPush = true; // 设置为编辑模式
      this.selectedRowIndexByPush = index; // 记录被点击的行的索引
    },
  },
};
</script>
<style scoped>
.articleStyle {
  background-color: #fff;
  padding: 20px 20px;
}

.title {
  text-align: left;
  padding: 0 20px 20px 20px;
  font-weight: 600;
}

.selectArticleInfoDiv {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.selectArticleFormStyle {
  display: flex;
}
</style>
