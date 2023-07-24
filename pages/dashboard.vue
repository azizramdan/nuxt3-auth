<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const logout = () => {
  useAuthStore().logout()

  return navigateTo('/login')
}
</script>

<template>
    <div>
        <div>hanya bisa diakses saat sudah login</div>
        <button @click="logout">logout</button>
    </div>
</template>