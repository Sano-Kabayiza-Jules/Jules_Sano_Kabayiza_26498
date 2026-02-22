<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white p-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-block p-3 bg-primary-600 rounded-2xl mb-4">
          <span class="text-white text-2xl font-bold">TB</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p class="text-gray-600 mt-2">Sign in to manage your tasks</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your email"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your password"
            >
          </div>

          <!-- Demo Credentials -->
          <div class="bg-primary-50 rounded-lg p-4">
            <p class="text-sm font-medium text-primary-800 mb-2">Demo Credentials:</p>
            <div class="flex items-center justify-between text-sm">
              <span class="text-primary-700">student@taskbuddy.com</span>
              <span class="text-primary-700">/ student123</span>
            </div>
          </div>

          <button 
            type="submit"
            class="w-full btn-primary py-3"
          >
            Sign In
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Don't have an account? 
          <router-link to="/" class="text-primary-600 hover:text-primary-700 font-medium">
            Go to Home
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = () => {
  const success = authStore.login(email.value, password.value)
  if (success) {
    router.push('/dashboard')
  } else {
    alert('Invalid credentials. Try: student@taskbuddy.com / student123')
  }
}
</script>