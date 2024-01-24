<template>
  <div id="app" translate="no">
    <!--Aqui irá o sitemap-->
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
// layout em branco da página index
import IndexLayout from '@bmp-vue/core/layouts/IndexLayout';

// layout do sistema
import AppLayout from '@bmp-vue/core/layouts/AppLayout';

export default {
  metaInfo: {
    title: 'Money Plus',
    titleTemplate: '%s - Backoffice'
  },
  name: 'App',
  data() {
    return {
      isLoaded: false
    };
  },
  computed: {
    loading() {
      return (
        this.$store.getters.loading || this.$store.getters.activeRequests > 0
      );
    },
    layout() {
      debugger;
      this.$store.commit('SET_LAYOUT', IndexLayout);
      // verifica se é uma tela para impressão
      if (this.$route.meta.isPrinting) {
        return this.$store.getters.layout;
      } // verifica se não é a tela de login, se for, mantém o layout em branco
      else if (
        !this.$route.meta.anonymousAuth &&
        ['/'].indexOf(this.$route.path) < 0
      ) {
        this.$store.commit('SET_LAYOUT', AppLayout);
      }
      return this.$store.getters.layout;
    }
  },
  mounted() {
    this.verificar();
    var vm = this;
    vm.$store.commit('isMobile');
    if (!vm.$store.getters.isMobile && !vm.$store.getters.drawer) {
      vm.$store.commit('drawer');
    }
    window.addEventListener('resize', function () {
      vm.$store.commit('isMobile');
    });
  },
  methods: {
    verificar: function () {
      var vm = this;
      setTimeout(function () {
        if (!vm.loading) {
          vm.isLoaded = true;
        } else {
          vm.verificar();
        }
      }, 10);
    }
  }
};
</script>
<style lang="scss">
@import '@/assets/styles/variables.scss';
</style>
<style>
html {
  overflow-y: auto;
}

.grecaptcha-badge {
  visibility: hidden;
}

.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(
    .v-input--has-state
  )
  > .v-input__control
  > .v-input__slot
  fieldset {
  color: rgba(0, 0, 0, 0.21);
}

.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(
    .v-input--has-state
  ):not(.v-input--is-disabled)
  > .v-input__control
  > .v-input__slot:hover
  fieldset {
  color: rgba(0, 0, 0, 0.44);
}

.custom-notification {
  padding: 10px;
  margin: 0 5px 5px;
  font-size: 12px;
  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;
  font-family: 'Roboto', sans-serif !important;
  font-size: 14px;
}

.custom-notification.warn {
  background: #ffb648;
  border-left-color: #f48a06;
}

.custom-notification.error {
  background: #e54d42;
  border-left-color: #b82e24;
}

.custom-notification.success {
  background: #68cd86;
  border-left-color: #42a85f;
}

.v-dialog__content {
  align-items: start;
}
#ui-loader-1234.loading-container .loading {
  background-color: transparent;
  border-radius: 0px;
  box-shadow: none;
}

.v-application .secondary--text,
.v-application .secondary--text.text--lighten-2 {
  color: #7a7a7a !important;
  caret-color: black;
}

.v-application .default {
  width: 35px;
  height: 35px;
  margin: 10px 0px;
}
</style>
