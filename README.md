# mcserver-js
A JavaScript library for MC-API server queries

## Example Usage

```javascript
// Basic Usage
mcserver.ping("mc.hypixel.net", function(data, err) {
    if(data) {
        // Do what you want with the data..
        console.log(data.online + ' from ' + data.source);
    } else {
        // Handle the error..
        console.error(err);
    }
});

// Change Region
mcserver.region = 'US';// You can use EU or US right now

// Supports nodeJS / AMD:
var mcserver = require('mcserver-js');
require(["mcserver-js"], function(mcserver) { /* ... */ });
```

## Credits
Basic structure and readme borrowed from [money.js / fx](https://github.com/openexchangerates/money.js), [underscore.js](https://github.com/jashkenas/underscore).
