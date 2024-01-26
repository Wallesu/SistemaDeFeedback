<template>
  <div id="app">

    <component :is="layout" />

    <notifications
      group="notifications-bottom-right"
      position="bottom right"
      classes="custom-notification"
    />

    <BlockUI v-if="loading" id="ui-loader-1234">
      <v-progress-circular indeterminate size="64" />
    </BlockUI>

  </div>
</template>

<script>
import AppLayout from '@bmp-vue/core/layouts/AppLayout.vue'
import IndexLayout from '@bmp-vue/core/layouts/IndexLayout.vue'

export default {

  metaInfo: {
    title: 'Sistema de Feedbacks'
  },

  name: 'App',

  components: {
    AppLayout,
    IndexLayout
  },

  computed: {

    loading() {
      return (
        this.$store.getters.loading || this.$store.getters.activeRequests > 0
      );
    },

    layout() {
      if (!this.$route.meta.anonymousAuth && ['/'].indexOf(this.$route.path) < 0) {
          this.$store.commit('SET_LAYOUT', AppLayout);
      }
      else{
        this.$store.commit('SET_LAYOUT', IndexLayout);
      }
      return this.$store.getters.layout;
    }

  }
}
</script>