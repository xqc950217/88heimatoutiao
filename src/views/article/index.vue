<template>
  <div class="article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterFrom">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道列表">
          <el-select placeholder="请选择" v-model="filterFrom.channel_id">
            <el-option label="开发者资讯" value="shanghai"></el-option>
            <el-option label="iOS" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{totalCount}}条符合条件的内容</span>
      </div>
       <el-table
       v-loading="loading"
      :data="articles"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="封面"
        width="180">
        <!-- 自定义表格列
        在 template 上声明 slot-scope="scope" ，然后就可以通过 scope.row 获取遍历项
        scope.row 就相当于我们自己 v-for 的 item -->
        <template slot-scope="scope">
          <img width="50"  :src="scope.row.cover.images[0]">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
            <!-- <span>{{articleStatus[scope.row.status].label}}</span> -->
            <el-tag
            :type="articleStatus[scope.row.status].type"
            >
             {{articleStatus[scope.row.status].label}}
            </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布日期">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template >
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="primary" size="mini">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
     background
     layout="prev, pager, next"
     :total="totalCount"
     @current-change="onPageChange"
     :disabled="loading"
     >
</el-pagination>
  </div>
</template>

<script>

export default {
  // 建议给每个组建起一个名字 好找
  name: 'article',
  data () {
    return {
      //    过滤表单数据
      filterFrom: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      rangeDate: '',
      articles: [],
      articleStatus: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        },
        {
          type: 'info',
          label: '已删除'
        }
      ],
      totalCount: 0,
      loading: true
    }
  },
  created () {
    // 初始化的时候加载第 1 页数据
    this.loadArticles(1)
  },
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: {
          Authorization: `Bearer ${token}`
        },
        // query参数用params传递
        params: {
          page,
          per_page: 10 // 每页默认十条

        }
      }).then(res => {
        // 更新文章列表数组
        this.articles = res.data.data.results
        // 更新总记录数
        this.totalCount = res.data.data.total_count
      }).catch(err => {
        console.log(err, '获取数据失败')
      }).finally(() => {
        this.loading = false
      })
    },
    // 页码改变调用函数
    onPageChange (page) {
      this.loadArticles(page)
    }
  }

}
</script>

<style>
</style>
