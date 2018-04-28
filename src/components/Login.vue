<template>
  <div class="container">
    <el-form class="form" ref="form_data" :rules="rules" :model="form_data" label-width="80px" v-loading="loading">
         <el-form-item label="用户名" prop="userName">
          <el-input v-model="form_data.userName" placeholder="user name"></el-input>
        </el-form-item>
         <el-form-item label="密钥" prop="password">
          <el-input v-model="form_data.password" placeholder="password"></el-input>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form_data')">爆炸开关</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { doPost } from '../lib/asyncUtil';
import md5 from 'js-md5';

export default{
    data() {
      return {
        form_data: {
          userName: '',
          password: '',
        },
        rules: {
          userName: [
            { required: true, message: '用户名呢？？？', trigger: 'blur' },
            { min: 1 },
          ],
          password: [
            { required: true, message: '还有密码啊大哥。。。。', trigger: 'blur' },
            { min: 1 },
          ],
        },
        loading: false,
      };
  },
  methods: {
    submitForm(formName) {
      console.info(this.form_data);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const path = '/login';
          this.loading = true;
          doPost(path, {
            userName: this.form_data.userName,
            password: md5(this.form_data.password),
          }).then(
            (res) => {
              this.loading = false;
              this.$bus.$emit('showPopup', {
                  name: 'tip',
                  data: res.msg,
                });
              if(res.code == 0){
                this.$router.replace('/panda');
                localStorage.setItem("token",JSON.stringify(res.data));
                const t = JSON.parse(localStorage.getItem("token"));
                console.log(t);
              }
            },
          );
        }else {
          return false;
        }
        return true;
      });
    },
  }
}
</script>
<style lang="less" scoped>
.container{
  width: 100%;
  text-align: center;
  .form {
    margin: 0 auto;
    width: 720px;
  }
}
</style>

