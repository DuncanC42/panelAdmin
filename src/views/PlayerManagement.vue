<template>
  <div class="conteneur">
    <div class="search-container">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher..."
          class="search-bar"
      />
      <easy-data-table
          v-model:items-selected="itemsSelected"
          :headers="headers"
          :items="filteredItems"
          :rows-per-page="20"
          class="data-table"
      >
        <template #item-actions="{ item }">
          <div class="action-buttons">
            <font-awesome-icon
                :icon="['fas', 'magnifying-glass']"
                class="action-icon search-icon"
                @click="handleSearch(item)"
            />
            <font-awesome-icon
                :icon="['fas', 'trash']"
                class="action-icon delete-icon"
                @click="handleDelete(item)"
            />
          </div>
        </template>
      </easy-data-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
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
  classement: number;
};

const headers = [
  { text: "ID", value: "id", sortable: true},
  { text: "PSEUDO", value: "pseudo", sortable: true},
  { text: "EMAIL", value: "email"},
  { text: "CLASSEMENT", value: "classement", sortable: true},
  { text: "ACTIONS", value: "actions"},
];

const items: Item[] = [
  { id: "01", pseudo: "Timtim", email: "tribottetimeo@gmail.com", classement: 556 },
  { id: "02", pseudo: "Dundun", email: "cadoretduncan@gmail.com", classement: 555 },
  { id: "03", pseudo: "Maxmax", email: "dardennemaxime1@gmail.com", classement: 554 },
  { id: "04", pseudo: "Natnat", email: "filauxnathan1@gmail.com", classement: 553 },
  { id: "05", pseudo: "Timtim1", email: "tribottetimeo1@gmail.com", classement: 400 },
  { id: "06", pseudo: "Dundun1", email: "cadoretduncan1@gmail.com", classement: 330 },
  { id: "07", pseudo: "Maxmax1", email: "dardennemaxime3@gmail.com", classement: 320 },
  { id: "08", pseudo: "Natnat1", email: "filauxnathan3@gmail.com", classement: 310 },
  { id: "09", pseudo: "Timtim2", email: "tribottetimeo3@gmail.com", classement: 310 },
  { id: "10", pseudo: "Dundun2", email: "cadoretduncan4@gmail.com", classement: 299 },
  { id: "11", pseudo: "Maxmax2", email: "dardennemaxime4@gmail.com", classement: 288 },
];

const itemsSelected = ref<Item[]>([]);
const searchQuery = ref("");

const filteredItems = computed(() => {
  if (!searchQuery.value) return items;
  const query = searchQuery.value.toLowerCase();
  return items.filter(item =>
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
  width: 100%; /* Assurez-vous que le conteneur prend toute la largeur */
}

.conteneur{
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 20px;
  box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.1);
  padding-left: 20px;
  padding-right: 20px;
}

.search-bar {
  width: 100%; /* Prend 100% de la largeur de son conteneur */
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box; /* Inclut le padding et la bordure dans la largeur */
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
