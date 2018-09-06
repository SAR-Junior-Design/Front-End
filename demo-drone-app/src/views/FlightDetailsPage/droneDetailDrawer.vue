<template>
  <v-card
    v-if="selected_drone_drawer"
    class="sideNav"
    :height="cardHeight"
  >
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Drone Details
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3>ID: {{currentSelectedDrone.id}}</h3><br>
          <h3>Flight Details</h3>
          <p class="firstHeader"> Battery </p>
          
          <p class="secondHeader"> Power Remaining: {{currentSelectedDrone.battery_info.current_consumption}}%</p>
          <p class="secondHeader"> Voltage: {{currentSelectedDrone.battery_info.voltage}} V</p>

          <p class="firstHeader"> Speed </p>
          <p class="secondHeader">x: {{currentSelectedDrone.velocity.x}} m/s</p>
          <p class="secondHeader">y: {{currentSelectedDrone.velocity.y}} m/s</p>
          <p class="secondHeader">z: {{currentSelectedDrone.velocity.z}} m/s</p>

          <h3>Navigation</h3>
          <p class="firstHeader"> Location </p>
          <p class="secondHeader">Latitude: {{currentSelectedDrone.location.latitude}} </p>
          <p class="secondHeader">Longitude: {{currentSelectedDrone.location.longitude}} </p>
          <p class="secondHeader">Altitude: {{currentSelectedDrone.altitude}} m</p>

          <h3>Visuals</h3>
        </div>
      </v-card-title>
    </v-card>
  </v-card>
</template>
<script>
  export default {
    props: [
      "selected_drone_drawer",
      "cardHeight",
      "currentSelectedDrone"
    ]
  }
</script>
<style>
  .sideNav {
    top:64px;
    overflow: scroll;
    width:40%;
  }
  p.firstHeader {
    text-indent: 10px;
    line-height: 1.5;
  }
  p.secondHeader {
    line-height: 0.25;
    text-indent: 20px;
  }
</style>