<template>
  <div class="c-container">
    <div class="c-container-top"></div>
    <div class="c-container-center">
      <div @click="onToggle"><el-button>toggle按钮</el-button></div>
      <div v-if="show"><el-button>按钮</el-button></div>
    </div>
    <div class="c-container-bottom">
      <div class="c-pageTableContainer">
        <div class="c-pageTableContainer-table">
          <el-table :data="tableData" style="width: 100%" height="100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </div>
        <div class="c-pageTableContainer-page"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const show = ref(false)
const onToggle = ()=>{
  show.value = !show.value
}


</script>

<style lang="scss" scoped>
.c-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  &-top {
    height: 100px;
    background-color: lightblue;
  }
  &-center {
    background-color: lightcoral;
    flex-shrink: 0;
  }
  &-bottom {
    flex: 1;
    background-color: lightgray;
  }
}
.c-pageTableContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  &-table {
    flex: 1;
    background-color: lightseagreen;
    // 重点是这里：开始
    position: relative;

    ::v-deep(.el-table) {
      position: absolute;
      height: 100%;
    }

    // 重点是这里：结束
  }

  &-page {
    height: 60px;
    background-color: lightgray;
    flex-shrink: 0;
  }
}</style>
