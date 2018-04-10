<template>
  <div class="popup tip">{{popupData}}</div>
</template>

<script>
export default {
  name: 'Tip',
  props: {
    popupData: {
      type: String,
      default: null,
    },
  },
};
</script>