<template>
  <div class="page-style">
    <div class="button-style">
      <el-button type="success" size="small" @click="openAddInfo">新增通知</el-button>
    </div>
    <el-table :data="infoList" :height="tableHeight">
      <el-table-column label="序号"
        ><template #default="scope"> 通知{{ scope.$index + 1 }} </template>
      </el-table-column>
      <el-table-column label="内容" prop="context" width="150"></el-table-column>
      <el-table-column label="是否加粗"
        ><template #default="scope">{{ scope.row.isBold ? "是" : "否" }}</template>
      </el-table-column>
      <el-table-column label="是否红色">
        <template #default="scope">{{ scope.row.isRed ? "是" : "否" }}</template>
      </el-table-column>
      <el-table-column label="是否插入图片"
        ><template #default="scope">{{ scope.row.isPicture ? "是" : "否" }}</template></el-table-column
      >
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="danger" size="small" @click="deleteInfo(scope.row)">删除</el-button>
          <el-button type="primary" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isAddInfo" title="新增通知">
      <el-form :model="formData" label-width="auto">
        <el-form-item label="内容">
          <el-input v-model="formData.context" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="是否加粗">
          <el-radio-group v-model="formData.isBold">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否红色">
          <el-radio-group v-model="formData.isRed">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否插入图片">
          <el-radio-group v-model="formData.isPicture">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片" v-if="formData.isPicture == 'true'">
          <el-upload
            :auto-upload="false"
            action="#"
            :on-change="handleChange"
            list-type="picture-card"
            v-model:file-list="formData.imgFileList"
          >
            <el-button type="primary" size="small">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <div>
          <el-button type="primary" @click="ensurePush" v-if="!formData.id">确定并发布</el-button>
          <el-button type="warning" @click="editInfo" v-if="formData.id">保存修改</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { pushInfo, deleteInfo, editInfo, selectInfo } from "@/api/root/index";
import { ElMessageBox } from "element-plus";

export default {
  data() {
    return {
      infoList: [],
      tableHeight: null,
      isAddInfo: false, //判断是否新增通知
      formData: {
        context: "",
        isBold: "",
        isPicture: "",
        isRed: "",
        imgFileList: [],
      },
    };
  },
  created() {
    //动态计算表格高度
    let windowHeight = document.documentElement.clientHeight || document.bodyclientHeight;
    this.TableHeight = windowHeight - 80; //数值"140"根据需要调整
  },
  mounted() {
    this.selectInfoList();
  },
  methods: {
    //新增通知
    ensurePush() {
      pushInfo(this.formData);
    },
    //获取所有通知
    selectInfoList() {
      // this.infoList.push(
      //   {
      //     context: "hrdthsrthsrthsrthrththet",
      //     isBold: "true",
      //     isPicture: "false",
      //     isRed: "false",
      //     id: 1,
      //     // imgFileList: [],
      //   },
      //   {
      //     context: "符合i而覅euro给阿给人以温热与会人员人黑ihi一股一股诡异飞入龟儿贵阳故意",
      //     isBold: "false",
      //     isPicture: "false",
      //     isRed: "true",
      //     id: 2,
      //     // imgFileList: [],
      //   },
      // );
      selectInfo().then((res) => {
        if (res.data.code == 200) {
          this.infoList = res.data.data;
        }
      });
    },
    //打开新增的弹窗
    openAddInfo() {
      this.formData = {};
      this.isAddInfo = true;
    },
    //打开修改弹窗
    openEditDialog(row) {
      console.log(row);
      this.formData = row;
      this.isAddInfo = true;
      console.log(this.formData);
    },
    //修改通知
    editInfo() {
      editInfo(this.formData);
    },
    //删除通知
    deleteInfo(row) {
      ElMessageBox.confirm("是否确定删除此通知", "警告", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
      }).then(() => {
        deleteInfo(row.id);
      });
    },
    handleChange(file) {
      // console.log(file);
      // const img = URL.createObjectURL(file.raw);
      // console.log(img);
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      // console.log(reader);
      reader.onload = (ev) => {
        // console.log(ev.target.result);

        this.formData.imgFileList.find((item) => {
          if (item.name == file.name) {
            item.url = ev.target.result;
          }
        });
        // this.formData.imgFileList.push({ name: file.name, url: ev.target.result });
      };
      console.log(this.formData);
    },
    handleRemove(file, files) {
      console.log(file, files);
    },
  },
};
</script>

<style lang="scss" scoped>
.page-style {
  background-color: #fff;
  height: 100%;
  padding: 0 10px;
}
.button-style {
  text-align: right;
  padding: 10px 0;
}
:deep(.el-form-item__content) {
  text-align: left;
}
</style>
