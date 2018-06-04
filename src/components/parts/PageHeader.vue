<template>
  <div>
    <h1 v-if="title">{{ title }}</h1>
    <h3 v-if="subTitle">{{ subTitle }}</h3>
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    'title': {
      type: String
    },
    'sub-title': {
      type: String
    }
  }
}
</script>
