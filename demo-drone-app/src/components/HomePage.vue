<template>
  <v-container>
  <v-carousel>
      <v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i"></v-carousel-item>
    </v-carousel>
    <v-divider></v-divider>
     <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Welcome to SAR</h3>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Read More</v-btn>
        </v-card-actions>
      </v-card>
      <v-divider></v-divider>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Recent Missions</h3>
          </div>
        </v-card-title>
        <v-layout row>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h2>Mission Title</h2>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange">Open</v-btn>
            </v-card-actions>
          </v-card>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h2>Mission Title</h2>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange">Open</v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-card>
  </v-container>
</template>

<style>
</style>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: '/static/doc-images/carousel/squirrel.jpg'
          },
          {
            src: '/static/doc-images/carousel/sky.jpg'
          },
          {
            src: '/static/doc-images/carousel/bird.jpg'
          },
          {
            src: '/static/doc-images/carousel/planet.jpg'
          }
        ]
      }
    }
  }
</script>