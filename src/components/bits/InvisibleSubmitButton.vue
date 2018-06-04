<!--
  This is a component for a non-visible submit button, which is needed
  to make the submit work on enter on a field when there is no other
  submit button within the form tag.

  Using just style="display: none" won't submit forms in Safari, that is why this
  absolute positioning is used.
-->
<template>
  <button type="submit" style="border: 0; width: 0; height: 0; position: absolute; left: -100px;">&nbsp;</button>
</template>
