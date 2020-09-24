<script>
import { Line, mixins } from "vue-chartjs";
import axios from 'axios'
import moment from 'moment'
import { mapGetters } from 'vuex';
export default {
    name: 'graph',
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: {
        chartData: {
            type: Array,            
        },
        options: {
            type: Object,
            
        },
        labels:{
            type: Array
        },
        label:{
            type: String
        }
    },
   
    methods:{
        async updateChart(response){
            const days=60
            let datas= []
            let newCases=[]            
            let labels = []
            let pastCases
            let date
            let casesType=response  
            let url='https://disease.sh/v3/covid-19/historical/all?lastdays='
            
            
        await axios.get(url+days)
        .then(resp => {
            
                
            
            for(let i in resp.data.[casesType]){

                if(pastCases){
                    
                    pastCases = resp.data.[casesType][i] - pastCases                    
                    date = moment(i, "MM-DD-YYYY").format("DD MMM YYYY");                                        
                    
                    labels.push(date)
                    newCases.push(pastCases)
                    
                }
                
                pastCases = resp.data.[casesType][i]
                
            }            
                      

            datas[0] = labels
            datas[1] = newCases

             this.renderChart(
                {
                    labels: datas[0],
                    datasets: [
                        {
                            label: 'New '+response,
                            backgroundColor: "rgba(204, 16, 52, 0.5)",
                            borderColor: "#CC1034",
                            data: datas[1]
                        }
                    ]
                }, this.options)

            
                this.$data._chart.update()

            
            
        }).catch(er => {
            console.log('Error graph '+er)
        })
           
        }
    },
    computed:{
        ...mapGetters(["getCountrySelected"])
    },


  mounted () {      


      //Reload
        this.$root.$on('cases', (item, response) => {
            
            response = response.toLowerCase().trim()
            
            const data = this.updateChart(response)            

            

        })
      
    this.renderChart(
        {
            labels: this.labels[0],
            datasets: [
                {
                    label: 'New '+this.label,
                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                    borderColor: "#CC1034",
                    data: this.chartData[0]
                }
            ]
        }, this.options)
  },
  
  
}
</script>

<style>

</style>