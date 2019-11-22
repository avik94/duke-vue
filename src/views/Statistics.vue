<template>
  <v-container fluid>
    <v-row>
      <v-col cols="8">
        <!-- <v-card style="padding:0px 10px"> -->
          <v-row>
            <v-col cols="6">
              <v-select :items="items" label="Machine"></v-select>
            </v-col>
            <v-col cols="6">
              <v-select :items="stat" label="Stat"></v-select>
            </v-col>
          </v-row>
        <!-- </v-card> -->
      </v-col>
      <v-col cols="4">
        <!-- <v-card style="padding:17px 10px"> -->
          <v-dialog width="300" style="margin-left:20px">
            <template v-slot:activator="{ on }">
              <v-btn text color="primary lighten-2" dark v-on="on">Change Input Time</v-btn>
            </template>
            <v-card>
              hello Tony
            </v-card>
          </v-dialog>

          <!-- gear dialog -->
          <v-dialog width="300" style="margin-left:20px">
            <template v-slot:activator="{ on }">
              <v-btn icon color="secondary lighten-2" dark v-on="on">
                <v-icon>mdi-settings</v-icon>
              </v-btn>
            </template>
            <v-card>
              <div class="cardContent">
                <p>
                  <span>
                    <v-icon color="primary" size="20" style="padding-right:5px">mdi-settings</v-icon>
                  </span>
                  <b>Machine:&nbsp;</b>
                  {{formData.machine}}
                </p>
                <p>
                  <span>
                    <v-icon color="primary" size="20" style="padding-right:5px">mdi-cube</v-icon>
                  </span>
                  <b>Group:&nbsp;</b>
                  {{formData.group}}
                </p>
                <p>
                  <span>
                    <v-icon color="primary" size="20" style="padding-right:5px">mdi-math-compass</v-icon>
                  </span>
                  <b>Stat:&nbsp;</b>
                  {{formData.stat}}
                </p>
                <p>
                  <span>
                    <v-icon color="primary" size="20" style="padding-right:5px">mdi-flash</v-icon>
                  </span>
                  <b>Threshold:&nbsp;</b>
                  {{formData.threshold}}
                </p>
              </div>
            </v-card>
          </v-dialog>
        <!-- </v-card> -->
      </v-col>
    </v-row>

    <!-- tab section start here -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs v-model="tab" background-color="transparent" color="#072d97" grow>
            <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
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
              <v-card flat color="basil">
                <v-card-text>PSD</v-card-text>
              </v-card>
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
            <v-tab-item>
              <v-card flat color="basil">
                <v-card-text>Max</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat color="basil">
                <v-card-text>Min</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat color="basil">
                <v-card-text>Event Trap</v-card-text>
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
  formData!: any;

  // tab section
  tab: any = null;
  stat = ["Voltage", "Current", "Vibration"];
  items = ["Line Plot", "Data Table", "FFT", "PSD", "Max", "Min", "Event Trap"]; //"FFT" will be adjust later,
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
  }
}
</script>

<style lang = "scss" scoped>
.cardContent p {
  border-bottom: 1px solid #8080803d;
  color: #363535b9;
  padding-bottom: 7px;
}
.cardContent {
  padding: 20px;
}
</style>