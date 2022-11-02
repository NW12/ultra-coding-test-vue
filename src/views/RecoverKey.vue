<template>
  <div>
    <h3>Recover Key</h3>
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
        <label>Message <span class="text-red">*</span></label>
        <input type="text" v-model="message" name="message" placeholder="Input a message to be signed" />
      </div>

      <div class="form-control">
        <label>Signature <span class="text-red">*</span></label>
        <input type="text" v-model="signature" name="signature" placeholder="Enter signature" />
      </div>

      <input type="submit" value="Recover" class="btn btn-block" />
    </form>
    <div v-if="publicKey">
      <h3>
        Recovered Public Key:
      </h3>
      <p>{{ publicKey }}</p>
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

export default {
  name: 'RecoverKey',
  inheritAttrs: false, // disable 'non-props' warning
  data() {
    return {
      message: '',
      signature: '',
      publicKey: '',
      isSubmitted: false
    }
  },
  computed: {
    error() {
      return (!this.message || !this.signature) && this.isSubmitted && 'Please provide all required fields'
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()

      this.isSubmitted = true
      
      if (!this.message || !this.signature)
        return

      // recover public key from signature
      this.publicKey = ecc.recover(this.signature, this.message)
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

.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
</style>