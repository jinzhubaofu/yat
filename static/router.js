var router = (function () {

    var routes = [];

    function onHashChange() {
        var hash = window.location.hash.slice(1);

        for (var i = 0, len = routes.length; i < len; ++i) {
            var route = routes[i];
            var args = hash.split('/');
            var pattern = route.pattern;
            var action = route.action;
            var type = typeof pattern;

            if (type === 'function' && pattern(hash)) {
                action.apply(null, args);
            }
            else if (type === 'string' && pattern === hash) {
                action.apply(null, args);
            }
            else if (pattern instanceof RegExp && pattern.test(hash)) {
                action.apply(null, args);
            }
        }
    }

    return {

        start: function () {
            window.onhashchange = onHashChange;
        },

        addRule: function (pattern, action) {
            routes.push({
                pattern: pattern,
                action: action
            });
        }
    };

})();
