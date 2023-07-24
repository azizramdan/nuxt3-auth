import { useAuthStore, tokenCookieKey } from "~/stores/auth";

export default defineNuxtPlugin(async () => {
  const token = useCookie(tokenCookieKey)
  const store = useAuthStore()

  if (token.value) {
    store.setToken(token.value)

    const { data } = await useApiGet('me', {
      pick: ['data']
    })

    if (data.value?.data) {
      store.setUser(data.value.data)
    }
  }
})
