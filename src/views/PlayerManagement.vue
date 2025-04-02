<template>
  <div class="card">
    <div class="search-container">
      <input v-model="searchQuery" type="text" placeholder="Rechercher..." class="search-bar"/>
      <easy-data-table v-model:items-selected="itemsSelected" :headers="headers" :items="filteredItems"
                       :rows-per-page="20" class="data-table">
        <template #item-actions="item">
          <div class="action-buttons">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="action-icon search-icon"
                               @click="handleSearch(item)"/>
            <font-awesome-icon :icon="['fas', 'trash']" class="action-icon delete-icon" @click="handleDelete(item)"/>
          </div>
        </template>
      </easy-data-table>
    </div>
  </div>
  <!-- Modale de détail du joueur -->
  <div v-if="showModal" class="modal-backdrop" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <div class="player-header">
          <h2>{{ selectedPlayer ? selectedPlayer.joueur.pseudo : 'Chargement...' }}</h2>
          <h2 class="id-player">#{{ selectedPlayer ? selectedPlayer.joueur.classement_general : 'Chargement...' }}</h2>
        </div>
        <button class="close-button" @click="closeModal">✕</button>
      </div>

      <div class="modal-body">
        <div class="player-info-column">
          <div class="info-box">
            <p>
              <strong>Adresse mail :</strong><br/>
              {{ selectedPlayer ? selectedPlayer.joueur.email : 'Chargement...' }}
            </p>

            <p>
              <strong>Dernière connexion :</strong><br/>
              {{ selectedPlayer ? selectedPlayer.joueur.derniere_connexion : 'Chargement...' }}
            </p>

            <p>
              <strong>Temps de jeu total</strong><br/>
              {{ selectedPlayer ? selectedPlayer.joueur.temps_joue : 'Chargement...' }}
            </p>
            <p>
              <strong>Nombre de partages</strong><br/>
              {{ selectedPlayer ? selectedPlayer.joueur.nb_partage : 'Chargement...' }}
            </p>
          </div>
        </div>

        <div class="player-results-column">
          <h3>Résultats par jeu</h3>

          <div class="game-results">
            <div v-for="score in selectedPlayer.scores" :key="score.jeu_id">
              <h4>{{ score.jeu_nom }}</h4>
              <p>{{score.points}} pts</p>
              <p>#{{score.classement}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from "vue";
import {default as EasyDataTable} from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faMagnifyingGlass);

type Item = {
  id,
  pseudo,
  email,
  classement,
};

const URI = import.meta.env.VITE_URI;
const API_PORT = import.meta.env.VITE_API_PORT;

const headers = [
  {text: "ID", value: "joueur_id", sortable: true},
  {text: "PSEUDO", value: "pseudo", sortable: true},
  {text: "EMAIL", value: "email"},
  {text: "CLASSEMENT", value: "classement", sortable: true},
  {text: "ACTIONS", value: "actions"},
];

const showModal = ref(false);
let selectedPlayer = ref(null);
const items = ref([]);
const itemsSelected = ref([]);
const searchQuery = ref("");
const loading = ref(false);
const errorMessage = ref("");

// Fonction pour récupérer les joueurs
const fetchPlayers = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch(`http://${URI}:${API_PORT}/players/sorted/by-id`);
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

const handleSearch = async (itemData) => {
  console.log('Recherche de l\'élément:', itemData.joueur_id);
  showModal.value = true;

  try {
    const response = await fetch(`http://${URI}:${API_PORT}/player/${itemData.joueur_id}/score`);
    const data = await response.json();

    if (data.success) {
      selectedPlayer.value = data;
      console.log("selectedPlayer : ", selectedPlayer)
    } else {
      console.error("Joueur non trouvé !");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du joueur :", error);
  }
};

const closeModal = () => {
  showModal.value = false;
  selectedPlayer.value = null; // Réinitialisation du joueur sélectionné
};


const handleDelete = (itemData) => {
  console.log('Suppression de l\'élément:', itemData.item);
  // Utiliser itemData.item pour accéder à l'objet complet
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

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent */
  backdrop-filter: blur(8px); /* Effet de flou */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}


.modal-content {
  width: 80%;
  max-width: 800px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  position: absolute;  /* Assurez-vous qu'elle est positionnée indépendamment */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centre parfaitement la modale */
}

.id-player{
  color: #f0ad4e;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.player-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.player-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}


.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #555;
}

.modal-body {
  display: flex;
  padding: 0;
}

.player-info-column {
  flex: 1;
  padding: 20px;
  background-color: #f7f9fc;
}


.player-results-column {
  flex: 1.5;
  padding: 20px;
}

.player-results-column h3 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
}

/* Modal Styles */



.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
}



.player-info-column {
  flex: 1;
  padding: 20px;
  background-color: #f5f7fa;
}

.info-box {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.info-box p {
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.info-box p:last-child {
  margin-bottom: 0;
}

.info-box strong {
  color: #666;
  font-weight: 600;
}

.game-results div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.game-results div:last-child {
  border-bottom: none;
}

.game-results h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  width: 180px; /* Largeur fixe pour le nom du jeu */
}

.game-results p {
  margin: 0;
  font-size: 14px;
  padding: 0 15px;
}

/* Style pour les points */
.game-results p:nth-child(2) {
  color: #007bff;
  font-weight: bold;
}

/* Style pour le classement */
.game-results p:nth-child(3) {
  color: #f0ad4e;
  font-weight: bold;
}

</style>