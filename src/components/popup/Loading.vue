<template>
  <div class="popup loading">{{popupData}}</div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    popupData: {
      type: String,
      default: 'loading...',
    },
  },
};
</script>