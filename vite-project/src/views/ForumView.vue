<template>
    <div class="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-green-700 text-center mb-6">Foro de Agrosync</h1>
        
        <!-- Formulario para nuevo tema -->
        <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 class="text-xl font-semibold text-green-800 mb-4">Crear un nuevo tema</h2>
          <input v-model="nuevoTema.titulo" type="text" placeholder="Título del tema" 
            class="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-green-500">
          <textarea v-model="nuevoTema.descripcion" rows="3" placeholder="Descripción del tema"
            class="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
          <button @click="agregarTema" 
            class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Publicar Tema
          </button>
        </div>
        
        <!-- Lista de temas -->
        <div v-for="tema in temas" :key="tema.id" class="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 class="text-xl font-bold text-green-700">{{ tema.titulo }}</h3>
          <p class="text-gray-700 mb-4">{{ tema.descripcion }}</p>
          
          <!-- Comentarios -->
          <div class="bg-gray-50 p-4 rounded-md">
            <h4 class="text-lg font-semibold text-green-800 mb-3">Comentarios</h4>
            <div v-for="comentario in tema.comentarios" :key="comentario.id" class="mb-3 p-3 border-l-4 border-green-500 bg-gray-100 rounded-md">
              <p class="text-gray-700"><span class="font-semibold text-green-700">{{ comentario.usuario }}:</span> {{ comentario.texto }}</p>
            </div>
            
            <!-- Agregar comentario -->
            <input v-model="nuevoComentario[tema.id]" type="text" placeholder="Añadir un comentario..."
              class="w-full p-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-green-500">
            <button @click="agregarComentario(tema.id)" 
              class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2 transition duration-300">
              Comentar
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nuevoTema: { titulo: "", descripcion: "" },
        nuevoComentario: {},
        temas: [
          {
            id: 1,
            titulo: "Control de plagas en cultivos de tomate",
            descripcion: "¿Cuál es el mejor método orgánico para eliminar pulgones?",
            comentarios: [
              { id: 1, usuario: "Juan Pérez", texto: "El aceite de neem me ha funcionado muy bien." },
              { id: 2, usuario: "María López", texto: "Yo utilizo jabón potásico y es muy efectivo." }
            ]
          },
          {
            id: 2,
            titulo: "Fertilización ecológica para el maíz",
            descripcion: "¿Qué abonos naturales recomiendan para mejorar la producción?",
            comentarios: [
              { id: 3, usuario: "Carlos Rodríguez", texto: "El compost casero con estiércol funciona de maravilla." },
              { id: 4, usuario: "Ana Martínez", texto: "Los restos de café y cáscaras de huevo son una gran opción." }
            ]
          }
        ]
      };
    },
    methods: {
      agregarTema() {
        if (this.nuevoTema.titulo.trim() && this.nuevoTema.descripcion.trim()) {
          this.temas.push({
            id: Date.now(),
            titulo: this.nuevoTema.titulo,
            descripcion: this.nuevoTema.descripcion,
            comentarios: []
          });
          this.nuevoTema.titulo = "";
          this.nuevoTema.descripcion = "";
        }
      },
      agregarComentario(temaId) {
        if (this.nuevoComentario[temaId]?.trim()) {
          const tema = this.temas.find(t => t.id === temaId);
          tema.comentarios.push({
            id: Date.now(),
            usuario: "Usuario Anónimo",
            texto: this.nuevoComentario[temaId]
          });
          this.nuevoComentario[temaId] = "";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  input, textarea {
    transition: all 0.3s ease;
  }
  input:focus, textarea:focus {
    border-color: #34D399;
    box-shadow: 0 0 5px rgba(52, 211, 153, 0.5);
  }
  </style>
  