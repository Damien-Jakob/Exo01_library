<template>
  <div id="sidebarVehicules" v-cloak>
     <transition-group name="vListElem" tag="ul" >
        <li class="vListElem" :class="{ active: isActive(item.id) }" v-for="item in filteredItems" :key="item.id" @click="setVehicule(item.id)">{{item.titre}}
          <i aria-hidden="true" v-if="item.cat === 'voiture'" class="icv fa fa-car my-orange"></i>
          <i aria-hidden="true" v-if="item.cat === 'moto'" class="icv fa fa-motorcycle my-darkblue"></i>
          <i aria-hidden="true" v-if="item.cat === 'velo'" class="icv fa fa-bicycle my-green"></i>
          <i aria-hidden="true" v-if="item.cat=== 'van'" class="icv fa fa-bus my-red"></i>
        </li>
      </transition-group>
  </div>
</template>

<script>

import Vue from 'vue'
import Vuex from 'vuex'
import globalStore from '../globalVars';


export default {
    name:'sidebarVehicules',
    data: function() {
        return {
            items:[],
            filtre:globalStore.activeCat           
        }
    },
    mounted: function () {
        this.fetchData();
        Event.listen('changeCat',function(n){
            this.filterItems(n);
        }.bind(this)) ;
    },
    computed: {
        filteredItems() {
          return this.items.filter(item => {
          return item.cat.indexOf(this.filtre) > -1
          })
        }, 
        activeItem() {
           return this.$store.state.activeItem['id'];   
        }    

    },
    methods: {
        setVehicule: function (option) {
            this.activeItem = option;
            Event.fire('changeVehicule',option);
            this.$store.commit('setActiveItem', this.$store.state.vehicules[option.toString()])
        },
        isActive: function (menuItem) {
          return this.activeItem === menuItem;
        },
        isActiveCat: function (menuCat) {
          return this.filtre === menuCat;
        },       
        fetchData: function () {     
                         
          this.items = this.$store.state.vehicules;                  
         
           //    alert ("hello from sidebaVehicules.vue  fetchData()");
           //    Event.fire('changeVehicule',this.filteredItems[0].id);
           //    Event.fire('changeVehicule',this.items[1]['id']);
          
        },
        filterItems: function (n) {
           this.filtre=n;
           this.activeCat = n;
           //Event.fire('changeVehicule',this.filteredItems[0]['id']);
        }

    }
  };

</script>

<style scoped>

#sidebar ul{
  padding:0px;
  margin:0px;
  }

.vListElem{
  line-height:1.3em;
  position:relative;
  box-sizing: border-box;
  background:#3CB4CB;
  background:#f4f4f4;
  width:300px;
  height:36px;
  padding:10px;
  padding-left:40px;
  margin-bottom:10px;
  list-style: none;
  display: list-item;
  }

.vListElem:hover{
  background:#f9f9f9;
 border:1px solid white;
}

.vListElem.active{
   background:#e2e2e2;
}

.icv{
  position:absolute;
  top:0px;
  left:0px;
  color:white;
  padding:5px;
  text-align:center;
  width:28px;
  height:28px;
}

.vListElem-move {
  transition: transform 400ms ease-in-out 50ms;
}

.vListElem-enter-active { transition: all 300ms ease-out }

.vListElem-leave-active {
    transition: all 200ms ease-in;
    position: absolute;
    z-index: 0;
  }

.vListElem-enter,.vListElem-leave-to { opacity: 0 }
 .vListElem-enter { transform: scale(0.9) }


 [v-cloak] {
    display: none;
  }

</style>
