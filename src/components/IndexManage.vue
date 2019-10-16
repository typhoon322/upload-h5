<template>
  <el-form
    class="form"
    ref="form_data"
    :rules="rules"
    :model="form_data"
    label-width="80px"
    v-loading="loading"
  >
    <el-form-item label="项目标题"  prop="title">
      <el-input v-model="form_data.title" placeholder="客家餐厅餐牌"></el-input>
    </el-form-item>
    <el-form-item label="项目封面"  prop="title">
      <el-input v-model="form_data.title" placeholder="客家餐厅餐牌"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data: {
      form_data: {
        title: '',

      }
  },
}
</script>
<style lang="less" scoped>

</style>
