var MapPage = (function() {
    return {

        Initialize: function() {
            var coord = new PB.Coordinate(60, 15);
            var bot = new PB.Pokebot("pokebot-map", coord);
            bot.setTarget(coord);
            bot.setPosition(new PB.Coordinate(60, 14));
        },
    };
})();

MapPage.Initialize();
