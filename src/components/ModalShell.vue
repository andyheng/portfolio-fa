<template>
  <transition name="modal">
    <div class="modal-mask" @click="closeModal" v-show="show">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop ref="modalContainerRef">
            <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
  props: ["show", "item", "mobile"],
  mounted() {
    document.addEventListener("keydown", e => {
      if (this.show && e.keyCode == 27) {
        this.closeModal();
      }
    });
  },
};
</script>

<style>
.modal-gallery .modal-img {
  opacity: 0;
  transition: opacity 0.2s ease-in;
}
.modal-gallery .modal-fadein {
  opacity: 1;
}
</style>
