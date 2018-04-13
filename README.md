# Icarus Web Application

## Installation Guide for Icarus 1.0
### Pre-Requisites

You must have Yarn installed before proceeding. See https://yarnpkg.com/lang/en/docs/install/

### Download

Download the following repository: https://github.com/SAR-Junior-Design/Front-End

### Dependencies and Installation

All dependencies are listed in the package.json file. To install these dependencies, launch a Terminal window, and change to the root directory of the vue project (demo-drone-app/). Then run the following code:

``` bash
yarn install
```

For more information on [vue-loader], visit http://vuejs.github.io/vue-loader

### Build and Run

``` bash
# serve with hot reload at localhost:8080
yarn start

# build for production with minification
yarn run build
```

Open a web browser and in the Address Field go to the following

``` bash
localhost:8080
```

## Release Notes for Icarus 1.0
### New Features

<ul>
  <li>Added video background on Landing/Login pages.</li>
  <li>User can now upload and view documents on License page.</li>
  <li>User can upload profile picture on Settings.</li>
  <li>Polygons can now be deleted on both New Mission and Map page.</li>
  <li>Missions can now be identified by type (recreational, research, commercial)</li>
</ul> 

### Bug Fixes

<ul>
  <li>Pdfs uploaded in License page can be viewed.</li>
  <li>Navigation bar no longer disappears when window resizes for some browsers.</li>
  <li>Time and Date can updated if flight details are edited on Map page.</li>
  <li>Clicking outside of a picker no longer closes nav bar</li>
</ul>

### Known Bugs

<ul>
  <li>Uploaded documents under the License Page is not saved to the server.</li>
  <li>Updating profile picture under Settings does not save it to the server.</li>
  <li>Inactive drones on Map Page show data as null.</li>
  <li>User cannot remove a drone from a mission once added on Map Page.</li>
  <li>Sometimes a document uploaded as Part 333 replaces the Part 107 document instead.</li>
  <li>Mini map component breaks if multiple polygons are drawn in a single mission</li>
</ul> 
