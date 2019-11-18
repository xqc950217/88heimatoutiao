<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- <el-input type="textarea" v-model="article.content"></el-input>
          -->
          <!-- bidirectional data binding（双向数据绑定） -->
          <quill-editor
            v-model="article.content"
            ref="myQuillEditor"
            :options="editorOption"
          ></quill-editor>
        </el-form-item>
        <!-- <el-form-item label="封面">
          <el-radio-group>
            <el-radio label="单图"></el-radio>
            <el-radio label="三图"></el-radio>
            <el-radio label="无图"></el-radio>
            <el-radio label="自动"></el-radio>
          </el-radio-group>
        </el-form-item>-->
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="channel in channels"
              :key="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary " @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 加载富文本编辑器的样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 加载富文本编辑器的核心组件
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'PublishList',
  components: {
    // 注册局部组件
    quillEditor
  },
  data () {
    return {
      article: {
        title: '', // 标题
        content: '', // 内容
        cover: {
          type: 0,
          images: []
        },
        channel_id: '',
        channels: [],
        editorOption: {} // 富文本编辑器配置选项对象
      }
    }
  },
  created () {
    this.loadChannels()
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  },
  methods: {
    loadArticle () {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.articleId}`
      }).then(res => {
        this.article = res.data.data
      })
    },
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        // 请求编辑文章
        this.updateAriticle(draft)
      } else {
        // 请求添加文章
        this.AddArticle(draft)
      }
      // this.$message({
      //   message: '恭喜你，添加成功',
      //   type: 'success'
      // })
    },
    AddArticle (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // Header 参数
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
        // Query参数
        params: {
          draft
        },
        data: this.article
      })
        .then(res => {
          this.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err, '保存失败')
          this.$message.error('抱歉,添加失败')
        })
    },
    updateAriticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        this.$message({
          message: '恭喜你，更新成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('更新失败')
      })
    },
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      })
        .then(res => {
          this.channels = res.data.data.channels
        })
        .catch(err => {
          console.log(err, '获取失败')
        })
    }
  }
}
</script>

<style scoped>
</style>
