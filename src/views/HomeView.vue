<template>
  <div class="min-h-screen">
    <!-- Navigation -->
    <nav class="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold">TB</span>
            </div>
            <span class="text-xl font-semibold text-gray-900">Task-Buddy</span>
          </div>
          
          <div class="flex items-center space-x-8">
            <a href="#features" class="text-gray-600 hover:text-gray-900 transition">Features</a>
            <a href="#about" class="text-gray-600 hover:text-gray-900 transition">About</a>
            <router-link to="/login" class="btn-primary">Login</router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-50 to-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <span class="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            v1.0.0 Now Available
          </span>
          
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Manage tasks with <span class="text-primary-600">clarity</span>
          </h1>
          
          <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A simple, accessible, and open-source task manager for students and educators.
          </p>
          
          <div class="flex justify-center space-x-4">
            <router-link to="/login" class="btn-primary px-8 py-3 text-lg">
              Get Started
            </router-link>
            <a href="#features" class="btn-secondary px-8 py-3 text-lg">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">Powerful Features</h2>
        <p class="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Everything you need to stay organized and productive.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Task Management</h3>
            <p class="text-gray-600">Create, organize, and track your tasks with ease. Set priorities and due dates.</p>
          </div>

          <!-- Feature 2 -->
          <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Smart Dashboard</h3>
            <p class="text-gray-600">See upcoming, overdue, and today's tasks at a glance with our intuitive dashboard.</p>
          </div>

          <!-- Feature 3 -->
          <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Instant Updates</h3>
            <p class="text-gray-600">Powered by Vue 3 for lightning-fast interactivity. No page reloads or waiting.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">About Task-Buddy</h2>
          <p class="text-lg text-gray-600 mb-8">
            Task-Buddy is an open-source education project designed to demonstrate modern web development 
            practices with Vue 3 and Tailwind CSS. We prioritize accessibility (WCAG 2.1 AA) and privacy, 
            ensuring a tool that works for everyone.
          </p>
          <div class="flex justify-center space-x-4">
            <span class="px-4 py-2 bg-white rounded-full text-sm text-gray-600 shadow-sm">Vue 3</span>
            <span class="px-4 py-2 bg-white rounded-full text-sm text-gray-600 shadow-sm">Tailwind CSS</span>
            <span class="px-4 py-2 bg-white rounded-full text-sm text-gray-600 shadow-sm">WCAG 2.1 AA</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-100 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        © 2025 Task-Buddy. Open source and free to use.
      </div>
    </footer>
  </div>
</template>