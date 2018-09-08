<template>
	<v-card
        class="sideNav"
        :height="cardHeight"
      >
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                Flight Details
              </v-list-tile-title>
              <v-tooltip right>
                <v-btn icon @click= "swapNav('edit')" slot="activator">
                  <v-icon>settings</v-icon>
                </v-btn>
                <span>Edit Flight Details</span>
              </v-tooltip>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-expansion-panel expand popout>
          <v-expansion-panel-content>
            <div slot="header">Flight Title</div>
            <v-card>
              <v-card-text class="grey lighten-3">{{title}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Flight Description</div>
            <v-card>
              <v-card-text class="grey lighten-3">{{description}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Flight Type</div>
            <v-card>
              <v-card-text class="grey lighten-3">{{type}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Start Datetime</div>
            <v-card>
              <v-card-text class="grey lighten-3">{{starts}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">End Datetime</div>
            <v-card>
              <v-card-text class="grey lighten-3">{{ends}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
      </v-expansion-panel>
  </v-card>
</template>
<script>
  export default {
    props: [
      "cardHeight",
      "title",
      "description",
      "type",
      "starts",
      "ends",
    ],
    data: function data() {
      return {
        menu: false,
        rowsPerPageItems: [5],
        headers: [
          {
            text: 'Drone ID',
            align: 'left',
            sortable: true,
            value: 'id'
          }
        ],
        selected: []
      }
    },
    methods: {
      mouseOver () {
        document.body.style.cursor= 'pointer';
      },
      mouseOut () {
        document.body.style.cursor= 'default';
      },
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.items.slice()
      },
      updateDrones () {
        this.$emit("message", this.selected);
      }
    }
  }
</script>
<style>
  .sideNav {
    top:64px;
    overflow: scroll;
    width:40%;
  }
</style>