# RNic Test

### Demo
http://mufaddalmw.github.io/rnic-test/build

### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run build
```
### Description:

**Your basket page** - by default 4 items are displayed from predefined javascript object. where subtotal, VAT and total cost are calculated on run time and assigned back to javascript object. Once user interect with basket (ie- increase or decrease quantity of item, it reassigns value to javascript object)

**Delete functionality** - Once user delete an item, it removes item from view and deletes item from javascript object.

**Submit functionality** - Once user clicks "Buy Now" button, post request is sent via ajax call where final object with items, subtotal, VAT and total cost are displayed in browser console or network tab (post). For placeholder URL https://jsonplaceholder.typicode.com/posts is used inside ajax call.

### Tools and libraries:

* JS library - Jquery for ajax request and element targeting. 
* Class based structure is used for javascript functions.
* ES6 syntax and classes are used and compiled in ES5 (normal) javascript via build tool.
* SVG sprite technique is used for icons, svg4everybody library is used to support legacy browsers https://github.com/jonathantneal/svg4everybody 
* Bootstrap library for sass mixing support and responsive media query function only no other features are used. 
* Build tool - webpack
* Browser Compatibility IE9+, Chrome, Safari, Firefox, Android Chrome, IOS Safari
* Accessibility check done, Semantics markup are used throughtout project.
* Google font - couldn't find Droid Sans and Droid Serif in core google fonts library, alternative 'Noto Serif' font is used.
* All requirements mentioned in document are taken in account.
* SASS Support via [sass-loader] 
* Module based styles are written.
* Pug templating is used for HTML markup
* Linting via [eslint-loader] 
