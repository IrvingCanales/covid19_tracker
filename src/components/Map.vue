<template>
  <div class="map">
    <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"        
        
    >
    <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-circle v-for="(item,index) in circle" :key="index"
        :lat-lng="item.center"
        :radius="item.radius"
        :color="item.color"
        :fillColor="item.fillColor"
      >
        <l-popup  > 
            <div class="info-container">
                <div class="info-flag"  v-bind:style="{ 'background-image': 'url(' + item.flag + ')'  }" />
                <div><strong>{{item.country}} </strong></div>
                <div> Cases: {{ new Intl.NumberFormat("en-IN").format(item.cases) }} </div>
                <div> Recovered: {{ new Intl.NumberFormat("en-IN").format(item.recovered)}} </div>
                <div> Deaths: {{new Intl.NumberFormat("en-IN").format(item.deaths)}} </div>
                <div> Tests: {{new Intl.NumberFormat("en-IN").format(item.tests)}} </div>
                
            </div>
                    
        </l-popup>
      </l-circle> 

     

      </l-map>
      
      
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LCircle, LMarker, LPopup, LTooltip,LIcon } from "vue2-leaflet";
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    name: 'Map',
    data(){
        return{
            zoom: 5,
            lat: 23,
            long:-103,
            center: latLng(this.getLat , this.getLong),
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            circle: [],
            withPopup: latLng(23, -102),
            withTooltip: latLng(23, -102),
            currentZoom: 50.5,
            currentCenter: latLng(23, -102),
            showParagraph: false,
            mapOptions: {
                zoomSnap: 0.5
            },
            iconSize: [32, 37],
            iconAnchor: [16, 37],
            showMap: true
        }
    },    
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LCircle,
        LPopup,
        LIcon,
    },
    methods: {
        zoomUpdate(zoom) {
        this.currentZoom = zoom;
        },
        centerUpdate(coo) {            
            this.center = latLng(coo[0], coo[1])
        },
        showLongText() {
        this.showParagraph = !this.showParagraph;
        },
        innerClick() {
        alert("Click!");
        },
        
  },
  computed:{
      ...mapGetters(['getLat','getLong','getCountrys'])
  },
  mounted(){

      this.$root.$on('updateMap', (item, response) => {
          this.centerUpdate(response)
      })


      this.getCountrys.forEach(element=>{
          let radi = Math.sqrt( parseInt(element.cases))*800              
                this.circle.push({
                        center:  [element.countryInfo.lat,element.countryInfo.long],
                        radius: radi,
                        color: "red",
                        fillColor: "red",
                        country: element.country,
                        cases: element.cases,
                        flag: element.countryInfo.flag,
                        deaths: element.deaths,
                        recovered: element.recovered,
                        tests: element.tests
                     })

      })      

      this.center= latLng(this.getLat , this.getLong)
  }

}
</script>

<style>
.map{
    
    margin-top: 15px;
    margin-bottom: 15px;
    height: 550px;
    background-color: #fff;
    padding: 1rem;
    border-radius: 20px;    
    box-shadow: 0 0 8px -4px rgba(0,0,0,.5);
}
.info-container{
    width: 150px;
}
.info-flag img{
    width: 100%;
    border-radius: 5px;
}
.info-flag{
    height: 90px;
    width: 100%;
    background-size: cover;
    border-radius: 8px;
}
</style>