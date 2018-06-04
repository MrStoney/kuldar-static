<template>
  <div class="input-container">
    <input ref="input" :id="calculatedFieldId"
        :type="type" :name="name"
        :value="value" :placeholder="placeholder"
        :required="required" :disabled="disabled"
        @blur="$emit('blur')" @focus="$emit('focus')"
        @input="updateValue($event.target.value)" />
    <div class="input-line" />
    <label v-if="label" :for="calculatedFieldId">{{ label }}</label>
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String | undefined,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: String,
    label: String,
    required: String
  },
  computed: {
    calculatedFieldId() {
      return this.$props.name + '-' + Math.random().toString(36).substring(7);
    }
  },
  methods: {
    updateValue(value) {
      // Emit the value through the input event
      this.$emit('input', value);
    },
    focus() {
      this.$refs.input.focus();
    }
  }
};
</script>
