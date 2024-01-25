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
import AppLayout from "@bmp-vue/core/layouts/AppLayout.vue";

export default {
  metaInfo: {
    title: 'Sistema de Feedbacks'
  },
  name: 'App',
  data() {
    return {
      isLoaded: false,
      JwtToken: 'eyJhbGciOiJQUzI1NiIsImtpZCI6InppU0tSUW5UUUxKYjdFM1BUc2dXV2ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE3MDYxOTIxOTUsImV4cCI6MTcwNjE5NTc5NSwiaXNzIjoiaHR0cHM6Ly9hdXRoLm1vbmV5cC5kZXYuYnIiLCJhdWQiOlsic3NvLmFwaSIsInNhZmUuYmFja29mZmljZS5hcGkiXSwiY2xpZW50X2lkIjoic2FmZS5hcGkuYmFja29mZmljZSIsInN1YiI6ImM5NTAxMDIwLWQ3OWQtNDY5MS1iZTFmLWQxNWY2MjVhOGMzZSIsImF1dGhfdGltZSI6MTcwNjE5MTQ5MSwiaWRwIjoibG9jYWwiLCJzYWZlX2JhY2tvZmZpY2VfY29kaWdvX29wZXJhZG9yIjoiMTAwMCIsIkJtcERpZ2l0YWwuVXNlcklEIjoiMzY2OSIsInNvY2lhbF9udW1iZXIiOiIxMjMiLCJibXBfZGlnaXRhbF9jb2RpZ29fb3BlcmFkb3IiOiIzNjY5IiwiZ2l2ZW5fbmFtZSI6IlRoaWFnbyBCZXJ0b2xkaSIsIm5hbWUiOiJ0aGlhZ28uYmVydG9sZGlAZnVsbHRlY2hwcm8uY29tLmJyIiwicm9sZSI6WyJCTVAuQmFja29mZmljZS5BZG1pblRJIiwiQk1QLkJhY2tvZmZpY2UuVXNlciIsIlNhZmUuQmFja09mZmljZS5Vc2VyIl0sInByZWZlcnJlZF91c2VybmFtZSI6InRoaWFnby5iZXJ0b2xkaUBmdWxsdGVjaHByby5jb20uYnIiLCJlbWFpbCI6InRoaWFnby5iZXJ0b2xkaUBmdWxsdGVjaHByby5jb20uYnIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwidXNlcm5hbWUiOiJ0aGlhZ28uYmVydG9sZGlAZnVsbHRlY2hwcm8uY29tLmJyIiwic2FmZV9iYWNrb2ZmaWNlX2VwY29kaWdvIjoiMiIsInNjb3BlIjpbImVtYWlsIiwib3BlbmlkIiwicHJvZmlsZSIsInJvbGUiLCJqcF9hcGkuaXM0Iiwic3NvLmFwaS5wYXJ0aWFsLmFjY2VzcyIsInNhZmUuYmFja29mZmljZS5hcGkuZnVsbC5hY2Nlc3MiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.b7jywn9Moqr4Zb2P4flQa6xBdYIm9Qb3bs5VnGF7LgLxFEkjue2tuIbsQyFriaQe7F2QmOJzO7jNIbXqabxM9khG6OFTg-QgthSHa1yrYKqEzCy-i7q0EQucidDdKIq3YuOoFE5lABPaqOMzROv57GvrqxCXfeG5XC9JryLya7QcTffDnwF4vHEgopq4aucm1Cwmlyxjx6ISpOhJO0yzievLC2wWa2o-P7T51v0Dtzzr5u90AnAYXbSW4rCXhrtVLSujaLtIFqVYFsfXkRdgWgZJtet5GKjLF8OGiwVe54nakV6rUb59CCIt1NfPkEuf5imqCYlDZIzSTHFpI2RT3w'
    }
  },
  components: {
    AppLayout,
  },
  computed: {
    layout() {
      this.$store.commit('SET_LAYOUT', AppLayout);
      this.$store.commit('SET_USER_DATA', {
        user: {
          token: this.JwtToken,
          documento: undefined,
        }
      });
      return this.$store.getters.layout;
    }
  }
}
</script>