<template>
  <div class="flip-card">
    <div :class="['flip-card-inner', state ? 'flip' : '']" :style="cardHeight ? `height: ${cardHeight}px;` : ''">
      
      <div class="flip-card-front p-3 bg-white rounded-4" ref="front">
        <slot name="front">
          <p>FLIP CARD FRONT</p>
        </slot>
      </div>

      <div class="flip-card-back p-3 bg-light rounded-4" ref="back">
        <slot name="back">
          <p>FLIP CARD BACK</p>
        </slot>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['state'],
  data() {
    return {
      frontSize: null,
      backSize: null,
      cardHeight: 0,
    };
  },
  mounted() {
    this.frontSize = this.$refs.front.offsetHeight;
    this.backSize = this.$refs.back.offsetHeight;

    this.cardHeight = this.frontSize < this.backSize ? this.backSize : this.frontSize;
  },
}

</script>

<style lang="scss" scoped>
.flip-card {
  background-color: transparent;
  width: 100%;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card-front,
.flip-card-back {
  box-shadow: 0 8px 14px 0 rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.17) 0px -5px 10px 5px inset;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}

.flip {
  transform: rotateY(180deg);
}
</style>