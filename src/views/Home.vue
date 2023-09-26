<template>
  <div class="content flex">
    <div class="left">
      <div class="tree">
        <el-input v-model="filterText" placeholder="请输入关键字" />
        <el-tree class="tree-box" ref="treeRef" :data="treeData" :props="defaultProps" :filter-node-method="filterNode"
          @node-click="handleNodeClick">
        </el-tree>
      </div>
      <div class="content">
        <el-switch v-model="isCollapse" active-text="展开" inactive-text="折叠" inline-prompt />
        <el-menu default-active="checkVue" :collapse="isCollapse" @open="handleOpen" @close="handleClose"
          active-text-color="#ffd04b" @select="selectItem">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <DataAnalysis />
              </el-icon>
              <span>动态履历</span>
            </template>
            <el-menu-item index="checkVue">点检</el-menu-item>
            <el-menu-item index="faultVue">故障</el-menu-item>
            <el-menu-item index="repairVue">维修</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Document />
              </el-icon>
              <span>静态履历</span>
            </template>
            <el-menu-item index="checkStandard">点检标准</el-menu-item>
            <el-menu-item index="repairStandard">维修标准</el-menu-item>
            <el-menu-item index="2-3">给油脂标准</el-menu-item>
            <el-menu-item index="2-4">技术标准</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </div>
    <div class="right relative">
      <div class="box-table m-1 absolute" style="width: 100%;">
        <component :is="compId"></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, shallowRef, markRaw, onMounted, watch } from 'vue'
import {
  DataAnalysis,
  Document
} from '@element-plus/icons-vue'
import { getDeviceTree } from '@/http/api.ts'
import checkVue from '@/components/table/checkVue.vue'
import faultVue from '@/components/table/faultVue.vue'
import repairVue from '@/components/table/repairVue.vue'
import checkStandardVue from '@/components/table/checkStandard.vue'
import repairStandardVue from '@/components/table/repairStandard.vue'

interface Tree {
  label: string
  children?: Tree[]
  key: string
  id: number
  value: string
  type: string
  title: string
}
const treeData = ref()
const filterText = ref('')
// const treeRef = ref<InstanceType<typeof ElTree>>()  使用这个el-tree样式失效
const treeRef = ref<any>()

onMounted(async () => {
  treeData.value = await getDeviceTree()
})
watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const isCollapse = ref(false)
// const activeCom = ref(0)
const compId = shallowRef(checkVue)
const compData = reactive([
  {
    name: 'checkVue',
    com: markRaw(checkVue)
  }, {
    name: 'faultVue',
    com: markRaw(faultVue)
  }, {
    name: 'repairVue',
    com: markRaw(repairVue)
  },
  {
    name: 'checkStandard',
    com: markRaw(checkStandardVue)
  }
  ,{
    name: 'repairStandard',
    com: markRaw(repairStandardVue)
  }
  //, {
  //   name: 'oilStaticVue',
  //   com: markRaw(oilStaticVue)
  // }, {
  //   name: 'techStaticVue',
  //   com: markRaw(techStaticVue)
  // },
])
//结构树过滤
const filterNode = (label: string, data: Tree) => {
  if (!label) return true
  if (data.title == undefined) return false
  else return data.title.indexOf(label) != -1
}
//点击结构树
const handleNodeClick = (node: Tree) => {
  console.log(node);
  // if(node.type == 'device') 判断当前点击组织类型，productline
}
const selectItem = (key: string) => {
  let map = compData.find(item => item.name == key)!.com
  compId.value = map
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

//树结构格式
const defaultProps = {
  children: 'children',
  label: 'title'
}
</script>

<style lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
}

.content {
  width: 100%;
  height: 100%;

  .left {
    // width: 350px;
    display: flex;
    height: 100%;

    .tree {
      width: 200px;

      .tree-box {
        display: block;
        height: calc(100% - 45px);
        overflow-x: auto;
      }
    }

    .content {
      flex: 1;
    }
  }

  .right {
    flex: 1;
  }
}

// :deep(.el-tree) {
//   height: 100%;
// }

// .collpaseMenu{
//   width: 80px;
// }
:deep(.is-active) {
  color: #0078d4 !important;
}

.box-table {
  height: 100%;
}
</style>