<template>
  <div>
    <el-row>
      <el-col :span="10">
        <el-form ref="form" :model="user" label-width="80px">
          <el-form-item label="用户昵称">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="个人介绍">
            <el-input type="textarea" v-model="user.intro"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <!-- disabled 禁用 -->
            <el-input disabled v-model="user.mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :offset="1" :span="5">
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="onUpload"
            >
            <!-- <img width="200" src="user.photo" class="avatar" /> -->
            <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
            <img width="200" v-if="user.photo" :src="user.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <p>点击选择上传用户头像</p>
            </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import eventBus from '@/utils/event-bus'
export default {
  data () {
    return {
      user: {
        email: '',
        intro: '',
        mobile: '',
        name: '',
        photo: false
      }
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    onSubmit () {
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name: this.user.name,
          email: this.user.email,
          intro: this.user.intro
        }
      }).then(res => {
        // 更新用户信息成功以后 ,通知头部组件
        // eventBus.$emit('update-user', this.user)
        this.$message({
          type: 'success',
          message: '修改成功'
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    loadUserProfile () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      })
        .then(res => {
          this.user = res.data.data
        })
        .catch(() => {
          this.$message.error('获取失败')
        })
    },
    onUpload (config) {
      // 自定义上传图片
      const fd = new FormData()
      fd.append('photo', config.file)
      this.$axios({
        method: 'PATCH',
        url: 'user/photo',
        data: fd
      }).then(res => {
        // 更新图片地址
        this.user.photo = res.data.data.photo
        // 更新用户信息成功以后 ,通知头部组件
        eventBus.$emit('update-user', this.user)
      }).catch(() => {
        this.$message.error('上传失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
