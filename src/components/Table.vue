<template>
  <div class="table">
   <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left"><strong>Flag</strong></th>
          <th class="text-left"><strong>Country</strong></th>
          <th class="text-left"><strong>Cases</strong></th>
          <th class="text-left"><strong>Tests</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in countries" :key="item.name">
          <td><div class="info-flag-table"  v-bind:style="{ 'background-image': 'url('+item.flag+')'  }" /></td>
          <td> {{ item.name }}</td>
          <td><strong>{{ new Intl.NumberFormat("en-IN").format(item.cases) }} </strong></td>
          <td><strong>{{ new Intl.NumberFormat("en-IN").format(item.tests) }} </strong></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
 
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
      data () {
      return {
        countries:[],
             
      }
    },

    methods:{      
      compare(a,b){
        
          const casesA = a.cases
          const casesB = b.cases

          let comparison = 0;
          if (casesA > casesB) {
            comparison = 1;
          } else if (casesA < casesB) {
            comparison = -1;
          }
          return comparison;
        
      },
      sorts(){
        this.countries.sort(this.compare).reverse()
        
      }
    },

    computed:{
      ...mapGetters(['getCountrys'])
    },

    mounted(){


      this.getCountrys.forEach(element=>{
          this.countries.push({ name: element.country, cases: element.cases, flag: element.countryInfo.flag, tests:element.tests})
            this.sorts()
      })

    

        
    }
}
</script>

<style>
.table{
  background-color: #fff;
    padding: 1rem;
    border-radius: 20px;    
    box-shadow: 0 0 8px -4px rgba(0,0,0,.5);
}

.info-flag-table img{
    width: 100%;
    border-radius: 5px;
}
.info-flag-table{
    height: 15px;
    width: 100%;
    background-size: cover;
    border-radius: 8px;
}
</style>