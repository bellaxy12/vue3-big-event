<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores'
const router = useRouter()
const route = useRoute()
const getList = () => {
  router.push('/list')
  console.log(route, router)
}

const userStore = useUserStore()
const login = userStore.setToken
const logout = userStore.delToken
</script>

<template>
  我是app
  <el-button type="primary" @click="$router.push('/home')">goHome</el-button>
  <el-button type="primary" @click="getList">列表</el-button>
  <div>{{ userStore.token }}</div>
  <el-button @click="login('fhdaskfhaksdfh')">登陆</el-button>
  <el-button @click="logout">注销</el-button>
</template>

<style scoped></style>
