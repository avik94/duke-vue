<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="cardBorder">
          <h2>{{name}}</h2>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class ShowData extends Vue {
  name = "Helloworld";
}
</script>
