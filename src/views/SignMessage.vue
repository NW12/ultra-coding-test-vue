<template>
  <div>
    <h3>Sign a Message</h3>
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
        <label>Message <span class="text-red">*</span></label>
        <input type="text" v-model="message" name="message" placeholder="Input a message to be signed" />
      </div>
      <div class="form-control">
        <label>Public Key <span class="text-red">*</span></label>
        <select v-model="publicKey">
          <option disabled value="">Please select a public key</option>
          <option v-for="pair in keyPairs" :value="pair.publicKey" :key="pair.id">
            {{ pair.publicKey }}
          </option>
        </select>
      </div>
      <div class="form-control">
        <label>Pin Code <span class="text-red">*</span></label>
        <input type="text" v-model="pinCode" name="pinCode" placeholder="Enter pin code for decryption" />
      </div>

      <input type="submit" value="Sign" class="btn btn-block" />
    </form>
    <div v-if="signature">
      <h3>
        Signature:
      </h3>
      <p>{{ signature }}</p>
    </div>
    <br>
    <p v-if="error" class="error text-red">
      {{ error }}
    </p>
    <br>
    <a href='javascript:void(0)' @click="onBack($router)">Go Back</a>
  </div>
</template>
  
<script>
import ecc from 'eosjs-ecc';
const CryptoJS = require("crypto-js");

export default {
  name: 'SignMessage',
  inheritAttrs: false, // disable 'non-props' warning
  data() {
    return {
      message: '',
      publicKey: '',
      pinCode: '',
      signature: '',
      isSubmitted: false
    }
  },
  computed: {
    error() {
      return this.isSubmitted && (!this.message || !this.publicKey || !this.pinCode) && 'Please provide all required fields'
    },
    keyPairs() {
      return this.$store.state.keyPairs
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()

      this.isSubmitted = true

      if (!this.message || !this.publicKey || !this.pinCode)
        return

      const pairs = this.$store.state.keyPairs
      const selectedPair = pairs.find(pair => pair.publicKey === this.publicKey)
      if (selectedPair) {
        // get the encrypted private key
        const encPrivKey = selectedPair.encPrivKey

        // use pin code to decrypt the private keys
        const bytes = CryptoJS.AES.decrypt(encPrivKey, this.pinCode)
        const decPrivKey = bytes.toString(CryptoJS.enc.Utf8)

        // original private key
        const originalPrivKey = selectedPair.privateKey

        // check the either if entered pin code for selected public key is valid or not
        if (originalPrivKey !== decPrivKey)
          return alert('Entered pin code for selected public key is invalid. Please try again')

        // use the private key of the selected public key to sign the message
        this.signature = ecc.sign(this.message, originalPrivKey)

        // use the same pin code to encrypt all private keys again
        pairs.map((pair, index) => {
          const newEncPrivKey = CryptoJS.AES.encrypt(pair.encPrivKey, this.pinCode).toString()
          pairs[index].encPrivKey = newEncPrivKey
        });

        this.$store.commit('updateKeys', pairs)
      } else
        return alert('Sorry! We have looked deep and wide but we are unable to find pair for selected public key. Please try again later')
    },
    onBack(router) {
      router.go(-1)
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

.form-control input,
.form-control select {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
</style>