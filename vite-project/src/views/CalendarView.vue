<template>
    <div class="min-h-screen bg-gray-100 p-6">
      <h1 class="text-2xl font-bold text-gray-800">🌾 Calendario de Riego</h1>
  
      <!-- Sección de Cultivos -->
      <div class="p-4 bg-white shadow-lg rounded-lg mt-4">
        <h3 class="text-lg font-semibold text-gray-900">Selecciona Cultivos</h3>
        <div v-if="loadingCrops" class="text-center py-4">
          <p class="text-gray-600">Cargando cultivos...</p>
        </div>
        <div v-else-if="errorCrops" class="text-red-600">
          <p>Error al cargar cultivos: {{ errorCrops }}</p>
        </div>
        <div v-else>
          <div v-for="crop in crops" :key="crop._id" class="flex items-center my-2">
            <input type="checkbox" :id="crop._id" :value="crop._id" v-model="selectedCropIds" />
            <label :for="crop._id" class="ml-2 text-gray-700">
              {{ crop.name }} ({{ crop.type }})
            </label>
          </div>
        </div>
      </div>
  
      <!-- Sección del Clima -->
      <div class="p-4 bg-white shadow-lg rounded-lg mt-4">
        <h3 class="text-lg font-semibold text-gray-900">🌦 Clima Local</h3>
        <div v-if="loadingWeather" class="text-center py-4">
          <p class="text-gray-600">Cargando clima...</p>
        </div>
        <div v-else-if="errorWeather" class="text-red-600">
          <p>Error al obtener el clima: {{ errorWeather }}</p>
        </div>
        <div v-else>
          <p class="text-gray-700"><strong>Ubicación:</strong> {{ weather.city }}</p>
          <p class="text-gray-700"><strong>Temperatura:</strong> {{ weather.temp }}°C</p>
          <p class="text-gray-700"><strong>Condición:</strong> {{ weather.condition }}</p>
        </div>
        <button @click="fetchWeather" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          🔄 Actualizar Clima
        </button>
      </div>
  
      <!-- Calendario de Riego -->
      <div class="mt-6 bg-white shadow-lg rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-900">📅 Fechas de Riego</h3>
        <ul class="mt-2">
          <li v-for="(evento, index) in eventosRiego" :key="index" :class="evento.color">
            {{ evento.fecha }} - {{ evento.cultivo }} ({{ evento.tipo }})
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  // Estado de cultivos
  const crops = ref([])
  const selectedCropIds = ref([])
  const loadingCrops = ref(true)
  const errorCrops = ref(null)
  
  // Estado del clima
  const weather = ref({})
  const loadingWeather = ref(true)
  const errorWeather = ref(null)
  
  // Simulación de base de datos (Reemplázalo con una API real)
  const fetchCrops = async () => {
    loadingCrops.value = true
    errorCrops.value = null
  
    try {
      // Simulación de datos
      setTimeout(() => {
        crops.value = [
          { _id: '67dcbf78b8301544b17b08f5', name: 'PAPA', type: 'Hortalizas', plantingDate: '2025-03-20' },
          { _id: '67dda46b22ab787f820bac01', name: 'Caña', type: 'Legumbres', plantingDate: '2024-03-21' }
        ]
        loadingCrops.value = false
      }, 1000)
    } catch (err) {
      errorCrops.value = 'No se pudieron cargar los cultivos'
      loadingCrops.value = false
    }
  }
  
  // Simulación de API del clima
  const fetchWeather = async () => {
    loadingWeather.value = true
    errorWeather.value = null
  
    try {
      setTimeout(() => {
        weather.value = {
          city: 'San Pedro Sula',
          temp: 28,
          condition: Math.random() > 0.5 ? 'Soleado' : 'Lluvia' // Simula lluvia o sol
        }
        loadingWeather.value = false
      }, 1000)
    } catch (err) {
      errorWeather.value = 'No se pudo obtener el clima'
      loadingWeather.value = false
    }
  }
  
  // Generar fechas de riego dinámicamente
  const eventosRiego = computed(() => {
    return selectedCropIds.value.map(id => {
      const crop = crops.value.find(c => c._id === id)
      if (!crop) return null
  
      let frecuencia = crop.type === 'Hortalizas' ? 7 : 14 // Hortalizas cada 7 días, Legumbres cada 14
      let fechaRiego = new Date(crop.plantingDate)
      fechaRiego.setDate(fechaRiego.getDate() + frecuencia)
  
      return {
        cultivo: crop.name,
        tipo: crop.type,
        fecha: fechaRiego.toLocaleDateString(),
        color: weather.value.condition === 'Lluvia' ? 'text-blue-600' : 'text-green-600'
      }
    }).filter(evento => evento !== null)
  })
  
  // Cargar datos al inicio
  onMounted(() => {
    fetchCrops()
    fetchWeather()
  })
  </script>
  