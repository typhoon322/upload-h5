<template>
  <transition name="fade" >
  <div
    v-if="showData.name"
    class="mask"
    :class="{transparent: !showData.mask}"
  >
    <Dialog
      v-if="showData.name === 'dialog'"
      :popupData="showData.data"
      :hideFunc="hidePopup"
    />
    <Tip
      v-if="showData.name === 'tip'"
      :popupData="showData.data"
    />
    <Loading
      v-if="showData.name === 'loading'"
      :popupData="showData.data"
    />
  </div>
  </transition>
</template>

<script>
import Tip from './Tip';
import Loading from './Loading';
import Dialog from './Dialog';

export default {
  name: 'Popup',
  data() {
    return {
      showData: {
        name: '',
        data: {},
        mask: true,
      },
      initData: {
        name: '',
        data: {},
        mask: true,
      },
      tipDelay: 1,
    };
  },
  components: {
    Tip,
    Loading,
    Dialog,
  },
  mounted() {
    this.$bus.$on('showPopup', (emitData) => {
      clearTimeout(this.timer);
      this.showData = emitData;
      if (emitData.name === 'tip') {
        this.showData.mask = false;
        this.timer = setTimeout(() => {
          this.hidePopup();
        }, this.tipDelay * 1000);
      } else {
        this.showData.mask = true;
      }
    });
    this.$bus.$on('hidePopup', () => {
      this.showData = this.initData;
    });
  },
  methods: {
    hidePopup() {
      this.$bus.$emit('hidePopup');
    },
  },
};
</script>
