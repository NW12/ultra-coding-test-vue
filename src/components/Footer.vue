<template>
  <footer>
    <a v-show="keySignPage" href='javascript:void(0)' @click="onKeySignIn()">Key Sign In</a>&nbsp;&nbsp;
    <a v-show="keyRecoveryPage" href='javascript:void(0)' @click="onKeyRecover()">Key Recovery</a>&nbsp;&nbsp;
    <a v-show="aboutPage" href='javascript:void(0)' @click="onAbout()">About</a>&nbsp;&nbsp;
  </footer>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {
      route: this.$router,
    }
  },
  methods: {
    onAbout() {
      this.route.push({ path: '/about' });
    },
    onKeySignIn() {
      this.route.push({ path: '/key-sign-generate' });
    },
    onKeyRecover() {
      this.route.push({ path: '/recover-public-key' });
    }
  },
  computed: {
    aboutPage() {
      if (this.$route.path === '/') {
        return true
      }
      else {
        return false
      }
    },
    keySignPage() {
      if (this.$route.path === '/key-sign-generate') {
        return false
      }
      else {
        return true
      }
    },
    keyRecoveryPage() {
      if (this.$route.path === '/recover-public-key') {
        return false
      }
      else {
        return true
      }
    },
  },
};
</script>

<style scoped>
a {
  color: #333;
}

footer {
  margin-top: 30px;
  text-align: center;
}
</style>