var CommonList = (function () {
    var Trades = null;

    var getTrades = function () {
        if (Trades) {
            console.log("Trades saved");
            return Trades;
        } else {
            console.log("Trades Not saved");
            const TradeSession = localStorage.getItem("tradesList");

            if (TradeSession)
                var TradeSessionParsed = JSON.parse(TradeSession);
            if (TradeSessionParsed) {
                setTrade(JSON.stringify(TradeSessionParsed));
                return TradeSessionParsed;
            }
        }
    }

    var setTrade = function (Trade) {
        try {
            
            localStorage.setItem("tradesList", Trade)
            Trades = JSON.parse(Trade);

        } catch (e) {
            console.log(e);
            return false;
        }
    }

    return {
        setTrade: setTrade,
        getTrades: getTrades
    }

})();


export default CommonList