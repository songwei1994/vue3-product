<template>
    <div class="box">
        <div class="head">
            筛选区域
        </div>
        <div class="top">
            <el-table class="table-content" ref="singleTableRef" :data="tableData" highlight-current-row table-layout="auto"
                style="width: 100%;">
                <el-table-column type="index" width="50" fixed="left" />
                <el-table-column property="standardCode" label="点检标准编号" width="120" />
                <el-table-column property="inspectionItemName" label="点检项目名称" width="120" />
                <el-table-column property="inspectionStandardType" label="标准类别" />
                <el-table-column property="secureListing" label="安全挂牌" />
                <el-table-column property="implementationType" label="实施方" />
                <el-table-column property="implementationCycle" label="实施周期" />
                <el-table-column property="revisedCode" label="修订人岗号" />
                <el-table-column property="revisedName" label="修订人姓名" />
                <el-table-column property="revisedDate" label="修订日期" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small">查看</el-button>
                        <el-button size="small" type="danger">修改</el-button>
                        <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="bottom">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 15, 20]" :page-size="pageSize" background layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getPointStandardList } from '@/http/api.ts'

//分页
const totalCount = ref(4);
const currentPage = ref(1);
const pageSize = ref(10);


const handleSizeChange = (val: number) => {
    pageSize.value = val
    currentPage.value = 1
    getData()
}
const handleCurrentChange = (val: number) => {
    currentPage.value = val
    getData()
}
const tableData = ref()
onMounted(() => {
    getData()
})
const getData = async () => {
    const params = {
        currentPage: currentPage.value,
        pageSiz: pageSize.value
    }
    let data = await getPointStandardList(params)
    tableData.value = data.tableData
    totalCount.value = data.dataCount
}
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    position: absolute;

    .head {
        height: 60px;
    }

    .top {
        width: 100%;
        height: calc(100% - 120px);

        .table-content {
            height: 100%;
        }
    }

    .bottom {
        height: 60px;
        display: flex;
        justify-content: center;
    }
}
</style>
