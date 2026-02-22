<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="close">
    <div class="bg-white rounded-xl max-w-md w-full p-6" @click.stop>
      <h2 class="text-xl font-bold text-gray-900 mb-4">Create New Task</h2>
      <p class="text-sm text-gray-600 mb-6">Add a new task to your list.</p>

      <form @submit.prevent="createTask" class="space-y-4">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            v-model="form.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Task title"
          >
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            v-model="form.description"
            rows="3"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Task description"
          ></textarea>
        </div>

        <!-- Priority -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select 
            v-model="form.priority"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <!-- Due Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input 
            v-model="form.dueDate"
            type="date"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" @click="close" class="btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn-primary">
            Create Task
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['close', 'create'])

const form = reactive({
  title: '',
  description: '',
  priority: 'medium',
  dueDate: new Date().toISOString().split('T')[0]
})

const createTask = () => {
  emit('create', { ...form })
}

const close = () => {
  emit('close')
}
</script>