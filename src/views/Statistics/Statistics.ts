import Vue from "vue";
import { Component } from "vue-property-decorator";
//@ts-ignore
import VuePlotly from "@statnett/vue-plotly";
//@ts-ignore
import JsonCSV from "vue-json-csv";

Vue.component("downloadCsv", JsonCSV);

@Component({
  components: {
    VuePlotly
  }
})


export default class Statistics extends Vue {
  // calender
  menu1 = false;
  menu2 = false;
  date = new Date().toISOString().substr(0, 10);
  // calender end
  time1 = false;
  time1menu = false;
  time2menu = false;
  time1modal = false;

  // max min logic
  isActive?:boolean;

  formData!: any;

  // tab section
  tab: any = 0;
  machineList = [];
  statList = ["Voltage", "Current", "Vibration"];
  groupList = ["MRI Health", "Energy Audit", "Drive Health"];
  items = ["Line Plot", "Max", "Min", "FFT","Event Trap", "Data Table"]; 
  // tab section end

  // Datatable Section
  search = "";
  headers = [
    {
      text: "Time Stamp",
      align: "left",
      sortable: false,
      value: "time_stamp"
    },
    { text: "Ph1_Voltage_Variation", value: "Ph1_Voltage_Variation" },
    { text: "Ph2_Voltage_Variation", value: "Ph2_Voltage_Variation" },
    { text: "Ph3_Voltage_Variation", value: "Ph3_Voltage_Variation" }
  ];
  desserts = [
    {
      time_stamp: "time",
      Ph1_Voltage_Variation: 1,
      Ph2_Voltage_Variation: 1,
      Ph3_Voltage_Variation: 1
    },
    {
      time_stamp: "time",
      Ph1_Voltage_Variation: 1,
      Ph2_Voltage_Variation: 1,
      Ph3_Voltage_Variation: 1
    },
    {
      time_stamp: "time",
      Ph1_Voltage_Variation: 1,
      Ph2_Voltage_Variation: 10,
      Ph3_Voltage_Variation: 1
    },
    {
      time_stamp: "time",
      Ph1_Voltage_Variation: 10,
      Ph2_Voltage_Variation: 1,
      Ph3_Voltage_Variation: 1
    },
    {
      time_stamp: "time",
      Ph1_Voltage_Variation: 0,
      Ph2_Voltage_Variation: 1,
      Ph3_Voltage_Variation: 1
    }
  ];
  // Datatable-end

  // line- plot
  linedata = {
    data: [
      {
        x: ["jan", "Feb", "Mar", "April", "May", "June", "July"],
        y: [20, 80, 40, 65, 13, 75, 15],
        type: "line",
        name: "vh1"
      },
      {
        x: ["jan", "Feb", "Mar", "April", "May", "June", "July"],
        y: [40, 70, 50, 30, 90, 15, 60],
        type: "line",
        name: "vh2"
      },
      {
        x: ["jan", "Feb", "Mar", "April", "May", "June", "July"],
        y: [10, 30, 65, 25, 70, 50, 95],
        type: "line",
        name: "vh3"
      }
    ],
    layout: {},
    options: {}
  };
  // line-plot end

  created() {
    // console.log(this.$route.params.name);
    this.formData = this.$store.state.formData;
    this.machineList = this.$store.state.machineList;
    this.machine = this.formData.machine;
    this.group =  this.formData.group;
    this.stat = this.formData.stat;
    this.threshold = this.formData.threshold;
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

    if(this.stat === "Voltage" || this.stat === "Current"){
        this.items = ["Line Plot", "Max", "Min", "FFT",  "Event Trap", "Data Table"];
        this.isActive = false;
        this.tab = 0;
    }else{
        this.items = ["Line Plot", "FFT",  "Event Trap", "Data Table"];
        this.isActive = true;
        this.tab = 0;

    }
  }


  // ==========================================
  // dialog form for input start from here
  machine = "";
  group = "";
  stat = "";
  threshold = "";
  toDate = "";
  toHourMinutes = "";
  fromDate = "";
  fromHourMinutes = "";
  quickTime  = "";

  dialog = false;
  number = [
    (v:any) => !!v || 'data is required',
  ]
  dropdownName = [
    (v:any) => !!v || 'data is required',
  ]

  quicktimeList = [
    { name: "1 Minutes", value: "1m" },
    { name: "5 Minutes", value: "5m" },
    { name: "10 Minutes", value: "10m" },
    { name: "15 Minutes", value: "15m" },
    { name: "30 Minutes", value: "30m" },
    { name: "1 Hours", value: "1h" },
    { name: "3 Hours", value: "3h" },
    { name: "6 Hours", value: "6h" },
    { name: "12 Hours", value: "12h" },
    { name: "24 Hours", value: "24h" },
    { name: "2 Days", value: "2d" },
    { name: "3 Days", value: "3d" }
  ];

  submitTimeInput(){
    this.dialog = false;
    console.log(this.toDate);
    console.log(this.toHourMinutes);
    
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
  clickStat(data:any){
    if(this.stat === "Voltage" || this.stat === "Current"){
        this.items = ["Line Plot", "Max", "Min", "FFT",  "Event Trap", "Data Table"];
        this.isActive = false;
        this.tab = 0;
    }else{
        this.items = ["Line Plot", "FFT",  "Event Trap", "Data Table"];
        this.isActive = true;
        this.tab = 0;

    }
  }
}