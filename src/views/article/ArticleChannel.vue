<script setup>
import { artGetChannelsService, artDelChannelService } from '@/api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/channelEdit.vue'
// loding效果
const loading = ref(false)
const channelList = ref([])
const dialog = ref()
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  console.log(res)
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()

const onEditChannel = (row) => {
  dialog.value.open(row)
  console.log(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('确定要删除吗?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await artDelChannelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getChannelList()
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel" type="primary">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </page-container>
  <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
</template>

<style scoped></style>
