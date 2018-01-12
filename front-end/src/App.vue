<template>
  <div class="container" id="app">
    <div class="app-panel">
   		<div class="settings-panel">
    		<router-view></router-view>
    	</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'app'
};
</script>

<style>
</style>
