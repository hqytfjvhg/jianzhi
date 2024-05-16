<template>
  <div>
    <el-card>
      <el-tabs>
        <el-tab-pane label="发布文章" activeName="first">
          <el-form
            :model="form"
            v-if="isShowBinding"
            label-position="right"
            label-width="150px"
            style="max-width: 600px"
          >
            <el-form-item label="公众号名称"><el-input v-model="form.officialAccountName"></el-input></el-form-item>
            <el-form-item label="公众号二维码">
              <img
                :src="imgSrc[0]"
                alt=""
                width="120"
                height="120"
                v-if="imgSrc.length > 0"
                style="margin-right: 20px"
              />

              <el-upload
                v-if="imgSrc.length !== 1 && imgSrc.length !== 2"
                class="upload-demo"
                action="#"
                accept=".jpg,.png"
                :on-change="loadFile"
                :show-file-list="false"
                :auto-upload="false"
                style="margin-right: 20px"
              >
                <el-button type="primary">上传码1</el-button>
              </el-upload>

              <img :src="imgSrc[1]" alt="" width="120" height="120" v-if="imgSrc.length > 1" />

              <el-upload
                v-if="imgSrc.length !== 2"
                class="upload-demo"
                action="#"
                accept=".jpg,.png"
                :on-change="loadFile"
                :show-file-list="false"
                :auto-upload="false"
              >
                <el-button type="primary">上传码2</el-button>
              </el-upload>
            </el-form-item>

            <el-form-item label="操作"><el-button type="primary" @click="bindingVx">绑定</el-button></el-form-item>
          </el-form>
          <div v-else>
            <el-form label-width="200px" style="max-width: 600px" :model="bindingForm"
              ><el-form-item label="公众号名字">
                <div style="width: 100%; display: flex; justify-content: space-between">
                  <div v-if="!isEditVXName">{{ bindingForm.officialAccountName }}</div>
                  <div v-else><el-input v-model="bindingForm.officialAccountName"></el-input></div>
                  <div v-if="!isEditVXName" style="color: blue" @click="isEditVXName = true">修改</div>
                  <div v-else style="color: blue" @click="saveVXName">保存</div>
                </div> </el-form-item
              ><el-form-item label="公众号二维码">
                <div style="width: 100%; display: flex; justify-content: space-between">
                  <img :src="bindingForm.qrcode" alt="" style="height: 150px; width: 150px" />
                  <el-upload
                    class="upload-demo"
                    action="#"
                    accept=".jpg,.png"
                    :on-change="loadFile"
                    :show-file-list="false"
                    :auto-upload="false"
                  >
                    <div style="color: blue" @click="bangdingImg(imgOne)">修改</div>
                  </el-upload>
                  <img :src="bindingForm.qrcode2" alt="" style="height: 150px; width: 150px" />
                  <el-upload
                    class="upload-demo"
                    action="#"
                    accept=".jpg,.png"
                    :on-change="loadFile"
                    :show-file-list="false"
                    :auto-upload="false"
                  >
                    <div style="color: blue" @click="bangdingImg(imgTwo)">修改</div>
                  </el-upload>
                </div>
              </el-form-item>
              <el-form-item label="标题"> <el-input v-model="bindingForm.title"></el-input></el-form-item>
              <el-form-item label="文章定时发布时间">
                <el-date-picker
                  v-model="bindingForm.scheduledPublishTime"
                  type="datetime"
                  placeholder="请选择时间"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  :default-time="defaultTime"
                />
              </el-form-item>
              <el-form-item label="文章首个二维码下首个汉字">
                <el-input v-model="bindingForm.signCode1"></el-input
              ></el-form-item>
              <el-form-item label="文章最后一个汉字">
                <el-input v-model="bindingForm.signCode2"></el-input
              ></el-form-item>
              <el-form-item label="是否广告"
                ><el-radio-group v-model="isGuangGao">
                  <el-radio :label="1">新榜广告</el-radio>
                  <el-radio :label="0">正常文章</el-radio>
                </el-radio-group></el-form-item
              >
              <el-form-item label="操作"
                ><el-button @click="publishArticle" type="parimary">发布</el-button></el-form-item
              >
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已推送文章列表" activeName="second">
          <el-table :data="sevenCheckInData.records" :height="TableHeight" border>
            <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
            <el-table-column label="公众号名称" prop="officialAccountName" width="150px"></el-table-column>
            <el-table-column label="文章标题" prop="title"></el-table-column>
            <el-table-column label="发布时间" prop="publishTime" width="180px"></el-table-column>
            <el-table-column label="推送学习人数" prop="pushCount" width="120px" align="center"></el-table-column>
            <el-table-column label="状态" prop="">
              <template #default="scope"
                ><span v-if="scope.row.isDelete === 1" style="color: red">已删除</span
                ><span v-else style="color: green">正常</span></template
              >
            </el-table-column>
            <el-table-column label="学习人数" prop="punchTime" width="100" align="center"></el-table-column>
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
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  type="danger"
                  @click="deleteArticleByPush(scope.row)"
                  size="small"
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
            v-model:total="sevenCheckInData.total"
            v-model:current-page="sevenCurrent"
            v-model:page-size="pageSize"
            @current-change="changeSevenCurrentPage"
            style="margin-top: 10px"
          />
        </el-tab-pane>
        <el-tab-pane label="待推送文章列表" activeName="third">
          <el-table :data="noPushArticleInfo.records" :height="TableHeight" border>
            <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
            <el-table-column label="公众号名称" prop="officialAccountName" width="150px"></el-table-column>
            <el-table-column label="文章标题" prop="title"></el-table-column>
            <el-table-column label="发布时间" prop="publicTime" width="180px"></el-table-column>
            <el-table-column label="学习码1" prop="signCode1" width="100px" align="center">
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
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button type="danger" size="small" @click="deleteSevenArticle(scope.row)">删除</el-button>
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
            @current-change="changeSevenCurrentPage"
            style="margin-top: 10px"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { ElMessageBox, ElMessage } from "element-plus";
