<template>
  <div>
    <div class="ui-toolbar">
      <router-link to="/home-page">
        <img src="../assets/sar_only_A_logo.png">
      </router-link>
      SETTINGS
    </div>
    <div class="links">
      <div>
        <router-link to="/new-mission-page">
          <i>Edit Profile</a></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
  .links {
    position: absolute;
    left: 1%;
  }
  .ui-toolbar{
    background-color: #4E505F;
    color : white;
    font-family: Tahoma, Geneva, sans-serif;
    font-size : 60px;
  }
  body{
    margin: 0 auto;
  }
</style>

<script>
  import Vue from 'vue';
  import { UIToolbar } from 'keen-ui';
  
  export default {
    name: 'Settings',
    beforeCreate: function data() {
      var cookie = this.$cookie.get('sessionID');
      if (cookie == null) {
        this.$router.push({ path: '/' });
      }
    }
  };
</script>