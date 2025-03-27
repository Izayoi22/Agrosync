<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 to-green-100">
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold text-orange-600 mb-6">
          Bienvenido a NutriSync
        </h1>
        <p class="text-xl text-gray-600 mb-12">
          Tu plataforma integral para la gestión y seguimiento de tu nutrición
        </p>

        <div v-if="!isAuthenticated" class="space-y-6">
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <router-link
              to="/login"
              class="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <i class="fas fa-sign-in-alt mr-2"></i>
              Iniciar Sesión
            </router-link>
            <router-link
              to="/register"
              class="inline-flex items-center justify-center px-6 py-3 border border-green-600 rounded-md shadow-sm text-base font-medium text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <i class="fas fa-user-plus mr-2"></i>
              Registrarse
            </router-link>
          </div>
        </div>

        <div v-else class="space-y-6">
          <router-link
            to="/meals"
            class="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <i class="fas fa-utensils mr-2"></i>
            Ver Mis Planes de Alimentación
          </router-link>
        </div>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div class="text-orange-600 text-4xl mb-4">
              <i class="fas fa-apple-alt"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Planificación Nutricional
            </h3>
            <p class="text-gray-600">
              Diseña y personaliza tu dieta con planes ajustados a tus necesidades.
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div class="text-green-600 text-4xl mb-4">
              <i class="fas fa-dumbbell"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Seguimiento de Hábitos
            </h3>
            <p class="text-gray-600">
              Monitorea tu progreso y mejora tus hábitos alimenticios con nuestro sistema de seguimiento.
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div class="text-orange-600 text-4xl mb-4">
              <i class="fas fa-chart-bar"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Análisis Nutricional
            </h3>
            <p class="text-gray-600">
              Obtén información detallada sobre tu consumo de calorías, macros y vitaminas.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const isAuthenticated = computed(() => {
  return !!localStorage.getItem('token')
})
</script>
