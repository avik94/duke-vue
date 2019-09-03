<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <v-card elevation = "9" class="cardBorder">
          <v-card-title class="cardTitle">Input Data</v-card-title>
          <div class="cardContent">
            <p><b>Machine: </b> {{formData.companyName}}</p>
            <p><b>Group: </b> {{formData.group}}</p>
            <p><b>Stat: </b> {{formData.stat}}</p>
            <p><b>Threshold: </b> {{formData.threshold}}</p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card height = "288px" elevation = "7" class="cardBorder" >
          <v-card-title class="cardTitle">Input Time</v-card-title>
          <div v-if = "quickTime" class="cardContent">
            <p><span style="font-size:15px;padding: 10px 17px; background: aliceblue; margin-right: 28px;">IST:</span> 3/8/2019 12:21</p>
            <p><span style="font-size:14px;padding: 10px 15px; background: aliceblue; margin-right: 31px;">UTC:</span>3/8/2019 12:21</p>
            <p><span style="font-size:14px;padding: 10px 16px; background: aliceblue; margin-right: 30px;">EST:</span>3/8/2019 12:21</p>
          </div>
          <div v-if = "customTime" class="cardContent">
            <p><span style="font-size:15px;padding: 10px 17px;  margin-right: 28px;"></span> <span style="margin: 0 70px;">To</span><span style="margin: 0 30px;">From</span></p>
            <p><span style="font-size:15px;padding: 10px 17px; background: aliceblue; margin-right: 28px;">IST:</span> <span>3/8/2019 12:21</span><span style="margin-left:20px">3/8/2019 12:21</span></p>
             <p><span style="font-size:14px;padding: 10px 15px; background: aliceblue; margin-right: 31px;">UTC:</span> <span>3/8/2019 12:21</span><span style="margin-left:20px">3/8/2019 12:21</span></p>
            <p><span style="font-size:14px;padding: 10px 16px; background: aliceblue; margin-right: 30px;">EST:</span> <span>3/8/2019 12:21</span><span style="margin-left:20px">3/8/2019 12:21</span></p>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" v-for="item in buttonList"  :key="item.name">
        <div class="text-center">
        <v-btn :color="item.color" medium min-width="220px" :to="item.url">
          {{item.name}}
        </v-btn>

        </div>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<style lang = "scss" scoped>
  .cardTitle{
    border-bottom:1px solid #8080803d
  }
  .cardContent p{
    border-bottom:1px solid #8080803d;
    color: #363535b9;
    padding-bottom: 7px;
  }
  .cardContent{
    padding: 20px;
  }
  .cardBorder{
    border-radius: 7px;
  }
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class ShowData extends Vue {

    formData!:any;
    quickTime = false;
    customTime = false;
    buttonList = [
      { name: "Data Table" , color: "success", url: "data-view/data-table" },
      { name: "Line Plot", color: "primary", url: "data-view/line-plot" },
      { name: "FFT", color: "warning", url: "data-view/fft" },
      { name: "PSD", color: "info", url: "data-view/psd"}
    ]

    
    created(){
      console.log(this.$store.state.formData)
      this.formData = this.$store.state.formData;
      if(!this.formData.quickTime){
        this.customTime = true;
      } else{
        this.quickTime = true;
      }     
    }
}
</script>