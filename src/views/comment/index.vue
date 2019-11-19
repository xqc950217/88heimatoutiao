<template>
  <div class="article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论管理</span>
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数" width="180"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="评论状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStatusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
         <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="$router.push('/comment/' + scope.row.id)"
            >修改</el-button>
            <el-button type="primary">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
    background
     layout="prev, pager, next"
     :total="totalCount"
     @current-change="onPageChange"
     ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'CommentIndex',
  components: {},
  props: {

  },
  data () {
    return {
      articles: [],
      totalCount: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles(1)
  },
  methods: {
    loadArticles (page = 1) {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment',
          page,
          per_page: 10

        }
      })
        .then(res => {
          this.articles = res.data.data.results
          this.totalCount = res.data.data.total_count
        })
        .catch(err => {
          console.log(err, '获取失败')
        })
    },
    onPageChange (page) {
      this.loadArticles(page)
    },
    onStatusChange (article) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
        },
        data: {
          allow_comment: article.comment_status
        }
      })
        .then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: `${article.comment_status ? '启用' : '关闭'}成功`
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error('操作失败')
        })
    }
  }
}
</script>

<style scoped lang="less">
.article {
  .box-card {
    margin-bottom: 20px;
  }
}
.el-pagination{
  text-align: center;
}
</style>
