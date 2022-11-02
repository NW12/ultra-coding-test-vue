import router from "@/router";
<template>
  <div>
    <h3>Version 1.0.0</h3>
    <a href='javascript:void(0)' @click="onBack($router)">Go Back</a>
  </div>
</template>

<script>
export default {
  name: 'About',
  inheritAttrs: false, // disable 'non-props' warning
  methods: {
    onBack(router) {
      router.push({ name: 'Home' });
    }
  }
};
</script>