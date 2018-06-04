<template>
  <div>
    <h1>&lt;h1&gt; Title</h1>
    <h2>&lt;h2&gt; Sub-Title</h2>
    <h2 class="alert">&lt;h2&gt; Alert element</h2>
    <h3>&lt;h3&gt; Sub-sub title</h3>
    <div style="text-align: center">
      <label>Just a label for anything</label>
      <label class="label-gray">A gray label</label>
    </div>
    <div>
      Static icons
      <static-icon icon="music" size="big" />
      <static-icon icon="search" size="medium" />
      <static-icon icon="glass" size="small" :active="true" />
    </div>
    <div>
      Icon buttons
      <icon-button icon="glass" size="big">Lock this up</icon-button>
      <icon-button icon="star" size="big" />
      <icon-button icon="group" size="big">Delete</icon-button>
    </div>
    <div>
      Small text buttons
      <text-button size="small">Do something</text-button>
      <text-button icon="star-circled" size="small">Edit</text-button>
      <text-button icon="camera" size="small" class="primary">All the time</text-button>
    </div>
    <div>
      Button with dropdown TODO
      <dropdown-button icon="cancel" size="small">
        <span slot="default">Edit</span>
        <div slot="dropdown">
          <dropdown-item icon="gear" @click.native="dropdownItemClick">test</dropdown-item>
          <dropdown-item icon="reset" @click.native="dropdownItemClick">ahoi</dropdown-item>
        </div>
      </dropdown-button>
      <dropdown-button icon="ok" size="small" class="primary">
        <span slot="default">All the time</span>
        <div slot="dropdown">
          <dropdown-item icon="cancel" @click.native="dropdownItemClick">Tablets here and there</dropdown-item>
        </div>
      </dropdown-button>
    </div>
    <div>
      Medium text buttons
      <text-button>Regular</text-button >
      <text-button class="primary">Primary</text-button>
      <text-button :disabled="true">Inactive</text-button>
      <text-button icon="error">With icon and longer text 123</text-button>
    </div>
    <div>
      Toggle
      <toggle />
      <toggle :checked="true" />
      <toggle :checked.sync="checked">{{ checked ? '>' : '<' }}</toggle>
      <toggle :checked="!checked" @update:checked="updateNotChecked">{{ checked ? '<' : '>' }}</toggle>
      <static-icon :icon="checked ? 'eye-show' : 'eye-hide'" />
      <toggle :checked="true" />
      <toggle :checked="true">4A</toggle>
      <toggle :checked="true">3</toggle>
      <toggle>long text</toggle>
      <toggle :disabled="true">D</toggle>
      <toggle :disabled="true" :checked="true">s</toggle>
    </div>
    <div>
      <icon-button icon="arrows-cw" @click.native="showLoading">Show spinner</icon-button>
      <icon-button icon="stop" @click.native="showError">Show error</icon-button>
      <icon-button icon="play" @click.native="showSuccess">Show success</icon-button>
      <icon-button icon="pause" />
      <icon-button icon="record" />
      <icon-button icon="leaf" :disabled="true">Disabled icon button</icon-button>
    </div>

    <div style="text-align: center">
      <tooltipped tip="Tooltip yeah appears on hover">Just some tooltipped text</tooltipped>
    </div>

    <div style="text-align: center;">
      <form-input value="Mati" label="regular input" />
      <form-input value="" label="place to hold" placeholder="placeholder" />
      <small>Small text, i.e under input</small>
    </div>
    <list :items="['just', 'a', 'list', 'With an', 'active', 'element']"
        :is-acive="i => 'active' === i" :tooltip-for-item="i => 'With an' === i ? 'Tooltipping this and that' : ''"/>
	</div>
</template>

<script>
import modals from '@/utils/modals';
import FormInput from '@/components/bits/FormInput';
import IconButton from '@/components/bits/IconButton';
import TextButton from '@/components/bits/TextButton';
import StaticIcon from '@/components/bits/StaticIcon';
import DropdownButton from '@/components/bits/DropdownButton';
import DropdownItem from '@/components/bits/DropdownItem';
import Toggle from '@/components/bits/Toggle';
import Tooltipped from '@/components/bits/Tooltipped';

export default {
  components: { StaticIcon, IconButton, DropdownButton, Tooltipped, DropdownItem, TextButton, Toggle, FormInput },
  data() {
    return {
      checked: true
    };
  },
  methods: {
    dropdownItemClick() {
      modals.showSuccess('Dropdown click captured!');
    },
    showLoading() {
      modals.showSpinner();
      setTimeout(modals.hideSpinner, 3000);
    },
    showSuccess() {
      modals.showSuccess('All good', 'more information', 'footer text here', () => console.log('success modal closed!'));
    },
    showError() {
      modals.showError('Something went wrong', 'we have no idea', 'whatsoever', () => console.log('error modal closed!'));
    },
    updateNotChecked(notChecked) {
      this.checked = !notChecked;
    }
  }
};
</script>
