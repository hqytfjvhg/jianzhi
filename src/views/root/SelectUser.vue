<template>
  <div v-if="Number($store.state.userRole) == 0">
    <el-card>
      <div class="title">查看用户信息</div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="审批用户注册" name="first">
          <div style="text-align: right; padding: 0 2rem 1rem 0">
            <el-button type="primary" @click="agreeUser">批量审批同意</el-button>
            <el-button @click="getRegisterList" type="primary">刷新</el-button>
          </div>
          <el-table
            border
            :data="userRegisterList.records"
            :height="TableHeight"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="" type="selection" width="50" align="center"></el-table-column>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="本人姓名" prop="name"></el-table-column>
            <el-table-column label="微信号" prop="wechatNo"></el-table-column>
            <el-table-column label="微信昵称" prop="phoneNum" width="120"></el-table-column>

            <el-table-column label="邀请码" prop="userAvatar"></el-table-column>
            <el-table-column label="操作" width="300">
              <template #default="scope">
                <el-button
                  size="small"
                  type="success"
                  v-if="scope.row.reviewStatus == 0"
                  @click="oneUserAgree(scope.row)"
                  >同意</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  v-if="scope.row.reviewStatus == 0"
                  @click="oneUserDisagree(scope.row)"
                  >拒绝</el-button
                >
                <el-button size="small" type="warning" @click="givePropagandist(scope.row)">给宣传员权限</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            small
            background
            layout="total,prev, pager, next"
            v-model:total="userRegisterList.total"
            v-model:current-page="registerCurrent"
            v-model:page-size="pageSize"
            @current-change="changeRegister"
            style="margin-top: 10px"
          />
        </el-tab-pane>
        <el-tab-pane label="检测未通过用户" name="second">
          <el-table :data="detectNoPass" border :height="TableHeight">
            <el-table-column label="序号" type="index" width="150" align="center"></el-table-column>
            <el-table-column label="微信号" prop="wechatNo"></el-table-column>
            <el-table-column label="检测次数" prop="countNoPass" align="center"></el-table-column>
            <el-table-column label="检测时间" prop="updateTime"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="所有用户信息" name="third">
          <div class="selectUserInfoDiv">
            <el-form class="selectUserFormStyle">
              <el-form-item label="微信号" width="200px">
                <el-input v-model="selectUserInfo.wechatNo" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item label="微信昵称" width="200px">
                <el-input v-model="selectUserInfo.wechatName" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item label="姓名" width="200px">
                <el-input v-model="selectUserInfo.name" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-form>
            <div>
              <el-button size="small" @click="selectUserInfoMothod">查询</el-button
              ><el-button size="small" type="primary" @click="getUserList">刷新</el-button>
              <el-button @click="downAllUserInfo" size="small" type="warning">导出</el-button>
            </div>
          </div>
          <el-table border :data="userList1.records" :height="TableHeight">
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="本人姓名" prop="name"></el-table-column>
            <el-table-column label="微信号" prop="wechatNo"></el-table-column>
            <el-table-column label="微信昵称" prop="phoneNum" width="120"></el-table-column>
            <el-table-column label="积分" prop="points"></el-table-column>
            <el-table-column label="用户角色">
              <template #default="scope">
                <el-tag v-if="scope.row.userRole == 0">管理员</el-tag>
                <el-tag v-if="scope.row.userRole == 1">用户</el-tag>
                <el-tag v-if="scope.row.userRole == 2">宣传员</el-tag>
                <el-tag v-if="scope.row.userRole == 3">VIP</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="380">
              <template #default="scope">
                <el-button size="small" type="danger" v-if="scope.row.userRole !== 0" @click="deleteUser(scope.row)"
                  >删除</el-button
                >

                <el-button
                  size="small"
                  type="primary"
                  @click="forbidUser(scope.row)"
                  v-if="scope.row.reviewStatus === 1"
                  >禁止账号</el-button
                >
                <el-button
                  size="small"
                  type="warning"
                  @click="enableUser(scope.row)"
                  v-if="scope.row.reviewStatus === 2"
                  >启用账号</el-button
                >
                <el-button
                  size="small"
                  type="warning"
                  v-if="scope.row.userRole == 1"
                  @click="givePropagandist(scope.row)"
                  >给宣传员权限</el-button
                >
                <el-button size="small" type="success" v-if="scope.row.vip !== 1" @click="giveVIPPermission(scope.row)"
                  >给VIP权限</el-button
                >
                <el-button size="small" v-if="scope.row.vip === 1" @click="cancleVIPPermisstion(scope.row)"
                  >取消VIP权限</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            small
            background
            layout="total,prev, pager, next"
            v-model:total="userList1.total"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            @current-change="changeCurrentPage"
            style="margin-top: 10px"
          />
        </el-tab-pane>
        <el-tab-pane label="提现操作" name="fourth">
          <div style="text-align: right; padding: 0 2rem 1rem 0">
            <el-button type="primary" @click="exportWithdrawData">导出积分</el-button>
            <el-button type="primary" @click="downUserScoreAndClearScore">一键清空积分</el-button>
          </div>
          <el-table :data="userList.records" id="withdraw-table" border :height="TableHeight">
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="微信号" prop="wechatNo"></el-table-column>
            <el-table-column label="收款支付宝账号" prop="alipayNum"></el-table-column>
            <el-table-column label="收款支付宝姓名" prop="alipayName"></el-table-column>
            <el-table-column label="积分" prop="points"></el-table-column>
            <el-table-column label="金额">
              <template #default="scope"> {{ (scope.row.points / 100).toFixed(2) }}</template>
            </el-table-column>
          </el-table>
          <el-pagination
            small
            background
            layout="total, prev, pager, next"
            v-model:total="userList1.total"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            @current-change="changeCurrentPage"
            style="margin-top: 10px"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import {
  getUserList,
  deleteUser,
  agreeUser,
  getRegisterList,
  givePropagandist,
  giveVIPPermission,
  agreeMoreUser,
  selectUserList,
  detectNoPass,
  clearUserScore,
  getAllUser,
} from "@/api/root/index";
import { ElMessageBox } from "element-plus";

