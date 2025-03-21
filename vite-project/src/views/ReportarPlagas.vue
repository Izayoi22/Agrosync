<template>
    <div class="max-w-6xl mx-auto p-6">
      <h1 class="text-3xl font-bold text-green-600 text-center mb-6">
        🦠 Enfermedades y Plagas en los Cultivos
      </h1>
  
      <!-- Barra de Búsqueda -->
      <div class="mb-6">
        <input
          v-model="search"
          type="text"
          placeholder="🔍 Buscar plagas..."
          class="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
        />
      </div>
  
      <!-- Tarjetas de Plagas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="plaga in filtradas"
          :key="plaga.id"
          class="bg-white rounded-lg shadow-lg p-5 border border-gray-200"
        >
          <div class="flex items-center gap-3 mb-4">
            <span class="text-3xl">{{ plaga.emoji }}</span>
            <h2 class="text-xl font-bold text-gray-700">{{ plaga.nombre }}</h2>
          </div>
          <p class="text-sm text-gray-600"><strong>🪴 Cultivos Afectados:</strong> {{ plaga.cultivos }}</p>
          <p class="text-sm text-gray-600 mt-2"><strong>⚠️ Síntomas:</strong> {{ plaga.sintomas }}</p>
          <p class="text-sm text-gray-600 mt-2"><strong>🛠️ Control:</strong> {{ plaga.control }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: "",
        plagas: [
          {
            id: 1,
            nombre: "Pulgón",
            cultivos: "Tomate, pimiento, papa",
            sintomas: "Hojas enrolladas, secreción pegajosa, crecimiento lento",
            control: "Usar insecticidas naturales como neem o jabón potásico",
            emoji: "🐞"
          },
          {
            id: 2,
            nombre: "Mildiu",
            cultivos: "Vid, papa, tomate",
            sintomas: "Manchas amarillas en hojas, moho blanco en el envés",
            control: "Aplicar fungicidas cúpricos y mejorar ventilación",
            emoji: "🍃"
          },
          {
            id: 3,
            nombre: "Gusano de Alambre",
            cultivos: "Papa, zanahoria, cebolla",
            sintomas: "Agujeros en raíces, marchitez de plantas jóvenes",
            control: "Rotación de cultivos y trampas de cebos",
            emoji: "🪱"
          },
          {
            id: 4,
            nombre: "Virus del Mosaico",
            cultivos: "Pepino, tomate, tabaco",
            sintomas: "Hojas con manchas verdes y amarillas, deformaciones",
            control: "Eliminar plantas infectadas y usar semillas certificadas",
            emoji: "🦠"
        },
        {
          id: 5,
          nombre: "Mosca Blanca",
          cultivos: "Tomate, berenjena, pepino",
          sintomas: "Hojas amarillentas y melaza pegajosa",
          control: "Uso de trampas cromáticas y jabón potásico",
          emoji: "🦟"
        },
        {
          id: 6,
          nombre: "Trips",
          cultivos: "Cebolla, ajo, lechuga",
          sintomas: "Manchas plateadas en hojas y deformaciones",
          control: "Uso de mallas anti-insectos y rotación de cultivos",
          emoji: "🦗"
        },
        {
          id: 7,
          nombre: "Gorgojo del maíz",
          cultivos: "Maíz, arroz, trigo",
          sintomas: "Daño en granos almacenados",
          control: "Almacenamiento en condiciones secas y uso de trampas",
          emoji: "🐞"
        },
        {
          id: 8,
          nombre: "Langosta",
          cultivos: "Cereales y pastos",
          sintomas: "Defoliación completa de plantas",
          control: "Control biológico con hongos entomopatógenos",
          emoji: "🦗"
        },
        {
          id: 9,
          nombre: "Roya del Café",
          cultivos: "Café",
          sintomas: "Manchas anaranjadas en hojas",
          control: "Podas sanitarias y uso de fungicidas",
          emoji: "🍂"
        },
        {
          id: 10,
          nombre: "Tizón Tardío",
          cultivos: "Papa, tomate",
          sintomas: "Manchas marrones en hojas y frutos",
          control: "Rotación de cultivos y aplicación de fungicidas",
          emoji: "🌧️"
        },
        {
            id: 11,
            nombre: "Minador de hojas",
            cultivos: "Cítricos, tomate, papa",
            sintomas: "Galerías blanquecinas en hojas y deformaciones",
            control: "Podas sanitarias y aplicación de insecticidas biológicos",
            emoji: "🍂"
        },
        {
            id: 12,
            nombre: "Picudo del banano",
            cultivos: "Banano, plátano",
            sintomas: "Tallos perforados y debilitamiento de la planta",
            control: "Uso de trampas con feromonas y eliminación de plantas afectadas",
            emoji: "🍌"
        },
        {
            "id": 13,
            nombre: "Araña Roja",
            cultivos: "Frutales, tomate, fresas",
            sintomas: "Hojas amarillentas con puntos oscuros y telarañas finas",
            control: "Aplicación de acaricidas naturales y aumento de humedad",
            emoji: "🕷️"
        },
        {
            id: 14,
            nombre: "Chinche de encaje",
            cultivos: "Aguacate, algodón",
            sintomas: "Hojas con aspecto seco y manchas negras en el envés",
            control: "Eliminación manual y uso de aceite de neem",
            emoji: "🦠"
        },
        {
            id: 15,
            nombre: "Gusano Cogollero",
            Cultivos: "Maíz, sorgo, trigo",
            sintomas: "Agujeros en hojas y destrucción del cogollo",
            control: "Aplicación de insecticidas biológicos y trampas de feromonas",
            emoji: "🌽"
        },
        {
            id: 16,
            nombre: "Mosca de la fruta",
            cultivos: "Cítricos, mango, guayaba",
            sintomas: "Frutos con larvas y caída prematura",
            control: "Uso de trampas atrayentes y eliminación de frutos infestados",
            emoji: "🍊"
        },
        {
            id: 17,
            nombre: "Barrenador del tallo",
            cultivos: "Caña de azúcar, arroz, maíz",
            sintomas: "Tallos perforados y debilitamiento de la planta",
            control: "Eliminación de residuos de cultivo y aplicación de control biológico",
            emoji: "🌾"
        },
        {
            id: 18,
            nombre: "Trips del chile",
            cultivos: "Chile, pimiento, tomate",
            sintomas: "Manchas plateadas en hojas y deformación de frutos",
            control: "Uso de mallas anti-insectos y rotación de cultivos",
            emoji: "🌶️"
        },
        {
            id: 19,
            nombre: "Barrenador del café",
            cultivos: "Café",
            sintomas: "Frutos perforados con larvas en su interior",
            control: "Cosecha oportuna y trampas con feromonas",
            emoji: "☕"
        },
        {
            id: 20,
            nombre: "Nematodos",
            cultivos: "Papa, zanahoria, plátano",
            sintomas: "Raíces deformadas y debilitamiento general",
            control: "Rotación de cultivos y aplicación de nematicidas biológicos",
            emoji: "🪱"
        },
        {
            id: 21,
            nombre: "Cochinilla algodonosa",
            cultivos: "Cítricos, guanábana, mangos",
            sintomas: "Hojas amarillentas, secreción de una sustancia pegajosa y crecimiento debilitado",
            control: "Aplicación de aceites hortícolas, control biológico con depredadores naturales y poda de partes afectadas",
            emoji: "🐜"
        }

        ]
      };
    },
    computed: {
      filtradas() {
        return this.plagas.filter(plaga =>
          plaga.nombre.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    }
  };
  </script>
  
  <style scoped>
  /* Personaliza estilos si es necesario */
  </style>
  