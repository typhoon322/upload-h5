<template>
  <div class="container">
    <el-form class="form" ref="form_data" :rules="rules" :model="form_data" label-width="80px" v-loading="loading">
        <el-form-item label="图片地址"  prop="url">
          <el-input v-model="form_data.url" placeholder="http://www.example.com/image/dsc.jpeg"></el-input>
        </el-form-item>
         <el-form-item label="标题" prop="title">
          <el-input v-model="form_data.title" placeholder="输入个标题"></el-input>
        </el-form-item>
         <el-form-item label="描述" prop="desc">
          <el-input v-model="form_data.desc" placeholder="图片描述"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-input v-model="form_data.tags" placeholder="'标签1'<Space-空格>‘标签2’ （用空格分隔）"></el-input>
        </el-form-item>
      <el-form-item>
        <!-- <el-button @click="addItem">新增</el-button> -->
        <el-button v-if="id" type="primary" @click="modifyForm('form_data')">修改</el-button>
        <el-button v-else type="primary" @click="submitForm('form_data')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { doPost,doPut,doGet } from '../lib/asyncUtil';

export default{
    data() {
      const checkLink = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('图片跳转链接不能为空啊笨蛋！'));
        }
        if (!this.validateUrl(value)) {
          callback(new Error('链接格式不正确蠢死了。。。'));
        } else {
          callback();
        }
        return true;
      };
      return {
        id: null,
        form_data: {
          url: '',
          title: '',
          desc: '',
          status: { isShow: false},
          tags: '',
        },
        rules: {
          url: [{ validator: checkLink, required: true, trigger: 'blur' }],
        },
        loading: false,
      };
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id) {
      this.fetch();
    }
  },
  methods: {
    fetch() {
      this.loading = true;
      doGet(`/photo/${this.id}`).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          if (res.data) {
            this.form_data = res.data;
          }
        } else {
          this.$bus.$emit('showPopup', {
            name: 'tip',
            data: res.msg,
          });
        }
      });
    },
    submitForm(formName) {
      console.info(this.form_data);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const path = '/photo';
          this.loading = true;
          doPost(path, this.form_data).then(
            (res) => {
              this.loading = false;
              if(res.code == 0){
                this.$bus.$emit('showPopup', {
                  name: 'tip',
                  data: '添加成功',
                });
                this.$router.back();
              }else{
                 this.$bus.$emit('showPopup', {
                  name: 'tip',
                  data: res.msg,
                });
              }
            },
          );
        }else {
          return false;
        }
        return true;
      });
    },

    modifyForm(formName) {
      console.info(this.form_data);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const path = `/photo/${this.id}`;
          this.loading = true;
          doPut(path, this.form_data).then(
            (res) => {
              this.loading = false;
              if(res.code == 0){
                this.$bus.$emit('showPopup', {
                  name: 'tip',
                  data: '修改成功',
                });
                this.$router.back();
              }else{
                 this.$bus.$emit('showPopup', {
                  name: 'tip',
                  data: res.msg,
                });
              }
            },
          );
        }else {
          return false;
        }
        return true;
      });
    },


    validateUrl(url) {
      return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/.test(url);
    }
    // addItem() {
    //   this.item.push(
    //     {
    //       key: new Date(),
    //     }
    //   );
    // },
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

