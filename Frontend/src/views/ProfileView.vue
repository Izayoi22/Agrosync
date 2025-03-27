<template>
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Mi Perfil</h2>
  
      <div class="flex items-center space-x-4">
        <!-- Foto de perfil: icono de usuario estático -->
        <div class="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center border-2 border-green-500">
          <span class="text-4xl">👤</span>
        </div>
  
        <!-- Datos del usuario -->
        <div>
          <h3 class="text-xl font-medium text-gray-700">{{ user.name }}</h3>
          <p class="text-gray-500">{{ user.email }}</p>
        </div>
      </div>
  
      <!-- Formulario de actualización -->
      <div class="mt-6">
        <label class="block text-gray-700 text-sm font-medium">Nombre</label>
        <input
          v-model="user.name"
          type="text"
          class="border rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
  
        <label class="block text-gray-700 text-sm font-medium mt-4">Correo Electrónico</label>
        <input
          v-model="user.email"
          type="email"
          class="border rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled
        />
  
        <button
          @click="saveProfile"
          class="mt-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const user = ref({
    name: '',
    email: ''
  })
  
  // Al cargar el componente, se obtiene la información del usuario de localStorage.
  onMounted(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {}
    user.value = {
      name: storedUser.name || 'Adriana Zelaya',
      email: storedUser.email || 'AdrianaZelaya@example.com'
    }
  })
  
  // Guardar cambios en localStorage
  const saveProfile = () => {
    localStorage.setItem('user', JSON.stringify(user.value))
    alert('Perfil actualizado correctamente')
  }
  </script>
  
  <style scoped>
  /* Puedes agregar estilos adicionales aquí si lo deseas */
  </style>
  