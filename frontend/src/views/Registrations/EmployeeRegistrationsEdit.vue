<template>
  <modal-form v-model="show" size="sm" :submit="submit">
    <template v-slot:title> Cadastrar novo funcionário </template>
    <template v-slot:body>
      <input-text
        v-model="model.nome"
        label="Nome"
        :maxLength="200"
        required
      />
      <input-date
        label="Data de nascimento"
        v-model="model.dtNascimento"
        required
      />
      <input-text
        v-model="model.cargo"
        label="Cargo"
        :maxLength="50"
        required
      />
      <input-text
        v-model="model.setor"
        label="Setor"
        :maxLength="50"
        required
      />
      <input-date
        label="Data de admissão"
        v-model="model.dtAdmissao"
        required
      />
    </template>
  </modal-form>
</template>

<script>
import { onUpdated } from "vue";

export default {
  data() {
    return {
      show: false,
      model: {},
    };
  },
  methods: {
    openModal(sender) {
      const th = this;
      if (sender) {
        th.model = {
          ...sender,
          edit: true,
        };
      }
      th.show = true;
    },

    submit() {
      const th = this;
      th.model.edit ? th.update() : th.post();
    },

    update() {
      const th = this;
      let dto = {
        ID: th.model.id,
        Codigo: th.model.codigo,
        DtFeriado: th.model.dtFeriadoOriginal,
        DescricaoFeriado: th.model.descricaoFeriado,
      };

      th.$api.FeriadoExtra.Update(th.model.id, dto).then((response) => {
        if (!response.data?.hasError) {
          th.model = {};
          th.$emit("refresh", null);
          th.show = false;
          th.$api.UI.ShowSuccess("Alterado", "Registro alterado com sucesso");
        }
      });
    },
    post() {
      const th = this;

      let dto = {
        DtFeriado: th.model.dtFeriadoOriginal,
        DescricaoFeriado: th.model.descricaoFeriado,
      };

      th.$api.FeriadoExtra.Create(dto).then((response) => {
        if (!response.data?.hasError) {
          th.model = {};
          th.$emit("refresh", null);
          th.show = false;
          th.$api.UI.ShowSuccess("Inserido", "Registro inserido com sucesso");
        }
      });
    },
  },
};
</script>
