<template>
    <div class="marketplace">
      <h1>🌿 Marketplace de Agricultores</h1>
  
      <!-- Formulario para agregar productos -->
      <div class="add-product">
        <h3>➕ Agregar Producto</h3>
        <input v-model="newProduct.name" placeholder="🍎 Nombre del producto" />
        <input v-model.number="newProduct.price" placeholder="💰 Precio ($)" type="number" />
        <input v-model.number="newProduct.quantity" placeholder="📦 Cantidad (kg)" type="number" />
        <input v-model="newProduct.user" placeholder="👤 Vendido por" />
        <select v-model="newProduct.type">
          <option value="venta">💲 Venta</option>
          <option value="intercambio">🔄 Intercambio</option>
        </select>
        <button @click="addProduct">✅ Agregar</button>
      </div>
  
      <div v-if="products.length === 0" class="loading">⏳ Cargando productos...</div>
      <div v-else class="products">
        <div v-for="product in products" :key="product._id" class="product">
          <h3>{{ product.emoji }} {{ product.name }}</h3>
          <p>💰 Precio: {{ product.type === 'venta' ? `$${product.price}` : '🔄 Intercambio' }}</p>
          <p>📦 Cantidad: {{ product.quantity }} kg</p>
          <p>👤 Vendido por: {{ product.user }}</p>
          <button @click="handleTransaction(product)">
            {{ product.type === 'venta' ? '🛒 Comprar' : '🔄 Intercambiar' }}
          </button>
        </div>
      </div>
  
      <!-- Modal dinámico -->
      <div v-if="modalVisible" class="modal">
        <div class="modal-content">
          <h2>✅ Transacción Exitosa</h2>
          <p>Has {{ transactionType }} <strong>{{ selectedProduct.name }}</strong> de <strong>{{ selectedProduct.user }}</strong>.</p>
          <button @click="modalVisible = false">Cerrar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          { _id: "1", name: "Tomates", price: 5, quantity: 10, user: "Carlos Pérez", type: "venta", emoji: "🍅" },
          { _id: "2", name: "Papas", price: 3, quantity: 20, user: "Ana López", type: "intercambio", emoji: "🥔" },
          { _id: "3", name: "Lechugas", price: 2, quantity: 15, user: "Juan Torres", type: "venta", emoji: "🥬" },
          { _id: "4", name: "Maíz", price: 6, quantity: 25, user: "María Rodríguez", type: "intercambio", emoji: "🌽" },
          { _id: "5", name: "Frijoles", price: 4, quantity: 30, user: "Pedro Sánchez", type: "venta", emoji: "🫘" },
          { _id: "6", name: "Caña de Azúcar", price: 8, quantity: 12, user: "Luisa Martínez", type: "intercambio", emoji: "🍬" }
        ],
        newProduct: {
          name: "",
          price: 0,
          quantity: 0,
          user: "",
          type: "venta"
        },
        modalVisible: false,
        selectedProduct: null,
        transactionType: ""
      };
    },
    methods: {
      addProduct() {
        if (!this.newProduct.name || !this.newProduct.user || this.newProduct.quantity <= 0) {
          alert("Completa todos los campos correctamente.");
          return;
        }
  
        const product = { 
          ...this.newProduct, 
          _id: Date.now().toString(), 
          emoji: "🍏" // Por defecto, hasta que el usuario seleccione uno
        };
  
        this.products.unshift(product);
        this.newProduct = { name: "", price: 0, quantity: 0, user: "", type: "venta" };
      },
      handleTransaction(product) {
        this.selectedProduct = product;
        this.transactionType = product.type === "venta" ? "comprado" : "intercambiado";
        this.modalVisible = true;
      }
    }
  };
  </script>
  
  <style scoped>
  .marketplace {
    text-align: center;
    padding: 20px;
  }
  
  /* Estilos del formulario */
  .add-product {
    margin-bottom: 20px;
    background: #f5f5f5;
    padding: 10px;
    border-radius: 10px;
  }
  .add-product input, .add-product select {
    margin: 5px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .add-product button {
    background-color: #28a745;
    color: white;
    padding: 8px;
    border: none;
    cursor: pointer;
    margin-top: 10px;
  }
  .add-product button:hover {
    background-color: #218838;
  }
  
  /* Productos */
  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
  .product {
    background: white;
    border-radius: 10px;
    padding: 15px;
    width: 220px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }
  .product:hover {
    transform: scale(1.05);
  }
  .product h3 {
    margin-bottom: 10px;
  }
  .product p {
    font-size: 14px;
    margin: 5px 0;
  }
  .product button {
    background-color: #007bff;
    color: white;
    padding: 8px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  .product button:hover {
    background-color: #0056b3;
  }
  
  /* Modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
  .modal-content button {
    background-color: red;
    color: white;
    border: none;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
  .modal-content button:hover {
    background-color: darkred;
  }
  </style>
  