<template>
  <div>
    <v-tooltip
      top
      :disabled="!tooltip">
      <template #activator="{ on }">
        <div v-on="on">
          <v-text-field
            v-model="layout"
            v-uppercase
            :label="label"
            append-icon="fas fa-search"
            readonly
            outlined
            dense
            @click="openModal"
          />
        </div>
      </template>
      <span>{{ tooltipText }}</span>
    </v-tooltip>
    <modal-form
      v-model="show"
      size="md"
      :show-submit="false"
    >
      <template #title>
        <i class="fas fa-search"></i>Localizar Layout Boleto
      </template>
      <template #body>
        <core-grid
          ref="grid"
          :key="chave"
          flat
          :on-read="onRead"
          :schema="schema"
          :delete-option="false"
          :add-option="false"
          :edit-option="false"
          :page-size="10"
          server-side
        />
      </template>
    </modal-form>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Código Layout Boleto'
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    tooltipText: {
      type: String,
      default: 'Layout Bancário para Boletos Avulsos e de Liquidação'
    },
    value: { type: String, default: '' }
  },
  emits: ['input'],
  data () {
    return {
      show: false,
      chave: 0,
      model:{},
      schema: [
        { value: 'nomeEmpresa', text: 'Empresa', width: '250' },
        { value: 'codigo', text: 'Codigo', width: '100' },
        { value: 'ativo', text: 'Ativo', format: 'boolean', width: '50' },
        {
          format: 'button',
          title: 'Selecionar',
          action: this.selecionaLayout,
          width: '80'
        }
      ],
    }
  },
  computed: {
    layout: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    openModal () {
      this.chave = Math.random()
      this.show = true
    },
    onRead (options, search) {
      const th = this
      th.$api.UI.ShowLoading()
      const { page, itemsPerPage, sortBy, sortDesc } = options
      const dto = { search, page, itemsPerPage, sortBy, sortDesc }
      th.$api.ParametroBanco.Listar(dto).then((response) => {
        if (!response.data?.hasError) {
          options.success(response.data, response.count)
        }
      })
    },
    refresh () {
      if(this.$refs.grid)
        this.$refs['grid']?.refresh()
    },
    selecionaLayout (e, curr) {
      this.layout = curr.codigo
      this.show = false
    }
  }
}
</script>
