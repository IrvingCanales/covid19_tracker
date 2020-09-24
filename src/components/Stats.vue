<template>
  <div class="stats">
              
    <Card title="Cases" :cases=cases  />
    <Card title="Recovered" :cases=recovered  />
    <Card title="Deaths" :cases=deaths />
      
  </div>
</template>

<script>
import Card from './StatsCard'
import axios from 'axios'
export default {
    data(){
      return{
        cases: [],
        recovered: [],
        deaths: []
      }
    },
    components:{
        Card,
    },
    methods:{
      
    },
    mounted(){
       this.$root.$on('update', (item, response) => {
         this.cases = []
        this.recovered = []
        this.deaths = []                        

            this.cases.push(response.todayCases)
        this.cases.push(response.cases)
        
        this.recovered.push(response.todayRecovered)
        this.recovered.push(response.recovered)
        
        this.deaths.push(response.todayDeaths)
          this.deaths.push(response.deaths)
        })

      axios.get('https://disease.sh/v3/covid-19/all')
      .then(resp => {
        //console.log(resp.data)
        this.cases.push(resp.data.todayCases)
        this.cases.push(resp.data.cases)
        
        this.recovered.push(resp.data.todayRecovered)
        this.recovered.push(resp.data.recovered)
        
        this.deaths.push(resp.data.todayDeaths)
        this.deaths.push(resp.data.deaths)
        
        
                        
      }).catch(er => {
        
        console.log('Error in cases')
      })
    }

}
</script>

<style >
.stats{
    display: flex;
    justify-content: space-between;
}
</style>