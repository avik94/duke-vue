import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from 'axios';

@Component({
  components: {
  }
})
export default class Home extends Vue {

  name = "Input Field";
  machineListName = ["DukeMedicalEquiment", "prop-new", "Novatec"];
  groupList = ["MRI Health", "Energy Audit", "Drive Health"]
  statList:string[] = [];
  quicktimeList = [
    {name: "1 Minutes", value: "1m"}, {name: "5 Minutes", value: "5m"},{name: "10 Minutes", value: "10m"}, {name: "15 Minutes", value: "15m"}, 
    {name: "30 Minutes", value: "30m"}, {name: "1 Hours", value: "1h"}, {name: "3 Hours", value: "3h"},
    {name: "6 Hours", value: "6h"}, {name: "12 Hours", value: "12h"}, {name: "24 Hours", value: "24h"}, {name: "2 Days", value: "2d"}, 
    {name: "3 Days", value: "3d"}    
  ]

  // calender
  menu1 = false;
  menu2 = false;
  date = new Date().toISOString().substr(0, 10)
  // calender end
  time1 = false;
  time1menu =  false;
  time2menu =  false;
  time1modal = false;
  // alert
  alert = false;
  errorMsg = ''
  // end

  threshold = "";
  machine = "";
  stat = "";
  group = "";
  toDate = "";
  toHourMinutes = "";
  fromDate = "";
  fromHourMinutes = "";
  quickTime  = ""
  
  //vuetify validation
  valid = false
  number = [
    (v:any) => !!v || 'data is required',
  ]
  dropdownName = [
    (v:any) => !!v || 'data is required',
  ]

  number2 = [
    (v:any) => !!v || 'data is required',
  ]

  test?:any;
  async created(){
    // api call
    let x = await axios.get(`http://40.87.93.175:5000/api/zone?filter={%22where%22:{%22companyId%22:%225b1abafc00001e0ae9c605c5%22},%20%22include%22:%20{%22relation%22:%22machines%22,%22scope%22:{%22where%22:{%22view_type%22:2}}}}`);
    console.log(x);
    let machineList = [];
    for (let i of x.data){
      if(i.machines.length != 0){
        machineList.push(i.machines[0].name);
      }
    }
    this.machineListName = machineList
    // api call end
    if(!sessionStorage.form){
      console.log("No Data Found");
    }else{
      let data = JSON.parse(sessionStorage.form);
      // this.companyName = data.companyName;
      this.machine = data.machine;
      this.stat = data.stat;
      this.group = data.group;
      this.threshold = data.threshold;
      this.toDate = data.toDate;
      this.toHourMinutes = data.toHourMinutes;
      this.fromDate = data.fromDate;
      this.fromHourMinutes = data.fromHourMinutes;
      this.quickTime  = data.quickTime;
      if(this.group === "MRI Health"){
        this.statList = [
          'Voltage(L-N)','Voltage(L-L)', 'Current-3 phase', 'Neutral current', 'Step Current Change (A)', 'PF-3 phase','Voltage variation (%)',                          
          'Voltage Total Harmonic Distortion (%)', 'Current Total Harmonic Distortion (%)','Frequency Variation (%)'
        ]
      }
      if(this.group === "Energy Audit"){
        this.statList = [
          'Voltage', 'Current', 'Power Factor', 'Active Power', 'Reactive Power','Voltage Total Harmonic Distortion',
          'Voltage Total Harmonic Distortion 95th Percentile', 'Voltage Total Harmonic Distortion 99th Percentile', 
          'Current Total Harmonic Distortion', 'Current Total Harmonic Distortion 95th Percentile', 'Current Total Harmonic Distortion 99th Percentile',    
          'Frequency Variation', 'Maximum Demand Load current', 'Short-Circuit Ratio'
        ]
      }
      if(this.group === "Drive Health"){
        this.statList = [
          'Voltage', 'Current', 'Voltage variation', 'Voltage Total Harmonic Distortion', 'Current Total Harmonic Distortion',                                                       
          'Frequency Variation', 'Drive Temperature'
        ]
      }
    }   

  }

  getData(){
    // validate logic
    if(!this.quickTime && (!this.toDate || !this.toHourMinutes || !this.fromDate || !this.fromHourMinutes)){
        this.alert = true;
        this.errorMsg = "Please Select Time Section Properly "
        setTimeout(()=>{this.alert = false},2000); 
    }
    else{
      let formData = {
        machine : this.machine,
        stat : this.stat,
        group : this.group,
        threshold :this.threshold,
        quickTime : this.quickTime, 
        toDate : this.toDate,
        toHourMinutes: this.toHourMinutes,
        fromDate : this.fromDate,
        fromHourMinutes: this.fromHourMinutes
      }

      this.$store.commit('storeFormData',formData);
      this.$store.commit('storeMachine',this.machineListName);
      this.$router.push('data-view/line');
      sessionStorage.setItem('form', JSON.stringify(formData));
      sessionStorage.setItem('machineList', JSON.stringify(this.machineListName));
      let formDataCopy = {...formData};
      console.log(formData)
      console.log(formDataCopy);
    }
    
  }

  clearData(){
    //@ts-ignore
    this.$refs.form.reset();
    //@ts-ignore
    this.$refs.form2.reset();
    // @ts-ignore
    this.$refs.form3.reset();
    sessionStorage.clear();
  }

  clickGroup(data:any){
    if(data === "MRI Health"){
      this.statList = [
        'Voltage(L-N)','Voltage(L-L)', 'Current-3 phase', 'Neutral current', 'Step Current Change (A)', 'PF-3 phase','Voltage variation (%)',                          
        'Voltage Total Harmonic Distortion (%)', 'Current Total Harmonic Distortion (%)','Frequency Variation (%)'
      ]
    }
    if(data === "Energy Audit"){
      this.statList = [
        'Voltage', 'Current', 'Power Factor', 'Active Power', 'Reactive Power','Voltage Total Harmonic Distortion',
        'Voltage Total Harmonic Distortion 95th Percentile', 'Voltage Total Harmonic Distortion 99th Percentile', 
        'Current Total Harmonic Distortion', 'Current Total Harmonic Distortion 95th Percentile', 'Current Total Harmonic Distortion 99th Percentile',    
        'Frequency Variation', 'Maximum Demand Load current', 'Short-Circuit Ratio'
      ]
    }
    if(data === "Drive Health"){
      this.statList = [
        'Voltage', 'Current', 'Voltage variation', 'Voltage Total Harmonic Distortion', 'Current Total Harmonic Distortion',                                                       
        'Frequency Variation', 'Drive Temperature'
      ]
    }
  }  
  
}