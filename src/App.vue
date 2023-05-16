<script setup lang="ts">
import {  RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue"
import { darkTheme, NMessageProvider, NConfigProvider } from 'naive-ui'

</script>

<template>
  <n-config-provider >
    <n-message-provider >
      <Navbar />
    </n-message-provider>

      <Suspense>
        <div :style="{margin: '32px'}">
        <RouterView />
      </div>
      </Suspense>
  </n-config-provider>

</template>

<style scoped>

</style>
