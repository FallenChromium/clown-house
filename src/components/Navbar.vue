<template>
  <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :style="{background: '--vt-c-divider-light-1', width: '100vw'}"/>
</template>
  
<script setup lang="ts">
import { h, ref, type Component } from 'vue'
import { NIcon, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonCircle as PersonCircle,
  HomeOutline as HomeOutline,
  SettingsOutline as SettingsOutline
} from '@vicons/ionicons5'
import { RouterLink } from 'vue-router';
import router from '@/router';


const activeKey = ref<string | null>(null)
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'events',
          }
        },
        { default: () => 'Events' }
      ),
    key: 'events',
   // icon: renderIcon(PersonCircle)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'objects',
          }
        },
        { default: () => 'Objects' }
      ),
    key: 'objects',
   // icon: renderIcon(HomeOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'settings',
          }
        },
        { default: () => 'Model settings' }
      ),
    key: 'model-settings',
    disabled: false,
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'objectOwners',
          }
        },
        { default: () => 'Object Owners' }
      ),
    key: 'object-owners',
    disabled: false,
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'objectStats',
          }
        },
        { default: () => 'Object stats' }
      ),
    key: 'object-stats',
    disabled: false,
  }
]

</script>
