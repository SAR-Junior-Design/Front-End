<template>
  <v-card id="drone_ADD">
    <v-form v-model="valid" ref="form" validation>
      <v-card>
        <v-card-title>
          <v-flex xs12 >
            <h1 style="font-size:25px;font-weight:200">
              New Drone
            </h1>
          </v-flex>
        </v-card-title>
      </v-card>
      <v-container fluid>
        <v-layout column>
          <v-flex xs12>
            <v-text-field
              name="input-7-1"
              label="Name (optional)"
              v-model="registration_info.name"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-radio-group 
              v-model="registration_info.type" 
              required 
              :rules="[v => !!v || 'You must specify a Type!']"
            >
              <v-layout row>
                <v-radio label="Fixed-Wing" value="Fixed-Wing"></v-radio>
                <v-radio label="Rotor" value="Rotor"></v-radio>
              </v-layout>
            </v-radio-group>
          </v-flex>
          <v-layout row>
            <v-flex xs6
            style="padding-right:5px;">
              <v-select
                label="Manufacturer"
                :items="manufacturer_options"
                item-value="text"
                autocomplete
                required
                v-model="registration_info.manufacturer"
                :rules="[v => !!v || 'You must specify a Manufacturer!']"
              ></v-select>
            </v-flex>
            <v-flex xs6
              style="padding-left:5px;">
              <v-select
                label="Color"
                :items="color_options"
                autocomplete
                required
                v-model="registration_info.color"
                :rules="[v => !!v || 'You must specify a color!']"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-flex xs12>
            <v-text-field
              name="input-7-1"
              label="Description (optional)"
              multi-line
              v-model="registration_info.description"
            ></v-text-field>
          </v-flex>
          <div id="add_drone_button" >
            <v-btn 
              :disabled="!valid"
              v-on:click="registerDrone()"
            > Add Drones 
            </v-btn>
          </div>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        manufacturer_options: [
          'AeroVironment', "Ambarella", "DJI", "GoPro", "Parrot", "Yuneec", "Kespry", "Nutel Robotics", "Institu", "Ehang", "Aeryon Labs", "CyPhy", "senseFly", "Aerialtronics", "Freefly", "FLyability", "draganfly", "ActionDrone",
          "3D Robotics", "CUSTOM BUILD"
        ],
        num_blades_options: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', "10"
        ],
        color_options: [
          'White', 'Black', 'Grey', 'Blue', 'Red', 'Orange'
        ],
        valid: false,
        registration_info: {
          name: '',
          type: '',
          manufacturer: '',
          color: '',
          description: ''
        }
      }
    },
    methods: {
      registerDrone(){
        this.$emit('register_drone', this.registration_info)
      }
    }
  }
</script>

<style>
  #drone_ADD {
    margin-top: 80px; 
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
  }
</style>
