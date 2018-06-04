<template>
  <div class="dropdown-select"
      :class="{'nothing-selected': 0 === selectedItems.length || selectedItems.length === 1 && selectedItems[0] === null}">
    <dropdown-button size="small" :icon="icon" :close-on-select="!multi">
      <span slot="default">{{ selectionText }}</span>
      <div slot="dropdown">
        <dropdown-item v-for="(item, i) in items" :key="i"
            @click.native="toggleItem(item)"
            :class="{'selected-item': selectedItems.includes(item)}">{{ displayItem(item) }}</dropdown-item>
      </div>
    </dropdown-button>
  </div>
</template>

<script>
import _ from 'lodash'
import DropdownButton from '@/components/bits/DropdownButton'
import DropdownItem from '@/components/bits/DropdownItem'

export default {
  components: { DropdownButton, DropdownItem },
  props: {
    'items': {
      type: Array,
      required: true
    },
    'nothing-selected-label': {
      type: String,
      default: () => 'None'
    },
    'is-item-selected': {
      type: Function,
      default: (i) => false
    },
    'display-item': {
      type: Function,
      default: (i) => i
    },
    'icon': {
      type: String,
      default: () => ''
    },
    'multi': {
      type: Boolean,
      default: () => false
    },
    'selection-changed': {
      type: Function,
      default: (item) => { console.log('Selected items', item) }
    }
  },
  computed: {
    selectionText() {
      if (!this.selectedItems.length) {
        return this.nothingSelectedLabel
      }
      return this.selectedItems.map(i => this.displayItem(i)).join(', ')
    }
  },
  mounted() {
    this.updateSelectedItems()
  },
  data() {
    return {
      selectedItems: []
    }
  },
  methods: {
    updateSelectedItems() {
      this.selectedItems = this.items.filter(i => this.isItemSelected(i))
    },
    toggleItem(item) {
      if (this.selectedItems.includes(item)) {
        if (this.multi) {
          this.selectedItems = this.selectedItems.filter(i => i !== item)
        }
      }
      else {
        if (this.multi) {
          this.selectedItems.push(item)
        }
        else {
          this.selectedItems = [item]
        }
      }
      this.selectionChanged(this.selectedItems)
    }
  }
}
</script>
