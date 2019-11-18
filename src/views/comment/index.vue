<template>
  <div>

      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="总评论数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
        prop="address"
        label="评论状态">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template>
            <el-button type="primary">修改</el-button>
            <el-button type="primary">关闭评论</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'CommentIndex',
  comments: {},
  props: {},
  data () {
    return {
      articles: []
    }
  },
  computed: {},
  watch: {

  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        this.articles = res.data.data.results
      }).catch(err => {
        console.log(err, '获取失败')
      })
    }
  }
}
</script>

<style>
</style>
