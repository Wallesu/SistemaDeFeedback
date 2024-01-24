<template>
  <v-container
    class="fill-height pa-0"
    fluid
    :style="`background-image: url('${require('@/assets/loginbg.jpg')}');background-position: center center; background-size: cover;`"
  >
    <v-col offset-sm="1" sm="10">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" :md="recuperarSenha ? '6' : '4'">
          <v-card class="elevation-12">
            <v-col class="d-flex justify-center">
              <v-avatar size="100" tile>
                <v-img
                  :src="require('shared/images/logo.png')"
                  width="100%"
                  contain
                />
              </v-avatar>
            </v-col>
            <v-card-title
              v-if="$slots.title"
              class="d-flex justify-center pt-0"
            >
              <h5 class="text--disabled font-weight-light">
                <slot name="title" />
              </h5>
            </v-card-title>
            <v-card-text>
              <slot name="body" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  props: {
    recuperarSenha: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
