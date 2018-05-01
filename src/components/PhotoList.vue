<template>
  <div class="container">
    <div style="text-align: left;">
      <router-link :to="'/panda/add'"><el-button type="primary">新增</el-button></router-link>
    </div>
    <el-table
      :data="photos"
      border
      stripe
      highlight-current-row
      style="width: 100%; margin-top: 20px;">
      <el-table-column label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预览" width="200px">
        <template slot-scope="scope">
          <img :src="`${scope.row.url}?imageView2/2/w/150/h/150/q/75|imageslim`" alt="" style="width: 150px; height: 150px;">
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showOrHide(scope.$index, scope.row)">{{(scope.row.status) ? '下线' : '上线'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { doGet, doPut, doDelete } from '../lib/asyncUtil';

export default {
  data() {
    return {
      photos: [],
    };
  },

  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      const path = '/index';
      doGet(path).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          if (res.data) {
            this.photos = res.data;
          }
        } else {
          this.$bus.$emit('showPopup', {
            name: 'tip',
            data: res.msg,
          });
          if(res.code === -1){
            this.$router.replace('/panda/login');
          }
        }
      });
    },
    handleEdit(index, row) {
      this.$router.push({ path: `/panda/editPhoto/${row._id}` });
    },
    handleDelete(index, photo) {
      const path = `/photo/${photo._id}`;
      this.loading = true;
      doDelete(path).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          this.fetch();
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        } else {
          this.$bus.$emit('showPopup', {
            name: 'tip',
            data: res.msg,
          });
        }
      });
    },
    showOrHide(index, photo){
      const path = `/photo/${photo._id}`;
      this.loading = true;
      photo.isShow = !photo.isShow;
      doPut(path, photo).then(
        (res) => {
          this.loading = false;
          if(res.code == 0){
            photo = res.data;
          }else{
              this.$bus.$emit('showPopup', {
              name: 'tip',
              data: res.msg,
            });
          }
        },
      );
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  margin-top: 20px;
  width: 100%;
}
</style>

