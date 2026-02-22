<template>
  <div class="task-card" :class="priorityClass" @dblclick="shareTask">
    <!-- Priority Badge -->
    <div class="flex justify-between items-start mb-2">
      <span class="text-xs font-medium px-2 py-1 rounded-full" :class="priorityColorClass">
        {{ task.priority.toUpperCase() }}
      </span>
      <button @click.stop="deleteTask" class="text-gray-400 hover:text-red-500 transition">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>

    <!-- Task Title -->
    <h4 class="font-medium text-gray-900 mb-1">{{ task.title }}</h4>
    
    <!-- Description -->
    <p class="text-sm text-gray-600 mb-3">{{ task.description }}</p>

    <!-- Due Date & Status -->
    <div class="flex items-center justify-between text-xs">
      <div class="flex items-center space-x-2">
        <svg class="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span :class="isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'">
          {{ formatDate(task.dueDate) }}
        </span>
      </div>

      <!-- Status Dropdown -->
      <select 
        v-model="task.status"
        @change="updateStatus"
        class="text-xs border-none bg-transparent focus:ring-0 cursor-pointer"
        :class="statusColorClass"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <!-- Overdue Indicator -->
    <div v-if="isOverdue" class="mt-2 text-xs text-red-600 flex items-center">
      <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Overdue
    </div>

    <!-- Double-click hint -->
    <div class="mt-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
      Double-click to share
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const props = defineProps({
  task: Object
})

const emit = defineEmits(['status-change'])

const taskStore = useTaskStore()

const priorityClass = computed(() => {
  return {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low'
  }[props.task.priority]
})

const priorityColorClass = computed(() => {
  return taskStore.getPriorityColor(props.task.priority)
})

const statusColorClass = computed(() => {
  return {
    todo: 'text-gray-600',
    'in-progress': 'text-blue-600',
    completed: 'text-green-600'
  }[props.task.status]
})

const isOverdue = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return props.task.dueDate < today && props.task.status !== 'completed'
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const updateStatus = () => {
  emit('status-change', {
    taskId: props.task.id,
    newStatus: props.task.status
  })
}

const deleteTask = () => {
  if (confirm('Delete this task?')) {
    taskStore.deleteTask(props.task.id)
  }
}

const shareTask = () => {
  const text = `Task: ${props.task.title}\nDescription: ${props.task.description}\nDue: ${props.task.dueDate}`
  if (navigator.share) {
    navigator.share({
      title: 'Task-Buddy Task',
      text: text
    })
  } else {
    navigator.clipboard.writeText(text)
    alert('Task copied to clipboard!')
  }
}
</script>