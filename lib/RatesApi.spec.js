var RatesApi = require("./index");
describe("RatesApi", function () {
    var client;

    function createClient() {
        return new RatesApi({
            appId: 'YOUR_APP_ID'
        });
    }

    beforeEach(function () {
        client = createClient();
    });
    it("should expose RatesApi(options)", function () {

        expect(function () {
            createClient();
        }).not.toThrow();
    });

    it('should query for currencies', function () {
        var currencies;
        expect(function () {
            client.currencies(function handleCurrencies(err, data) {
                currencies = data;
            });
        }).not.toThrow();
    });
    it('should query for latest EUR rate', function () {
        var latestRate;

        client.latest({base: 'EUR'}, function handleLatest(err, data) {
            latestRate = data;
        });

    });

    it('should query for historical USD,EUR,RUB rate', function () {
        var historical;
        client.historical(new Date(2014, 1, 1), function handleHistorical(err, data) {
            historical = data;
        });
    });
    it('should query for historical USD,EUR,RUB rate series', function () {
        var start = new Date(2014, 11, 1);
        var end = new Date(2014, 11, 10);
        var options = {symbols: 'USD,EUR,RUB'};
        var series;
        client.timeSeries(start, end, options, function handleTimeSeries(err, data) {
            series = data;
        });
    });
    it('should convert EUR to USD', function () {
        var converted;
        client.convert(100, 'EUR', 'USD', function handleResult(err, data) {
            converted = data;
        });
    });
});