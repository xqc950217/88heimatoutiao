<template>
  <div class="login">
     <!-- elementUI card卡片组件 -->
     <el-card class="login-card">
        <!-- 卡片内容 -->
        <div class="title">
          <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单 -->
        <el-form style="margin-top:35px">
          <!-- 一个表单域就是一个 form-item-->
          <el-form-item>
            <!-- 放置表单组件 -->
            <!-- 手机号 -->
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 验证码 -->
            <el-input style="width:280px"></el-input>
            <el-button style="float:right" plain>发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <!-- 勾选同意框 -->
            <el-checkbox >我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%" type="primary">登录</el-button>
          </el-form-item>

        </el-form>
     </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
// 背景图片
   .login{
     background-image: url("../../assets/img/login_bg.jpg");
     height: 100vh;   // 占当前屏幕的100%
     background-size: cover;
    //  卡片组水平垂直居中
     display: flex;
     justify-content: center;
     align-items: center;
     .login-card{
       width: 450px;
       height: 340px;
       .title{
         text-align: center;
         img{
           height: 35px;
         }
       }
     }
   }
</style>
