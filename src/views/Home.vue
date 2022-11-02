<template>
  <div>
    <h3>Generate & Manage Keys</h3>
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
        <label>Pin Code <span class="text-red">*</span></label>
        <input type="text" v-model="pinCode" name="pinCode" placeholder="Enter pin code for encryption" />
      </div>

      <input type="submit" value="Generate & Encrypt" class="btn btn-block" :disabled="isGenerating" />
    </form>
    <div v-if="keyPairs.length">
      <h3>
        Generated Public Keys:
      </h3>
      <ul>
        <li v-for="key in keyPairs" :key="key.id">
          {{ key.publicKey }}
        </li>
      </ul>
    </div>
    <p v-if="isGenerating">Generating Keys...</p>
    <br>
    <p v-if="error" class="error text-red">
      {{ error }}
    </p>
    <br>
  </div>
</template>
  
<script>
import ecc from 'eosjs-ecc';
const CryptoJS = require("crypto-js");

export default {
  name: 'Home',
  inheritAttrs: false, // disable 'non-props' warning
  data() {
    return {
      pinCode: '',
      keyPairs: [],
      isSubmitted: false
    }
  },
  computed: {
    error() {
      return !(this.pinCode.trim().length) && this.isSubmitted && 'Please enter a pin code (w/o whitespace)'
    },
    isGenerating() {
      return this.isSubmitted && !this.error && this.keyPairs?.length < 5
    }
  },
  watch: {
    pinCode: function () {
      this.isSubmitted = false
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.isSubmitted = true
      this.keyPairs = []

      if (!(this.pinCode.trim().length))
        return

      var pairs = new Array(5)
      pairs.fill(-1)

      pairs.map((pair, index) => {
        ecc.randomKey().then(privateWif => {
          const publicKey = ecc.privateToPublic(privateWif)
          const encPrivKey = CryptoJS.AES.encrypt(privateWif, this.pinCode).toString()

          this.keyPairs.push(
            {
              id: index + 1,
              encPrivKey,
              privateKey: privateWif,
              publicKey
            }
          )
        })
      });

      this.$store.commit('updateKeys', this.keyPairs)
    }
  }
};
</script>
<style copied>
.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
</style>