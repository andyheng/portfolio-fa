<template>
  <transition name="modal">
    <div class="modal-mask" @click="closeModal" v-show="show">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <div class="modal-header-title">
              <h2>{{currentItem.title}}</h2>
              <p>{{currentItem.description}}</p>
            </div>
            <div class="modal-header-close" @click="closeModal">
              <font-awesome-icon v-if="mobile" icon="chevron-left" />
              <font-awesome-icon v-else icon="times" />
            </div>
          </div>
          <div class="modal-main-img">
            <img class="modal-img" :src="currentImage" :alt="currentItem.title">
          </div>
            <div class="modal-gallery" v-if="mobile">
              <a :href="img.src" class="modal-gallery-img" v-for="img in currentItem.images.allImages" :key="img.id" target="_blank">
                  <img class="modal-img" :src="img.src" :alt="img.src">
              </a>
            </div>
            <div class="modal-gallery" v-else>
              <div 
                class="modal-gallery-img" 
                v-for="img in currentItem.images.allImages" 
                @click="updateMainImage(img); isActive = img.id" 
                :key="img.id"
                :class="{'modal-gallery-img-active':img.id == isActive}"
              >
                <img class="modal-img" :src="img.src" :alt="img.src">
            </div>
              </div>
            </div>
          </div>
        </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      currentItem: {
        title: "",
        description: "",
        images: {
          allImages: []
        }
      },
      currentImage: "",
      isActive: 1
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
      setTimeout(() => {
        this.currentImage = "";
        this.isActive = 1;
      }, 500);
    },
    updateMainImage(img) {
      img.selected = !img.selected;
      this.currentImage = img.src;
    }
  },
  props: ["show", "item", "mobile"],
  created() {
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (this.show && e.keyCode == 27) {
        this.closeModal();
      }
    });
  },
  updated() {
    if (this.currentImage === "") {
      if (this.show) {
        this.currentImage = this.item.images.allImages[0].src;
      }
    }
    this.currentItem = this.item;
  },
};
</script>