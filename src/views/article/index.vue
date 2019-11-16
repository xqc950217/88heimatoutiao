<template>
  <div class="article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章状态">
          <!-- 单选框组会把选中的radio的label同步给绑定的数据 -->
          <el-radio-group v-model="filterForm.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道列表">
          <el-select placeholder="请选择频道" v-model="filterForm.channel_id">
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="channel in channels"
              :key="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyy-MM--dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
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
  name: 'article-list',
  data () {
    return {
      //    过滤表单数据
      filterForm: {
        status: null,
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      rangeDate: [],
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
      loading: true,
      channels: []// 频道列表
      // 时间
    }
  },
  created () {
    // 初始化的时候加载第 1 页数据
    this.loadArticles(1)
    // 加载频道列表
    this.loadChannels()
  },
  methods: {
    loadArticles (page = 1) {
      // 加载前为要加载状态
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
          per_page: 10, // 每页默认十条
          // axios有个功能 当参数值为null的时候就不发送了
          status: this.filterForm.status,
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null
        }
      }).then(res => {
        // 更新文章列表数组
        this.articles = res.data.data.results
        // 更新总记录数
        this.totalCount = res.data.data.total_count
      }).catch(err => {
        console.log(err, '获取数据失败')
      }).finally(() => {
        // 加载完成后 结束
        this.loading = false
      })
    },
    // 页码改变调用函数
    onPageChange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取数据失败')
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
</style>
