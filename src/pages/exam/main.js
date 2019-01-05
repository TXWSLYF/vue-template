import Vue from 'vue'
import VueI18n from 'vue-i18n'
import hello from './index'

/* eslint-disable no-new */
Vue.use(VueI18n)
new Vue({
  el: '#app',
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: {
      }
    }
  }),
  components: { hello },
  data () {
    return {
      data: 10
    }
  },
  render () {
    return (
      <hello class="red">
        { this.data }
      </hello>
    )
  }
})
