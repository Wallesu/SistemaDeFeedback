<template>
  <v-app id="inspire">
    <v-main>
      <Autenticacao>
        <template #title>
          Login
        </template>
        <template #body>
          <v-form @submit.prevent="login">
            <v-col class="py-0">
              <input-text
                v-model="credentials.username"
                label="Usuário"
                autofocus
                placeholder=" "
                data-cy="username" />
            </v-col>
            <v-col class="py-0">
              <input-text
                v-model="credentials.password"
                label="Senha"
                :append-icon="senhaVisivel ? 'visibility' : 'visibility_off'"
                :type="senhaVisivel ? 'text' : 'password'"
                placeholder=" "
                data-cy="password"
                @click:append="() => (senhaVisivel = !senhaVisivel)" />
            </v-col>
            <v-col class="pt-0">
              <v-btn
                type="submit"
                :disabled="!credentials.username || !credentials.password"
                color="primary"
                data-cy="login-button">
                Entrar
              </v-btn>
              <router-link
                to="/senha/lembrar"
                class="float-right font-weight-medium caption text-decoration-none">Esqueceu a senha?</router-link>
              <v-alert
                v-show="error"
                type="error"
                class="mt-3"
                text
                icon="error">
                {{ error }}
              </v-alert>
            </v-col>
          </v-form>
        </template>
      </Autenticacao>
      <Captcha ref="captcha" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
  metaInfo: {
    title: 'Money Plus - Login'
  },
  components: {
    Autenticacao: () => import('../layouts/Autenticacao'),
    Captcha: () => import('../components/Captcha')
  },
  data: () => ({
    credentials: {},
    error: '',
    senhaVisivel: false
  }),
  methods: {
    login () {
      const th = this
      th.$user.token = 'eyJhbGciOiJQUzI1NiIsImtpZCI6InppU0tSUW5UUUxKYjdFM1BUc2dXV2ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE3MDYxMjY4MTAsImV4cCI6MTcwNjEzMDQxMCwiaXNzIjoiaHR0cHM6Ly9hdXRoLm1vbmV5cC5kZXYuYnIiLCJhdWQiOlsic3NvLmFwaSIsInNhZmUuYmFja29mZmljZS5hcGkiXSwiY2xpZW50X2lkIjoic2FmZS5hcGkuYmFja29mZmljZSIsInN1YiI6ImM5NTAxMDIwLWQ3OWQtNDY5MS1iZTFmLWQxNWY2MjVhOGMzZSIsImF1dGhfdGltZSI6MTcwNjEyNjgwNiwiaWRwIjoibG9jYWwiLCJzYWZlX2JhY2tvZmZpY2VfY29kaWdvX29wZXJhZG9yIjoiMTAwMCIsIkJtcERpZ2l0YWwuVXNlcklEIjoiMzY2OSIsInNvY2lhbF9udW1iZXIiOiIxMjMiLCJibXBfZGlnaXRhbF9jb2RpZ29fb3BlcmFkb3IiOiIzNjY5IiwiZ2l2ZW5fbmFtZSI6IlRoaWFnbyBCZXJ0b2xkaSIsIm5hbWUiOiJ0aGlhZ28uYmVydG9sZGlAZnVsbHRlY2hwcm8uY29tLmJyIiwicm9sZSI6WyJCTVAuQmFja29mZmljZS5BZG1pblRJIiwiQk1QLkJhY2tvZmZpY2UuVXNlciIsIlNhZmUuQmFja09mZmljZS5Vc2VyIl0sInByZWZlcnJlZF91c2VybmFtZSI6InRoaWFnby5iZXJ0b2xkaUBmdWxsdGVjaHByby5jb20uYnIiLCJlbWFpbCI6InRoaWFnby5iZXJ0b2xkaUBmdWxsdGVjaHByby5jb20uYnIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwidXNlcm5hbWUiOiJ0aGlhZ28uYmVydG9sZGlAZnVsbHRlY2hwcm8uY29tLmJyIiwic2FmZV9iYWNrb2ZmaWNlX2VwY29kaWdvIjoiMyIsInNjb3BlIjpbImVtYWlsIiwib3BlbmlkIiwicHJvZmlsZSIsInJvbGUiLCJqcF9hcGkuaXM0Iiwic3NvLmFwaS5wYXJ0aWFsLmFjY2VzcyIsInNhZmUuYmFja29mZmljZS5hcGkuZnVsbC5hY2Nlc3MiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.O_3qe7DyuzRnvWLSw6RZmt3LDdy-KA2Kj3UYZuld2ihihfLR2lwlp9zLT9i3reaUp2KbOGNpjQ5mdLvg4SdfD-JQ8NIvi49_Q79z4ywigjk0YwYqXLugaYELex-wiKKxL4EwH0xw5XgvODbBsREBfFxhn8ojjD-xvZywDVBi20Rk1TH8pt5ovGiHCDBxvLyuZDfvWQEkO4lqPXeBU73IDlbDQFXsmHeNWPRQcxInuChm0d0FEuk5QvaipI4aD2N3_wjPaWGMQjn7FuHAuK7t1n2Fuu9ZQ99hFpBrDDTBUpWr2V4Avdp5X5GebTeJhdeOqR5zX4iCvbwPx-Wkh4fnZw","refreshToken":"c6EPlhuO6hph1Pv2r8-iRM3i_sHsZhw3ySV7F9pBscw'
      th.$user.refreshToken = 'eyJhbGciOiJQUzI1NiIsImtpZCI6InppU0tSUW5UUUxKYjdFM1BUc2dXV2ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE3MDYxMjY4MTAsImV4cCI6MTcwNjEzMDQxMCwiaXNzIjoiaHR0cHM6Ly9hdXRoLm1vbmV5cC5kZXYuYnIiLCJhdWQiOlsic3NvLmFwaSIsInNhZmUuYmFja29mZmljZS5hcGkiXSwiY2xpZW50X2lkIjoic2FmZS5hcGkuYmFja29mZmljZSIsInN1YiI6ImM5NTAxMDIwLWQ3OWQtNDY5MS1iZTFmLWQxNWY2MjVhOGMzZSIsImF1dGhfdGltZSI6MTcwNjEyNjgwNiwiaWRwIjoibG9jYWwiLCJzYWZlX2JhY2tvZmZpY2VfY29kaWdvX29wZXJhZG9yIjoiMTAwMCIsIkJtcERpZ2l0YWwuVXNlcklEIjoiMzY2OSIsInNvY2lhbF9udW1iZXIiOiIxMjMiLCJibXBfZGlnaXRhbF9jb2RpZ29fb3BlcmFkb3IiOiIzNjY5IiwiZ2l2ZW5fbmFtZSI6IlRoaWFnbyBCZXJ0b2xkaSIsIm5hbWUiOiJ0aGlhZ28uYmVydG9sZGlAZnVsbHRlY2hwcm8uY29tLmJyIiwicm9sZSI6WyJCTVAuQmFja29mZmljZS5BZG1pblRJIiwiQk1QLkJhY2tvZmZpY2UuVXNlciIsIlNhZmUuQmFja09mZmljZS5Vc2VyIl0sInByZWZlcnJlZF91c2VybmFtZSI6InRoaWFnby5iZXJ0b2xkaUBmdWxsdGVjaHByby5jb20uYnIiLCJlbWFpbCI6InRoaWFnby5iZXJ0b2xkaUBmdWxsdGVjaHByby5jb20uYnIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwidXNlcm5hbWUiOiJ0aGlhZ28uYmVydG9sZGlAZnVsbHRlY2hwcm8uY29tLmJyIiwic2FmZV9iYWNrb2ZmaWNlX2VwY29kaWdvIjoiMyIsInNjb3BlIjpbImVtYWlsIiwib3BlbmlkIiwicHJvZmlsZSIsInJvbGUiLCJqcF9hcGkuaXM0Iiwic3NvLmFwaS5wYXJ0aWFsLmFjY2VzcyIsInNhZmUuYmFja29mZmljZS5hcGkuZnVsbC5hY2Nlc3MiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.O_3qe7DyuzRnvWLSw6RZmt3LDdy-KA2Kj3UYZuld2ihihfLR2lwlp9zLT9i3reaUp2KbOGNpjQ5mdLvg4SdfD-JQ8NIvi49_Q79z4ywigjk0YwYqXLugaYELex-wiKKxL4EwH0xw5XgvODbBsREBfFxhn8ojjD-xvZywDVBi20Rk1TH8pt5ovGiHCDBxvLyuZDfvWQEkO4lqPXeBU73IDlbDQFXsmHeNWPRQcxInuChm0d0FEuk5QvaipI4aD2N3_wjPaWGMQjn7FuHAuK7t1n2Fuu9ZQ99hFpBrDDTBUpWr2V4Avdp5X5GebTeJhdeOqR5zX4iCvbwPx-Wkh4fnZw","refreshToken":"c6EPlhuO6hph1Pv2r8-iRM3i_sHsZhw3ySV7F9pBscw'
      localStorage.setItem('user', '{"token":"eyJhbGcJQUzI1NiIsImtpZCI6InppU0tSUW5UUUxKYjdFM1BUc2dXV2ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE3MDYxMjY4MTAsImV4cCI6MTcwNjEzMDQxMCwiaXNzIjoiaHR0cHM6Ly9hdXRoLm1vbmV5cC5kZXYuYnIiLCJhdWQiOlsic3NvLmFwaSIsInNhZmUuYmFja29mZmljZS5hcGkiXSwiY2xpZW50X2lkIjoic2FmZS5hcGkuYmFja29mZmljZSIsInN1YiI6ImM5NTAxMDIwLWQ3OWQtNDY5MS1iZTFmLWQxNWY2MjVhOGMzZSIsImF1dGhfdGltZSI6MTcwNjEyNjgwNiwiaWRwIjoibG9jYWwiLCJzYWZlX2JhY2tvZmZpY2VfY29kaWdvX29wZXJhZG9yIjoiMTAwMCIsIkJtcERpZ2l0YWwuVXNlcklEIjoiMzY2OSIsInNvY2lhbF9udW1iZXIiOiIxMjMiLCJibXBfZGlnaXRhbF9jb2RpZ29fb3BlcmFkb3IiOiIzNjY5IiwiZ2l2ZW5fbmFtZSI6IlRoaWFnbyBCZXJ0b2xkaSIsIm5hbWUiOiJ0aGlhZ28uYmVydG9sZGlAZnVsbHRlY2hwcm8uY29tLmJyIiwicm9sZSI6WyJCTVAuQmFja29mZmljZS5BZG1pblRJIiwiQk1QLkJhY2tvZmZpY2UuVXNlciIsIlNhZmUuQmFja09mZmljZS5Vc2VyIl0sInByZWZlcnJlZF91c2VybmFtZSI6InRoaWFnby5iZXJ0b2xkaUBmdWxsdGVjaHByby5jb20uYnIiLCJlbWFpbCI6InRoaWFnby5iZXJ0b2xkaUBmdWxsdGVjaHByby5jb20uYnIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwidXNlcm5hbWUiOiJ0aGlhZ28uYmVydG9sZGlAZnVsbHRlY2hwcm8uY29tLmJyIiwic2FmZV9iYWNrb2ZmaWNlX2VwY29kaWdvIjoiMyIsInNjb3BlIjpbImVtYWlsIiwib3BlbmlkIiwicHJvZmlsZSIsInJvbGUiLCJqcF9hcGkuaXM0Iiwic3NvLmFwaS5wYXJ0aWFsLmFjY2VzcyIsInNhZmUuYmFja29mZmljZS5hcGkuZnVsbC5hY2Nlc3MiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.O_3qe7DyuzRnvWLSw6RZmt3LDdy-KA2Kj3UYZuld2ihihfLR2lwlp9zLT9i3reaUp2KbOGNpjQ5mdLvg4SdfD-JQ8NIvi49_Q79z4ywigjk0YwYqXLugaYELex-wiKKxL4EwH0xw5XgvODbBsREBfFxhn8ojjD-xvZywDVBi20Rk1TH8pt5ovGiHCDBxvLyuZDfvWQEkO4lqPXeBU73IDlbDQFXsmHeNWPRQcxInuChm0d0FEuk5QvaipI4aD2N3_wjPaWGMQjn7FuHAuK7t1n2Fuu9ZQ99hFpBrDDTBUpWr2V4Avdp5X5GebTeJhdeOqR5zX4iCvbwPx-Wkh4fnZw","refreshToken":"c6EPlhuO6hph1Pv2r8-iRM3i_sHsZhw3ySV7F9pBscw","roles":["BMP.Backoffice.AdminTI","BMP.Backoffice.User","Safe.BackOffice.User"],"expiresAt":"2024-01-24T21:06:45.919Z"}')
      localStorage.setItem('status', 'loggedIn')

      th.$router.push({ path: '/cadastro-funcionario' })
      

       
   
    },
  }
}
</script>
