<template>
  <div v-if="$store.state.userRole !== 0">
    <el-card>
      <div class="title">反诈学习</div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="每日学习" name="first">
          <div style="text-align: right; padding: 0 2rem 1rem 0">
            <el-button @click="selectArticle" type="primary" size="small">刷新</el-button>
          </div>

          <el-table :data="readProject.records" :height="TableHeight" border>
            <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
            <el-table-column label="公众号名字" prop="officialAccountName"></el-table-column>
            <el-table-column label="文章截止时间" prop="articleDeadlineTime"> </el-table-column>
            <el-table-column label="需学习文章标题" prop="title"></el-table-column>
            <el-table-column label="状态"
              ><template #default="scope"
                ><span v-if="scope.row.readStatusFlag" style="color: green">可读</span
                ><span v-else style="color: red">阅读时间：{{ scope.row.waitTime }}</span></template
              >
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" type="primary" @click="signInDialog(scope.row)" v-if="scope.row.readStatusFlag"
                  >学习</el-button
                ></template
              ></el-table-column
            >
          </el-table>
          <el-pagination
            small
            background
            layout="prev, pager, next"
            v-model:total="readProject.total"
            v-model:current-page="current"
            v-model:page-size="pageSize"
            @current-change="changeCurrentPage"
            style="margin-top: 10px"
          />
        </el-tab-pane>
        <el-tab-pane label="学习情况" name="second">
          <el-table :data="checkInData" :height="TableHeight" border>
            <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
            <el-table-column label="昨天推送文章数" prop="pushYesterday" align="center"></el-table-column>
            <el-table-column label="昨天学习数" prop="punchYesterday" align="center"> </el-table-column>
            <el-table-column label="今天推送文章数" prop="pushToday" align="center"></el-table-column>
            <el-table-column label="今天学习数" prop="punchToday" align="center"> </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog v-model="isOpenSignIn" :title="articleRowData.officialAccountName">
      <div style="text-align: left; font-size: 15px; font-weight: 600">
        <div style="height: 250px; text-align: center">
          <div style="margin-bottom: 10px">公众号二维码</div>
          <img style="width: 250px; height: 200px" :src="rowData.qrcode" alt="" />
        </div>
        <div style="height: 50px">文章标题：《{{ rowData.title }}》</div>
        <div style="height: 50px" v-if="rowData.readModeFlag == 1">本文末是否点赞：否</div>
        <div style="height: 50px" v-else>本文末是否点赞：<span style="color: red">希望您文章结尾点个赞</span></div>
        <div style="height: 50px" v-if="rowData.signCodeFlag == 1">学习码：文章首个二维码下的首个汉字</div>
        <div style="height: 50px" v-if="rowData.signCodeFlag == 2">学习码：文章最后一个汉字</div>
        <div style="display: flex; height: 50px">
          本文学习码：<el-input v-model="signInCode" style="width: 250px; height: 30px"></el-input>
        </div>
      </div>
      <el-button @click="signIn" type="primary">学习</el-button>
    </el-dialog>
    <el-dialog v-model="isCheckReading" title="反作弊巡查" :show-close="false" :close-on-click-modal="false">
      <img :src="imgUrl" alt="" width="200" height="200" />
      <div style="font-size: 17px; margin-top: 20px; font-weight: 700">
        请在 <span style="color: red; font-size: 20px"> {{ confirmButtonTextRef }} </span> 秒内扫码，超时则当天无法学习
      </div>
    </el-dialog>

    <el-dialog title="通知" v-model="isShowInfo">
      <div style="text-align: left; color: red">
        <span style="font-size: 17px; font-weight: 700">【通知一】</span> <br />
        <span>
          知识点方案更新<br />00:00-00:18学习7知识点 <br />
          00:18-09:20学习6知识点<br />
          09:20-23:59学习5知识点<br />
          会员在此基础上多3知识点
        </span>
      </div>
      <div><el-button @click="isShowInfo = false" type="primary">确定</el-button></div>
    </el-dialog>
    <!-- <globalInfo></globalInfo> -->
  </div>
</template>

