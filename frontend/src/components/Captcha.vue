<template>
  <div
    id="captcha"
    class="g-recaptcha"></div>
</template>

<script>
const captchaUrl = `https://www.google.com/recaptcha/enterprise.js?render=${process.env.VUE_APP_RECAPTCHA_SITE_KEY}`
/* eslint-disable no-undef */
export default {
  emits: ['mounted'],
  mounted () {
    this.$emit('mounted')
  },
  beforeMount() {
    const script = document.createElement('script')
    script.src = captchaUrl
    script.id = captchaUrl
    script.async = true
    document.head.appendChild(script)
  },
  beforeUnmount() {
    document.getElementById(captchaUrl).remove()
    document.getElementsByClassName('grecaptcha-badge')[0].remove()
  },
  methods: {
    execute () {
      return grecaptcha.enterprise
        .execute(process.env.VUE_APP_RECAPTCHA_SITE_KEY)
        .then(function (token) {
          return token
        })
    }
  }
}
</script>
