<template>
	<div class="container">
		<img src="../assets/images/logo.png">
		<p class="greeting">Welcome XXX</p>
		<div class="wrapper">
			<div class="enter" @click="enter">ENTER</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Home',

		methods: {
			enter() {
				this.$router.push('/upload');
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