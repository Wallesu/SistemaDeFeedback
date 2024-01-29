<template>
  <modal-filtro v-model="model" :submit="submit" size="sm" ref="filtrar">
    <v-col sm="12">
      <input-text label="Nome" v-model="model.nome" />
    </v-col>
    <v-col sm="12">
      <input-select label="Cargo" :options="cargo" v-model="model.cargo" />
    </v-col>
    <v-col sm="12" class="pb-2">
      <input-select label="Setor" :options="setor" v-model="model.setor" />
    </v-col>
    <h4 class="ml-4 mt-1 mb-2">Data de admissão</h4>
    <v-row class="mx-auto">
      <v-col sm="6">
        <input-date label="Data Inicial" v-model="model.dataInicio">
          <template v-if="model.dataInicio" v-slot:append>
            <v-icon @click="model.dataInicio = ''">mdi-close</v-icon>
          </template>
        </input-date>
      </v-col>
      <v-col sm="6">
        <input-date label="Data Final" v-model="model.dataFim">
          <template v-if="model.dataFim" v-slot:append>
            <v-icon @click="model.dataFim = ''">mdi-close</v-icon>
          </template>
        </input-date>
      </v-col>
    </v-row>
  </modal-filtro>
</template>

<script>

export default {

  data() {
    return {
      model: {},
      setor:[
      "Comercial",
      "Desenvolvimento - BackOffice",
      "Desenvolvimento - DBS",
      "Desenvolvimento - DevOps",
      "Desenvolvimento - Safe",
      "Financeiro",
      "Recursos Humanos"
      ],
      cargo:[
        "Analista",
        "Desenvolvedor(a) Júnior",
        "Desenvolvedor(a) Pleno",
        "Desenvolvedor(a) Sênior",
        "Especialista",
        "Gerente",
        "Coordenador(a)",
        "Squad Leader"
      ],
    };
  },
  methods: {
    openModal() {
      this.$refs.filtrar.openModal();
    },
    submit() {
      this.$emit('filtros', this.model);
      this.model = {};
      this.$refs.filtrar.close();
    },
    refresh() {
      this.$emit('refresh');
    }
  }

}

</script>
