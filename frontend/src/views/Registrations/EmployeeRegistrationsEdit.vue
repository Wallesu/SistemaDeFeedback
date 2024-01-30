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
      <input-select
        :options="cargo"
        v-model="model.cargo"
        label="Cargo"
        :maxLength="50"
        required
      />
      <input-select
        :options="nivel"
        v-model="model.nivel"
        label="Nível"
        :maxLength="3"
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
export default {
  data() {
    return {
      show: false,
      model: {},
      cargo: [
        "Analista",
        "Coordenador(a)",
        "Desenvolvedor(a)",
        "Gerente de projetos",
        "QA/Tester",
        "Tech Lead",
      ],
      nivel: ["", "I", "II", "III"],
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
        id: th.model.id,
        nome: th.model.nome,
        dtNascimento: th.model.dtNascimento,
        cargo: th.model.cargo,
        nivel: th.model.nivel,
        dtInicio: th.model.dtInicio,
        dtFim: th.model.dtFim,
      };
      th.$api.employeeregistrations.Update(th.model.id, dto).then((response) => {
        if (!response.data?.hasError) {
          th.model = {};
          th.$emit("refresh", null);
          th.show = false;
          th.$api.UI.ShowSuccess("Alterado", "Cadastro alterado com sucesso");
        }
      });
    },

    post() {
      const th = this;

      let dto = {
        id: th.model.id,
        nome: th.model.nome,
        dtNascimento: th.model.dtNascimento,
        cargo: th.model.cargo,
        nivel: th.model.nivel,
        dtInicio: th.model.dtInicio,
        dtFim: th.model.dtFim,
      };
      th.$api.employeeregistrations.Create(dto).then((response) => {
        if (!response.data?.hasError) {
          th.model = {};
          th.$emit("refresh", null);
          th.show = false;
          th.$api.UI.ShowSuccess("Inserido", "Cadastro inserido com sucesso");
        }
      });
    },
  },
};
</script>
