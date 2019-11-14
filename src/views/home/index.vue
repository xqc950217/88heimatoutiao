<template>
  <el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
        <!-- 二级路由容器 -->
        <router-view></router-view>
    </el-main>

  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'home',
  components: {

  }
}
</script>

<style>

</style>