<script>
import { ElMessageBox, ElMessage } from "element-plus";
import store from "@/store";
import { selectArticle, getSignInfo, signInArticle, userClock, checkReadings, passReadings } from "@/api/read/index";
// import globalInfo from "@/components/info/globalInfo.vue";
export default {
  // components: { globalInfo },
  data() {
    return {
      activeName: "first",
      isOpenSignIn: false,
      signInCode: "", //学习码
      readProject: [],
      rowData: {}, //当前学习文章的信息
      articleRowData: {}, //当前行文章的信息，拿学习码
      // checkInData: [],//用户打卡情况
      totalIntegral: 90, //总积分
      form: { officialAccountName: "", imgUrl: "" },
      isGuangGao: null,
      current: 1,
      pageSize: 50,
      // isShowSomeInfo: true,//一进来显示的通知
      isTestPass: false, //阅读量检测
      isCheckReading: false, //阅读量弹窗
      countTime: false, //判断10秒后自动请求
      confirmButtonTextRef: "15",
      imgUrl: "", //检测阅读量的二维码
      isShowInfo: true, //通知显示
    };
  },
  mounted() {
    this.selectArticle(), this.selectUserClock();
  },
  created() {
    //动态计算表格高度
    let windowHeight = document.documentElement.clientHeight || document.bodyclientHeight;
    this.TableHeight = windowHeight - 250; //数值"140"根据需要调整
  },
  methods: {
    //文章列表
    selectArticle() {
      const data = {
        current: this.current,
        pageSize: this.pageSize,
      };
      selectArticle(data).then((res) => {
        if (res.data.code == 200) {
          this.readProject = res.data.data;
          this.readProject.records.map((item) => {
            item.articleDeadlineTime = item.articleDeadlineTime.replace("T", " ");

            item.articleDeadlineTime = item.articleDeadlineTime.split(".")[0];
          });
          // console.log(this.readProject);
        }
      });
    },
    async signInDialog(row) {
      this.articleRowData = row;
      // console.log(row);
      this.selectArticle();
      // console.log(JSON.parse(store.state.userInfo));
      if (JSON.parse(store.state.userInfo).phoneNum == "" || JSON.parse(store.state.userInfo).phoneNum == "123") {
        ElMessage.error("请先在【个人中心】填写微信昵称");
      } else {
        checkReadings().then((res) => {
          if (res.data.code === 200) {
            // console.log(res.data.data, 111);
            if (res.data.data.flag) {
              this.isCheckReading = true;
              this.imgUrl = res.data.data.qrCodeUrl;
              let count = 14;
              let countTime = true;
              const data = {
                userID: store.state.userId,
                articleId: res.data.data.detectionArticleId,
                prevReadCount: res.data.data.countread,
              };
              if (countTime) {
                const timer = setInterval(() => {
                  if (count === 0) {
                    clearInterval(timer);
                    // this.confirmButtonTextRef = ;
                    console.log(res.data.data.detectionArticleId);
                    setTimeout(() => {
                      //检测阅读量是否通过
                      passReadings(data).then((res) => {
                        if (res.data.code == 200 && res.data.data) {
                          ElMessage.success("检测成功，请继续学习");
                          //检测成功就打开签到面板
                          // this.articleRowData = row
                          this.isCheckReading = false;
                          this.isOpenSignIn = true;
                          checkReadings(row.id).then((res) => {
                            if (res.data.code == 200) {
                              this.rowData = res.data.data;
                            }
                          });
                        } else if (!res.data.data) {
                          this.isCheckReading = false;
                          ElMessage.error("检测失败，请明天再来");
                          this.selectArticle();
                        }
                      });
                    }, 1000);
                  } else {
                    this.confirmButtonTextRef = `${count--}`;
                  }
                }, 1000);
              }
            } else {
              getSignInfo(row.id).then((res) => {
                if (res.data.code == 200) {
                  this.isOpenSignIn = true;
                  this.rowData = res.data.data;
                  // console.log(this.rowData);
                } else if (res.data.code == 6011) {
                  ElMessageBox.alert(res.data.message, "警告", {
                    confirmButtonText: "确定",
                    type: "warning",
                    callback: () => {
                      this.selectArticle();
                    },
                  });
                }
              });
            }
          }
        });
      }
    },
    async startTimer(count) {
      if (!this.countTime) {
        const timer = setInterval(() => {
          if (count === 0) {
            clearInterval(timer);
            this.confirmButtonTextRef = "时间到";
          } else {
            this.confirmButtonTextRef = `${count--}秒后确定`;
          }

          console.log(count);
          if (count === 0) {
            this.countTime = true;
            console.log(this.countTime);
          }
        }, 1000);
      }
    },
    //学习
    signIn() {
      signInArticle({
        id: this.rowData.id,
        signCodeFlag: this.rowData.signCodeFlag,
        signCode: this.signInCode,
        userId: this.$store.state.userId,
        readModeFlag: this.rowData.readModeFlag,
        qrcode: this.rowData.qrcode,
      }).then((res) => {
        if (res.data.code == 200) {
          this.signInCode = "";
          this.isOpenSignIn = false;
          this.selectArticle();
          // this.selectUserClock()
          ElMessageBox.alert("学习成功，本条文章任务将消失", "提示", {
            confirmButtonText: "确认",
          });
        }
      });
    },

    //用户打卡情况
    selectUserClock() {
      userClock().then((res) => {
        if (res.data.code == 200) {
          this.checkInData = [res.data.data];
          console.log(this.checkInData);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: left;
  padding: 0 20px 20px 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
}
</style>
