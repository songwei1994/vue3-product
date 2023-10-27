<template>
    <div class="box">
        <div class="head">
            <!-- 筛选区域 -->
        </div>
        <div class="top">
            <el-table class="table-content" ref="singleTableRef" :data="tableData"  
                style="width: 100%;" fit>
                <el-table-column type="index" width="60"  fixed="left" label="序号"/>
                <!-- <el-table-column property="standardCode" label="产线" width="120" /> -->
                <el-table-column property="deviceName" label="设备" width="120" />
                <el-table-column property="compName" label="部件" width="100"/>
                <el-table-column property="faultName" label="故障名称" width="120" />
                <el-table-column property="productionAffection" label="生产影响" width="120"/>
                <el-table-column property="happenDate" label="发生日期" width="120"/>
                <el-table-column property="startTime" label="开始时间" width="120"/>
                <el-table-column property="endTime" label="结束时间" width="120"/>
                <el-table-column property="costTime" label="结束时间" width="120"/>
                <el-table-column property="reasonDescription" label="原因描述" width="150" show-overflow-tooltip/>
                <el-table-column property="reasonType" label="类型" width="100"/>
                <el-table-column property="treatmentMethod" label="处理方法"  show-overflow-tooltip/>
                <el-table-column property="faultContent" label="故障内容" show-overflow-tooltip/>
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
