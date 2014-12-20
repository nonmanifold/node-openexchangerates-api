var nock = require('nock');
var RatesApi = require("./index");

describe("RatesApi", function () {
    var client;
    nock.recorder.rec();
    function createClient() {
        return new RatesApi({
            apiBase: 'openexchangerates.org/api',
            appId: 'APP_ID'
        });
    }

    beforeEach(function () {
        nock.disableNetConnect();

        client = createClient();
    });
    it("should expose RatesApi(options)", function () {
        expect(function () {
            createClient();
        }).not.toThrow();
    });

    it('should query for currencies', function () {
        var currencies;

        var api = nock('https://openexchangerates.org/api//')
            .log(console.log)
            .get('currencies.json')
            .replyWithFile(200, __dirname + '/../test_data/currencies.json');

        client.currencies(function handleCurrencies(err, data) {
            currencies = data;
        });

        expect(api.done()).toBeTruthy();
        expect(currencies.USD).toEqual('United States Dollar');
    });
    it('should query for latest EUR rate', function () {
        var latestRate;
        var api = nock('https://openexchangerates.org/api//')
            .get('latest.json?app_id=APP_ID')
            .replyWithFile(200, __dirname + '/../test_data/latest.json');
        expect(function () {
            client.latest({base: 'EUR'}, function handleLatest(err, data) {
                latestRate = data;
            });
        }).not.toThrow();
    });

    it('should query for historical USD,EUR,RUB rate for 21 jan 2014', function () {
        var historical;
        var api = nock('https://openexchangerates.org/api//')
            .get('historical/YYYY-MM-DD.json?app_id=APP_ID')
            .replyWithFile(200, __dirname + '/../test_data/historical-2014-01-21.json');
        expect(function () {
            client.historical(new Date(2014, 1, 21), function handleHistorical(err, data) {
                historical = data;
            });
        }).not.toThrow();
    });
    it('should query for historical USD,AUD,CAD rate series', function () {
        var start = new Date(2012, 1, 1);
        var end = new Date(2012, 1, 2);
        var options = {symbols: 'USD,AUD,CAD'};
        var series;
        var api = nock('https://openexchangerates.org/api//')
            .get('time-series.json?app_id=APP_ID&start=2012-01-01&end=2012-01-02&symbols=USD,AUD,CAD')
            .replyWithFile(200, __dirname + '/../test_data/time-series.json');
        expect(function () {
            client.timeSeries(start, end, options, function handleTimeSeries(err, data) {
                series = data;
            });
        }).not.toThrow();
    });
    it('should convert EUR to USD', function () {
        var converted;
        var api = nock('https://openexchangerates.org/api//');
        expect(function () {
            client.convert(100, 'EUR', 'USD', function handleResult(err, data) {
                converted = data;
            });
        }).not.toThrow();
    });
});