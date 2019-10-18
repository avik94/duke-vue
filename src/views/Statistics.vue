<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs v-model="tab" background-color="transparent" color="#072d97" grow>
            <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <!-- data-table -->
              <v-card class="tabContent">
                <v-card-title>
                  <!-- <div class="flex-grow-1"></div> -->
                  <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
                  <div class="flex-grow-1"></div>
                  <download-csv :data="desserts">
                      <v-hover>
                          <template v-slot="{ hover }">
                              <v-btn text fab small :elevation="hover ? 4 : 0">
                                  <v-icon color="green" size="25">mdi-download</v-icon>
                              </v-btn> 
                          </template>
                      </v-hover>
                    </download-csv>
                </v-card-title>
                <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
              </v-card>
              <!-- data-table-end -->
            </v-tab-item>
            <v-tab-item>
              <!-- line-plot -->
              <v-card flat color="basil">
                <vue-plotly
                  :data="linedata.data"
                  :layout="linedata.layout"
                  :options="linedata.options"
                />
              </v-card>
              <!-- line-plot end -->
            </v-tab-item>
            <v-tab-item>
              <v-card flat color="basil">
                <v-card-text>FFT</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat color="basil">
                <v-card-text>PSD</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang = "scss" scoped>
.tabContent {
  padding: 35px;
}
</style>

<script lang="ts">
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
  // tab section
  tab: any = null;
  items = ["Data Table", "Line Plot", "FFT", "PSD"];
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
    { text: "Ph3_Voltage_Variation", value: "Ph3_Voltage_Variation" },
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
    },
    
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
    if (this.$route.params.name === "data-table") {
      this.tab = 0;
    } else if (this.$route.params.name === "line-plot") {
      this.tab = 1;
    } else if (this.$route.params.name === "fft") {
      this.tab = 2;
    } else {
      this.tab = 3;
    }
    // console.log(this.$store.state.formData);
  }
}
</script>