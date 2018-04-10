<template>
  <div class="mask">
    <div class="popup dialog">
      <div class="text_title">修改手机号</div>
      <div class="text_hint">请联系客服修改</div>
      <div class="text_phone">400-9303-606</div>
      <div class="text_time">上班时间：9:00-21:00</div>
      <div class="btnWrap">
        <span class="confirm" @click="toCall">拨打</span>
        <span class="confirm" @click="onClick">取消</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PhoneDialog',
  props: {
    hideFunc: {
      type: Function,
    },
  },
  methods: {
    onClick() {
      this.hideFunc();
    },
    toCall() {
      window.location.href = 'tel:15576394483';
      this.hideFunc();
    },
  },
};
</script>

<style>
.text_hint{
  font-size: 15px;
  color:  #999999;
}
.text_phone{
  padding-top: 5px;
  font-size: 17px;
  color: #5485EB;
}
.text_time{
  font-size: 12px;
  color: #999999;
  padding-bottom: 20px;
  padding-top: 5px;
}
.text_title{
  font-size: 20px;
  padding: 15px;
  color: #666666;
}
</style>
