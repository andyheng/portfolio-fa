<template>
  <transition name="modal">
    <div class="modal-mask" @click="closeModal" v-show="show">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop ref="modalContainerRef">
          <div class="modal-header" ref="modalHeaderRef">
            <div class="modal-header-title">
              <h2>{{currentItem.t}}</h2>
              <p>{{currentItem.d}}</p>
            </div>
            <div class="modal-header-close" @click="closeModal">
              <font-awesome-icon v-if="mobile" icon="chevron-left"/>
              <font-awesome-icon v-else icon="times"/>
            </div>
          </div>
          <div class="modal-main-img">

            <span class="fa-layers fa-fw chev chev-left" @click="changeImage('left')" v-if="currentItem.i.length > 1">
              <font-awesome-icon icon="circle" class="chev-circle" />
              <font-awesome-icon icon="chevron-circle-left" />
            </span>

            <span class="fa-layers fa-fw chev chev-right" @click="changeImage('right')" v-if="currentItem.i.length > 1">
              <font-awesome-icon icon="circle" class="chev-circle" />
              <font-awesome-icon icon="chevron-circle-right" />
            </span>
              <img class="modal-img" :src="currentImage" :alt="currentItem.t" ref="currentImageRef">
          </div>
          <div class="modal-gallery" v-if="mobile" ref="mobileGalleryRef">
            <img v-for="img in currentItem.i" :key="img.id" img class="modal-img modal-gallery-img" :src="img.src" :alt="img.src">
          </div>
          <div class="modal-gallery" v-if="!mobile && currentItem.i.length > 1">
            <div
              class="modal-gallery-img"
              v-for="img in currentItem.i"
              @click="updateMainImage(img); isActive = img.id"
              :key="img.id"
              :class="{'modal-gallery-img-active':img.id == isActive}"
            >
              <img class="modal-img" :src="img.src" :alt="img">
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
        t: "",
        d: "",
        i: []
      },
      currentImage: "",
      isActive: 0,
      counter: 0
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
      setTimeout(() => {
        this.currentImage = "";
        this.counter = 0;
        this.isActive = 0;
      }, 500);
    },
    updateMainImage(img) {
      // img.selected = !img.selected;
      this.currentImage = img.src;
    },
    changeImage(direction) {
      if (direction == "left") {
        if (this.counter == 0) {
          this.counter = this.currentItem.i.length - 1;
        } else {
          this.counter--;
        }
      } else {
        if (this.counter == this.currentItem.i.length - 1) {
          this.counter = 0;
        } else {
          this.counter++;
        }
      }
      this.currentImage = this.currentItem.i[this.counter].src;
      this.isActive = this.counter;
    },
  },
  props: ["show", "item", "mobile"],
  mounted() {
    document.addEventListener("keydown", e => {
      if (this.show && e.keyCode == 27) {
        this.closeModal();
      }
    });
    document.addEventListener("keydown", e => {
      if (this.show && (e.keyCode == 37 || e.keyCode == 39)) {
        if (e.keyCode == 37) {
          this.changeImage("left");
        }
        if (e.keyCode == 39) {
          this.changeImage("right");
        }
      }
    });
  },
  updated() {
    // adjust modal header height
    let header = this.$refs.modalHeaderRef.clientHeight
    if (this.mobile && header > 79) {
      this.$refs.mobileGalleryRef.style.marginTop = `${header}px`
    }

    // adjust modal width on desktop
    let width = window.innerWidth;
    let container = this.$refs.modalContainerRef.clientWidth;
    let image = this.$refs.currentImageRef.clientWidth;
    let imageHeight = this.$refs.currentImageRef.clientHeight;
    if (width >= 900 && width <= 1200) {
      if (image > imageHeight) {
        this.$refs.modalContainerRef.style.maxWidth = "65%";
      } else {
        this.$refs.modalContainerRef.style.maxWidth = "";
      }
    }

    if (this.currentImage === "") {
      if (this.show) {
        this.currentImage = this.item.i[0].src;
      }
    }
    this.currentItem = this.item;
    

    if (image > container) {
      this.$refs.modalContainerRef.style.width = `${image + 32}px`;
    } else {
      this.$refs.modalContainerRef.style.width = "";
    }
  }
};
</script>