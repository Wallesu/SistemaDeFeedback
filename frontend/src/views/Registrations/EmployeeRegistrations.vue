<template>
  <div class="mt-5">
    <core-grid
      ref="grid"
      :onRead="onRead"
      :schema="schema"
      :addOption="true"
      :editOption="true"
      :deleteOption="true"
      filterOption
    />
    <EmployeeRegistrationsFilter
      ref="filtrar"
      @refresh="refresh()"
      @filtros="filtrarPesquisa"
      size="lg"
    />
    <EmployeeRegistrationsEdit 
      ref="editar" 
      @refresh="refresh" 
    />
  </div>
</template>

<script>
import EmployeeRegistrationsFilter from "./EmployeeRegistrationsFilter.vue";
import EmployeeRegistrationsEdit from "./EmployeeRegistrationsEdit.vue";
export default {
  components: {
    EmployeeRegistrationsFilter,
    EmployeeRegistrationsEdit,
  },

  data: () => ({
    cargo: [
      "Analista",
      "Coordenador(a)",
      "Desenvolvedor(a)",
      "Gerente de projetos",
      "QA/Tester",
      "Tech Lead",
    ],
    nivel: ["", "I", "II", "III"],
    schema: [
      { text: "Nome", value: "nome" },
      { text: "Data de nascimento", value: "dtNascimento" },
      { text: "Cargo", value: "cargo" },
      { text: "Nível", value: "nivel" },
      { text: "Data de admissão", value: "dtAdmissao" },
    ],
    model: {
      id: "",
      nome: "",
      dtNascimento: "",
      cargo: "",
      nivel: "",
      dtInicio: "",
      dtFim: "",
    },
  }),

  methods: {
    onRead(options, search) {
      const th = this;
      let dto = {
        ...options,
        search,
      };
      th.$api.employeeregistrations.GetAll(dto).then((response) => {
        if (!response.data?.hasError) {
          let newData = response.data.map((item) => {
            return {
              ...item,
              dtAdmissao: new Date(item.dtAdmissao).toLocaleDateString("pt-BR"),
            };
          });
          options.success(newData, response.count);
        }
      });
    },

    filtrarPesquisa(model) {
      const th = this;
      let novaDtFim = null;
      let novaDtInicio = null;

      novaDtFim = model.dtFim
        ? new Date(model.dtFim + " 21:00:00.000").toUTCString()
        : null;
      novaDtInicio = model.dtInicio
        ? new Date(model.dtInicio).toUTCString()
        : null;

      let dto = {
        Id: model.id,
        Nome: model.nome,
        DtNascimento: model.dtNascimento,
        Cargo: model.cargo,
        Nivel: model.nivel,
        DtInicio: novaDtInicio,
        DtFim: novaDtFim,
      };

      let filtro = Object.assign(dto, th.$refs.grid.options);
      th.onRead(filtro, null);
    },

    refresh() {
      this.$refs.grid.refresh();
    },
  },
};
</script>

