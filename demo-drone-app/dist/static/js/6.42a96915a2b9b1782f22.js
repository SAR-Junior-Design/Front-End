webpackJsonp([6],{"3xOb":function(t,e,s){e=t.exports=s("FZ+f")(!0),e.push([t.i,"\n.background {\n  background: url(https://i.imgur.com/iuiH5Cu.jpg) no-repeat center center fixed;\n  background-size: cover;\n}\n","",{version:3,sources:["/Users/samcrane/Documents/Repositories/SAR-Spring-2018/Front-End/demo-drone-app/src/components/LandingPage.vue"],names:[],mappings:";AACA;EACE,+EAA+E;EAC/E,uBAAuB;CACxB",file:"LandingPage.vue",sourcesContent:["\n.background {\n  background: url(https://i.imgur.com/iuiH5Cu.jpg) no-repeat center center fixed;\n  background-size: cover;\n}\n"],sourceRoot:""}])},"8CrS":function(t,e,s){e=t.exports=s("FZ+f")(!0),e.push([t.i,"\n.VideoBg {\n  position: relative;\n  background-size: cover;\n  background-position: center;\n  overflow: hidden;\n}\n.VideoBg video {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  visibility: hidden;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n.VideoBg__content {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n","",{version:3,sources:["/Users/samcrane/Documents/Repositories/SAR-Spring-2018/Front-End/demo-drone-app/node_modules/vue-videobg/src/VideoBackground.vue"],names:[],mappings:";AACA;EACE,mBAAmB;EACnB,uBAAuB;EACvB,4BAA4B;EAC5B,iBAAiB;CAClB;AACD;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,mBAAmB;EACnB,yCAAyC;UACjC,iCAAiC;CAC1C;AACD;EACE,mBAAmB;EACnB,OAAO;EACP,QAAQ;EACR,YAAY;EACZ,aAAa;CACd",file:"VideoBackground.vue",sourcesContent:["\n.VideoBg {\n  position: relative;\n  background-size: cover;\n  background-position: center;\n  overflow: hidden;\n}\n.VideoBg video {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  visibility: hidden;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n.VideoBg__content {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n"],sourceRoot:""}])},CjoG:function(t,e,s){var n=s("3xOb");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);s("rjj0")("22093e1e",n,!0,{})},E7Ba:function(t,e,s){var n=s("8CrS");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);s("rjj0")("2da62eb0",n,!0,{})},IGY9:function(t,e,s){"use strict";function n(t){s("E7Ba")}var i={props:{sources:{type:Array,required:!0},img:{type:String}},data:function(){return{videoRatio:null}},mounted:function(){var t=this;this.setImageUrl(),this.setContainerHeight(),this.videoCanPlay()&&(this.$refs.video.oncanplay=function(){t.$refs.video&&(t.videoRatio=t.$refs.video.videoWidth/t.$refs.video.videoHeight,t.setVideoSize(),t.$refs.video.style.visibility="visible")}),window.addEventListener("resize",this.resize)},beforeDestroy:function(){window.removeEventListener("resize",this.resize)},methods:{resize:function(){this.setContainerHeight(),this.videoCanPlay()&&this.setVideoSize()},videoCanPlay:function(){return!!this.$refs.video.canPlayType},setImageUrl:function(){this.img&&(this.$el.style.backgroundImage="url("+this.img+")")},setContainerHeight:function(){this.$el.style.height=window.innerHeight+"px"},setVideoSize:function(){var t,e;this.$el.offsetWidth/this.$el.offsetHeight>this.videoRatio?t=this.$el.offsetWidth:e=this.$el.offsetHeight,this.$refs.video.style.width=t?t+"px":"auto",this.$refs.video.style.height=e?e+"px":"auto"},getMediaType:function(t){return"video/"+t.split(".").pop()}}},a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"VideoBg"},[s("video",{ref:"video",attrs:{autoplay:"",loop:"",muted:""},domProps:{muted:!0}},t._l(t.sources,function(e){return s("source",{attrs:{src:e,type:t.getMediaType(e)}})})),t._v(" "),s("div",{staticClass:"VideoBg__content"},[t._t("default")],2)])},o=[],r={render:a,staticRenderFns:o},l=r,c=s("VU/8"),d=n,u=c(i,l,!1,d,null,null);e.a=u.exports},wSyU:function(t,e,s){"use strict";function n(t){s("CjoG")}Object.defineProperty(e,"__esModule",{value:!0});var i=s("7+uW"),a=s("mtWM"),o=s.n(a),r=s("Rf8U"),l=s.n(r),c=s("YaEn"),d=s("PyoC"),u=s("IGY9");i.a.component("video-bg",u.a),i.a.use(l.a,o.a);var v={name:"Login",mixins:[d.a],data:function(){return{signUpUsername:"",signUpEmail:"",signUpPassword:"",passwordConfirm:""}},methods:{userSignUp:function(){var t=this;!0===this.comparePasswords&&this.register_user(this.signUpEmail,this.signUpPassword,this.signUpUsername,function(e){if(200==e.status)t.$emit("snackbar",6e3,"Account registered."),c.a.push("/login");else{if(400!=e.status)throw error;t.$emit("snackbar",6e3,"Bad Registration data.")}},function(t){alert("Hmmm something went wrong with our servers when fetching stations!! Sorry!")})},handleScroll:function(t){window.scrollY>350?(console.log("GOT SOMEWHERE"),this.$emit("change-toolbar-color","primary")):this.$emit("change-toolbar-color","transparent")}},computed:{comparePasswords:function(){return this.signUpPassword===this.passwordConfirm||"Passwords don't match"}},mounted:function(){this.$emit("change-toolbar-color","transparent"),this.isLoggedIn(function(t){"True"==t.data&&c.a.push("/homepage")},function(t){alert("Hmmm something went wrong with our servers when fetching stations!! Sorry!")})},created:function(){window.addEventListener("scroll",this.handleScroll)},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}},p=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-content",[s("section",[s("video-bg",{staticStyle:{height:"610px"},attrs:{sources:["https://s3.amazonaws.com/icarus-media/doneVID.mp4"]}},[s("v-container",[s("v-layout",{staticStyle:{"margin-top":"10%","margin-bottom":"10%"},attrs:{row:"",wrap:""}},[s("v-layout",{staticStyle:{"margin-top":"18%","margin-bottom":"10%"},attrs:{column:""}},[s("v-flex",{attrs:{"mt-3":""}},[s("v-flex",{staticClass:"text-xs-left",staticStyle:{color:"#ffffff"}},[s("span",{staticStyle:{"font-size":"30px",color:"#ffffff"}},[t._v("Campus Drone Management.")]),s("br"),t._v(" "),s("span",{staticStyle:{"font-size":"20px",color:"#ffffff"}},[t._v("An intuitive drone  policy toolkit.")])])],1)],1),t._v(" "),s("v-layout",{attrs:{column:""}},[s("v-card",{staticStyle:{"background-color":"#ffffff",opacity:"0.95"}},[s("v-card-title",[s("v-flex",{staticClass:"text-xs-left",staticStyle:{"margin-top":"0px"}},[s("h2",[t._v(" Register ")])])],1),t._v(" "),s("v-card-text",{staticStyle:{opacity:"1.0"}},[s("form",{on:{submit:function(e){e.preventDefault(),t.userSignUp(e)}}},[s("v-layout",{attrs:{column:""}},[s("v-flex",[s("v-text-field",{attrs:{name:"signUpUsername",label:"Username",id:"signUpUsername",type:"username",required:""},model:{value:t.signUpUsername,callback:function(e){t.signUpUsername=e},expression:"signUpUsername"}})],1),t._v(" "),s("v-flex",[s("v-text-field",{attrs:{name:"signUpEmail",label:"Email",id:"signUpEmail",type:"email",required:""},model:{value:t.signUpEmail,callback:function(e){t.signUpEmail=e},expression:"signUpEmail"}})],1),t._v(" "),s("v-flex",[s("v-text-field",{attrs:{name:"signUpPassword",label:"Password",id:"signUpPassword",type:"password",required:""},model:{value:t.signUpPassword,callback:function(e){t.signUpPassword=e},expression:"signUpPassword"}})],1),t._v(" "),s("v-flex",[s("v-text-field",{attrs:{name:"confirmPassword",label:"Confirm Password",id:"confirmPassword",rules:[t.comparePasswords],type:"password"},model:{value:t.passwordConfirm,callback:function(e){t.passwordConfirm=e},expression:"passwordConfirm"}})],1),t._v(" "),s("v-flex",{staticClass:"text-xs-center"},[s("v-btn",{staticStyle:{"background-color":"#1d561a",color:"#1d561a"},attrs:{type:"submit",flat:"",outline:""}},[t._v("\n                          Join\n                        ")])],1)],1)],1)])],1)],1)],1)],1)],1)],1),t._v(" "),s("section",[s("v-layout",{staticClass:"my-5",attrs:{column:"",wrap:"","align-center":""}},[s("v-flex",{staticClass:"my-3",attrs:{xs12:"",sm4:""}},[s("div",{staticClass:"text-xs-center"},[s("h2",{staticClass:"headline",staticStyle:{"margin-bottom":"5px"}},[t._v("Be ahead of the curve.")]),t._v(" "),s("span",{staticClass:"subheading"},[t._v("\n            Have a drone policy that fuels innovation.\n          ")])])]),t._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-container",{attrs:{"grid-list-xl":""}},[s("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[s("v-flex",{attrs:{xs12:"",md4:""}},[s("v-card",{staticClass:"elevation-0 transparent"},[s("v-card-text",{staticClass:"text-xs-center"},[s("v-icon",{attrs:{"x-large":"",color:"primary"}},[t._v("color_lens")])],1),t._v(" "),s("v-card-title",{staticClass:"layout justify-center",attrs:{"primary-title":""}},[s("div",{staticClass:"headline text-xs-center"},[t._v("Intuitive Design")])]),t._v(" "),s("v-card-text",[t._v("\n                  To build a cohesive flight management software, it needed to be something that was equally useful for campus law enforcement and faculty, as well as for pilots. For that reason, building a beautiful, elegantly designed product was our top priority.\n                ")])],1)],1),t._v(" "),s("v-flex",{attrs:{xs12:"",md4:""}},[s("v-card",{staticClass:"elevation-0 transparent"},[s("v-card-text",{staticClass:"text-xs-center"},[s("v-icon",{attrs:{"x-large":"",color:"primary"}},[t._v("flash_on")])],1),t._v(" "),s("v-card-title",{staticClass:"layout justify-center",attrs:{"primary-title":""}},[s("div",{staticClass:"headline"},[t._v("Fast setup")])]),t._v(" "),s("v-card-text",[t._v("\n                  Built by UAS operators, for UAS operators. This system is built with the user in mind to make sure that setup is as easy as possible and integrating into existing systems is seamless.\n                ")])],1)],1),t._v(" "),s("v-flex",{attrs:{xs12:"",md4:""}},[s("v-card",{staticClass:"elevation-0 transparent"},[s("v-card-text",{staticClass:"text-xs-center"},[s("v-icon",{attrs:{"x-large":"",color:"primary"}},[t._v("people")])],1),t._v(" "),s("v-card-title",{staticClass:"layout justify-center",attrs:{"primary-title":""}},[s("div",{staticClass:"headline text-xs-center"},[t._v("Responsive Team")])]),t._v(" "),s("v-card-text",[t._v("\n                  Our team is working around the clock to make sure this system is running at 100%. Don't worry about setting up systems or managing databases, we just take care of everything in the cloud!\n                ")])],1)],1)],1)],1)],1)],1)],1)])},f=[],m={render:p,staticRenderFns:f},g=m,h=s("VU/8"),y=n,C=h(v,g,!1,y,null,null);e.default=C.exports}});
//# sourceMappingURL=6.42a96915a2b9b1782f22.js.map