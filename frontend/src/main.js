import Vue from 'vue';
import App from './App.vue';
import core from '@bmp-vue/core';

Vue.config.productionTip = false;

var controllers = require.context('@/controllers', true, /\.js$/);
const paths = require('@/plugins/router/paths').default;
const theme = require('@/plugins/vuetify/theme').default;

Vue.use(core, {
  controllers,
  paths,
  theme,
  defaultViews: false,
  carregaEnums: false,
  mount: options => {
    new Vue({
      ...options,
      render: h => h(App)
    }).$mount('#app');
  }
});
