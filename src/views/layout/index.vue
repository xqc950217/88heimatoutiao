<template>
  <el-container>
    <!-- 左侧内容 -->
    <el-aside class='left' style='width:220px'>
      <div class='menu-title' style="background-color:#2e2f32">
        <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!-- 左侧菜单 -->
      <el-menu style="width:221px"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b"
      router
      >
      <!--router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转-->
        <!-- 一级菜单 -->
        <el-menu-item index="/">首页</el-menu-item>
        <!-- 二级菜单 -->
        <el-submenu index="1">
          <!-- 具名插槽 -->
          <!-- 给你的菜单项设置 index，导航到具体的页面路径 -->
          <template slot="title">内容管理</template>
          <el-menu-item index="/publish">内容发布</el-menu-item>
          <el-menu-item index="/article">内容列表</el-menu-item>
          <el-menu-item index="/comment">评论列表</el-menu-item>
          <el-menu-item index="/media">素材管理</el-menu-item>
        </el-submenu>
        <!-- 二级菜单 -->
        <el-submenu index="2">
          <template slot="title">粉丝管理</template>
          <el-menu-item >图文数据</el-menu-item>
          <el-menu-item >粉丝概况</el-menu-item>
          <el-menu-item >粉丝画像</el-menu-item>
          <el-menu-item >粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="/account"> 账户信息</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main>
        <!-- 二级路由容器 -->
        <!-- 加一个key 禁用路由缓存功能 绑定唯一的key  路径不同-->
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutHeader from '../../components/layout-header.vue'
export default {
  name: 'home',
  components: {
    'layout-header': layoutHeader
  }
}
</script>

<style lang='less' scoped>
.left {
  width:220px;
  height: 100vh;
  background-color:#353b4e;
  overflow:hidden;
  .menu-title {
  padding: 15px 0;
  text-align: center;
  img {
    height:30px;
  }
 }
}
</style>
