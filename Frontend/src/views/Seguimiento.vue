<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-green-600 text-center mb-6">
      🥗 Seguimiento de Hábitos Nutricionales
    </h1>

    <!-- Barra de Búsqueda -->
    <div class="mb-6">
      <input
        v-model="search"
        type="text"
        placeholder="🔍 Buscar hábitos..."
        class="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
      />
    </div>

    <!-- Tarjetas de Hábitos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="habito in filtrados"
        :key="habito.id"
        class="bg-white rounded-lg shadow-lg p-5 border border-gray-200"
      >
        <div class="flex items-center gap-3 mb-4">
          <span class="text-3xl">{{ habito.emoji }}</span>
          <h2 class="text-xl font-bold text-gray-700">{{ habito.nombre }}</h2>
        </div>
        <p class="text-sm text-gray-600"><strong>🥦 Descripción:</strong> {{ habito.descripcion }}</p>
        <p class="text-sm text-gray-600 mt-2"><strong>📅 Frecuencia:</strong> {{ habito.frecuencia }}</p>
        <p class="text-sm text-gray-600 mt-2"><strong>✅ Estado:</strong> {{ habito.estado }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      habitos: [
        {
          id: 1,
          nombre: "Beber agua",
          descripcion: "Ingerir al menos 8 vasos de agua al día",
          frecuencia: "Diaria",
          estado: "Cumplido",
          emoji: "💧"
        },
        {
          id: 2,
          nombre: "Comer verduras",
          descripcion: "Incluir una porción de verduras en cada comida",
          frecuencia: "Diaria",
          estado: "No cumplido",
          emoji: "🥦"
        },
        {
          id: 3,
          nombre: "Evitar azúcares",
          descripcion: "Reducir la ingesta de alimentos con azúcares añadidos",
          frecuencia: "Semanal",
          estado: "Cumplido",
          emoji: "🍬"
        },
        {
          id: 4,
          nombre: "Comer frutas",
          descripcion: "Consumir al menos dos porciones de frutas al día",
          frecuencia: "Diaria",
          estado: "En progreso",
          emoji: "🍎"
        },
        {
          id: 5,
          nombre: "Hacer ejercicio",
          descripcion: "Realizar 30 minutos de actividad física al día",
          frecuencia: "Diaria",
          estado: "Cumplido",
          emoji: "🏃"
        }
      ]
    };
  },
  computed: {
    filtrados() {
      return this.habitos.filter(habito =>
        habito.nombre.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
};
</script>

<style scoped>
/* Puedes personalizar los estilos aquí */
</style>
