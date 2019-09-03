import Vue from "vue";
import { Component } from "vue-property-decorator";
import ShowData from "@/components/ShowData.vue";


@Component({
  components: {
    ShowData
  }
})
export default class Home extends Vue {

  name = "Input Field";
  companyList = ["DukeMedicalEquiment", "prop-new", "Novatec"];
  groupList = ["MRI Health", "Energy Audit", "Drive Health"]
  quicktimeList = [
    {name: "1 Minutes", value: "1m"}, {name: "5 Minutes", value: "5m"},{name: "10 Minutes", value: "10m"}, {name: "15 Minutes", value: "15m"}, {name: "30 Minutes", value: "30m"}, {name: "1 Hours", value: "1h"}, {name: "3 Hours", value: "3h"},
    {name: "6 Hours", value: "6h"}, {name: "12 Hours", value: "12h"}, {name: "24 Hours", value: "24h"}, {name: "2 Days", value: "2d"}, {name: "3 Days", value: "3d"}    
  ]

  // calender
  menu1 = false;
  menu2 = false;
  date = new Date().toISOString().substr(0, 10)
  // calender end
  // alert
  alert = false;
  errorMsg = ''
  // end

  threshold = "";
  companyName = "";
  machine = "";
  stat = "";
  group = "";
  toDate = "";
  toHour = "";
  toMinutes = "";
  fromDate = "";
  fromHour = "";
  fromMinutes = "";
  quickTime  = ""
  

  valid = false
  number = [
    v => !!v || 'data is required',
  ]
  dropdownName = [
    v => !!v || 'data is required',
  ]

  getData(){
    // console.log(this.threshold,this.companyName, this.machine, this.stat, this.group
    // ,this.toDate,this.toHour,this.fromMinutes,this.fromDate);
    if(!this.quickTime && (!this.toDate || !this.toHour || !this.toMinutes || !this.fromDate || !this.fromHour || !this.fromMinutes)){
        this.alert = true;
        this.errorMsg = "Please Select Time Section Properly "
        setTimeout(()=>{this.alert = false},2000); 
    }
    else{
      let formData = {
        companyName : this.companyName,
        machine : this.machine,
        stat : this.stat,
        group : this.group,
        threshold :this.threshold,
        quickTime : this.quickTime, 
        toDate : this.toDate,
        toHour : this.toHour,
        toMinutes : this.toMinutes,
        fromDate : this.fromDate,
        formHour : this.fromHour,
        fromMinutes : this.fromMinutes
      }
      this.$store.commit('storeFormData',formData);
      this.$router.push('show-data');
    }
    
  }
  
}