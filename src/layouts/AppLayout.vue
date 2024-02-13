<template>
  <n-config-provider>
    <n-message-provider>
      <Navbar />
      <slot />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { NMessageProvider, NConfigProvider } from "naive-ui";
</script>
