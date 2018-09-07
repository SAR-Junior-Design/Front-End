<template>
  <v-card flat style="opacity:0.90">
    <v-card-title>
    <h1 style="font-size:28px;font-weight:200">
        Register Now
    </h1>
    </v-card-title>
    <v-stepper v-model="e1" flat>
       
      <v-stepper-header class="elevation-0">
      <v-stepper-step :complete="e1 > 1" step="1">Basic Info</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Password</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 3" step="3">Pilot Info</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1" flat>
          <v-layout column>
              <v-flex>
                  <v-text-field
                  name="signUpUsername"
                  label="Username"
                  id="signUpUsername"
                  type="username"
                  :rules=[rules.required]
                  v-model="signUpUsername"
                  required></v-text-field>
              </v-flex>
              <v-flex>
                  <v-text-field
                  name="signUpEmail"
                  label="Email"
                  id="signUpEmail"
                  :rules="[rules.required, rules.email]"
                  type="email"
                  v-model="signUpEmail"
                  required></v-text-field>
              </v-flex>
          </v-layout>
          <v-flex class="text-xs-center">
              <v-btn
              color="primary"
              @click="e1 = 2"
              flat
              outline
              >
              Continue
              </v-btn>

              <v-btn flat
              @click="cancel"
              >Cancel</v-btn>
          </v-flex>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-flex>
              <v-text-field
              name="signUpPassword"
              label="Password"
              id="signUpPassword"
              type="password"
              :rules=[rules.required]
              v-model="signUpPassword"
              required></v-text-field>
          </v-flex>
          <v-flex>
              <v-text-field
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              v-model="passwordConfirm"
              :rules="[comparePasswords, rules.required]"
              type="password"
              
              required
              ></v-text-field>
          </v-flex>
          <v-flex class="text-xs-center">
            <v-btn
            color="primary"
            @click="e1 = 3"
            flat
            outline
            >
            Continue
            </v-btn>

            <v-btn flat
            @click="cancel"
            >Cancel</v-btn>
          </v-flex>
        </v-stepper-content>
        
        <v-stepper-content step="3">
          <v-flex>
            <v-text-field
            name="faa_registration_number"
            label="FAA Registration Number (Optional)"
            id="faa_registration_number"
            v-model="faa_registration_number"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
            name="mobile_phone_number"
            label="Mobile Phone Number (Optional)"
            id="mobile_phone_number"
            :rules="[rules.required, rules.phone]"
            v-model="mobile_phone_number"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
            name="remote_pilot_certificate_number"
            label="Remote Pilot Certificate Number (Optional)"
            id="remote_pilot_certificate_number"
            v-model="remote_pilot_certificate_number"
            ></v-text-field>
          </v-flex>
          <v-flex class="text-xs-center">
            <v-btn
            color="primary"
            @click="userSignUp"
            >
            Join
            </v-btn>
            <v-btn flat
            @click="cancel"
            >Cancel</v-btn>
          </v-flex>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Welcome!
        </v-card-title>

        <v-card-text>
          You are so close! The last step is to click the link in the
          confirmation email sent to your email address. Once we have
          proven your email address's authenticity you are ready to go!
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="accept"
          >
            I Understand
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>


<script>
  import API from '@/mixins/API.js'
  import router from '@/router'

  export default {
    mixins: [API],
    data () {
        return {
        signUpUsername: '',
        signUpEmail: '',
        signUpPassword: '',
        passwordConfirm: '',
        faa_registration_number: '',
        mobile_phone_number: '',
        remote_pilot_certificate_number: '',
        e1:1,
        dialog:false,
        rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          phone: value => {
            const pattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
            return pattern.test(value) || 'Invalid phone number.'
          }
        }
        }
    },
    methods: {
      async userSignUp() {
        if (this.comparePasswords !== true) {
            return
        }
        try {
          const response = await this.register_pilot(this.signUpEmail, this.signUpPassword,
            this.signUpUsername, this.faa_registration_number, this.mobile_phone_number,
            this.remote_pilot_certificate_number, remote_pilot_certificate_number);
          if (response.status == 200) {
              this.$emit('snackbar', 6000, 'Account registered.')
              this.dialog = true
              this.clear_content()
          } 
        }
        catch(error) {
          console.log(error)
          this.$emit('snackbar', 6000, 'Registration failed.')
        }
      },
      cancel() {
        this.clear_content()
        this.e1 = 1
      },
      accept() {
        this.clear_content()
        this.e1 = 1
        dialog = false
      },
      clear_content() {
        this.signUpUsername= ''
        this.signUpEmail = ''
        this.signUpPassword = ''
        this.passwordConfirm = ''
        this.faa_registration_number = ''
        this.mobile_phone_number = ''
        this.remote_pilot_certificate_number = ''
      }
    },
    computed: {
      comparePasswords () {
        return this.signUpPassword === this.passwordConfirm ? true : 'Passwords don\'t match'
      }
    }
  }
</script>