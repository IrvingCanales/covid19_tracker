<template>
  <div id="app">
    <div class="left_tab">
      
      <Header v-if="getCountrys.length>0" />
      <Stats />
      <Map v-if="getCountrys.length>0" />
    </div>
    <div class="right_tab">
        <Table  v-if="getCountrys.length>0"/>
        <GraphSingle  />        
    </div>
 
  </div>
</template>

<script>
import Header from './components/Header'
import Stats from './components/Stats'
import Table from './components/Table'
import Map from './components/Map'
import GraphSingle from './components/GraphSingle'
import { mapActions, mapGetters } from 'vuex'


export default {
  name: 'App',
  components: {
    Header,
    Stats,
    Table,
    Map,
    GraphSingle
  },

  methods:{
    ...mapActions(['loadCountrys'])
  },

  computed:{
    ...mapGetters(['getCountrys'])
  },

  mounted(){
    this.loadCountrys()
  }

  
  
}
</script>

<style>
body{
  background-color: #f5f6fa;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
}

.left_tab{
  flex: 0.9 1;
}
.right_tab{
    display: flex;
    flex-direction: column;
}

@media (max-width: 990px) {
  #app {
    flex-direction: column;
  }
}
</style>
