<template>
  <v-app id="inspire">
    <v-main>
      <Autenticacao>
        <template
          v-if="!usernameEnviado"
          #title>
          Esqueceu a senha?
        </template>
        <template #body>
          <v-form
            v-if="!usernameEnviado"
            @submit.prevent="solicitarReset">
            <v-col>
              Entre com seu e-mail ou nome de usuário, vamos enviar um código temporário para que você mude a senha.
            </v-col>
            <v-col class="pb-0">
              <input-text
                v-model="model.username"
                label="Usuário"
                autofocus
                placeholder=" " />
            </v-col>
            <v-col class="pt-0">
              <router-link
                to="/"
                class="float-right font-weight-medium caption text-decoration-none">Voltar para o login</router-link>
              <v-btn
                type="submit"
                :disabled="!model.username"
                color="primary"
                data-cy="esqueceu-senha-button">
                Enviar
              </v-btn>
              <v-alert
                v-show="error"
                type="error"
                class="mt-3 mb-0"
                text
                icon="error">
                {{error}}
              </v-alert>
            </v-col>
          </v-form>
          <div
            v-else
            class="text-center">
            <v-row>
              <v-col>
                <h2>Verifique seu Email</h2>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pb-0">
                <p>
                  <b>Enviamos um email para o seu endereço:</b><br>
                  Verifique sua caixa de entrada e siga o link para criar uma nova senha.
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pt-0">
                <router-link
                  to="/"
                  class="font-weight-medium caption text-decoration-none">
                  Voltar para o login
                </router-link>
              </v-col>
            </v-row>
          </div>
        </template>
      </Autenticacao>
      <Captcha
        ref="captcha"
        v-model="model"/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    Autenticacao: () => import('../layouts/Autenticacao'),
    Captcha: () => import('../components/Captcha')
  },
  data () {
    return {
      model: {
        username: '',
        captchaToken: ''
      },
      error: '',
      usernameEnviado: false
    }
  },
  methods: {
    solicitarReset () {
      const th = this

      th.$api.UI.ShowLoading()
      th.$refs.captcha.execute().then(captchaToken => {
        th.model.captchaToken = captchaToken
        th.$api.Autenticacao.SolicitarTokenResetSenha(th.model)
          .then(() => {
            th.usernameEnviado = true
          })
          .catch(({ response }) => {
            th.error = response.data.msg
          })
          .finally(() => {
            th.$api.UI.HideLoading()
          })
      })
    }
  }
}
</script>
