webpackJsonp([18],{"1gud":function(t,e){},NHnr:function(t,e,n){"use strict";function i(t){n("1gud")}Object.defineProperty(e,"__esModule",{value:!0});var s=n("7+uW"),a=n("3EgV"),o=n.n(a),r=(n("QCv7"),n("mtWM")),c=n.n(r),_=n("Rf8U"),l=n.n(_),u=n("YaEn"),h=n("PyoC");s.a.use(l.a,c.a),s.a.use(o.a,{theme:{primary:"#1d561a",secondary:"#b0bec5",accent:"#8c9eff",error:"#b71c1c"}});var g={mixins:[h.a],data:function(){return{is_flat:!0,toolbar_color:"primary",sidebar:!1,logged_in:!1,snackbar:!1,mode:"",y:"top",x:null,timeout:6e3,text:"Clearance updated.",menuItems:[],userMenu:[{title:"Flights",path:"/flights",icon:"home"},{title:"New Flight",path:"/newflight",icon:"lock"},{title:"Drones",path:"/drones",icon:"lock"}],notLoggedIn:[],settings_menu:["profile","settings","sign out"]}},methods:{change_toolbar_color:function(t){this.toolbar_color=t},login:function(){this.logged_in=!0,this.menuItems=this.userMenu},_logoff:function(){var t=this;this.logoff(function(e){t.logged_in=!1,t.menuItems=t.notLoggedIn,u.a.push("/")},function(t){alert("Hmmm something went wrong with our servers when fetching stations!! Sorry!")})},_snackbar:function(t,e){this.timeout=t,this.text=e,this.snackbar=!0}},mounted:function(){var t=this;this.toolbar_color="primary",this.isLoggedIn(function(e){"True"==e.data?(t.logged_in=!0,t.menuItems=t.userMenu,t.toolbar_color="primary"):(t.logged_in=!1,t.menuItems=t.notLoggedIn,t.toolbar_color="transparent")},function(t){alert("Hmmm something went wrong with our servers when fetching stations!! Sorry!")})}},v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{id:"inspire"}},[n("v-toolbar",{attrs:{transparent:"",fixed:"",flat:t.is_flat,color:t.toolbar_color}},[n("v-toolbar-title",{staticStyle:{"margin-right":"20px"}},[t.logged_in?t._e():n("router-link",{staticStyle:{cursor:"pointer",color:"white"},attrs:{to:"/",tag:"span"}},[t._v("\n\t\t\t\tICARUS\n\t\t\t")]),t._v(" "),t.logged_in?n("router-link",{staticStyle:{cursor:"pointer",color:"white"},attrs:{to:"/homepage",tag:"span"}},[t._v("\n\t\t\t\tICARUS\n\t\t\t")]):t._e()],1),t._v(" "),n("v-toolbar-items",{staticClass:"hidden-xs-only"},t._l(t.menuItems,function(e){return n("v-btn",{key:e.title,attrs:{flat:"",to:e.path}},[n("span",{staticStyle:{color:"white"}},[t._v(" "+t._s(e.title)+" ")])])})),t._v(" "),n("v-spacer"),t._v(" "),t.logged_in?n("v-menu",{attrs:{bottom:"",left:""}},[n("v-btn",{attrs:{slot:"activator",icon:"",dark:""},slot:"activator"},[n("v-icon",[t._v("more_vert")])],1),t._v(" "),n("v-list",[n("v-list-tile",{attrs:{to:"/settings"}},[n("v-list-tile-title",[t._v(" settings")])],1),t._v(" "),n("v-list-tile",{on:{click:function(e){t._logoff()}}},[n("v-list-tile-title",[t._v(" sign out")])],1)],1)],1):t._e(),t._v(" "),t.logged_in?t._e():n("v-toolbar-items",{staticClass:"hidden-sm-and-down"},[n("v-btn",{staticStyle:{color:"white"},attrs:{flat:"",to:"/login"}},[n("v-icon",{staticStyle:{"margin-right":"5px"}},[t._v("lock_outline")]),t._v("\n\t\t\tLogin")],1)],1)],1),t._v(" "),n("router-view",{attrs:{absolute:""},on:{login:t.login,snackbar:t._snackbar,"change-toolbar-color":t.change_toolbar_color}}),t._v(" "),n("v-snackbar",{attrs:{timeout:t.timeout,top:"top"===t.y,bottom:"bottom"===t.y,right:"right"===t.x,left:"left"===t.x,"multi-line":"multi-line"===t.mode,vertical:"vertical"===t.mode,color:"white"},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[n("span",{staticStyle:{color:"black"}},[t._v(" "+t._s(t.text)+" ")]),t._v(" "),n("v-btn",{attrs:{flat:"",color:"green"},nativeOn:{click:function(e){t.snackbar=!1}}},[t._v("Close")])],1)],1)},d=[],m={render:v,staticRenderFns:d},p=m,f=n("VU/8"),b=i,w=f(g,p,!1,b,null,null),C=w.exports;s.a.use(o.a),s.a.config.productionTip=!1,new s.a({el:"#app",router:u.a,template:"<App/>",components:{App:C}})},PyoC:function(t,e,n){"use strict";var i=n("7+uW"),s=n("mtWM"),a=n.n(s),o=n("Rf8U"),r=n.n(o);n("YaEn");i.a.use(r.a,a.a),e.a={data:function(){return{base_url:"https://backend.icarusmap.com"}},methods:{isLoggedIn:function(t,e){var n=this.base_url+"/v1_0/isLoggedIn";a.a.get(n,{withCredentials:!0}).then(t).catch(e)},is_government_official:function(t,e){var n=this.base_url+"/v1_0/is_government_official";a.a.get(n,{withCredentials:!0}).then(t).catch(e)},login:function(t,e,n,i){var s={email:t,password:e},o=this.base_url+"/v1_1/login";a.a.post(o,s,{withCredentials:!0}).then(n).catch(i)},logoff:function(t,e){var n=this.base_url+"/v1_1/logoff";a.a.get(n,{withCredentials:!0}).then(t).catch(e)},register_user:function(t,e,n,i,s){var o={email:t,password:e,name:n,account_type:"operator"},r=this.base_url+"/v1_1/register_user";a.a.post(r,o,{withCredentials:!0}).then(i).catch(s)},list_all_users:function(t,e){var n=this.base_url+"/v1_0/list_all_users";a.a.get(n,{withCredentials:!0}).then(t).catch(e)},get_user_info:function(t,e){var n=this.base_url+"/v1_0/get_user_info";a.a.get(n,{withCredentials:!0}).then(t).catch(e)},update_user_info:function(t,e,n){var i=this.base_url+"/v1_0/update_user_info";a.a.post(i,t,{withCredentials:!0}).then(e).catch(n)},get_user_drones:function(t,e){var n=this.base_url+"/v1_1/get_user_drones";a.a.get(n,{withCredentials:!0}).then(t).catch(e)},register_drone:function(t,e,n){var i=this.base_url+"/v1_0/register_drone",s={description:t};a.a.post(i,s,{withCredentials:!0}).then(e).catch(n)},register_drone_v1_1:function(t,e,n,i,s,o,r){var c=this.base_url+"/v1_1/register_drone",_={description:t,manufacturer:e,type:n,color:i,number_of_blades:s};a.a.post(c,_,{withCredentials:!0}).then(o).catch(r)},delete_drone:function(t,e,n){var i=this.base_url+"/v1_0/delete_drone";a.a.post(i,t,{withCredentials:!0}).then(e).catch(n)},register_mission:function(t,e,n,i,s,o,r){var c={title:t,area:e,description:n,starts_at:i,ends_at:s},_=this.base_url+"/v1_0/register_mission";a.a.post(_,c,{withCredentials:!0}).then(o).catch(r)},register_mission_v1_1:function(t,e,n,i,s,o,r,c){var _={title:t,area:e,description:n,starts_at:i,ends_at:s,type:o},l=this.base_url+"/v1_1/register_mission";a.a.post(l,_,{withCredentials:!0}).then(r).catch(c)},get_mission_drones:function(t,e,n){var i={mission_id:t},s=this.base_url+"/v1_0/get_mission_drones";a.a.post(s,i,{withCredentials:!0}).then(e).catch(n)},get_user_missions:function(t,e){var n=this.base_url+"/v1_0/get_user_missions";a.a.get(n,{withCredentials:!0}).then(t).catch(e)},get_mission_info:function(t,e,n){var i={mission_id:t},s=this.base_url+"/v1_0/get_mission_info";a.a.post(s,i,{withCredentials:!0}).then(e).catch(n)},get_mission_info_v1_1:function(t,e,n){var i={mission_id:t},s=this.base_url+"/v1_1/get_mission_info";a.a.post(s,i,{withCredentials:!0}).then(e).catch(n)},add_drone_to_mission:function(t,e,n,i,s){var o={drone_id:t,mission_id:e,operator_id:n},r=this.base_url+"/v1_0/add_drone_to_mission";a.a.post(r,o,{withCredentials:!0}).then(i).catch(s)},get_missions:function(t,e){var n=this.base_url+"/v1_0/get_missions";a.a.get(n,{withCredentials:!0}).then(t).catch(e)},get_missions_v1_1:function(t,e,n,i){var s={starts_at:t,ends_at:e},o=this.base_url+"/v1_1/get_missions";a.a.post(o,s,{withCredentials:!0}).then(n).catch(i)},get_possible_mission_conflicts:function(t,e,n,i){var s={starts_at:t,ends_at:e},o=this.base_url+"/v1_1/get_possible_mission_conflicts";a.a.get(o,s,{withCredentials:!0}).then(n).catch(i)},delete_mission:function(t,e,n){var i={mission_id:t},s=this.base_url+"/v1_0/delete_mission";a.a.post(s,i,{withCredentials:!0}).then(e).catch(n)},get_active_missions:function(t,e){var n=this.base_url+"/v1_1/get_active_missions";a.a.get(n,{withCredentials:!0}).then(t).catch(e)},get_past_missions:function(t,e){var n=this.base_url+"/v1_1/get_past_missions";a.a.get(n,{withCredentials:!0}).then(t).catch(e)},edit_mission_details:function(t,e,n){var i=this.base_url+"/v1_0/edit_mission_details";a.a.post(i,t,{withCredentials:!0}).then(e).catch(n)},edit_mission_details_v1_1:function(t,e,n){var i=this.base_url+"/v1_1/edit_mission_details";a.a.post(i,t,{withCredentials:!0}).then(e).catch(n)},edit_clearance:function(t,e,n,i){var s=this.base_url+"/v1_0/edit_clearance",o={mission_id:t,new_clearance_state:e};a.a.post(s,o,{withCredentials:!0}).then(n).catch(i)}}}},QCv7:function(t,e){},YaEn:function(t,e,n){"use strict";var i=n("7+uW"),s=n("/ocq"),a=[{path:"/",component:"LandingPage"},{path:"/login",component:"Login"},{path:"/map",component:"MapPage"},{path:"/newflight",component:"NewFlightsPage"},{path:"/settings",component:"Settings"},{path:"/homepage",component:"HomePage"},{path:"/drones",component:"Drones"},{path:"/flights",component:"FlightsPage"},{path:"/education",component:"EducationPage"}],o=a.map(function(t){return{path:t.path,component:function(){return n("mUJ2")("./"+t.component+".vue")}}});i.a.use(s.a),e.a=new s.a({mode:"history",routes:o})},mUJ2:function(t,e,n){function i(t){var e=s[t];return e?Promise.all(e.slice(1).map(n.e)).then(function(){return n(e[0])}):Promise.reject(new Error("Cannot find module '"+t+"'."))}var s={"./Drones.vue":["nTvJ",12],"./EducationPage.vue":["xcFA",8],"./FlightsPage.vue":["gk9H",0,14],"./HomePage.vue":["wrM5",0,5],"./LandingPage.vue":["wSyU",6],"./Login.vue":["xJsL",7],"./MapPage.vue":["xHhH",0,3],"./NewFlightsPage.vue":["ep1K",0,4],"./Settings.vue":["niH5",1,0],"./homepage/droneCard.vue":["V6tq",0,11],"./homepage/missionCard.vue":["c5oA",0,9],"./homepage/noMissionCard.vue":["yFxw",0,13],"./homepage/teamMemberCard.vue":["A5KD",0,15],"./map/mapThumbnail.vue":["vWmO",0],"./settings/SettingsContact.vue":["nrr5",10],"./settings/SettingsLicenses.vue":["rDKc",2,0],"./settings/SettingsProfile.vue":["DlpS",16]};i.keys=function(){return Object.keys(s)},i.id="mUJ2",t.exports=i}},["NHnr"]);
//# sourceMappingURL=app.8a19f3fd226c00b30f5c.js.map