<template>
    <v-container>
      <p>{{quickTime}}</p>
        <vue-plotly
            :data="linedata.data"
            :layout="linedata.layout"
            :options="linedata.options"
        />
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import axios from 'axios';
//@ts-ignore
import VuePlotly from "@statnett/vue-plotly";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
   components: {
    VuePlotly
  }
})
export default class LinePlot extends Vue {
  // @ts-ignore
  @Prop() quickTime;
  // @ts-ignore
  @Prop() newTime;
  // @ts-ignore

  @Watch('newTime')
  onNewTimeChanged(val: string, oldVal: string) {
    console.log(val)
  }

  linedata = {
    data: [
      {
        x: [],
        y: [],
        type: "line",
        name: "vh1"
      }
    ],
    layout: {},
    options: {}
  };
  // line-plot end
  
  async created(){
      let x = await axios.get("http://vmart.machinesense.com/api/datasources/proxy/1/query?db=telegraf&q=SELECT%20%22pf1mean%22%20FROM%20%22statsd_vmart_4d%22%20WHERE%20(%22company%22%20=~%20/$/%20AND%20%22machine%22%20=~%20/NewBuildTest13112019$/%20AND%20%22datatype%22%20=~%20/raw$/)%20AND%20time%20%3E=%20now()%20-"+this.quickTime+"%20GROUP%20BY%20%22pf1mean%22&epoch=ms");
      let timeList = [];
      let dataList = [];
      for (let data of x.data.results[0].series[0].values){
        let a = data[0].toString();
        let b = a.slice(0,10);
        let timestamp = parseInt(b); // replace your timestamp
        let date = new Date(timestamp * 1000);
        let formattedDate = ( '0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)+':'+ ('0' + date.getSeconds()).slice(-2);
        timeList.push(formattedDate);
        dataList.push(data[1].toFixed(3));
      }
      // @ts-ignore
      this.linedata.data[0].x = timeList;
      // @ts-ignore
      this.linedata.data[0].y = dataList;
  }

  }
</script>