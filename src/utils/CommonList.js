// import UserProfile from "./UserProfile";
import { Base64 } from 'js-base64'

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

const logger = {
    log: (message, ...args) => {
        console.log(message, args);
    },
    error: (message, ...args) => {
        console.error(message, args);
    }
}

function formatShortDate(date) {
    var dt = null;
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    if (date) {
        dt = new Date(date).toLocaleDateString(Localization.locale, options);
    }

    return dt
}


function setTrade (Trade) {
    try {
        localStorage.setItem("tradesList", Trade)
        Trades = JSON.parse(Trade);
    } catch (e) {
        // console.log(e);
        return false;
    }
}

function getTrades () {
    if (Trades) {
        // console.log("Trades saved");
        return Trades;
    } else {
        // console.log("Trades Not saved");
        const TradeSession = localStorage.getItem("tradesList");

        if (TradeSession)
            var TradeSessionParsed = JSON.parse(TradeSession);
        if (TradeSessionParsed) {
            setTrade(JSON.stringify(TradeSessionParsed));
            return TradeSessionParsed;
        }
    }
}

function getMoneyFormat (amount, currency) {
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

function filterDropdown(list, input) {
    if (input) {
        var filtered = list.filter(data => data.value === input)
        if (filtered && filtered.length > 0) {
            return filtered[0]
        }
        filtered = list.filter(data => data.value === 0)
        if (filtered && filtered.length > 0) {
            return filtered[0]
        }
    } else {
        const filtered = list.filter(data => data.value === 0)
        if (filtered && filtered.length > 0) {
            return filtered[0]
        }
    }
}

function decodeBase64(b64){
    if(b64){
        var str = Base64.decode(b64);
        return str;
    }else{
        return ""
    }
}

function encodeBase64(data){
    if(typeof(data) != 'string'){
        data = JSON.stringify(data);
    }

    var b64 = Base64.encode(data);
    return b64;
}

function trimCutString(string, length){
    if(string && string.length >= length ){
        string = string.substring(0, length) + "...";
    }
    return string
}

export {
    setTrade, getTrades, getMoneyFormat, logger, formatShortDate, filterDropdown, decodeBase64, encodeBase64, trimCutString
}



/* var CommonList = (function () {
    var Trades = null;

    var getTrades = function () {
        if (Trades) {
            // console.log("Trades saved");
            return Trades;
        } else {
            // console.log("Trades Not saved");
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
            // console.log(e);
            return false;
        }
    }

    return {
        setTrade: setTrade,
        getTrades: getTrades
    }

})(); */


// export default CommonList
