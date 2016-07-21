var DPL = (function()
{
	var _apiURL = "";

	return {

		//Config stuff.
		//Function to set the API url.
		setAPIUrl: function(url)
		{
			_apiURL = url;
		},

		//Persistence API
		//TODO: Make persistence API implementations.
		GetUserPosition: function()
		{
			throw new Error("Not implemented.");
		},

		SetUserPosition: function(point)
		{
			throw new Error("Not implemented.");
		},
	};
})();
