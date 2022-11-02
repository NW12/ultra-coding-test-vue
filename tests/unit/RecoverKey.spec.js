import { shallowMount } from '@vue/test-utils'
import RecoverKey from '../../src/views/RecoverKey.vue'

const factory = (values = {}) => {
  return shallowMount(RecoverKey, {
    data() {
      return {
        ...values
      }
    }
  })
}

describe('RecoverKey', () => {
  it('Renders an error when any of the requied field is missing', () => {
    const wrapper = factory({ message: '', signature: '', isSubmitted: true })

    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  it('Does not render an error if all fields are given properly', () => {
    const wrapper = factory({ message: 'Lorem ipsum...', signature: 'SIG_...', isSubmitted: true })

    expect(wrapper.find('.error').exists()).toBeFalsy()
  })
})

