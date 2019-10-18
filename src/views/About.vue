<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>User Name</v-card-title>
          <v-card-text>User Details</v-card-text>
          <v-card-actions>
            <v-btn text>Click</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from 'axios';

@Component
export default class About extends Vue {

  created(){
    console.log(this.$store.state.avik)
    axios.get(`http://40.87.93.175:5000/api/zone?filter={%22where%22:{%22companyId%22:%225b1abafc00001e0ae9c605c5%22},%20%22include%22:%20{%22relation%22:%22machines%22,%22scope%22:{%22where%22:{%22view_type%22:2}}}}`)
    .then(response => {
      // JSON responses are automatically parsed.
      console.log(response)
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
