<template>
  <div>
    <v-tooltip
      top
      :disabled="!tooltip">
      <template #activator="{ on }">
        <div v-on="on">
          <v-text-field
            v-model="banco.descricao"
            v-uppercase
            :label="label"
            :disabled="disabled"
            append-icon="fas fa-search"
            readonly
            outlined
            dense
            clearable
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
        <i class="fas fa-search"></i>Localizar Banco
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
          :page-size="5"
          server-side
        />
      </template>
    </modal-form>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: 'Banco' },
    disabled: { type: Boolean, default: false },
    tooltip: { type: Boolean, default: false },
    tooltipText: { type: String, default: 'Seleciona o banco' },
    value: { type: Object, default: () => {} },
  },
  emits: ['input'],
  data () {
    return {
      show: false,
      chave: 0,
      model:{},
      schema: [
        { value: 'codigo', text: 'Código', width: '10' },
        { value: 'descricao', text: 'Descrição', width: '400' },
        {
          format: 'button',
          title: 'Selecionar',
          action: this.selecionaBanco,
          width: '80'
        }
      ],
    }
  },
  computed: {
    banco: {
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
      th.$api.Banco.Listar(dto).then((response) => {
        if (!response.data?.hasError) {
          options.success(response.data, response.count)
        }
      })
    },
    refresh () {
      if(this.$refs.grid)
        this.$refs['grid']?.refresh()
    },
    selecionaBanco (e, curr) {
      this.banco = {
        codigo: curr.id,
        descricao: curr.descricao
      }
      this.show = false
    }
  }
}
</script>
