<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
    data-cy="menu-date"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        ref="input"
        v-model="dateInput"
        v-mask="'##/##/####'"
        :label="label"
        outlined
        dense
        prepend-inner-icon="event"
        v-bind="attrs"
        data-cy="text-date"
        :rules="rules"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="datePicker"
      no-title
      :min="min"
      :max="max"
      @input="menu = false"
    />
  </v-menu>
</template>

<script>
import DateTime from '../views/util/dateTime'

export default {
  props: {
    value: { type: String, default: '' },
    min: { type: String, default: '' },
    max: { type: String, default: '' },
    required: { type: Boolean, default: true },
    label: { type: String, default: '' },
  },
  emits: ['input'],
  data () {
    return {
      menu: false,
      datePicker: '',
      dateInput: '',
      rules: [
        v => this.required ? !!v || 'Data é requerida': null,
        v => DateTime.ValidaDDMMYYYY(v) || 'Data deve ser valida',
      ]
    }
  },
  computed: {
    date: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    datePicker (value) {
      this.dateInput = value.split('-').reverse().join('/')
    },
    dateInput (value) {
      if(!value) return
      
      this.date = this.reverterData(value)
      
      const pos = this.$refs.input.$refs.input.selectionStart
      this.$nextTick(() => {
        if(value.length !== pos)
          this.$refs.input.$refs.input.selectionEnd = pos
      })
    },
    date (value) {
      if(value !== this.reverterData(value))
        this.dateInput = this.reverterData(value)
    }
  },
  mounted () {
    this.dateInput = this.reverterData(this.value)
  },
  methods: {
    reverterData (data) {
      if(data)
        return data.split('/').reverse().join('/')
    }
  }
}
</script>
