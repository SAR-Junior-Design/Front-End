# Icarus Web Application

## Installation Guide for Icarus
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

## Release Notes for Icarus
### New Features

Added video background on Landing/Login pages
<br> User can now upload and view documents on License page
<br> User can upload profile picture on Settings
<br> 

### Bug Fixes
<br> Pdfs uploaded in License page can be viewed.


### Known Bugs

Uploaded documents under the License Page is not saved to the server.
<br> Updating profile picture under Settings does not save it to the server.
<br> Inactive drones on Map Page show data as null.
<br> User cannot remove a drone from a mission once added on Map Page.
<br> Sometimes a document uploaded as Part 333 replaces the Part 107 document instead.
