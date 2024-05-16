<template>
    <div class="probject-sstyle">
        <div class="title">项目总览</div>
        <div class="title-otherInfo">
            <div class="otherText">
                <span>{{ userOtherInfo.totalUserCount }}</span>
                <div>总用户数</div>
            </div>
            <div class="otherText">
                <span>{{ userOtherInfo.pendingApprovalCount }}</span>
                <div>注册待审核人数</div>
            </div>
            <div class="otherText">
                <span>{{ userOtherInfo.disabledAccountCount }}</span>
                <div>禁用账号数</div>
            </div>
            <div class="otherText">
                <span>{{ userOtherInfo.approvedAndActiveCount }}</span>
                <div>注册通过未禁用用户数</div>
            </div>
        </div>
    </div>
</template>
<script>
import { selectUserOtherInfo } from "@/api/root/index"
export default {
    data() {
        return {
            userOtherInfo: {},//用户统计信息
        }
    },
    mounted() {
        this.selectUserOtherInfo()
    },
    methods: {
        selectUserOtherInfo() {
            selectUserOtherInfo().then(res => {
                if (res.data.code == 200) {
                    this.userOtherInfo = res.data.data
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.probject-sstyle {
    background-color: #fff;
    height: 100%;

}

.title {
    text-align: left;
    padding: 20px;
    font-weight: 700;
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