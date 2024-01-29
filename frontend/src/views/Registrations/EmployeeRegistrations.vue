<template>
  <div class="mt-5"> 
    <core-grid 
      ref="grid" 
      :onRead="onRead" 
      :schema="schema" 
      :addOption="true" 
      :editOption="false" 
      :deleteOption="false" 
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
import EmployeeRegistrationsFilter from  './EmployeeRegistrationsFilter.vue'
import EmployeeRegistrationsEdit from './EmployeeRegistrationsEdit.vue'
export default{

  components: {
    EmployeeRegistrationsFilter,
    EmployeeRegistrationsEdit
  },

  data: () => ({
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
    schema:[
      { text:"Nome", value:"nome" },
      { text:"Data de nascimento", value:"dtNascimento" },
      { text:"Cargo", value:"cargo" },
      { text:"Setor", value:"setor" },
      { text:"Data de admissão", value:"dtAdmissao" }
    ],
    model: {
      nome: "",
      dtNascimento: "",
      cargo: "",
      setor: "",
      dataInicio: "",
      dataFim: ""
    }
  }),

  methods: {

    onRead(options, search) {
      const th = this;
      let dto = {
        ...options,
        search
      };
      th.$api.employeeregistrations.GetAll(dto).then(response => {
        if (!response.data?.hasError) {
          let newData = response.data.map(item => {
            return {
              ...item,
              dtAdmissao: new Date(item.dtAdmissao).toLocaleDateString('pt-BR'),
            };
          });
          options.success(newData, response.count);
        }
      });
    },

    filtrarPesquisa(model) {
      const th = this;
      let novaDataFim = null;
      let novaDataInicio = null;

      novaDataFim = model.dataFim
        ? new Date(model.dataFim + ' 21:00:00.000').toUTCString()
        : null;
      novaDataInicio = model.dataInicio
        ? new Date(model.dataInicio).toUTCString()
        : null;

      let dto = {
        Nome: model.nome ?? null,
        DtNascimento: model.dtNascimento ?? null,
        Cargo: model.cargo ?? null,
        Setor: model.setor ?? null,
        DtInicio: novaDataInicio,
        DtFim: novaDataFim
      };

      let filtro = Object.assign(dto, th.$refs.grid.options);
      th.onRead(filtro, null);
    },

    refresh() {
      this.$refs.grid.refresh()
    },


  }

}

</script>

