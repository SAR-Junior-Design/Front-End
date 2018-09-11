<template>
  <gmap-map
    class="map-panel"
    :center="center"
    :zoom="zoom"
    :map-type-id="mapType"
    :options="{minZoom: 2, scrollwheel: scrollwheel, disableDefaultUI: true, draggable: draggable, zoomControl: true, clickableIcons: false}"
    @click="drawLine($event)">
    <gmap-polyline v-if="paths.length > 0"
        :path="paths"
        :editable="true"
        ref="polyline"
        @click="closePolygon($event)"
        @rightclick="selectingVertex">
    </gmap-polyline>
  </gmap-map>
</template>
<script>
  export default {
    props: [
        "center",
        "zoom",
        "mapType",
        "scrollwheel",
        "draggable",
        "paths"
    ]
  }
</script>
<style>
  .map-panel {
    height:100%;
    width:100%;
  }
</style>