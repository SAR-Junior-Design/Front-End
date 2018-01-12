<template>
  <div id="page">
    <div class="earth">
      <div class="headerBar">
          <div class="logout-button">
            <button @click="logOut()">Log Out</button>
          </div>
        <div align="center" class="logo">
            <img src="../assets/sarlogo2.png">
        </div>
      </div>
      <div class="link-location">
        <div>
          <router-link to="/new-mission-page">
            <div class="link-formatting">New Mission</a></div>
          </router-link>
          <br>
          <router-link to="/">
            <div class="link-formatting">Mission Reports</a></div>
          </router-link>
          <br>
          <router-link to="/home-page">
            <div class="link-formatting">Drone Diagnostics</a></div>
          </router-link>
          <br>
          <router-link to="/home-page">
            <div class="link-formatting">Team Home</a></div>
          </router-link>
          <br>
          <router-link to="/home-page">
            <div class="link-formatting">Settings</a></div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .earth {
    display: block;
    margin: 0 auto;
    width: 966px;
    height: 966px;
    background-image: url("../assets/earth.png");
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -483px;
    margin-left: -483px;
  }
  .link-location {
    position: absolute;
    left: 55%;
    top: 35%;
  }
  .link-formatting {
    font-family: "Helvetica";
    font-size: 200%;
    font-weight: 900;
    color: white;
    padding-bottom: 15px;
    margin-bottom: 15px;
  }
  .logo {
    display: block;
    padding-top: 5px;
    width: 201px;
    max-height: 90%;
    left: 50%;
    margin-left: -100px;
    position: fixed;
  }
  .headerBar {
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100px;
    background-color: #4E505F;
  }
  .logout-button {
    margin-right: 2%;
    z-index: 1;
    position: absolute;
  }
</style>

<script>
  import Vue from 'vue';
  export default {
    name: 'HomePage',
    beforeCreate: function data() {
      var cookie = this.$cookie.get('sessionID');
      if (cookie == null) {
        this.$router.push({ path: '/' });
      }
    },
    methods: {
      logOut: function() {
        var cookie = this.$cookie.get('sessionID');
        this.$cookie.delete('sessionID');
        this.$router.push({ path: '/' });
      }
    }
  };
</script>