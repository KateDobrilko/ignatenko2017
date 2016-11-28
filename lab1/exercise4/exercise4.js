var lab1 = {};
lab1.exercise4 = (function () {
    var Parent = function (id) {
        this.id = id;
    };

    Parent.prototype.toString = function () {

        return "id:" + this.id;
    };

    function Child(id) {
        this.id = id;

    }
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.Child = Parent;

    Child.prototype.test = function (id) {
        return this.id == id;
    };

    return {
        Parent: Parent,
        Child: Child
    };
})();


window.onload = function () {
    var ch = new lab1.exercise4.Child(12);

    console.log(ch.toString());

    console.log(ch.test(10));

    console.log(ch.test(12));
};


