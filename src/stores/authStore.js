import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)

  const login = (email, password) => {
    // Fixed credentials as per requirement
    if (email === 'student@taskbuddy.com' && password === 'student123') {
      user.value = { 
        email, 
        name: 'Student User',
        role: 'student',
        avatar: '👤'
      }
      isAuthenticated.value = true
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    login,
    logout
  }
})