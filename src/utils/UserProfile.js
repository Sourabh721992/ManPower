var UserProfile = (function () {
    var Name = "";
    var email = "";
    var UserId = 0;
    var Role = "";
    var CountryCode = 91;
    var statusCounter = {};
    var reqDetails = [];
    var sessionVar;
    var loggedIn = false;

    var getSession = function () {
        if (sessionVar) {
            // console.log("already saved");
            return sessionVar;
        } else {
            // console.log("Not Already saved");
            const storedSession = localStorage.getItem("vmensession");

            if (storedSession)
                var storedSessionParsed = JSON.parse(storedSession);
            if (storedSessionParsed) {
                setSession(JSON.stringify(storedSessionParsed));
                return storedSessionParsed;
            }
        }
    }

    var setSession = function (session, initialLogin = false) {
        try {
            session = JSON.parse(session);
            Name = session.FirstName + " " + session.LastName;
            email = session.Email;
            UserId = session.UserId;
            Role = session.Role;
            CountryCode = session.CountryCode;
            statusCounter = session.statusCounter;
            reqDetails = session.reqDetails;
            loggedIn = true;
            sessionVar = JSON.parse(JSON.stringify(session));

            localStorage.setItem("vmensession", JSON.stringify(session))

        } catch (e) {
            // console.log(e);
            return false;
        }
    }

    var isLoggedOn = function () {
        var storedSession = localStorage.getItem("vmensession");

        var isLoggedOn = false
        if (storedSession) {
            isLoggedOn = true
        }
        // console.log(isLoggedOn);
        return isLoggedOn
    }

    var logout = function () {
        Name = "";
        email = "";
        UserId = 0;
        Role = "";
        CountryCode = 91;
        statusCounter = {};
        reqDetails = [];
        sessionVar = null;
        loggedIn = false;
        localStorage.clear();
    }

    return {
        setSession: setSession,
        getSession: getSession,
        logout: logout,
        isLoggedOn: isLoggedOn
    }

})();


export default UserProfile