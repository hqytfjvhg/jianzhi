<template>
    <div class="pageStyle">
        <div style="padding: 20px;text-align: left;font-weight: 700;">上传文章二维码</div>
        <el-form label-position="right" label-width="150px" style="max-width: 600px;">
            <el-form-item label="文章地址"><el-input v-model="articleURL"></el-input></el-form-item>
            <el-form-item label="
            文字二维码">
                <img :src="articleQRCode" alt="" width="200" height="200" v-if="articleQRCode != ''"
                    style="margin-right: 30px;">
                <el-upload class="upload-demo" action="#" accept=".jpg,.png" :on-change="loadFile" :show-file-list="false"
                    :auto-upload="false">
                    <el-button type="primary">上传图片</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="操作"><el-button type="primary" @click="bindingArticle">上传</el-button></el-form-item>
        </el-form>
    </div>
</template>
<script>
import { detectionArticle } from "@/api/root/index"
import { ElMessage, ElMessageBox } from "element-plus";
import { saveImg } from "@/api/read/index"
export default {
    data() {
        return {

            articleURL: "",//文章地址
            articleQRCode: "",//上传返回的文章地址
        }
    },
    methods: {
        //上传图片
        loadFile(file) {
            // console.log(file);
            // console.log(1111);
            ElMessageBox.confirm("确认上传？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                // this.imgSrc = URL.createObjectURL(file.raw);
                // const formData = { uploadImage: file.raw };
                var formData = new FormData();
                formData.append("uploadImage", file.raw, ".jpg")
                saveImg(formData).then(res => {
                    if (res.status == 200) {
                        ElMessage.success("上传成功")
                        this.articleQRCode = res.data
                        // console.log(res.data);
                    }
                })


            });
        },
        //绑定
        bindingArticle() {
            detectionArticle({ articleURL: this.articleURL, articleQRCode: this.articleQRCode }).then(res => {
                if (res.data.code == 200) {

                    ElMessage.success("上传成功")
                    this.articleURL = "",
                        this.articleQRCode = ""
                }
            })
            console.log(this.articleURL);
        },
    }
}
</script>
<style>
.pageStyle {
    background-color: #fff;
    height: 100%;
}
</style>