<template>
	<div class="container">
		<div class="wrapper">
			<input type="file" ref="file" @change="getFile"/>
		</div>
	</div>
</template>

<script>
import ImageCompressor from 'image-compressor.js';

var qiniu = require('qiniu-js');
export default {
	methods: {
		getFile(e) {
    const file = e.target.files[0];
    let errorMsg = null;
    if (this.fileType === 'image' && !/image\/\w+/.test(file.type)) {
      errorMsg = '请上传图片类型的文件';
    }

    if (errorMsg) {
      this.$bus.$emit('showPopup', {
        name: 'tip',
        data: errorMsg,
      });
      e.target.value = null;
      return;
    }
    if (this.fileType === 'image') {
      const imageCompressor = new ImageCompressor();
      imageCompressor.compress(file, { quality: 1 })
        .then((result) => {
          if (result.size > 8 * 1024 * 1024) {
            this.$bus.$emit('showPopup', {
              name: 'tip',
              data: '图片不得超过8M',
            });
            return;
          }
          this.fetchUpload(result);
        })
        .catch((err) => {
          this.$bus.$emit('showPopup', {
            name: 'tip',
            data: 'yasuocuowu',
          });
          console.log(err.message);
        });
      return;
    }
    this.fetchUpload(file);
  	},
  	fetchUpload(file) {
      this.$bus.$emit('showPopup', {
        name: 'loading',
        data: '文件上传中，请稍等……',
      });
      const key = '';
      const token = '';
      const putExtra = '';
      const config = '';
      var observable = qiniu.upload(file,key,token,putExtra,config);
      var subscription = observable.subscribe(observable);
    },
	},
}
</script>

<style lang="less">
@import '../assets/styles/base.less';
.wrapper{
	background-color: #44ff44;
	.flexCenter();
		input {
		  position: absolute;
		  width: 100%;
		  height: 100%;
		  opacity: 0;
		}
}
</style>