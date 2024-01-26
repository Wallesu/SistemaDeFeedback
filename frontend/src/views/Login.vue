<template>
    <v-app id="inspire">
        <v-btn
            @click="login"
            class="text-center mt-5 mx-auto"
            type="submit"
            color="primary"
            large
            style="width: 80%"
            data-cy="login-button">
            Login
        </v-btn>
    </v-app>
</template>

<script>
export default {
    methods: {
        login(){
            let tokenExpiration = new Date();
            tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 50);

            let data = {
                user: {
                    token: 'eyJhbGciOiJQUzI1NiIsImtpZCI6InppU0tSUW5UUUxKYjdFM1BUc2dXV2ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE3MDYxNDU2NjEsImV4cCI6MTcwNjE0OTI2MSwiaXNzIjoiaHR0cHM6Ly9hdXRoLm1vbmV5cC5kZXYuYnIiLCJhdWQiOlsic3NvLmFwaSIsInNhZmUuYmFja29mZmljZS5hcGkiXSwiY2xpZW50X2lkIjoic2FmZS5hcGkuYmFja29mZmljZSIsInN1YiI6ImM5NTAxMDIwLWQ3OWQtNDY5MS1iZTFmLWQxNWY2MjVhOGMzZSIsImF1dGhfdGltZSI6MTcwNjE0NTY1NywiaWRwIjoibG9jYWwiLCJzYWZlX2JhY2tvZmZpY2VfY29kaWdvX29wZXJhZG9yIjoiMTAwMCIsIkJtcERpZ2l0YWwuVXNlcklEIjoiMzY2OSIsInNvY2lhbF9udW1iZXIiOiIxMjMiLCJibXBfZGlnaXRhbF9jb2RpZ29fb3BlcmFkb3IiOiIzNjY5IiwiZ2l2ZW5fbmFtZSI6IlRoaWFnbyBCZXJ0b2xkaSIsIm5hbWUiOiJ0aGlhZ28uYmVydG9sZGlAZnVsbHRlY2hwcm8uY29tLmJyIiwicm9sZSI6WyJCTVAuQmFja29mZmljZS5BZG1pblRJIiwiQk1QLkJhY2tvZmZpY2UuVXNlciIsIlNhZmUuQmFja09mZmljZS5Vc2VyIl0sInByZWZlcnJlZF91c2VybmFtZSI6InRoaWFnby5iZXJ0b2xkaUBmdWxsdGVjaHByby5jb20uYnIiLCJlbWFpbCI6InRoaWFnby5iZXJ0b2xkaUBmdWxsdGVjaHByby5jb20uYnIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwidXNlcm5hbWUiOiJ0aGlhZ28uYmVydG9sZGlAZnVsbHRlY2hwcm8uY29tLmJyIiwic2FmZV9iYWNrb2ZmaWNlX2VwY29kaWdvIjoiMyIsInNjb3BlIjpbImVtYWlsIiwib3BlbmlkIiwicHJvZmlsZSIsInJvbGUiLCJqcF9hcGkuaXM0Iiwic3NvLmFwaS5wYXJ0aWFsLmFjY2VzcyIsInNhZmUuYmFja29mZmljZS5hcGkuZnVsbC5hY2Nlc3MiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.jFF4XkmUIpkkgRfo0km4gxLhlkSzzO9POrDMAtpH1AdkRCnXLNRxVw3ZPhJu8VkND_J_TO4aea_fi0CzDvkdCKeWnXmoOhfmLLi3yPj9UL3eaMye80y17ti_QeHCCZGkQROwYjSM3l_V2Htr86dS8PEOfRDF9qD6UfQhIK-bc4ymih8U0fxH-lsJc978_EJajQVGuhIA7stvGLYLjwkUWIaDsPlmFdsBpX_54MQbfIiOHIlTeALOAhDLdNyR9PBYh4IvDeiHJYI1LM11a3WbeDKOuAjbT6Y2i7Iu66H4BWcv0t1yxpqfsy0rwUYydXm1bxpEN5i74_WlPt_ycwrQVg',
                    refreshToken: 'XhWv3uqkBRrynl35aE81bbpJw1MBWjAdgnkTo3IlMiY',
                    roles: ["BMP.Backoffice.AdminTI","BMP.Backoffice.User","Safe.BackOffice.User"],
                    expiresAt: tokenExpiration
                }
            }
            this.$store.commit('SET_USER_DATA', data);
            this.$router.push({ path: '/home' })
        }
    }
}
</script>

<style>

</style>