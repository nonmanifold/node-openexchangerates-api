openexchangerates-api
==========================

Yet another Node.js module to work with [Open Exchange Rates](https://openexchangerates.org/) API.

Why?
----

Existing implementations do not allow running of multiple client instances simultaneously. Also I added debugging output thanks to [debug](https://www.npmjs.com/package/debug). And extended `Error` object (`RatesApiError`) is helpful when you get into trouble.

Install
-------

    npm install openexchangerates-api --save

Example
-------

```javascript
'use strict';

var RatesApi = requre('openexchangerates-api');
var client = new RatesApi({
  appId: 'YOUR_APP_ID'
});


client.currencies(function handleCurrencies(err, data) {
  if (err) {
    throw err;
  }
  else {
    console.dir(data);
  }
});

client.latest({base: 'EUR'}, function handleLatest(err, data) {
  if (err) {
    throw err;
  }
  else {
    console.dir(data);
  }
});

client.historical(new Date(2014, 0, 1), function handleHistorical(err, data) {
  if (err) {
    throw err;
  }
  else {
    console.dir(data);
  }
});

var start = new Date(2014, 11, 1);
var end = new Date(2014, 11, 10);
var options = {symbols: 'USD,EUR,RUB'};

client.timeSeries(start, end, options, function handleTimeSeries(err, data) {
  if (err) {
    throw err;
  }
  else {
    console.dir(data);
  }
});

client.convert(100, 'EUR', 'USD', function handleResult(err, data) {
  if (err) {
    throw err;
  }
  else {
    console.dir(data);
  }
});
```

API
---

### RatesApi

#### RatesApi(options)

Instantiate API client.

__Arguments__

* options `object` - Client options
    * appId `string` - Application ID. Mandatory if you want not only [currencies.json](http://openexchangerates.org/api/currencies.json).
    * ssl `boolean` - Use HTTPS instead of HTTP. Defaults to `true`
    * apiBase `string` - API base URL. Usually no need to change it
    * request `object` - Additional parameters for `request` module. Read more [here](https://github.com/request/request#requestoptions-callback)

#### void convert(value, from, to, [qs], callback)

[Single-Currency Conversion API](https://openexchangerates.org/documentation#convert) call.

__Arguments__

* value `number` - Amount in source currency
* from `string` - Source currency 3-letter code
* to `string` - Result currency 3-letter code
* qs `object` - Additional query string options
    * prettyprint `number` - If you want pretty JSON, set it to `1`
* callback `function` - Callback function which accepts `(err, responseData)`

#### void currencies(callback)

[Currencies](https://openexchangerates.org/documentation#preview-api-response) request. For this you do not need `options.appId`.

__Arguments__

* callback `function` - Callback function which accepts `(err, responseData)`

#### void historical(date, [qs], callback)

[Historical Data](https://openexchangerates.org/documentation#historical-data) call.

__Arguments__

* date `Date` - Date for which you request rates
* qs `object` - Additional query string options
    * base `string` - Base currency code. `USD` by default
    * symbols|currencies `string `- Comma-separated list of currencies to return
* callback `function` - Callback function which accepts `(err, responseData)`

#### void latest([qs], callback)

[Latest Data](https://openexchangerates.org/documentation#accessing-the-api) call.

__Arguments__

* qs `object` - Additional query string options
    * base `string` - Base currency code. `USD` by default
    * symbols|currencies `string `- Comma-separated list of currencies to return
* callback `function` - Callback function which accepts `(err, responseData)`

#### void timeSeries(start, end, [qs], callback)

[Time-Series / Bulk Download](https://openexchangerates.org/documentation#time-series) call.

__Arguments__

* start `Date` - Start date
* end `Date` - End date
* qs `object` - Additional query string options
    * base `string` - Base currency code. `USD` by default
    * symbols|currencies `string `- Comma-separated list of currencies to return
    * prettyprint `number` - If you want pretty JSON, set it to `1`
* callback `function` - Callback function which accepts `(err, responseData)`

### RatesApiError

This Error class handles [error responses](https://openexchangerates.org/documentation#errors).

#### string errno

Equals to `errResponse.message`. Error code.

#### string status
#### string statusCode

Equals to `errResponse.status`. HTTP status code of call.

#### string message

Equals to `errResponse.description`.

Roadmap
-------

* Add tests
* Create high-level wrapper over query results

License
-------

The MIT License (MIT)

Copyright (c) 2014 Alexander Makarenko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
