<template>
  <v-card style="margin:20px;">
    <v-card-text>
      <v-flex>
        <h3 style="
        font-weight:200;
        font-size:28px;
        ">
          FILTERS
        </h3>
      </v-flex>
      <v-layout row
      style="margin:2px;">
        <v-flex xs12 sm6 d-flex>
          <v-select
            outline
            v-model="type"
            :items="filter_types"
            label="type"
          />
        </v-flex>
        <v-flex
        class="text-xs-right"
        style="margin-top:8px;">
          <v-btn
            slot="activator"
            color="primary"
            dark
            flat
            icon
            :disabled="type===''"
            @click="addFilterItem()"
            >
              <v-icon> add </v-icon>
            </v-btn>
        </v-flex>
      </v-layout>
      <filter-item
        v-model="filters"
        v-for="(filter, index) in filters"
        :key="filter.id"
        v-bind:details = "filter"
        v-on:input="filter = $event.target.value"
        v-bind:index = "index"
        v-on:deleted= "deleteFilterItem"
      >
      {{filter.id}}
      </filter-item>
      <v-flex class="text-xs-center">
        <v-btn flat outline style="margin:10px;"
          @click="refreshMissions();">
          APPLY
        </v-btn>
      </v-flex>
    </v-card-text>
  </v-card>
</template>


<script>
  import FilterItem from './FilterItem'
  import moment from 'moment'

  export default {
    components: {
      'filter-item': FilterItem
    },
    data() {
      return {
        filters: [],
        filter_types: ['After', 'Before'],
        type: ''
      }
    },
    methods: {
      addFilterItem(id) {
        var datetime = moment().local().format('YYYY-MM-DD HH:mm:ss');
        var filter_item = {
          type: this.type,
          datetime
        }
        this.filters.push(filter_item)
      },
      deleteFilterItem(index) {
        console.log(JSON.stringify(this.filters[index]))
        this.filters.splice(index, 1)
      },
      refreshMissions(){
        this.$emit('refresh_missions', this.filters)
      }
    }
  }
</script>