<template>
  <div id="menuVehicules">
      <div id="catmenu">
          <div class="catimg fa fa-times my-lightblue" :class="{ activeCat: isActiveCat('') }" @click="setCat('')"></div>
          <div class="catimg fa fa-car my-orange" :class="{ activeCat: isActiveCat('voiture') }" @click="setCat('voiture')"></div>
          <div class="catimg fa fa-motorcycle my-darkblue" :class="{ activeCat: isActiveCat('moto') }" @click="setCat('moto')"></div>
          <div class="catimg fa fa-bicycle my-green" :class="{ activeCat: isActiveCat('velo') }" @click="setCat('velo')"></div>
          <div class="catimg fa fa-bus my-red" :class="{ activeCat: isActiveCat('van') }" @click="setCat('van')"></div>
     </div>
      <div id="styleMenuVehicules">
          <router-link to="/liste">
          <div class="catimg fa fa-list-ul my-lightblue" :class="{ activeCat: isActiveMode('listVehicule') }" @click="setMode('listVehicule')"></div>
          </router-link>
          <router-link to="/tableau">
          <div class="catimg fa fa-th my-lightblue" :class="{ activeCat: isActiveMode('tableVehicule') }" @click="setMode('tableVehicule')"></div>
          </router-link>
          <router-link to="/ajout">
          <div class="catimg fa fa-plus my-lightblue" :class="{ activeCat: isActiveMode('ajoutVehicule') }" @click="setMode('ajoutVehicule')"></div>
          </router-link>
     </div>
  </div>
</template>

<script>

// Composant menuvehicules. 
// Affiche les liens pour filtrer une catégorie de véhicules.
// Affiche les lien pour changer te type d'affichage.


import globalStore from '../globalVars';

export default {
    name:'menuVehicules',
    data: function() {
        return {
            activeCat:globalStore.activeCat,
            activeMode:"listVehicule"
        }
    },
       methods: {
        setCat: function (option) {
            this.activeCat = option;
            globalStore.activeCat=option;
            Event.fire('changeCat',option);
        },
        setMode: function (option) {
            this.activeMode = option;
        },
        isActiveCat: function (menuCat) {
          return this.activeCat === menuCat;
        },
        isActiveMode: function (menuCat) {
          return this.activeMode === menuCat;
        }
    }
  };
</script>

<style>

  #menuVehicules{
  box-sizing: border-box;
  font-size:16px;
  width:100%;
  background:rgb(245, 244, 244);
  margin:auto;
  padding: 8px 0px 8px 20px;
  display:flex;
  flex-direction:row;
  align-items:stretch;
  align-content: flex-start;
  }

#catmenu{  
  padding:0px 0px 0px 10px;
  width:100px;
  flex:1 0 0;
}

#styleMenuVehicules{
  padding:0px 30px 0px 0px;
 
}

.catimg.activeCat{
  border-top:10px solid #e2e2e2;
  border-bottom:10px solid #e2e2e2;
}
</style>
