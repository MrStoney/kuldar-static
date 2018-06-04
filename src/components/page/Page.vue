<template>
  <div class="page">
    <div class="page-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="page-content">
      <slot name="default"></slot>
      <slot name="content"></slot>
    </div>
    <div class="page-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
