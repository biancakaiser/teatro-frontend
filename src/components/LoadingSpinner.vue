<template>
  <div class="loading relative" :style="`width: ${size}px; height: ${size}px;`">
    <div style="border: 10px solid;"></div>
    <div style="border: 10px solid #dc3545;"></div>
    <div style="border: 10px solid transparent; border-left-color: #343a40;"></div>
    <div style="border: 10px solid;"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    size: {
      type: Number,
      default: 80
    }
  },
}
</script>

<style scoped>
.relative {
  position: relative;
}

.loading div {
  position: absolute;
  width: 100%;
  height: 100%;

  border-radius: 50%;
  border-color: transparent;

  animation: rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.loading div:nth-child(1) {
  animation-delay: -0.45s;
}

.loading div:nth-child(2) {
  animation-delay: -0.3s;
}

.loading div:nth-child(3) {
  animation-delay: -0.15s;
}

.loading div:nth-child(4) {
  opacity: 0.5;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
