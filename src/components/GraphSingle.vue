<template>
  <div>
      <Graph v-if="loaded" :chartData=chartdata :options=options :labels=labels :label=label
        class="graph"></Graph>
  </div>
</template>

<script>
import Graph from './Graph'

import axios from 'axios'
import moment from 'moment'

export default {
    name: 'GraphSingle',
    
    data(){
        return{
            loaded: false,
            labels: [],
            chartdata: [],
            label: '',
            casesType: '',
            options: {
                responsive: true,
                maintainAspectRatio: false,   
                }
        }
    },
    methods:{
        reload(re){
            alert('reload'+ re)
        }
    },
    components:{
        Graph,
    },
    computed:{

    },
    async mounted(){
        const days=60

        

        

      
        await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays='+days)
        .then(resp => {
            let newCases=[]            
            let labels = []
            let pastCases
            let date
            let casesType='cases'

            if(this.casesType){
                casesType=this.casesType
            }
                
            
            for(let i in resp.data.[casesType]){

                if(pastCases){
                    
                    pastCases = resp.data.[casesType][i] - pastCases                    
                    date = moment(i, "MM-DD-YYYY").format("DD MMM YYYY");                                        
                    
                    labels.push(date)
                    newCases.push(pastCases)
                    
                }
                
                pastCases = resp.data.[casesType][i]
                
            }            

            this.label=casesType
            this.labels.push(labels)
            this.chartdata.push(newCases)
          
            this.loaded = true
            

            
        }).catch(er => {
            console.log('Error graph '+er)
        })
  }
}
</script>

<style>
.graph{
    background-color: #fff;
    padding: 1rem;
    border-radius: 20px;  
    margin-top: 10px;  
    box-shadow: 0 0 8px -4px rgba(0,0,0,.5);
}
</style>