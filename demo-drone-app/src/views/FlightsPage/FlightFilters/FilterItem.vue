<template>
  <v-layout row>
    <v-flex
    xs2
    style="margin-right:2px;"
    >
      {{details.type}}
    </v-flex>
    <v-flex
    style="margin-top:-25px;"
    xs8>
      <datetimepicker :datetime="details.datetime"/>
    </v-flex>
    <v-flex
    class="text-xs-right"
    style="margin-top:-15px;"
    >
      <v-btn
      icon
      flat
      @click="onDelete()"
      >
        <v-icon>
          delete
        </v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import Vue from 'vue'
  import DateTimePicker from '@/components/DateTimePicker'

  export default {
    props: ['details', 'index'],
    components: {
      'datetimepicker': DateTimePicker
    },
    data() {
      return {
        time_menu: false,
        date_menu: false,
        stepper_state: 1
      }
    },
    methods: {
      onDelete(){
        this.$emit('deleted', this.index)
      }
    }
  }

</script>