import {
  publishArticle,
  changeVXName,
  saveImg,
  getBangDing,
  bindingVx,
  sevenClock,
  deleteArticle,
  sevenNoPushArticle,
  saveSignCode,
  deleteArticleByPush,
} from "@/api/read/index";
import store from "@/store";
import { saveSignCodeByPush } from "@/api/root/index";

export default {
  data() {
    return {
      activeName: "first",
      checkInData: [], //用户打卡情况
      form: { officialAccountName: "", imgUrl: "" },
      bindingForm: {
        officialAccountName: "",
        qrcode: "",
        qrcode2: "",
        scheduledPublishTime: "",
        signCode1: "",
        signCode2: "",
        title: "",
      },
      isGuangGao: null,
      isShowBinding: false, //判断当前登录人是否是宣传员且有无绑定
      isEditVXName: false, //修改公众号名称
      isUpdataImg: false, //修改公众号二维码
      imgSrc: [], //图片数据

      current: 1,
      pageSize: 50,
      defaultTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 0, 0, 0),
      TableHeight: "",
      sevenCurrent: 1, //宣传员绑定的页码
      sevenCheckInData: {}, //宣传员打卡情况
      noPushArticleInfo: {}, //宣传员未发布文章
      isEditSignCode: false, //判断是否编辑学习码
      selectedRowIndex: null, //编辑的当前行
      imgOne: 1,
      imgTwo: 2, //修改公众号二维码标识
      imgIndex: null,
      selectedRowIndexByPush: null, //已发布的编辑当前行
      isEditSignCodeByPush: false, //已发布的编辑是否打开
    };
  },
  mounted() {
    this.bangdingVX(), this.selectSevenClock(), this.sevenNoPushArticle();
  },
  created() {
    //动态计算表格高度
    let windowHeight = document.documentElement.clientHeight || document.bodyclientHeight;
    this.TableHeight = windowHeight - 250; //数值"140"根据需要调整
  },
  methods: {
    //先获取当前登录人有无宣传员
    bangdingVX() {
      // console.log(Object.values(this.bindingForm))
      getBangDing().then((res) => {
        if (res.data.code == 200 && res.data.data !== null) {
          this.bindingForm.qrcode = res.data.data.qrcode;
          this.bindingForm.qrcode2 = res.data.data.qrcode2;
          this.bindingForm.officialAccountName = res.data.data.officialAccountName;
          this.isShowBinding = false;
          // console.log(this.bindingForm)
        } else if (res.data.code == 200 && res.data.data == null) {
          this.isShowBinding = true;
          // console.log(1111);
        }
      });
    },
    bindingVx() {
      if (this.imgSrc.length === 2) {
        bindingVx({
          id: store.state.userId,
          officialAccountName: this.form.officialAccountName,
          qrcode: this.imgSrc[0],
          qrcode2: this.imgSrc[1],
        }).then((res) => {
          if (res.data.code == 200) {
            ElMessage.success("绑定成功");
            this.bangdingVX();
          }
        });
      } else {
        ElMessage.error(`绑定公众号数量错误，当前绑定数量为${this.imgSrc.length}`);
      }
    },
    //保存微信名称
    saveVXName() {
      changeVXName({ id: store.state.userId, officialAccountName: this.bindingForm.officialAccountName });
      this.isEditVXName = false;
    },
    //发布文章
    publishArticle() {
      if (
        Object.values(this.bindingForm)
          .map((item) => item === "")
          .find((item) => item)
      ) {
        ElMessage.error("请输入发布的信息");
      } else if (this.isGuangGao === null) {
        // console.log(this.isGuangGao);
        ElMessage.error("请输入发布的信息");
      } else {
        this.bindingForm.isGuangGao = this.isGuangGao;
        publishArticle(this.bindingForm, this);
      }
    },
    bangdingImg(index) {
      console.log(index);
      if (index === 1) {
        this.imgIndex = true;
      } else {
        this.imgIndex = false;
      }
      // return false
    },
    //上传图片
    loadFile(file) {
      // console.log(file);
      ElMessageBox.confirm("确认上传？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var formData = new FormData();
        formData.append("uploadImage", file.raw, ".jpg");
        saveImg(formData).then((res) => {
          if (res.status == 200) {
            if (!this.isShowBinding) {
              if (this.imgIndex) {
                this.bindingForm.qrcode = res.data;
                changeVXName({ id: store.state.userId, qrcode: this.bindingForm.qrcode });
              } else {
                this.bindingForm.qrcode2 = res.data;
                changeVXName({ id: store.state.userId, qrcode2: this.bindingForm.qrcode2 });
              }
            } else {
              this.imgSrc.push(res.data);
              this.bindingForm.qrcode = this.imgSrc[0];
              this.bindingForm.qrcode2 = this.imgSrc[1];
            }
          }
        });
      });
    },
    //分页查询
    changeCurrentPage(newVal) {
      // console.log(newVal);
      (this.current = newVal), this.selectArticle();
    },
    //宣传员打卡情况
    selectSevenClock() {
      sevenClock({ current: this.sevenCurrent, pageSize: this.pageSize }).then((res) => {
        if (res.data.code == 200) {
          this.sevenCheckInData = res.data.data;
        }
      });
    },
    //宣传员分页
    changeSevenCurrentPage(newVal) {
      this.sevenCurrent = newVal;
      this.selectSevenClock();
    },
    //宣传员删除已发布文章
    deleteArticleByPush(row) {
      ElMessageBox.confirm("确定删除此文章？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteArticleByPush(row.id).then((res) => {
          if (res.data.code == 200) {
            ElMessage.success("删除成功");
            this.selectSevenClock();
          }
        });
      });
    },
    //宣传员删除文章
    deleteSevenArticle(row) {
      ElMessageBox.confirm("确定删除此文章？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteArticle(row.id).then((res) => {
          if (res.data.code == 200) {
            ElMessage.success("删除成功");
            this.sevenNoPushArticle();
          }
        });
      });
    },
    //宣传员未发布文章
    sevenNoPushArticle() {
      sevenNoPushArticle({ current: this.sevenCurrent, pageSize: this.pageSize }).then((res) => {
        if (res.data.code == 200) {
          this.noPushArticleInfo = res.data.data;
        }
      });
    },
    //修改未发布的学习码
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
<style></style>
