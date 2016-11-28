var lab1 = {};

lab1.exercise2 = (function () {
    var sum = function () {
        return [].splice.call(arguments, 0).reduce(function (a, b) {
            return a + b;
        });
    };
    return {
        sum: sum
    };
})();


window.onload = function () {
    alert(lab1.exercise2.sum(1, 2, 3, 4));
};


