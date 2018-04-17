webpackJsonp([14],{"4jev":function(t,e,a){var n=a("tMp7");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("5e5ddf70",n,!0,{})},gk9H:function(t,e,a){"use strict";function n(t){a("4jev")}Object.defineProperty(e,"__esModule",{value:!0});var i=a("cPEA"),s=a("7+uW"),r=(a("3EgV"),a("YaEn")),o=a("PyoC"),l=a("vWmO");s.a.use(i,{load:{installComponents:!0,key:"AIzaSyCtbjOc1SD9ozYtUVzrtxd0PDxRpN-0JGs"}});var c={name:"MissionsPage",mixins:[o.a],user_info:null,components:{mapTemplate:l.default},data:function(){return{newCenter:"",zoom:4,rppi:[10,20,40,{text:"All",value:-1}],mapType:"hybrid",scrollwheel:!1,max25chars:function(t){return t.length<=25||"Input too long!"},tmp:"",search:"",pagination:{},headers:[{text:"Title",align:"left",value:"title"},{text:"Commander",align:"center",value:"commander"},{text:"Drones",align:"center",value:"Drones#"},{text:"Start Date",align:"center",value:"starts_at"},{text:"Status",align:"center",value:"legal_status"}],items:[],showDeleteWarning:!1,currState:null,start_date:"1999-01-01",start_menu:!1,start_time:"00:00:00",start_time_menu:!1,end_date:"2020-01-01",end_menu:!1,end_time:"00:00:00",message:null,end_time_menu:!1,clearance_states:["APPROVED","DECLINED"],is_gov_official:!1,y:"top",x:null,mode:"",mapLoaded:!1}},methods:{can_delete:function(t){return this.user_info.id==t},_state:function(t){return null!=t&&t.state},getMissions:function(){var t=this,e=this.start_date+" "+this.start_time,a=this.end_date+" "+this.end_time;this.get_missions_v1_1(e,a,function(e){t.items=e.data;for(var a=0;a<t.items.length;a++){var n=t.items[a].area;t.items[a].polygons=[],t.items[a].paths=[];var i=[],s=0,r={min:200,max:-200,range:0},o=0,l={min:200,max:-200,range:0};if(n.features.length>0){for(var c=n.features[0].geometry.coordinates.length,m=0;m<n.features.length;m++)for(var v in n.features[m].geometry.coordinates)i.push({lat:n.features[m].geometry.coordinates[v][0],lng:n.features[m].geometry.coordinates[v][1]}),s+=n.features[m].geometry.coordinates[v][0],n.features[m].geometry.coordinates[v][0]>r.max&&(r.max=n.features[m].geometry.coordinates[v][0]),n.features[m].geometry.coordinates[v][0]<r.min&&(r.min=n.features[m].geometry.coordinates[v][0]),n.features[m].geometry.coordinates[v][1]>l.max&&(l.max=n.features[m].geometry.coordinates[v][1]),n.features[m].geometry.coordinates[v][1]<l.min&&(l.min=n.features[m].geometry.coordinates[v][1]),o+=n.features[m].geometry.coordinates[v][1];if(0!=t.items.length){r.range=Math.abs(r.max)-Math.abs(r.min),l.range=Math.abs(l.max)-Math.abs(l.min);var d=Math.max(r.range,l.range);t.items[a].zoom=-1.420533814*Math.log(d)+6.8957137,t.items[a].paths=i,t.items[a].center={lat:s/c,lng:o/c}}}}},function(t){alert("Issues grabbing missions."),console.log(t)})},setEvent:function(t,e){google.maps.event.addListener(t,"dragend",function(a){e.polygons[t.id].setPath(t.getPath())})},update_clearance:function(t){var e=this;t.clearance.state=this.currState,this.edit_clearance(t.id,t.clearance.state,function(t){e.$emit("snackbar",6e3,"Clearance updated.")},function(t){alert("Error connecting to servers!")})},goToMission:function(t){r.a.push("map?id="+t)},deleteMission:function(t){var e=this;this.delete_mission(t,function(t){e.$emit("snackbar",6e3,"Flight Deleted."),e.getMissions()},function(t){}),this.showDeleteWarning=!1},newMission:function(){r.a.push("/newflight")}},mounted:function(){var t=this;this.is_government_official(function(e){"True"==e.data?t.is_gov_official=!0:t.is_gov_official=!1},function(t){alert("Error checking if is_government_official.")}),this.getMissions(),this.get_user_info(function(e){200==e.status&&(t.user_info=e.data)},function(t){throw console.log("Error grabbing user data!"),t})}},m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-content",{staticClass:"mission_body"},[a("v-layout",{staticStyle:{"margin-top":"70px"},attrs:{row:""}},[a("v-layout",{attrs:{column:""}},[a("v-card",{staticStyle:{margin:"20px"}},[a("v-card-title",[a("v-flex",[a("h3",[t._v("\n\t\t\t\t\t\t\t\tFILTERS\n\t\t\t\t\t\t\t")])])],1),t._v(" "),a("v-card-text",[a("v-flex",[a("v-layout",{attrs:{row:""}},[a("v-menu",{ref:"menuDate",attrs:{lazy:"","close-on-content-click":!1,transition:"scale-transition","offset-y":"","full-width":"","nudge-right":40,"min-width":"290px"},model:{value:t.start_menu,callback:function(e){t.start_menu=e},expression:"start_menu"}},[a("v-text-field",{staticStyle:{margin:"2%",width:"96%"},attrs:{slot:"activator",label:"Start Date",readonly:""},slot:"activator",model:{value:t.start_date,callback:function(e){t.start_date=e},expression:"start_date"}}),t._v(" "),a("v-card",[a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("v-date-picker",{ref:"picker",attrs:{color:"green darken-4",min:(new Date).toISOString().substr(0,10),max:(new Date).toISOString().substr(0,10)},on:{change:function(t){}},model:{value:t.start_date,callback:function(e){t.start_date=e},expression:"start_date"}})],1)]),t._v(" "),a("v-card-actions",[a("v-btn",{staticStyle:{"background-color":"#1d561a"},attrs:{dark:""},on:{click:function(e){t.start_menu=!1}}},[t._v("OK")])],1)],1)],1),t._v(" "),a("v-menu",{ref:"menuDate",attrs:{lazy:"","close-on-content-click":!1,transition:"scale-transition","offset-y":"","full-width":"","nudge-right":40,"min-width":"290px"},model:{value:t.start_time_menu,callback:function(e){t.start_time_menu=e},expression:"start_time_menu"}},[a("v-text-field",{staticStyle:{margin:"2%",width:"96%"},attrs:{slot:"activator",label:"Start Time",readonly:""},slot:"activator",model:{value:t.start_time,callback:function(e){t.start_time=e},expression:"start_time"}}),t._v(" "),a("v-card",[a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("v-time-picker",{ref:"picker",attrs:{color:"green darken-4",min:(new Date).toISOString().substr(0,10),max:(new Date).toISOString().substr(0,10)},on:{change:function(t){}},model:{value:t.start_time,callback:function(e){t.start_time=e},expression:"start_time"}})],1)]),t._v(" "),a("v-card-actions",[a("v-btn",{staticStyle:{"background-color":"#1d561a"},attrs:{dark:""},on:{click:function(e){t.start_time_menu=!1}}},[t._v("OK")])],1)],1)],1)],1)],1),t._v(" "),a("v-flex",[a("v-layout",{attrs:{row:""}},[a("v-menu",{ref:"menuDate",attrs:{lazy:"","close-on-content-click":!1,transition:"scale-transition","offset-y":"","full-width":"","nudge-right":40,"min-width":"290px"},model:{value:t.end_menu,callback:function(e){t.end_menu=e},expression:"end_menu"}},[a("v-text-field",{staticStyle:{margin:"2%",width:"96%"},attrs:{slot:"activator",label:"End Date",readonly:""},slot:"activator",model:{value:t.end_date,callback:function(e){t.end_date=e},expression:"end_date"}}),t._v(" "),a("v-card",[a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("v-date-picker",{ref:"picker",attrs:{color:"green darken-4",min:(new Date).toISOString().substr(0,10),max:(new Date).toISOString().substr(0,10)},on:{change:function(t){}},model:{value:t.end_date,callback:function(e){t.end_date=e},expression:"end_date"}})],1)]),t._v(" "),a("v-card-actions",[a("v-btn",{staticStyle:{"background-color":"#1d561a"},attrs:{dark:""},on:{click:function(e){t.end_menu=!1}}},[t._v("OK")])],1)],1)],1),t._v(" "),a("v-menu",{ref:"menuDate",attrs:{lazy:"","close-on-content-click":!1,transition:"scale-transition","offset-y":"","full-width":"","nudge-right":40,"min-width":"290px"},model:{value:t.end_time_menu,callback:function(e){t.end_time_menu=e},expression:"end_time_menu"}},[a("v-text-field",{staticStyle:{margin:"2%",width:"96%"},attrs:{slot:"activator",label:"End Time",readonly:""},slot:"activator",model:{value:t.end_time,callback:function(e){t.end_time=e},expression:"end_time"}}),t._v(" "),a("v-card",[a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("v-time-picker",{ref:"picker",attrs:{color:"green darken-4",min:(new Date).toISOString().substr(0,10),max:(new Date).toISOString().substr(0,10)},on:{change:function(t){}},model:{value:t.end_time,callback:function(e){t.end_time=e},expression:"end_time"}})],1)]),t._v(" "),a("v-card-actions",[a("v-btn",{staticStyle:{"background-color":"#1d561a"},attrs:{dark:""},on:{click:function(e){t.end_time_menu=!1}}},[t._v("OK")])],1)],1)],1)],1),t._v(" "),a("v-flex",{staticClass:"text-xs-center"},[a("v-btn",{staticStyle:{margin:"10px"},attrs:{flat:"",outline:""},on:{click:function(e){t.getMissions()}}},[t._v("\n\t\t\t\t\t\t\t\t\tREFRESH\n\t\t\t\t\t\t\t\t")])],1)],1)],1)],1),t._v(" "),a("v-card",{staticStyle:{"margin-left":"20px","margin-right":"20px"}},[a("v-flex",{staticClass:"text-xs-center"},[a("v-btn",{staticStyle:{margin:"10px"},attrs:{flat:"",outline:""},on:{click:function(e){t.newMission()}}},[t._v("\n\t\t\t\t\t\t\tNEW FLIGHT PLAN\n\t\t\t\t\t\t")])],1)],1)],1),t._v(" "),a("v-layout",{attrs:{column:""}},[a("v-card",{staticStyle:{margin:"20px"}},[a("v-data-table",{attrs:{headers:t.headers,items:t.items,search:t.search,"rows-per-page-items":t.rppi},scopedSlots:t._u([{key:"items",fn:function(e){return[a("tr",{on:{click:function(t){t.preventDefault(),e.expanded=!e.expanded}}},[a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.title))]),t._v(" "),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.commander))]),t._v(" "),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.num_drones))]),t._v(" "),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.starts_at))]),t._v(" "),a("td",{staticClass:"text-xs-center"},["DECLINED"==t._state(e.item.clearance)?a("v-icon",{attrs:{right:"",color:"red"}},[t._v("block")]):t._e(),t._v(" "),"PENDING"==t._state(e.item.clearance)?a("v-icon",{attrs:{right:"",color:"yellow"}},[t._v("error")]):t._e(),t._v(" "),"APPROVED"==t._state(e.item.clearance)?a("v-icon",{attrs:{right:"",color:"green"}},[t._v("check_circle")]):t._e()],1)])]}},{key:"pageText",fn:function(e){var a=e.pageStart,n=e.pageStop;return[t._v("\n\t\t\t\t\t\t\tFrom "+t._s(a)+" to "+t._s(n)+"\n\t\t\t\t\t\t")]}},{key:"expand",fn:function(e){return[a("v-tabs",[a("v-toolbar",[a("v-toolbar-title",[t._v(t._s(e.item.title))]),t._v(" "),a("v-spacer"),t._v(" "),a("v-toolbar-items",{staticClass:"hidden-sm-and-down"},[a("v-tooltip",{attrs:{left:""}},[a("v-btn",{attrs:{slot:"activator",flat:"",icon:"",disabled:!t.can_delete(e.item.commander_id)},on:{click:function(e){t.showDeleteWarning=!0}},slot:"activator"},[a("v-icon",[t._v(" delete ")])],1),t._v(" "),a("span",[t._v("Delete Flight")])],1),t._v(" "),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.showDeleteWarning,callback:function(e){t.showDeleteWarning=e},expression:"showDeleteWarning"}},[a("v-card",[a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("h3",{staticClass:"headline mb-0"},[t._v("Are you sure you would like to delete flight "+t._s(e.item.title))])])]),t._v(" "),a("v-card-actions",[a("v-btn",{attrs:{color:"primary",flat:""},on:{click:function(e){e.stopPropagation(),t.showDeleteWarning=!1}}},[t._v("Close")]),t._v(" "),a("v-btn",{attrs:{color:"primary",flat:""},on:{click:function(a){t.deleteMission(e.item.id)}}},[t._v("Delete Flight")])],1)],1)],1),t._v(" "),a("v-tooltip",{attrs:{left:""}},[a("v-btn",{attrs:{slot:"activator",flat:"",icon:"",disabled:!t.can_delete(e.item.commander_id)},on:{click:function(a){t.goToMission(e.item.id)}},slot:"activator"},[a("v-icon",[t._v(" map ")])],1),t._v(" "),a("span",[t._v("Open in Map")])],1)],1),t._v(" "),a("v-tabs-bar",{attrs:{slot:"extension"},slot:"extension"},[a("v-tabs-slider",{attrs:{color:"primary"}}),t._v(" "),a("v-tabs-item",{attrs:{href:"tab-details"}},[t._v("\n\t\t\t\t\t\t\t\t          \tFlight Details\n\t\t\t\t\t\t\t\t        ")]),t._v(" "),a("v-tabs-item",{attrs:{href:"tab-clearance"}},[t._v("\n\t\t\t\t\t\t\t\t        \tClearance\n\t\t\t\t\t\t\t\t        ")])],1)],1),t._v(" "),a("v-tabs-items",[a("v-tabs-content",{attrs:{id:"tab-details"}},[a("v-card",{attrs:{flat:""}},[a("v-card-text",[a("v-layout",{attrs:{column:""}},[a("v-layout",{attrs:{row:""}},[a("v-layout",{attrs:{column:""}},[a("v-layout",{staticStyle:{"margin-top":"10px"},attrs:{row:""}},[a("v-flex",[a("h4",[t._v("Start Date/Time:")]),t._v(" "),a("span",[t._v(t._s(e.item.starts_at))])]),t._v(" "),a("v-flex",[a("h4",[t._v("End Date/Time: ")]),t._v(" "),a("span",[t._v(t._s(e.item.ends_at))])])],1),t._v(" "),a("v-flex",[a("h4",[t._v("Type: ")]),a("span",[t._v(t._s(e.item.type))])])],1),t._v(" "),a("v-layout",{attrs:{column:"","align-center":""}},[a("v-flex",[a("mapTemplate",{tag:"component",attrs:{mission:e.item}})],1)],1)],1),t._v(" "),t.is_gov_official?a("v-layout",{attrs:{row:""}},[a("v-flex",{staticStyle:{"margin-top":"5px"}},[a("h4",[t._v("Flight Description:")]),t._v(" "),a("span",{staticStyle:{"margin-top":"10px",height:"80px",overflow:"scroll"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(e.item.description)+"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])])],1):t._e()],1)],1)],1)],1)],1),t._v(" "),a("v-tabs-content",{attrs:{id:"tab-clearance"}},[a("v-card",{attrs:{flat:""}},[a("v-card-text",[a("v-layout",{attrs:{column:""}},[t.is_gov_official?a("v-layout",{attrs:{row:""}},[a("v-flex",{staticStyle:{"margin-top":"5px"}},[a("v-text-field",{attrs:{label:"Write a short message to the commander to explain how you're setting the status.","multi-line":"",rows:"3"},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}})],1),t._v(" "),a("v-select",{attrs:{items:t.clearance_states,label:"Set Clearance","single-line":"",bottom:""},model:{value:t.currState,callback:function(e){t.currState=e},expression:"currState"}})],1):t._e(),t._v(" "),t.is_gov_official?a("v-btn",{attrs:{flat:""},on:{click:function(a){t.update_clearance(e.item)}}},[t._v("Save Clearance")]):t._e()],1)],1)],1)],1)],1)]}}])})],1)],1)],1)],1)},v=[],d={render:m,staticRenderFns:v},u=d,_=a("VU/8"),f=n,g=_(c,u,!1,f,null,null);e.default=g.exports},tMp7:function(t,e,a){e=t.exports=a("FZ+f")(!0),e.push([t.i,"@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500);",""]),e.push([t.i,"\n.mission_body {\n\tfont-family: 'Roboto', sans-serif;\n\tbackground-color: #f0f0f0;\n}\n","",{version:3,sources:["/Users/samcrane/Documents/Repositories/SAR-Spring-2018/Front-End/demo-drone-app/src/components/FlightsPage.vue"],names:[],mappings:";AAEA;CACC,kCAAkC;CAClC,0BAA0B;CAC1B",file:"FlightsPage.vue",sourcesContent:["\n@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');\n.mission_body {\n\tfont-family: 'Roboto', sans-serif;\n\tbackground-color: #f0f0f0;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=14.0fe665d6ca09447479b5.js.map