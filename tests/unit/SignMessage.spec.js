import { shallowMount } from '@vue/test-utils'
import SignMessage from '../../src/views/SignMessage.vue'

const factory = (values = {}) => {
  return shallowMount(SignMessage, {
    data() {
      return {
        ...values
      }
    },
    computed: {
      error() {
        const { isSubmitted, message, publicKey, pinCode } = values
        return isSubmitted && (!message || !publicKey || !pinCode) && 'Please provide all required fields'
      },
      keyPairs() {
        const pairs = [
          {
            id: 1,
            encPrivKey: "U2FsdGVkX18dRf54fZ3VahyJQeXZjzgu+SlhpHPhUbtXtJ1aZwluLH+nNveLjjqYhOzD4dgfWGD7Zce7GWHpDyTYYXhwrk9FlxoYD3vR13Y=",
            privateKey: "5J71mTutHRb37Z1ZVRy63Gf8oY49bqEjUkV2W8DBE6A2Ga7M6Nv",
            publicKey: "EOS5dF8pjSc8XfMe5rKZai9xqfVjwsDYL4J6as5t2K4hMsCPSKjgM"
          },
          {
            id: 2,
            encPrivKey: "U2FsdGVkX1829v5V+Hd+/Nqrm0yDkMiV0Anw24D0N/2PtCa+kxNUcJrV977b1IccoB1X8/mWih6H6J3Xmo7eRIS2+T2vAdiOF//2H3eRUak=",
            privateKey: "5JUbvwGG7YUrEMnqtVr4wGEzudRVayPqvtncwnAwLXd7XTQJxVs",
            publicKey: "EOS8Hwtz9SHpXhRZUeNWhUxLJshCSQt52khc1LSTtgg8d1syhpoDK"
          },
          {
            id: 3,
            encPrivKey: "U2FsdGVkX18IiwdcNl+GviXJYBoo2yQyxuXjv60Oha5D2APlR0qnImXXbPCCDbcSH60jGSZybFTAiYV2jPvks0Vj9wlmFx3nIsW000QbPHc=",
            privateKey: "5JsYbQbm6DxE7AXoLvpFMAnaXmKM6oLsf8JoXapvfd9Kxrovgtd",
            publicKey: "EOS8ixKZ3FdnjPu1QwPoR19t8Sp3TqjEWxXuqoRXbek8yAU1Gj6sY"
          },
          {
            id: 4,
            encPrivKey: "U2FsdGVkX19rGVEHdcxKPwmxms0+x/2PArCpaQBPi/D/qUS3BGUjrW7Bos8dHDRFeQ7MNr9AHDl62epP42esKui6O0x7qYEN2V+Hw3s1UvI=",
            privateKey: "5Jn7QqzAp7LR13nhRohte7LpG82M4yCMAmxQqVdrRZeS3qn4qpc",
            publicKey: "EOS5kEiaeYH8wwXoF9joSnwJX4L759HqHNVPw3peQyND39L1gFzMU"
          },
          {
            id: 5,
            encPrivKey: "U2FsdGVkX19ysldnrfqRr/SJOKYtaK/wOo4Lx85IHSvGOSZSlnkMhKDP/AzKIB0EPV81OGkDBj/0fIpohOhHViAxieVrcU/xJck5IXtyDmE=",
            privateKey: "5Hq18GmsVFDroCDTRvAXFqiCVSN95Rt6RVFsuyvs1UAfJGjgj4z",
            publicKey: "EOS8BTX28izJGj32Uk2ChtuiRngNemrTFeoyAAsJJhpi6qto9kHLe"
          }
        ]
        return pairs
      }
    }
  })
}

describe('SignMessage', () => {
  it('Renders an error when any of the requied field is missing', () => {
    const wrapper = factory({ message: '', publicKey: '', pinCode: '', isSubmitted: true })
    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  it('Does not render an error if all fields are given properly', () => {
    const wrapper = factory({ message: 'Hello World!', publicKey: 'EOS5dF8pjSc8XfMe5rKZai9xqfVjwsDYL4J6as5t2K4hMsCPSKjgM', pinCode: '123', isSubmitted: true })

    expect(wrapper.find('.error').exists()).toBeFalsy()
  })
})