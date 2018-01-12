<template>
  <div>
    <div id="page" background-color="lightblue">
      <div class="earth">
        <div class="form-login">
          <form @submit.prevent="logIn()">
            <div align="center" class="wrapper">
              <div class="logo1">
                  <img src="../assets/sarlogo2.png">
              </div>
              <div class="login">
                <div>
                  <label class="emailLabel">Email Address</label>
                  <input class="emailBox" v-model="auth.email" type="email" required/>
                </div>
                <div>
                  <label class="passwordLabel">Password</label>
                  <input class="passwordBox" v-model="auth.password" type="password" required/>
                </div>
                <div class="forgetLink">
                  <span class="psw"><a href="#" style="text-decoration: none; color: #ffffff;">Forgot your password?</a></span>
                </div>
                <div>
                  <button class="loginButton" type="submit"><label class="emailLabel">Login</label></button>
                </div>
              </div>
            </div>
          </form>
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
  .form-login {
    background-color: #4E505F;
    border-radius: 5px;
    width: 750px;
    height: 405px;
    position: fixed;
    left: 50%;
    top: 30%;
    margin-left: -375px;
  }
  .emailLabel {
    font-family: "Arial";
    display:inline-block;
    width: 150px;
    text-align:right;
    margin-left: -20%;
    font-size: 130%;
    color: #ffffff;
  }
  .passwordLabel {
    font-family: "Arial";
    display:inline-block;
    width: 150px;
    text-align:right;
    margin-left: -20%;
    font-size: 130%;
    font-weight: 100;
    color: #ffffff;
  }
  .emailBox {
    border-radius: 5px;
    border: none;
    background-color: #a2a3aa;
    height: 50px;
    width: 350px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 150%;
    margin-bottom: 10px;
    margin-top: 10px;
    color: #ffffff;
  }
  .passwordBox {
    border-radius: 5px;
    border: none;
    background-color: #a2a3aa;
    height: 50px;
    width: 350px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    font-size: 150%;
    margin-top: 10px;
    color: #ffffff;
  }
  .forgetLink {
    text-align:center;
    font-family: "Arial";
    font-size: 130%;
    font-weight: 100;
    color: white;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  .loginButton {
    border-radius: 5px;
    border: 5px solid #a2a3aa;
    background-color: #a2a3aa;
    height: 50px;
    width:350px;
    margin-bottom: 30px;
    font-family: "Arial";
    font-size: 130%;
    font-weight: 100;
    color: #ffffff;
  }
  .loginButton:hover {
    background-color: #4E505F;
  }

</style>

<script>
  import VueCookie from 'vue-cookie';
  import Vue from 'vue';
  Vue.use(VueCookie);

  export default {
    name: 'Login',
    beforeCreate: function data() {
      console.log("here");
      var cookie = this.$cookie.get('sessionID');
      if (cookie != null) {
        this.$router.push({ path: '/home-page' });
      }
    },
    data() {
      return {
        auth: {email: '', password: ''},
        user: {},
        rTxt: null
      }
    },
    methods: {
      httpGet: function(theUrl) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', theUrl, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log(xhr.responseText);
            }
        }
        xhr.send();
      },
      httpPost: function(theUrl, body) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', theUrl);
        xhr.setRequestHeader('Content-Type', 'application/json');
        var that = this;
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            that.rTxt = xhr.responseText;
            if (that.rTxt.includes("login failed")) {
              alert("login failed");
            } else {
              that.$cookie.set('sessionID', that.rTxt);
              that.$router.push({ path: '/home-page' });
            }
          }
        }
        xhr.send(JSON.stringify(body));
      },
      logIn: function() {
        var body = {
          "email": this.auth.email,
          "password" : this.auth.password
        }
        this.httpPost("http://backend.searchandrescuedrones.us:5000/login", body);
      }
    }
  };
</script>
