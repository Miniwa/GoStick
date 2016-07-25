var MapPage = (function() {

    var _sessionKey = "";

    return {

        Initialize: function() {

            //Setup event handlers.
            $(document).keydown(this.OnKeyDown);

            var coord = new PB.Coordinate(60, 15);
            this.bot = new PB.Pokebot("pokebot-map", coord, 15);
            this.bot.setPosition(coord);

            //Initialize the persistence layer.
            DPL.setPostData({
                "csrfmiddlewaretoken": $("#csrf-token").val()
            });
            DPL.GenerateSession().done(MapPage.OnSessionGenerated);
        },

        OnSessionGenerated: function(response)
        {
            if(response.status === "OK")
            {
                _sessionKey = response.key;

                //Setup the persist routine.
                setInterval(MapPage.OnPersist, 1000);
            }
        },

        OnPersist: function()
        {
            DPL.SetUserPosition(_sessionKey,MapPage.bot.getPosition());
            DPL.GetUserPosition(_sessionKey).done(function(resp){ console.log(resp);});
        },

        OnKeyDown: function(e) {
            var velocity = new PB.Coordinate(0, 0);
            var pos = MapPage.bot.getPosition();
            var speed = 0.00006;

            if (e.key === "ArrowUp") {
                velocity.setLatitude(velocity.getLatitude() + 100);
            }

            if (e.key === "ArrowDown") {
                velocity.setLatitude(velocity.getLatitude() - 100);
            }

            if (e.key === "ArrowRight") {
                velocity.setLongitude(velocity.getLongitude() + 100);
            }

            if (e.key === "ArrowLeft") {
                velocity.setLongitude(velocity.getLongitude() - 100);
            }

            //Workaround to allow other keypresses.
            if(velocity.length() !== 0)
            {
                e.preventDefault();
                e.stopPropagation();
            }
            //Workaround to double the speed of movement across the longitude axis.
            var clamped = velocity.clamp(speed);
            clamped.setLongitude(clamped.getLongitude() * 2);

            MapPage.bot.setPosition(pos.add(clamped));
        },
    };
})();

MapPage.Initialize();
