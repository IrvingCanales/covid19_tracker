import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

      countrys: {},
      countrySelected: '',
      lat:23,
      long:-103,
  },
  mutations: {
    setCountrys(state, value){
      state.countrys = value
    },
    setCountrySelected(state, value){
      state.countrySelected = value
      
    },
    setCoo(state,value){
      state.lat = value[0]
      state.long = value[1]
    }
  },
  actions: {

    async loadCountrys({commit}){

      

       await axios.get('https://disease.sh/v3/covid-19/countries')
        .then(resp => {            
            commit('setCountrys',resp.data)

        }).catch(e =>{
            console.log(e + " Error in countrys")
        })
    },

    changeCountrySelected({commit}, data){

      commit('setCountrySelected',data)
    },

    changeCoo({commit}, data){
      commit('setCoo',data)
    }

  },
  modules: {
  },
  getters:{ 
    getCountrySelected(state){
      return state.countrySelected
    },
    getLat(state){
      return state.lat
    },
    getLong(state){
      return state.long
    },
    getCountrys(state){
      return state.countrys
    }
  }
})
