var lab1 = {};
lab1.exercise1 = (function () {
    var _maxTwo = function (num1, num2, num3) {

        var args = [].splice.call(arguments, 0);
        var i = args.length - 1;
        var maxValue = Math.max.apply(null, args);
        var maxValuesArray = [];

        while ((i >= 0) && (args.length > 1)) {
            if (args[i] === maxValue) {
                maxValuesArray.push(args[i]);
                args.splice(i, 1);
                maxValue = Math.max.apply(null, args);
                i = args.length - 1;
            }
            else {
                i--;
            }
        }

        var sum = 0;
        for (var j = 0; j < maxValuesArray.length; j++) {
            sum += Math.pow(maxValuesArray[j], 2);
        }
        return sum;
    };
    return {
        maxTwo: _maxTwo
    };
})();


window.onload = function () {
    alert(lab1.exercise1.maxTwo(2, 3, -5));
};


