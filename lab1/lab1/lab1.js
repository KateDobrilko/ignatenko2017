var lab1 = {};

lab1.PromiseMaker = (function () {
    var whenHandlersList = [];
    var failHandlersList = [];

    var _when = function (func) {
        whenHandlersList.push(func);
    };
    var _fail = function (func) {
        failHandlersList.push(func);
    };
    var _fulfill = function (value) {
        for (var i = 0; i < whenHandlersList.length; i++) {
            whenHandlersList[i](value);
        }
    };
    var _smash = function (string) {
        for (var i = 0; i < failHandlersList.length; i++) {
            failHandlersList[i](string);
        }
    };

    return {
        when: _when,
        fail: _fail,
        fulfill: _fulfill,
        smash: _smash
    };
})();


window.onload = function () {

    //Client calls
    lab1.PromiseMaker.when(function (object) {
        console.log("Hello " + object.id);
    });

    lab1.PromiseMaker.when(function (object) {
        console.log("Hi " + object.id);
    });

    lab1.PromiseMaker.fail(function (errorCode) {
        console.error(errorCode);
    });
    lab1.PromiseMaker.fail(function (errorCode) {
        console.error(errorCode + ' Input object is incorrect.');
    });

    //Maker calls
    var obj = {
        id: "Vasya"
    };

    if (obj) {
        lab1.PromiseMaker.fulfill(obj);

    } else {
        lab1.PromiseMaker.smash("Something has gone wrong.");
    }
};


