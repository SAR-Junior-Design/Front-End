<template>
  <div id='page'>
    <div class="drone-overview">
      <div class="icon">
        <img id="drone-icon">
      </div>
      <div class="id" id="drone-id">
      </div>
      <div class="type" id="drone-type">
      </div>
      
      <div class="battery" id="drone-battery">
        <div class="battery-amount" id="drone-battery-amount">
        </div>
        <div class="battery-number" id="drone-battery-number">
        </div>
      </div>
      
      <div class="wifi-symbol">
        <div class="wifi-circle1"></div>
        <div class="wifi-circle2"></div>
        <div class="wifi-circle3"></div>
        <div class="wifi-circle4"></div>
      </div>
      <div class="behavior" id="drone-behavior"></div>
      <div class="altitude" id="drone-altitude"></div>
    </div>
    <div class="drone-detail"></div>
  </div>
</template>

<style>
  .drone-overview {
    border: 3px solid;
    border-radius: 10px;
    border-color: #e5e4e2;
    background: #555555;
    width:350px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
  }
  .icon {
    margin: 1%;
    border: 2px solid black;
    border-radius: 10px;
    width: 58px;
    height: 54px;
    overflow:hidden;
  }
  .battery {
    height: 20px;
    border: 1px solid black;
    width: 30px;
    background: #000000;
    overflow:hidden;
  }
  .battery-amount {
    position: absolute;
    height: 20px;
    background: green;
  }
  .battery-number {
    text-align: center;
    transform: rotate(0deg);
    font-size: .6pc;
    color: #ffffff;
    margin-top: 11%;
  }
  .type {
    color: #ffffff;
    text-align: center;
  }
</style>

<script>
  import Vue from 'vue';
  export default {
    name: 'MapPage',
    dummyData: {},
    beforeCreate: function data() {
      this.dummyData =  {
                  "drones" : [
                    {
                      "type" : "HAI Pegasus",
                      "id" : "1239bck-sdfijewr",
                      "battery_info" : { 
                        "voltage" : 99,
                        "current_consumption" : 99,
                        "energy_remaining" : 87
                      },
                      "location" : "lat, long",
                      "altitude" : 99,
                      "connection" : "IS_CONNECTION",
                      "CURRENT_BEHAVIOR" : "SEARCHING",
                      "velocity" : { "x" : 99, "y" : 99, "z" : 99}
                    }
                  ]
                };
      var cookie = this.$cookie.get('sessionID');
      if (cookie == null) {
        this.$router.push({ path: '/' });
      }
    },
    mounted: function data() {
      this.makeWidget();
      this.updateWidget();
    },
    methods: {
      makeWidget: function() {
        //dynamically make html
      },
      updateWidget: function () {
        document.getElementById("drone-icon").src = "src/assets/dummy_icon.png";
        document.getElementById('drone-id').innerHTML = (this.dummyData.drones[0].id);
        document.getElementById('drone-type').innerHTML = (this.dummyData.drones[0].type);

        document.getElementById('drone-battery-amount').style.width=(this.dummyData.drones[0].battery_info.energy_remaining*0.3+'px');
        document.getElementById('drone-battery-number').innerHTML = (this.dummyData.drones[0].battery_info.energy_remaining + '%');

        document.getElementById('drone-behavior').innerHTML = (this.dummyData.drones[0].CURRENT_BEHAVIOR);
        document.getElementById('drone-altitude').innerHTML = (this.dummyData.drones[0].altitude + ' mph');
      }
    }
  };
</script>