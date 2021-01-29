# Ionic App 'Wolkesieben'

This is an awesome ionic app to spend your pet a new home.

## Development

### Dependencies:

- [Node v12+](https://nodejs.org/en/)
- [npm v6+](https://www.npmjs.com/get-npm)
- [Ionic 5](https://ionicframework.com/)
- [Angular 9](https://angular.io/)

### Steps (MacOS only):

- `$ brew install node` <sup>1</sup>
- `$ npm install -g @ionic/cli`
- `$ cd path/to/wolkesieben/`
- `$ ionic serve`<sup>2</sup>

<sup>1</sup>_Or just download and install NodeJS manually. [https://nodejs.org/en/download/](https://nodejs.org/en/download/)_

<sup>2</sup>_This command will start your default browser on [http://localhost:8100](http://localhost:8100)_

## Deployment

### Content Delivery Network (CDN)

_in progress ..._

### self Hosting

If you prefer self hosting, just run
```
$ ionic build --prod
```
and deploy the `www` folder to any server you like and open the `index.html` in your Browser

### iOS and Android

First you need to install additional software to create an iOS app

- download and install Xcode from [https://developer.apple.com/download/](https://developer.apple.com/download/) or through the Mac AppStore _(iOS only)_
- download and install Android Studio from [https://developer.android.com/studio](https://developer.android.com/studio) _(Android only)_
- install command line tools: `$ xcode-select --install` _(iOS only)_
- install capacitor `$ npm install @capacitor/core @capacitor/cli`
- enable capacitor `$ ionic integrations enable capacitor`
- initialize capacitor with app information `npx cap init wolkesieben [appId]`
- add platform to ionic project `$ ionic capacitor add ios` or `$ ionic capacitor add android`

For more information see [https://ionicframework.com/docs/developing/ios](https://ionicframework.com/docs/developing/ios) or [https://ionicframework.com/docs/developing/android](https://ionicframework.com/docs/developing/android)



