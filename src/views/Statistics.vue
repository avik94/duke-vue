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
                <download-csv :data="desserts" class="text-right">
                    <v-icon color="green" size="25">mdi-download</v-icon>
                </download-csv>
                <v-card-title>
                  <div class="flex-grow-1"></div>
                  <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
              </v-card>
              <!-- data-table-end -->
            </v-tab-item>
            <v-tab-item>
              <!-- line-plot -->
              <v-card flat color="basil">
                <vue-plotly :data="data" :layout="layout" :options="options" />
              </v-card>
              <!-- line-plot end -->
            </v-tab-item>
            <v-tab-item>
              <v-card flat color="basil">
                <v-card-text>hello3</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat color="basil">
                <v-card-text>hello4</v-card-text>
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
import VuePlotly from "@statnett/vue-plotly";
import JsonCSV from "vue-json-csv";

Vue.component("downloadCsv", JsonCSV);

@Component
export default class Statistics extends Vue {
  // tab section
  tab: any = null;
  items = ["Data Table", "Line Plot", "FFT", "PSD"];
  // tab section end

  // Datatable Section
  search = "";
  headers = [
    {
      text: "Dessert (100g serving)",
      align: "left",
      sortable: false,
      value: "name"
    },
    { text: "Calories", value: "calories" },
    { text: "Fat (g)", value: "fat" },
    { text: "Carbs (g)", value: "carbs" },
    { text: "Protein (g)", value: "protein" },
    { text: "Iron (%)", value: "iron" }
  ];
  desserts = [
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%"
    },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: "1%"
    },
    {
      name: "Eclair",
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: "7%"
    },
    {
      name: "Donut",
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: "22%"
    },
    {
      name: "KitKat",
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: "6%"
    }
  ];
  // Datatable-end

  // line- plot
  data = [{ x: [1, 3], y: [2, 4] }];
  layout = {};
  options = {};
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
    console.log(this.$store.state.formData);
  }
}
</script>