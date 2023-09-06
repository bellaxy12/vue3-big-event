<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService, artDelService } from '@/api/article.js'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
const articleList = ref([])
const total = ref(0)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
// 添加loading效果
const loading = ref(false)

const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()
const articleEditRef = ref()
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getArticleList()
}
const onEditArticle = (row) => {
  console.log(row)
  articleEditRef.value.open(row)
}

const onAddArticle = () => {
  articleEditRef.value.open({})
}

const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}

const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
// 搜索逻辑
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
// 重置逻辑
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle" type="primary">发布文章</el-button>
    </template>
    <!-- 头部-搜索 -->
    <el-form :inline="true" v-loading="loading">
      <el-form-item label="文章分类:">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="articleList">
      <el-table-column label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发表时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            :icon="Delete"
            type="danger"
            circle
            plain
            @click="onDeleteArticle(row)"
          ></el-button>
          <el-button
            :icon="Edit"
            type="primary"
            circle
            plain
            @click="onEditArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      background
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <article-edit ref="articleEditRef" @success="onSuccess" width="100%"></article-edit>
  </page-container>
</template>

<style scoped></style>
