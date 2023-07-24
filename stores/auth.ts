import { defineStore } from 'pinia'

type User = {
  id: number
  nama: string
  username: string
}

type State = {
  token: null|string
  user: null|User
}

export const tokenCookieKey = 'token-key-wajib-unik'

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: (): State => {
    return {
      token: null,
      user: null,
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token

      const cookie = useCookie(tokenCookieKey, {sameSite: true})
      cookie.value = token
    },
    removeToken() {
      this.token = null
      
      const cookie = useCookie(tokenCookieKey, {sameSite: true})
      cookie.value = null
    },
    setUser(user: User) {
      this.user = user
    },
    removeUser() {
      this.user = null
    },
    logout() {
      useApiPost('logout')
      
      this.removeToken()
      this.removeUser()
    },
    async login(username: string, password: string) {
      const { data, error } = await useApiPost('login', {
        body: {
          username,
          password,
        },
        pick: ['success', 'data', 'message']
      })

      if (!data.value?.success) {
        return {
          success: false,
          message: error.value?.data?.message || data.value?.message || 'Username atau password salah'
        }
      }

      this.setToken(data.value.data.token)
      this.setUser(data.value.data.user)

      return {
        success: true,
      }
    },
    async autologin(username: string, authenticatorKey: string, anotationKey: string, targetPath?: string) {
      const { data, error } = await useApiPost('autologin', {
        body: {
          username,
          authenticatorKey,
          anotationKey,
          targetPath,
        },
        pick: ['success', 'data', 'message']
      })

      if (!data.value?.success) {
        return {
          success: false,
          message: error.value?.data?.message || data.value?.message || 'Error!'
        }
      }

      this.setToken(data.value.data.token)
      this.setUser(data.value.data.user)

      return {
        success: true,
        targetPath: data.value.data.targetPath,
      }
    },
  },
  getters: {
    isAuthenticated: state => Boolean(state.user),
  },
})