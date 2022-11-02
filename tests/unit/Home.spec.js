import { shallowMount } from '@vue/test-utils'
import Home from '../../src/views/Home.vue'

const factory = (values = {}) => {
  return shallowMount(Home, {
    data() {
      return {
        ...values
      }
    }
  })
}

describe('Home', () => {
  it('Renders an error when Genreate & Encrypt button is clicked but pin code is empty', () => {
    const wrapper = factory({ pinCode: '', isSubmitted: true })

    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  it('Renders an error when Genreate & Encrypt button is clicked but pin code is whitespace', () => {
    const wrapper = factory({ pinCode: ' '.repeat(4), isSubmitted: true })

    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  it('Does not render an error when pin code exists', () => {
    const wrapper = factory({ pinCode: '123', isSubmitted: true })

    expect(wrapper.find('.error').exists()).toBeFalsy()
  })
})

