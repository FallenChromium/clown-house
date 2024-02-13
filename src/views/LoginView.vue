<template>
  <n-card>
    <n-form :model="formState" @submit="handleSubmit">
      <n-form-item label="Username">
        <n-input v-model:value="formState.username" />
      </n-form-item>
      <n-form-item label="Password">
        <n-input v-model:value="formState.password" type="password" />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" native-type="submit" @click="handleSubmit">
          Login
        </n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { NCard, NForm, NFormItem, NInput, NButton, useMessage } from "naive-ui";
import { AuthService } from "@/services";

const formState = ref({
  username: "",
  password: "",
});

const handleSubmit = () => {
  // handle login logic here
  try { 
    AuthService.login(formState.value.username, formState.value.password);
  } catch (error) { 
    useMessage().error("Login failed");
  }
};
</script>

<style scoped>
n-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
