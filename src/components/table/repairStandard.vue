<template>
    <div class="box">
        <div class="head">
            筛选区域
        </div>
        <div class="top">
            <el-table class="table-content" ref="singleTableRef" :data="tableData" highlight-current-row table-layout="auto"
                style="width: 100%;">
                <el-table-column type="index" width="50" fixed="left" />
                <el-table-column property="comName" label="设备名称" width="120" />
                <el-table-column property="repairItemName" label="项目名称" width="120" />
                <el-table-column property="totalCostTime" label="总工时(h)" />
                <el-table-column property="workTime" label="项目时间(h)" />
                <el-table-column property="fileName" label="参考文档" />
                <el-table-column property="author" label="编制人" />
                <el-table-column property="createTime" label="编制日期" />
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
import { getRepairStandardList } from '@/http/api.ts'

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
        pageSize: pageSize.value
    }
    let data = await getRepairStandardList(params)
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
