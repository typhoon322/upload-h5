<template>
	<div class="container">
		<div class="wrapper">
			<input type="file" ref="file" @change="getFile"/>
		</div>
	</div>
</template>

<script>
import ImageCompressor from 'image-compressor.js';

const qiniu = require('qiniu-js');
const requestHeaders = {
	'Origin': 'http://localhost',
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept-Encoding': 'gzip',
  'Host': '192.168.1.107',
};
const timeoutErr = {
  code: 1,
  msg: '请求超时',
};
const catchErr = {
  code: 1,
  msg: '网络异常',
};

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
	      if (file.size > 8 * 1024 * 1024) {
	        this.$bus.$emit('showPopup', {
	          name: 'tip',
	          data: '图片不得超过8M',
	        });
	        return;
	      }
	    }
	    // this.fetchUpload(file);
	    this.doGet(file).then((res) => {
						console.log(res);
		        this.fetchUpload(file,res.token);
		      });
		},
		
  	fetchUpload(file,token) {
			console.log('fprepare data file:');
			console.log(file);
			console.log('prepare data token:'+ token);
			var timeStamp = new Date().getTime();
			var key = file.name;
      const putExtra = {
      	fname: "IMG_"+timeStamp,
      	params: {},
      	mimeType: null
      };
      var config = {
        useCdnDomain: true,
        region: qiniu.region.z2
      };
      var requestUrl = qiniu.getUploadUrl(config);
      console.log('requestUrl:');
      console.log(requestUrl);
			var observable = qiniu.upload(file,key,token,putExtra,config);
      var observer = {
        next(res){
        	console.log(res.total.percent + '% 已上传：'+res.total.loaded);
        },
        error(err){
        	console.log(''+err.code+" : "+ err.reqId+" - "+err.message);
        },
        complete(res){
					console.log(res);
        	console.log('complete');
        }
      }
      console.log('开始上传。。。');
      var subscription = observable.subscribe(observer);
			console.log('subscription = ');
			console.log(subscription);
    },
    timerPromisefy(delay) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(timeoutErr);
        }, delay * 1000);
      });
    },
    doGet(file) {
      return Promise.race([
        this.timerPromisefy(15),
        new Promise((resolve, reject) => {
          fetch('http://192.168.1.107:3007/auth', {
            method: 'GET',
            headers: {
              ...requestHeaders,
            },
          }).then(response => response.json(),
          ).then((json) => {
        		resolve(json);
      		})
          .catch((err) => {
            reject(catchErr);
          });
        }),
      ]).then(value => value).catch(err => err);
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