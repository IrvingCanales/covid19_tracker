<template>
  <div class="cards">
    <v-card
        class=" flex-row mb-3"
        max-width="500"
        :elevation="20"
        @click="selectedCause(title)"
        >
            <v-card-text>
                <div>{{title}}</div>
                <div v-for="(item, index) in cases" :key="index">
                    
                    <p  class="display-1 text--primary" v-show="index===0">
                     Today: <strong>{{ new Intl.NumberFormat("en-IN").format(item) }} </strong>
                    </p>                    
                    <p class="display-1 text--primary" v-show="index>0">Total: <strong>{{ new Intl.NumberFormat("en-IN").format(item) }} </strong>  </p>
                </div>
                
            </v-card-text>
    
    </v-card>
  </div>
</template>

<script>
export default {
    props: {
        title: String,
        cases: Array,
    },
    methods:{
      selectedCause(casesType){

        
          //alert(casesType)
           this.$root.$emit('cases', 'countries', casesType.toLowerCase().trim())
      }
    }
    

    
}
</script>

<style>
.cards{
    padding: 1rem;
    margin: 1%;    
    width: 100%;
    cursor: pointer;
}
@media (max-width: 990px) {
  .cards {
    margin: 0%;
  }
}
</style>