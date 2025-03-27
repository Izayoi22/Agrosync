<template>
  <div class="min-h-screen bg-gradient-to-r from-green-50 to-yellow-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Encabezado -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-extrabold text-green-700">🍏 Mis Planes de Alimentación</h1>
        <router-link
          to="/meal-plans/new"
          class="inline-flex items-center px-5 py-3 rounded-lg shadow-lg text-sm font-semibold text-white bg-green-500 hover:bg-green-600 transition-all duration-300"
        >
          <i class="fas fa-plus mr-2"></i>
          Nuevo Plan
        </router-link>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent"></div>
        <p class="mt-2 text-gray-600">Cargando planes...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-12">
        <div class="rounded-full bg-red-100 p-4 mx-auto w-14 h-14 flex items-center justify-center shadow-lg">
          <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
        </div>
        <h3 class="mt-2 text-lg font-medium text-gray-900">Error al cargar los planes</h3>
        <p class="mt-1 text-sm text-red-500">{{ error }}</p>
        <div class="mt-6">
          <button @click="loadMealPlans" class="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all">Reintentar</button>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="mealPlans.length === 0" class="text-center py-12">
        <div class="rounded-full bg-green-100 p-4 mx-auto w-14 h-14 flex items-center justify-center shadow-lg">
          <i class="fas fa-utensils text-green-600 text-2xl"></i>
        </div>
        <h3 class="mt-2 text-lg font-medium text-gray-900">No tienes planes de alimentación</h3>
        <p class="mt-1 text-sm text-gray-500">Comienza agregando tu primer plan</p>
        <div class="mt-6">
          <router-link to="/meal-plans/new" class="px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all">Nuevo Plan</router-link>
        </div>
      </div>

      <!-- Lista de planes -->
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="plan in mealPlans" :key="plan._id" class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
          <div class="p-6 border-l-8" :class="plan.color">
            <h3 class="text-xl font-semibold text-gray-900">{{ plan.name }}</h3>
            <p class="text-md text-gray-600 mt-1">Objetivo: {{ plan.goal }}</p>
            <div class="mt-4 space-y-2">
              <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-apple-alt text-green-500 mr-2"></i>
                <span>Calorías: {{ plan.calories }} kcal</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-clock text-orange-500 mr-2"></i>
                <span>Duración: {{ plan.duration }} semanas</span>
              </div>
              <div v-if="plan.notes" class="text-sm text-gray-600 italic">
                <i class="fas fa-sticky-note text-yellow-500 mr-2"></i>
                <span>{{ plan.notes }}</span>
              </div>
            </div>
            <!-- Acciones -->
            <div class="mt-4 flex justify-end space-x-3">
              <button @click="deletePlan(plan._id)" class="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all">Eliminar</button>
              <router-link :to="`/meal-plans/${plan._id}/edit`" class="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">Editar</router-link>
              <router-link :to="`/meal-plans/${plan._id}`" class="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all">Ver</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      error: null,
      mealPlans: [
        { _id: 1, name: "Plan Balanceado", goal: "Pérdida de peso", calories: 1800, duration: 4, notes: "Incluye muchas frutas y verduras", color: "border-green-500" },
        { _id: 2, name: "Plan Energético", goal: "Ganar masa muscular", calories: 2500, duration: 6, notes: "Alto en proteínas y carbohidratos", color: "border-orange-500" },
        { _id: 3, name: "Plan Detox", goal: "Desintoxicación", calories: 1500, duration: 2, notes: "Basado en jugos y alimentos naturales", color: "border-yellow-500" }
      ]
    };
  },
  methods: {
    loadMealPlans() {
      this.loading = true;
      this.error = null;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    deletePlan(id) {
      this.mealPlans = this.mealPlans.filter(plan => plan._id !== id);
    }
  }
};
</script>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../plugins/axios'
import axiosInstance from '../plugins/axios'
import MapWidget from '../components/MapWidget.vue'

const crops = ref([])
const loading = ref(true)
const error = ref(null)

// Cargar cultivos
const loadCrops = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axiosInstance.get('/api/crops')
    crops.value = response.data
  } catch (err) {
    console.error('Error al cargar cultivos:', err)
    error.value = 'Error al cargar los cultivos. Por favor, intenta de nuevo.'
  } finally {
    loading.value = false
  }
}

// Eliminar cultivo
const deleteCrop = async (id) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este cultivo?')) return

  try {
    await axios.delete(`/api/crops/${id}`)
    crops.value = crops.value.filter(crop => crop._id !== id)
  } catch (error) {
    console.error('Error al eliminar cultivo:', error)
    alert('Error al eliminar el cultivo. Por favor, intenta de nuevo.')
  }
}

// Formatear fecha
const formatDate = (date) => {
  if (!date) return 'No especificada'
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Obtener clase CSS según el estado
const getStatusClass = (status) => {
  const classes = {
    'Plantado': 'bg-blue-100 text-blue-800',
    'En Crecimiento': 'bg-green-100 text-green-800',
    'Listo para Cosechar': 'bg-yellow-100 text-yellow-800',
    'Cosechado': 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

onMounted(() => {
  loadCrops()
})
</script>
