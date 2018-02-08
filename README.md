[![BuddyBuild](https://dashboard.buddybuild.com/api/statusImage?appID=59e8efe16e550f0001cf4452&branch=master&build=latest)](https://dashboard.buddybuild.com/apps/59e8efe16e550f0001cf4452/build/latest?branch=master) 
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

# GitlabApp 
An open source Gitlab client PWA and hybrid app for IOS and Android built with Ionic Framework.

LIVE:

https://cyphercodes.gitlab.io/GitlabApp/

## How to clone and initialize this project

```bash
$ git clone https://gitlab.com/CypherTulip/WhoIMet/WhoIMetIonic.git
$ cd WhoIMetIonic
$ npm update
```

Then you can run:

```bash
$ ionic serve
```


## How to make changes or work on the project 

Each time you want to work on the project, make sure you pull the latest version to your local machine by running:

```bash
$ git pull
```

Then, start coding.

When you are done, run the commands below to push back the changes:

```bash
$ git add .
$ git commit -m 'ENTER A MESSAGE HERE (WHAT DID YOU CHANGE, WHAT IS THE ISSUE REFERENCE NUMBER #XXX)'
$ git push
```

## Notes

For this application, Gitlab OAuth will only work if it is running on one of the below:

* A device with cordova (installed app on Android or IOS)
* Local server running on `localhost` or on `localhost:8100`
* On the main GitLab page for the project: https://cyphercodes.gitlab.io
