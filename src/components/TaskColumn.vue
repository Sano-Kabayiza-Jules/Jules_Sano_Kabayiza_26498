<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200">
    <!-- Column Header -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-900">{{ title }}</h3>
        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
          {{ tasks.length }}
        </span>
      </div>
    </div>

    <!-- Tasks List -->
    <div class="p-4 space-y-3 min-h-[400px]">
      <TaskCard 
        v-for="task in tasks" 
        :key="task.id" 
        :task="task"
        @status-change="handleStatusChange"
      />
      
      <!-- Empty State -->
      <div v-if="tasks.length === 0" class="text-center py-8">
        <p class="text-sm text-gray-400">No tasks</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'
import { useTaskStore } from '@/stores/taskStore'

const props = defineProps({
  title: String,
  status: String,
  tasks: Array,
  bgColor: String
})

const taskStore = useTaskStore()

const handleStatusChange = ({ taskId, newStatus }) => {
  taskStore.updateTaskStatus(taskId, newStatus)
}
</script>