<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <component :is="$route.meta.layout || 'div'">
    <Suspense>
      <div :style="{ margin: '32px' }">
        <RouterView />
      </div>
    </Suspense>
  </component>
</template>

<style scoped></style>
