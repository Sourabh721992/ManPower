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
        if(window.location.href.indexOf("localhost") > -1) {
            console.log(message, args);
        }
    },
    error: (message, ...args) => {
        if(window.location.href.indexOf("localhost") > -1) {
            console.error(message, args);
        }
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

function setItemToLocalStorage(key, value){
    if (localStorage.getItem(key) !== null) {
        removeItemFromLocalStorage(key)
    }
    value = encodeBase64(value)
    localStorage.setItem(key, value)
}

function getItemFromLocalStorage(key){
    var data
    var value = localStorage.getItem(key)
    if(value){
        data = JSON.parse(decodeBase64(value)) 
    }

    return data
}

function removeItemFromLocalStorage(key){
    localStorage.removeItem(key)
}

// if 09:30 -> return 0930
function setIntTime(time){
    var result = 0
    if(time){
        result = time.replace(":", "")
    }
    return Number(result, )
}

// if 0930 -> return "09:30"
function getStringTime(time){
    var result = ""
    result = time.toString()
    if(time && result.length > 0){
        let position = result.length === 4 ? 2 : 1
        
        result = [result.slice(0, position), ":", result.slice(position)].join('')
        // result = result.substring(0, 2) + ":" + result.substring(2);
    }
    return result
}

function getSexLabel(sex){
    if(sex){
        if(sex === "M"){
            return "Male"
        }
        else if(sex === "F"){
            return "Female"
        }
        else if(sex === "O"){
            return "Other"
        }
    }
    return ""
}

export {
    setTrade, getTrades, getMoneyFormat, logger, formatShortDate, filterDropdown, decodeBase64, encodeBase64, trimCutString,
    setItemToLocalStorage, getItemFromLocalStorage, removeItemFromLocalStorage, setIntTime, getStringTime, getSexLabel
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
