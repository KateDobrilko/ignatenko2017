var lab1 = {};
lab1.exercise5 = (function () {
    var _curry = function (func) {
        var currArguments = arguments;
        if ((currArguments.length - 1) <= func.length) {
            for (var j = 1; j < currArguments.length; j++) {
                func = func.bind(null, currArguments[j]);
            }
        }
        return func;
    };

    return {
        curry: _curry
    };
})();


window.onload = function () {
    var inc = lab1.exercise5.curry(function add(a, b, c) {
        return a + b + c;
    }, 1, 2);

    alert(inc(6));
};


