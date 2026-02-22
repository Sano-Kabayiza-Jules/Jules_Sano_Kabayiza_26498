<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold">TB</span>
            </div>
            <h1 class="text-xl font-semibold">Task-Buddy</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">{{ authStore.user?.name }}</span>
              <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span class="text-primary-700">{{ authStore.user?.avatar }}</span>
              </div>
            </div>
            <button @click="logout" class="text-sm text-gray-500 hover:text-gray-700">
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header with Create Button -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p class="text-gray-600">Here's a list of your tasks for this week.</p>
        </div>
        <button @click="taskStore.showCreateModal = true" 
                class="btn-primary flex items-center space-x-2">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Create Task</span>
        </button>
      </div>

      <!-- Overdue Alert -->
      <div v-if="taskStore.overdueTasks.length > 0" 
           class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex items-center space-x-2 text-red-700">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium">You have {{ taskStore.overdueTasks.length }} overdue task(s)</span>
        </div>
      </div>

      <!-- Task Columns -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- To Do Column -->
        <TaskColumn 
          title="To Do" 
          status="todo"
          :tasks="taskStore.todoTasks"
          bg-color="bg-gray-50"
        />

        <!-- In Progress Column -->
        <TaskColumn 
          title="In Progress" 
          status="in-progress"
          :tasks="taskStore.inProgressTasks"
          bg-color="bg-blue-50"
        />

        <!-- Completed Column -->
        <TaskColumn 
          title="Completed" 
          status="completed"
          :tasks="taskStore.completedTasks"
          bg-color="bg-green-50"
        />
      </div>
    </div>

    <!-- Create Task Modal -->
    <CreateTaskModal 
      v-if="taskStore.showCreateModal" 
      @close="taskStore.showCreateModal = false"
      @create="handleCreateTask"
    />
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useTaskStore } from '@/stores/taskStore'
import { useRouter } from 'vue-router'
import TaskColumn from '@/components/TaskColumn.vue'
import CreateTaskModal from '@/components/CreateTaskModal.vue'

const authStore = useAuthStore()
const taskStore = useTaskStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/')
}

const handleCreateTask = (task) => {
  taskStore.addTask(task)
  taskStore.showCreateModal = false
}
</script>