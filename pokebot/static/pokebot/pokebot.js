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
        Pokebot: function(selector, coord) {
            coord = coord || new Coordinate(0, 0);

            this._markers = [];
            this._target = null;
            this._position = null;

            this._map = new google.maps.Map(document.getElementById(selector), {
                center: {
                    lat: coord.getLatitude(),
                    lng: coord.getLongitude(),
                },
                zoom: 10
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
PB.Coordinate.prototype.Dist = function(rhv) {
    return Math.abs(rhv.getLatitude() - this.getLatitude()) +
        Math.abs(rhv.getLongitude() - this.getLongitude());
};

//Returns the length of the coordinate (distance from origin)
PB.Coordinate.prototype.Length = function() {
    return this.Dist(new Coordinate(0, 0));
};

//Returns a new Coordinate clamped to the specified threshold
PB.Coordinate.prototype.Clamp = function(threshold) {
    var dividant = this.Length() / threshold;
    return new Coordinate(this.getLatitude() / dividant,
        this.getLongitude() / dividant);
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
PB.Pokebot.prototype.drawMarker = function(coord, title) {
    title = title || "";
    this._markers.push(new google.maps.Marker({
        map: this._map,
        position: {
            lng: coord.getLongitude(),
            lat: coord.getLatitude(),
        },
        title: title,
    }));
};

//Sets the active target.
PB.Pokebot.prototype.setTarget = function(coord) {
    this._target = coord;
    this.drawMarker(coord, "Target");
};

PB.Pokebot.prototype.getTarget = function() {
    return this._target;
};

PB.Pokebot.prototype.setPosition = function(coord) {
    this._position = coord;
    this.drawMarker(coord, "Position");
};

PB.Pokebot.prototype.setCamera = function(coord) {
    this._map.setPosition({
        lat: coord.getLatitude(),
        lng: coord.getLongitude(),
    });
};

PB.Pokebot.prototype.getCamera = function() {
    var pos = this._map.getPosition();
    return new PB.Coordinate(pos.lat(), pos.lng());
};
