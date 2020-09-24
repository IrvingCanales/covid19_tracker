<template>

  <div class="header">
    
      <h3 style="color: red">COVID-19 TRACKER </h3>        
        
      
        <select class="selected" @change=selectedCountry() v-model="selected">
          <option v-for="(i, index) in items" :key="index">{{i}}</option>          
        </select>
     
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from "vuex";
export default {
    data () {
      return {
      items: ['Global'],
      selected:'Global',
      }
    },
    methods:{
      ...mapActions(['changeCountrySelected','loadCountrys']),
      selectedCountry(){
         
         let url = this.selected !== 'Global' ? 'https://disease.sh/v3/covid-19/countries/'+this.selected+'?strict=true' : 'https://disease.sh/v3/covid-19/all'
        let lat =''
        let long = ''
        let coo = []
         axios.get(url)
         .then(resp => {
           
           
           lat = resp.data.countryInfo.lat
           long = resp.data.countryInfo.long

           coo[0] = lat
           coo[1] = long            

           this.changeCountrySelected(this.selected)           

            
            
           this.$root.$emit('update', 'countries', resp.data)
           this.$root.$emit('updateMap', 'countries', coo)
         }).catch(er => {

         })


         
      },
      


    },
    computed:{
      ...mapGetters(['getCountrySelected','getCountrys'])
    },
    
    mounted(){
            
      
      
      this.getCountrys.forEach(element => {        
        this.items.push(element.country)
        
      });
      
    }
}
</script>

<style>
.header{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
}
.selected{
    display: inline-block;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem 1.75rem .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    border: 1px solid #ced4da;
    border-radius: 1px;
    background: #fff;
    appearance: none;
}
</style>