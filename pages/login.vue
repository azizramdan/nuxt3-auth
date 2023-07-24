<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  middleware: 'guest'
})

const form = reactive({
  username: 'username',
  password: 'password',
})

const isBusy = reactive({
  login: false,
})

const login = async () => {
  isBusy.login = true

  const result = await useAuthStore().login(form.username, form.password)

  if (!result.success) {
    isBusy.login = false
    alert(result.message)

    return
  }

  return navigateTo('/dashboard')
}
</script>

<template>
    <div>
        <div>hanya bisa diakses yang belum login/guest</div>

        <button @click="login" :disabled="isBusy.login">login</button>
    </div>
</template>