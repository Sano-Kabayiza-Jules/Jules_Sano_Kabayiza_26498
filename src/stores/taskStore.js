import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  // Load tasks from localStorage
  const loadTasks = () => {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      return JSON.parse(saved)
    }
    // Default tasks
    return [
      {
        id: 1,
        title: "Grocery Shopping",
        description: "Buy milk, eggs, and bread",
        priority: "medium",
        dueDate: "2024-11-20",
        status: "in-progress",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: "Complete Math Assignment",
        description: "Chapter 5 exercises 1-10",
        priority: "high",
        dueDate: "2024-12-01",
        status: "todo",
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        title: "Review Physics Notes",
        description: "Prepare for upcoming quiz",
        priority: "low",
        dueDate: "2024-11-25",
        status: "completed",
        createdAt: new Date().toISOString()
      }
    ]
  }

  const tasks = ref(loadTasks())
  const showCreateModal = ref(false)

  // Save to localStorage
  watch(tasks, (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }, { deep: true })

  // Getters
  const todoTasks = computed(() => 
    tasks.value.filter(t => t.status === 'todo')
  )
  
  const inProgressTasks = computed(() => 
    tasks.value.filter(t => t.status === 'in-progress')
  )
  
  const completedTasks = computed(() => 
    tasks.value.filter(t => t.status === 'completed')
  )

  const overdueTasks = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return tasks.value.filter(t => 
      t.dueDate < today && t.status !== 'completed'
    )
  })

  // Actions
  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      createdAt: new Date().toISOString(),
      status: 'todo'
    }
    tasks.value.push(newTask)
  }

  const updateTaskStatus = (taskId, newStatus) => {
    const task = tasks.value.find(t => t.id === taskId)
    if (task) {
      task.status = newStatus
    }
  }

  const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter(t => t.id !== taskId)
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return {
    tasks,
    showCreateModal,
    todoTasks,
    inProgressTasks,
    completedTasks,
    overdueTasks,
    addTask,
    updateTaskStatus,
    deleteTask,
    getPriorityColor
  }
})