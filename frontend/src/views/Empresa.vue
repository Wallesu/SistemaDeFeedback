<template>
  <v-app id="inspire">
    <v-main>
      <Autenticacao>
        <template #body>
          <v-form @submit.prevent="login">
            <v-col class="pt-0">
              <v-select
                v-model="select"
                data-cy="select-empresa"
                :items="items"
                item-value="epCodigo"
                item-text="nome"
                return-object
                label="Empresa"
                required
                dense
                outlined
              />
              <v-btn
                type="submit"
                :disabled="!select"
                color="primary"
                data-cy="login-button"
              >
                Entrar
              </v-btn>
            </v-col>
          </v-form>
        </template>
      </Autenticacao>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    Autenticacao: () => import('../layouts/Autenticacao')
  },
  data() {
    return {
      select: {},
      items: []
    };
  },
  beforeMount() {
    const th = this;
    const { accessToken } = th.$user;
    th.$api.UI.ShowLoading();
    th.$api.BackOffice.ListarBackOffice(accessToken)
      .then(pessoas => {
        th.items = pessoas.map(({ epCodigo, nome }) => {
          return { epCodigo, nome };
        });
        th.$api.UI.HideLoading();
      })
      .catch(() => {
        this.$router.push({ path: '/' });
      });
  },
  methods: {
    async login() {
      const { epCodigo } = this.select;
      const { accessToken, refreshToken } = this.$user;

      if (!epCodigo) {
        this.$api.UI.ShowError('Erro', 'Selecione uma empresa');
        return;
      }

      const dto = { epCodigo: epCodigo, token: refreshToken };

      const data = await this.$api.Autenticacao.RefreshBackOffice(
        dto,
        accessToken
      );
      data.expires = data.expiresIn;
      const user = this.$api.UTIL.Auth.RegisterToken(data);

      this.$store.dispatch('setUserData', { user });
      this.$router.push({ path: '/dashboard' });
    }
  }
};
</script>