export default {
  data() {
    return {
      activeName: "first",
      userList: {}, //用户列表
      userList1: {}, //副本
      withdrawData: [], //提现的表格
      seletionUser: [], //同意审批的用户
      userRegisterList: [], //待审批的所有用户
      registerCurrent: 1, //注册审批的页码
      currentPage: 1, //当前页面,
      pageSize: 50,
      selectUserInfo: { wechatNo: "", name: "", wechatName: "" },
      TableHeight: "",
      isShowEnable: false,
      detectNoPass: [], //检测未通过的名单
    };
  },
  mounted() {
    this.getUserList();
    this.getRegisterList();
    this.detectNoPassUser();
  },
  created() {
    //动态计算表格高度
    let windowHeight = document.documentElement.clientHeight || document.bodyclientHeight;
    this.TableHeight = windowHeight - 350; //数值"140"根据需要调整
  },
  methods: {
    getUserList() {
      getUserList({ current: this.currentPage, pageSize: this.pageSize }).then((res) => {
        if (res.data.code == 200) {
          this.userList = res.data.data;
          this.userList1 = { ...this.userList };
          // console.log(this.userList1);
        }
      });
      // this.selectUserInfoMothod()
    },
    //筛选
    selectUserInfoMothod() {
      selectUserList({
        name: this.selectUserInfo.name,
        wechatNo: this.selectUserInfo.wechatNo,
        wechatName: this.selectUserInfo.wechatName,
      }).then((res) => {
        if (res.data.code == 200) {
          this.userList1.records = res.data.data;
          // console.log(this.userList1);
        }
      });
    },
    getRegisterList() {
      getRegisterList({ current: this.registerCurrent, pageSize: this.pageSize }).then((res) => {
        if (res.data.code == 200) {
          this.userRegisterList = res.data.data;
          // console.log(this.userRegisterList);
        }
      });
    },
    changeRegister(newVal) {
      console.log(newVal);
      (this.registerCurrent = newVal), this.getRegisterList({ current: this.registerCurrent, pageSize: this.pageSize });
    },
    changeCurrentPage(newVal) {
      console.log(newVal);
      (this.currentPage = newVal), this.getUserList({ current: this.currentPage, pageSize: this.pageSize });
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.seletionUser = val.map((item) => item.id);
      console.log(this.seletionUser);
    },
    //同意审批
    agreeUser() {
      agreeMoreUser(this.seletionUser);
    },
    //单个人同意
    async oneUserAgree(row) {
      await agreeUser({ id: row.id, wechatNo: row.wechatNo, reviewStatus: 1 }, this);
      this.getRegisterList();
    },
    //拒绝
    async oneUserDisagree(row) {
      await agreeUser({ id: row.id, wechatNo: row.wechatNo, reviewStatus: 2 }, this);
      this.getRegisterList();
    },
    //给宣传员权限
    givePropagandist(row) {
      console.log("表格内容", row);
      givePropagandist({ id: row.id, userRole: 2, reviewStatus: 1 }, this);
    },

    //给vip权限
    giveVIPPermission(row) {
      giveVIPPermission({ id: row.id, vip: 1 }, this);
    },
    //取消vip权限
    cancleVIPPermisstion(row) {
      giveVIPPermission({ id: row.id, vip: 0 }, this);
    },
    //禁止账号
    forbidUser(row) {
      // row.isShowEnable = true
      givePropagandist({ id: row.id, reviewStatus: 2 }, this);
    },
    //启用账号
    enableUser(row) {
      // row.isShowEnable = false
      givePropagandist({ id: row.id, reviewStatus: 1 }, this);
    },

    async deleteUser(row) {
      ElMessageBox.confirm("确定删除此用户？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(row, row.id);
        deleteUser({ id: row.id });
        this.userList1.records.map((item, index) => {
          if (item.id == row.id) {
            this.userList1.records.splice(index, 1);
          }
        });
      });
    },
    //导出所有用户信息
    downAllUserInfo() {
      getAllUser().then((res) => {
        if (res.data.code == 200) {
          const newArr = [];
          res.data.data.map((item, index) => {
            var obj = {};
            obj.index = index + 1;
            obj.name = item.name;
            obj.wechatNo = item.wechatNo;
            obj.phoneNum = item.phoneNum;
            obj.alipayName = item.alipayName;
            obj.alipayNum = item.alipayNum;
            obj.points = item.points;
            obj.money = (item.points / 100).toFixed(2);
            obj.userRole = item.userRole === 0 ? "管理员" : item.userRole === 1 ? "普通用户" : "宣传员";
            obj.securityProblem = item.securityProblem;
            obj.problemPassword = item.problemPassword;
            obj.createTime = item.createTime;
            obj.vip = item.vip === 0 ? "否" : "是";
            obj.vipExpiryDate = item.vipExpiryDate;
            newArr.push(obj);
          });

          // 创建工作簿
          const workbook = XLSX.utils.book_new();

          const worksheet = XLSX.utils.aoa_to_sheet([
            [
              "序号",
              "名字",
              "微信账号",
              "手机号",
              "支付宝账号",
              "支付宝名称",
              "积分",
              "金额",
              "角色",
              "密保问题",
              "密保答案",
              "创建时间",
              "是否是VIP",
              "VIP过期时间",
            ],
          ]);

          newArr.forEach((row, rowIndex) => {
            console.log(rowIndex);
            const sheetRow = [];
            // console.log(row);
            for (let i = 0; i < 14; i++) {
              sheetRow.push(String(Object.values(row)[i])); // 替换为实际属性名或处理空值
            }
            console.log(sheetRow);
            XLSX.utils.sheet_add_aoa(worksheet, [sheetRow], { origin: rowIndex + 1 });
          });

          if (!worksheet["!rows"] || !worksheet["!cols"]) {
            worksheet["!rows"] = [];
            worksheet["!cols"] = [];
          }
          const range = XLSX.utils.decode_range(worksheet["!ref"]);
          // console.log(range);
          for (var i = 0; i < 14; i++) {
            worksheet["!cols"][i] = { wch: 20 };
          }
          for (let i = range.s.r + 1; i < range.e.r + 1; i++) {
            worksheet["!rows"][0] = { hpx: 25 };
            worksheet["!rows"][i] = { hpx: 25 };
          }

          // 添加工作表到工作簿
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
          const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
            new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月用户信息.xlsx",
          );
        }
      });
    },
    //单纯导出
    exportWithdrawData() {
      getAllUser().then((res) => {
        if (res.data.code == 200) {
          this.down(res.data.data);
        }
      });
    },
    //导出并清空数据
    downUserScoreAndClearScore() {
      clearUserScore().then((res) => {
        if (res.data.code == 200) {
          this.down(res.data.data);
        }
      });
    },
    down(data) {
      const newArr = [];
      data.map((item, index) => {
        var obj = {};
        obj.index = index + 1;
        obj.name = item.name;
        obj.wechatNo = item.wechatNo;
        obj.phoneNum = item.phoneNum;
        obj.alipayName = item.alipayName;
        obj.alipayNum = item.alipayNum;
        obj.points = item.points;
        obj.money = (item.points / 100).toFixed(2);
        newArr.push(obj);
      });

      // 创建工作簿
      const workbook = XLSX.utils.book_new();

      const worksheet = XLSX.utils.aoa_to_sheet([
        ["序号", "名字", "微信账号", "手机号", "支付宝账号", "支付宝名称", "积分", "金额"],
      ]);

      console.log(newArr);
      // 遍历后端数据并写入工作表
      newArr.forEach((row, rowIndex) => {
        console.log(rowIndex);
        const sheetRow = [];
        // console.log(row);
        for (let i = 0; i < 8; i++) {
          sheetRow.push(String(Object.values(row)[i])); // 替换为实际属性名或处理空值
        }

        XLSX.utils.sheet_add_aoa(worksheet, [sheetRow], { origin: rowIndex + 1 });
      });

      if (!worksheet["!rows"] || !worksheet["!cols"]) {
        worksheet["!rows"] = [];
        worksheet["!cols"] = [];
      }
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      // console.log(range);
      for (var i = 0; i < 8; i++) {
        worksheet["!cols"][i] = { wch: 20 };
      }
      for (let i = range.s.r + 1; i < range.e.r + 1; i++) {
        worksheet["!rows"][0] = { hpx: 25 };
        worksheet["!rows"][i] = { hpx: 25 };
      }

      // 添加工作表到工作簿
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      // FileSaver.saveAs(new Blob([workbook], { type: "appliction/octet-stream" }), "用户积分文档.xlsx");

      // 将workbook对象转换为Blob对象，并设置MIME类型为application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      FileSaver.saveAs(
        new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
        new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月用户积分.xlsx",
      );
    },

    //检测未通过的名单
    detectNoPassUser() {
      detectNoPass().then((res) => {
        if (res.data.code == 200) {
          this.detectNoPass = res.data.data;
          this.detectNoPass.map((item) => {
            item.updateTime = item.updateTime.replace("T", " ");

            item.updateTime = item.updateTime.split(".")[0];
          });
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
}

.selectUserInfoDiv {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.selectUserFormStyle {
  display: flex;
}

.title-otherInfo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 15px;
  // border-bottom: 1px solid gray;

  .otherText {
    font-size: 14px;

    span {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
