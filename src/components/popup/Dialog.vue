<template>
  <div class="popup dialog">
    <h4 v-if="popupData.title.length > 0">{{popupData.title}}</h4>
    <p class="text">{{popupData.content}}</p>
    <div class="btnWrap">
      <span
        v-for="item in popupData.button"
        class="confirm"
        :key="item.id"
        @click="item.onClick"
      >
        {{item.text}}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dialog',
  props: {
    popupData: {
      type: Object,
    },
  },
};
</script>
