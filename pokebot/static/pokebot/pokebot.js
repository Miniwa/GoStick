var PB = (function() {

    //Public API
    return {
        //Coordinate declaration.
        Coordinate: function(lat, lng) {
            var localLat = lat || 0;
            var localLng = lng || 0;

            if (localLat > this.LAT_MAX || localLat < this.LAT_MIN)
                throw new Error("Latitude not within boundaries.");

            if (localLng > this.LNG_MAX || localLng < this.LNG_MIN)
                throw new Error("Longitude not within boundaries.");

            //Construct the object.
            this.setLatitude(localLat);
            this.setLongitude(localLng);
        },

        //Pokebot declaration.
        //Initializes the pokebot with the camera pointed at the coordinates specified by coord.
        Pokebot: function(selector, coord, zoom) {
            coord = coord || new Coordinate(0, 0);
            zoom = zoom || 10;

            this._markers = {};
            this._target = null;
            this._position = null;

            this._map = new google.maps.Map(document.getElementById(selector), {
                center: {
                    lat: coord.getLatitude(),
                    lng: coord.getLongitude(),
                },
                zoom: zoom
            });
        },
    };
})();

//Coordinate definitions.
PB.Coordinate.prototype.LAT_MAX = 90;
PB.Coordinate.prototype.LAT_MIN = -90;
PB.Coordinate.prototype.LNG_MAX = 180;
PB.Coordinate.prototype.LNG_MIN = -180;

//Returns the distance between two coordinates.
PB.Coordinate.prototype.dist = function(rhv) {
    return Math.abs(this.getLatitude() - rhv.getLatitude()) +
        Math.abs(this.getLongitude() - rhv.getLongitude());
};

//Returns the sum of two coordinates.
PB.Coordinate.prototype.add = function(rhv)
{
        return new PB.Coordinate(this.getLatitude() + rhv.getLatitude(),
            this.getLongitude() + rhv.getLongitude());
};

//Returns the length of the coordinate (distance from origin)
PB.Coordinate.prototype.length = function() {
    return this.dist(new PB.Coordinate(0, 0));
};

//Returns a new Coordinate clamped to the specified threshold
PB.Coordinate.prototype.clamp = function(threshold) {
    var dividant = this.length() / threshold;

    return new PB.Coordinate(this.getLatitude() / dividant,
        this.getLongitude() / dividant);
};

//Returns a literal object representation of the coordinate.
PB.Coordinate.prototype.toLatLng = function() {
    return {
        lat: this.getLatitude(),
        lng: this.getLongitude()
    };
};

//Set latitude.
PB.Coordinate.prototype.setLatitude = function(lat) {
    this._lat = lat;
};

//Get latitude.
PB.Coordinate.prototype.getLatitude = function() {
    return this._lat;
};

//Set longitude
PB.Coordinate.prototype.setLongitude = function(lng) {
    this._lng = lng;
};

//Get longitude.
PB.Coordinate.prototype.getLongitude = function() {
    return this._lng;
};


//Pokebot definitions.
//Draws a marker at the specified coordinates with the specified title/identifier.
PB.Pokebot.prototype.drawMarker = function(coord, id, title) {
    title = title || "";

    //If a marker already exists, only update the position instead of creating a whole new marker.
    if (id in this._markers) {
        this._markers[id].setPosition(coord.toLatLng());
    } else {
        this._markers[id] = new google.maps.Marker({
            map: this._map,
            position: coord.toLatLng(),
            title: title,
        });
    }
};

//Sets the active target.
PB.Pokebot.prototype.setTarget = function(coord) {
    this._target = coord;
    this.drawMarker(coord, "Target");
};

//Gets the active target.
PB.Pokebot.prototype.getTarget = function() {
    return this._target;
};

//Sets the current position.
PB.Pokebot.prototype.setPosition = function(coord) {
    this._position = coord;
    this.drawMarker(coord, "Position");
};

// Gets the current position.
PB.Pokebot.prototype.getPosition = function()
{
    return this._position;
};

// Set the camera location.
PB.Pokebot.prototype.setCamera = function(coord) {
    this._map.setCenter(coord.toLatLng());
};

// Get the camera location.
PB.Pokebot.prototype.getCamera = function() {
    var pos = this._map.getCenter();
    return new PB.Coordinate(pos.lat(), pos.lng());
};
