<template>
    <div class="box">
        <div class="head">
            <!-- 筛选区域 -->
        </div>
        <div class="top">
            <el-table class="table-content" ref="singleTableRef" :data="tableData" highlight-current-row
                style="width: 100%;">
                <el-table-column type="index" width="60" fixed="left" label="序号"/>
                <el-table-column property="delegateNumber" label="委托单编码" width="160" />
                <el-table-column property="repairNumber" label="检修项目编号" width="140" />
                <el-table-column property="repairName" label="检修项目名称"  show-overflow-tooltip/>
                <el-table-column property="repairContent" label="检修内容" show-overflow-tooltip/>
                <el-table-column property="repairTime" label="开工日期" width="120"/>
                <el-table-column property="finishTime" label="完工日期" width="120"/>
                <el-table-column property="repairReason" label="项目类型" />
                <el-table-column property="delegatePeople" label="委托人" />
                <!-- <el-table-column property="standardCode" label="点检编号" /> -->
                <!-- <el-table-column property="reasonType" label="原因类型" />
                <el-table-column property="treatmentMethod" label="处理方法" /> -->
                <!-- <el-table-column property="repairNumber" label="维修编号" /> -->
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
import { getRepairHistoryList } from '@/http/api.ts'

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
const getData = async()=>{
    const params = {
        currentPage:currentPage.value,
        pageSize:pageSize.value
    }
    let data = await getRepairHistoryList(params)     
    tableData.value = data.tableData
    totalCount.value = data.dataCount
}
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items:stretch;
    .head{
       height: 60px; 
    }
    .top {
        flex: 1;
        overflow: auto;
        .table-content {
            height: 100%;
        }
    }

    .bottom {
        height: 60px;
        display: flex;
        justify-content: center;
    }
}</style>
