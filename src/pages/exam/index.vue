<i18n>
{
  "en": {
    "hello": "hello"
  },
  "ja": {
    "hello": "こ"
  }
}
</i18n>

<script>
export default {
  data () {
    return {
      msg: 'hel12'
    }
  },
  methods: {
    async sayHello () {
      console.log(this.$t('hello'))
    }
  },
  render () {
    return (
      <div class='hello' on-click={ this.sayHello }>
        { this.msg }
        { this.$slots.default }
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
  .hello {
    color: green;
  }
</style>
