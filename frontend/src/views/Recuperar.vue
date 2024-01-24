<template>
  <v-app id="inspire">
    <v-main>
      <Autenticacao recuperar-senha>
        <template #body>
          <v-form ref="form" @submit.prevent="resetSenha">
            <v-col class="py-0">
              <input-text
                v-model="credentials.password"
                label="Nova senha"
                :append-icon="
                  novaSenhaVisivel ? 'visibility' : 'visibility_off'
                "
                :type="novaSenhaVisivel ? 'text' : 'password'"
                maxlength="20"
                @click:append="() => (novaSenhaVisivel = !novaSenhaVisivel)"
              />
            </v-col>
            <v-col class="py-0">
              <input-text
                v-model="credentials.confirmPassword"
                label="Repetir senha"
                :append-icon="
                  repeticaoSenhaVisivel ? 'visibility' : 'visibility_off'
                "
                :type="repeticaoSenhaVisivel ? 'text' : 'password'"
                maxlength="20"
                @click:append="
                  () => (repeticaoSenhaVisivel = !repeticaoSenhaVisivel)
                "
              />
            </v-col>
            <v-col class="pt-0">
              <v-btn
                type="submit"
                color="primary"
                data-cy="atualizar-senha-button"
                block
              >
                Atualizar senha
              </v-btn>
            </v-col>
            <v-col class="py-0 d-flex justify-center">
              <router-link
                to="/"
                class="font-weight-medium caption text-decoration-none"
                >Voltar para o login</router-link
              >
            </v-col>
            <v-col class="pt-0">
              <template v-if="error.length != 0">
                <v-alert type="error" class="mt-3 mb-0" text icon="error">
                  <div v-for="(err, index) in error" :key="index">
                    * {{ err }}
                  </div>
                </v-alert>
              </template>
            </v-col>
          </v-form>
        </template>
      </Autenticacao>
      <Captcha ref="captcha" @mounted="validaToken" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    Autenticacao: () => import('../layouts/Autenticacao'),
    Captcha: () => import('../components/Captcha')
  },
  data() {
    return {
      credentials: {
        password: '',
        confirmPassword: ''
      },
      error: [],
      novaSenhaVisivel: false,
      repeticaoSenhaVisivel: false
    };
  },
  watch: {
    'credentials.password': function (data) {
      this.validaSenhaForte(data, this.credentials.confirmPassword);
    },
    'credentials.confirmPassword': function (data) {
      this.validaSenhaForte(this.credentials.password, data);
    }
  },
  methods: {
    validaSenhaForte: function (password, confirmPassword) {
      const th = this;
      const regexMinusculo = /(?=.*[a-z])/gm;
      const regexMaiusculo = /(?=.*[A-Z])/gm;
      const regexNumero = /(?=.*[0-9])/gm;
      const regexEspecial = /(?=.*[\W])/gm;
      th.error = [];

      regexMinusculo.test(password)
        ? ''
        : th.error.push('Senha deve conter ao menos um caractere minúsculo.');
      regexMaiusculo.test(password)
        ? ''
        : th.error.push('Senha deve conter ao menos um caractere maiúsculo.');
      regexNumero.test(password)
        ? ''
        : th.error.push('Senha deve conter ao menos um número.');
      regexEspecial.test(password)
        ? ''
        : th.error.push('Senha deve conter ao menos um caractere especial.');
      password.length >= 8 && password.length <= 20
        ? ''
        : th.error.push('Senha deve conter entre 8 e 20 caracteres.');
      password === confirmPassword
        ? ''
        : th.error.push('As duas senhas devem ser iguais.');

      if (th.error.length == 0) return true;

      return false;
    },
    resetSenha() {
      const th = this;
      const { password, confirmPassword } = th.credentials;
      if (!th.validaSenhaForte(password, confirmPassword)) return;

      const dto = { ...th.$route.query, password, confirmPassword };
      dto.token = decodeURI(th.$route.query.token).replaceAll(' ', '+');

      th.$api.UI.ShowLoading();
      th.$refs.captcha.execute().then(captchaToken => {
        dto.captchaToken = captchaToken;
        th.$api.Autenticacao.ResetSenha(dto)
          .then(response => {
            if (!response.data?.hasError) {
              th.$api.UI.ShowSuccess(null, 'Senha alterada com sucesso');
              th.$router.push('/');
            }
          })
          .catch(({ response }) => {
            th.error = response.data.msg;
          })
          .finally(() => {
            th.$api.UI.HideLoading();
          });
      });
    },
    validaToken() {
      const th = this;
      const dto = th.$route.query;
      dto.token = decodeURI(th.$route.query.token).replaceAll(' ', '+');

      th.$refs.captcha.execute().then(captchaToken => {
        dto.captchaToken = captchaToken;
        th.$api.Autenticacao.ValidarTokenResetSenha(dto)
          .then(() => {
            th.credentials.token = dto.token;
          })
          .catch(() => {
            th.$api.UI.ShowError(null, 'Token de recuperação é invalido');
            th.$router.push('/');
          });
      });
    }
  }
};
</script>
