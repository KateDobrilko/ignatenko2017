var lab1 = {};
lab1.MaxValueFinder = (function () {
    return {
        findMaxValueInArray: function (array) {
            return Math.max.apply(null, array);
        }
    }
})();
lab1.exercise3 = (function (findMaxValueInArray) {
    //private method
    var removeElementFromArray = function (array, position) {
        array.splice(position, 1);
        return array;
    };
    var _maxTwo = function (num1, num2, num3) {
        var args = [].splice.call(arguments, 0);
        var i = args.length - 1;
        var maxValue = findMaxValueInArray(args);
        var maxValuesArray = [];

        while ((i >= 0) && (args.length > 1)) {
            if (args[i] === maxValue) {
                maxValuesArray.push(args[i]);
                args = removeElementFromArray(args, i);
                maxValue = findMaxValueInArray(args);
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
        //public methods
        maxTwo: _maxTwo
    };
})(lab1.MaxValueFinder.findMaxValueInArray);


window.onload = function () {
    alert(lab1.exercise3.maxTwo(2, 3, -5));
    alert(lab1.exercise3.findMaxValueInArray);
};


