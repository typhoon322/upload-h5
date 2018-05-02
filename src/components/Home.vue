<template>
	<div class="container">
		<img src="../assets/images/avatar.jpg" style="width: 200px;">
		<p class="greeting">Welcome 熊喵伯🐼</p>
		<div class="wrapper">
			<div class="enter" @click="enter">掌管熊猫洞</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Home',
		methods: {
			enter() {
				this.$router.push('/panda/photoList');
			},
		},
	}
</script>

<style lang="less">
@import '../assets/styles/common.less';
.wrapper{
	display: flex;
  align-items: center;
  justify-content: center;
	.enter {
		cursor: pointer;
		width: 200px;
		height: 48px;
		line-height: 48px;
		text-align: center;
		color: #fff;
		background-color: #88aaff;
		border-radius: 4px;
	}
}
</style>
