<template>
  <div class="card">
    <div class="search-container">
      <input v-model="searchQuery" type="text" placeholder="Rechercher..." class="search-bar" />
      <easy-data-table v-model:items-selected="itemsSelected" :headers="headers" :items="filteredItems"
        :rows-per-page="20" class="data-table">
        <template #item-actions="{ item }">
          <div class="action-buttons">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="action-icon search-icon"
              @click="handleSearch(item)" />
            <font-awesome-icon :icon="['fas', 'trash']" class="action-icon delete-icon" @click="handleDelete(item)" />
          </div>
        </template>
      </easy-data-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { default as EasyDataTable } from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faMagnifyingGlass);

type Item = {
  id: string;
  pseudo: string;
  email: string;
  classement: number | null;
};

const URI = import.meta.env.VITE_URI;
const API_PORT = import.meta.env.VITE_API_PORT;

const headers = [
  { text: "ID", value: "joueur_id", sortable: true },
  { text: "PSEUDO", value: "pseudo", sortable: true },
  { text: "EMAIL", value: "email" },
  { text: "CLASSEMENT", value: "classement", sortable: true },
  { text: "ACTIONS", value: "actions" },
];

const items = ref<Item[]>([]);
const itemsSelected = ref<Item[]>([]);
const searchQuery = ref("");
const loading = ref(false);
const errorMessage = ref("");

// Fonction pour récupérer les joueurs
const fetchPlayers = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch(`http://${URI}:${API_PORT}/players/by/id`);
    const data = await response.json();

    if (data.success) {
      items.value = data.joueurs;
    } else {
      errorMessage.value = "Impossible de récupérer les joueurs.";
    }
  } catch (error) {
    errorMessage.value = "Erreur lors du chargement des joueurs.";
    console.error("Erreur API:", error);
  } finally {
    loading.value = false;
  }
};

// Appeler l'API au chargement du composant
onMounted(fetchPlayers);

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value;
  const query = searchQuery.value.toLowerCase();
  return items.value.filter(item =>
      Object.values(item).some(value =>
          String(value).toLowerCase().includes(query)
      )
  );
});

const handleSearch = (item: Item) => {
  console.log('Recherche de l\'élément:', item);
};

const handleDelete = (item: Item) => {
  console.log('Suppression de l\'élément:', item);
};

</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.1);
  /* Added box shadow */
}

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
}

.search-bar:focus {
  border-color: #007bff;
}

.data-table {
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.action-icon {
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}

.action-icon:hover {
  transform: scale(1.2);
}

.delete-icon:hover {
  color: #c40000;
}

.search-icon:hover {
  color: #007bff;
}


.search-container {
  width: 95%;
  padding: 20px;
  height: 100%;
  justify-content: center !important;
  /* Assurez-vous que le conteneur prend toute la largeur */
}

.conteneur {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 20px;
  height: 100%;
}

.search-bar {
  width: 100%;
  /* Prend 100% de la largeur de son conteneur */
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  /* Inclut le padding et la bordure dans la largeur */
}

.search-bar:focus {
  border-color: #007bff;
}

.data-table {
  border-radius: 8px;
  overflow: hidden;
  background: white;
}
</style>
