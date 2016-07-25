var DPL = (function() {
    var _apiURL = "";
    var _additionalData = {};

    return {

        //Config stuff.
        //Function to set the API url.
        setAPIUrl: function(url) {
            _apiURL = url;
        },

        //A javascript object that will always be included when making post requests.
        setPostData: function(data)
        {
            _additionalData = data;
        },

        onErr: function(a, b, c)
        {
            console.log(a, b, c);
        },

        //Persistence API
        //Generate a session.
        GenerateSession: function() {
            return jQuery.ajax({
                url: _apiURL + "session/generate/",
                type: "GET",
                error: DPL.onErr,
            });
        },

        GetUserPosition: function(key) {
            var url = _apiURL + "session/" + key + "/position/";
            return jQuery.ajax({
                url: url,
                type: "GET",
                error: DPL.onErr,
            });
        },

        SetUserPosition: function(key, coord) {
            var url = _apiURL + "session/" + key + "/position/set/";
            var data = {};
            jQuery.extend(data, _additionalData,  {
                "latitude": coord.getLatitude(),
                "longitude": coord.getLongitude()
            });

            return jQuery.ajax({
                url: url,
                type: "POST",
                data: data,
                error: DPL.onErr,
            });
        },
    };
})();
