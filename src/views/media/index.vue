<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div>
        <el-radio-group v-model="type" @change="onFind">
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="收藏">收藏</el-radio-button>
        </el-radio-group>
      </div>
      <el-row :gutter="20">
       <el-col
          :xs="24"
          :sm="12"
          :md="4"
          v-for="item in images"
          :key="item.id"
          class="col-item"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="item.url"
              class="image"
              height="200px"
            />
            <div style="padding: 14px;" class="action">
              <i :class="{
                'el-icon-star-on': item.is_collected,
                'el-icon-star-off': !item.is_collected
              }"
              @click="onClollect(item)"
              ></i>
            <i class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MediaIndex',
  comments: {

  },
  props: {

  },
  data () {
    return {
      images: [],
      type: '全部'
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages()
  },
  methods: {
    loadImages (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isCollect
        }
      }).then(res => {
        this.images = res.data.data.results
      }).catch(err => {
        console.log(err)
      })
    },
    onFind (value) {
      this.loadImages(value !== '全部')
    },
    onClollect (item) {
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        // 更新视图展示
        item.is_collected = !item.is_collected
      }).catch(err => {
        console.log(err)
        this.$message.error('操作失败')
      })
    }
  }

}
</script>

<style lang="less" scoped >
  .grid-content{
    background-color: pink;
  }
  .col-item{
    margin-top: 20px;
    .action{
      display: flex;
      justify-content: flex-around;
      font-size: 24px;
    }
  }
</style>
