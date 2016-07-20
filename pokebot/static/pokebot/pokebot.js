var PB = (function()
{
	//Public API
	return {
		
		//Point definition.
		Point: function(lat, lon)
		{
			//Calculate the distance between two points.
			this.Dist = function(rhv)
			{
				return Math.abs(rhv.getLatitude() - this.getLatitude()) +
							Math.abs(rhv.getLongitude() - this.getLongitude());
			},
			
			//Set the latitude.
			this.setLatitude = function(lat)
			{
				this._lat = lat;
			};
			
			//Get latitude.
			this.getLatitude = function()
			{
				return this._lat;
			};
			
			//Set longitude
			this.setLongitude = function(lon)
			{
				this._lon = lon
			};
			
			//Get longitude.
			this.getLongitude = function()
			{
				return this._lon;
			};
			
			//Construct the object.
			var localLat = lat || 0;
			var localLon = lon || 0;
			
			if(localLat > 90 || localLat < -90)
				throw new Error("Latitude not within boundaries.");
			
			if(localLon > 180 || localLon < -180)
				throw new Error("Longitude not within boundaries.");
			
			//Construct the object.
			this.setLatitude(localLat);
			this.setLongitude(localLon);
		},
	}
})();
