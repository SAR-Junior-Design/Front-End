<template>
  <div id="about">
  Ladd is working on getting a chart that shows the most improtant readouts of connected drones.
  As well as giving the user the ability to connect more drones. Table.
  </div>
</template>

<script>
export default {
  name: 'about'
}

httpGetAsync(app.add_url_rule('/get_user_drones', 'get_user_drones', Drone.get_user_drones, methods=['GET']), callback);

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
</script>

<!-- styling for the component -->
<style>
#about {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

