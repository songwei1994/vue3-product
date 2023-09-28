<template>
    <div class="box">
        <div class="head">
            <!-- 筛选区域 -->
        </div>
        <div class="top">
            <el-table class="table-content" ref="singleTableRef" :data="tableData" highlight-current-row
                style="width: 100%;">
                <el-table-column type="index" width="50" fixed="left" />
                <el-table-column property="standardCode" label="产线" width="120" />
                <el-table-column property="deviceName" label="设备" width="120" />
                <el-table-column property="compName" label="部件" />
                <el-table-column property="faultName" label="故障名称" />
                <el-table-column property="productionAffection" label="生产影响" />
                <el-table-column property="happenTime" label="发生日期" />
                <el-table-column property="startTime" label="开始时间" />
                <el-table-column property="endTime" label="结束时间" />
                <el-table-column property="reasonDescription" label="原因描述" />
                <el-table-column property="reasonType" label="原因类型" />
                <el-table-column property="treatmentMethod" label="处理方法" />
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
import { getFaultHistoryList } from '@/http/api.ts'

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
    let data = await getFaultHistoryList(params)     
    tableData.value = data.tableData
    totalCount.value = data.dataCount
}
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    position: absolute;
    .head{
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
}</style>
