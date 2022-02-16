// import UserProfile from "./UserProfile";


var Trades = null
// const session = UserProfile.getSession();

const Localization = {
    get locale(){
        /* if(session && session.CountryCode){
            return userSession.authUser.claims.locale;
        }else{
            return 'en-IN';
        } */

        return 'en-IN';
    }
}


function setTrade (Trade) {
    try {
        localStorage.setItem("tradesList", Trade)
        Trades = JSON.parse(Trade);
    } catch (e) {
        console.log(e);
        return false;
    }
}

function getTrades () {
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

function getMoneyNumericFormat (amount, currency) {
    if (currency) {
        if (typeof currency === 'string') {
            return Intl.NumberFormat(Localization.locale,{ style: 'currency', currency: currency}).format(amount).replace(".00","");
        } else {
            return Intl.NumberFormat(Localization.locale, { style: 'currency', currency: 'INR'}).format(amount).replace(".00","");
        }
    } else {
        return Intl.NumberFormat(Localization.locale).format(amount).replace(".00","");
    }
}





/* var CommonList = (function () {
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

})(); */


// export default CommonList
export {
    setTrade, getTrades, getMoneyNumericFormat
}