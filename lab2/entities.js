lab2.entities = (function (constants) {
    var CubeFace = function (color, id) {
        this.arrayOfCells = [];
        this.id = id;
        for (var i = 0; i < 3; i++) {
            var newRow = [];
            for (var j = 0; j < 3; j++) {
                newRow.push(color);
            }
            this.arrayOfCells.push(newRow);
        }
    };

    CubeFace.prototype.getArrayOfCells = function () {
        return this.arrayOfCells;
    };
    CubeFace.prototype.getId = function () {
        return this.id;
    };


    var Cube = function (colors) {
        this.cubeFaces = [];
        this.currentFaceNumber = 0;
        //0 - front, 1 - bottom, 2 - back, 3 - top, 4 - left, 5 - right
        this.commonPositionsArray = [0, 1, 2, 3, 4, 5, 6];
        //0 - front, 1 - top, 2 - back, 3 - bottom
        this.verticalPositionsArray = [0, 3, 2, 1];
        //0 - front, 1 - right, 2 - back, 3 - left
        this.horizontalPositionsArray = [0, 5, 2, 4];
        if (colors && (colors.length === 6)) {
            for (var i = 0; i < 6; i++) {
                this.cubeFaces.push(new CubeFace(colors[i], i));
            }
        }
        this.renderCurrentFace();
    };

    Cube.prototype.rotateLeft = function () {
        this.horizontalPositionsArray = [
            this.commonPositionsArray[0],
            this.commonPositionsArray[5],
            this.commonPositionsArray[2],
            this.commonPositionsArray[4]
        ];
        this.horizontalPositionsArray = [
            this.horizontalPositionsArray[1],
            this.horizontalPositionsArray[2],
            this.horizontalPositionsArray[3],
            this.horizontalPositionsArray[0]];


        this.commonPositionsArray = [
            this.horizontalPositionsArray[0],
            this.commonPositionsArray[1],
            this.horizontalPositionsArray[2],
            this.commonPositionsArray[3],
            this.horizontalPositionsArray[3],
            this.horizontalPositionsArray[1]
        ];

        this.renderCurrentFace();
    };
    Cube.prototype.rotateRight = function () {
        this.horizontalPositionsArray = [
            this.commonPositionsArray[0],
            this.commonPositionsArray[5],
            this.commonPositionsArray[2],
            this.commonPositionsArray[4]
        ];

        this.horizontalPositionsArray = [
            this.horizontalPositionsArray[3],
            this.horizontalPositionsArray[0],
            this.horizontalPositionsArray[1],
            this.horizontalPositionsArray[2]];


        this.commonPositionsArray = [
            this.horizontalPositionsArray[0],
            this.commonPositionsArray[1],
            this.horizontalPositionsArray[2],
            this.commonPositionsArray[3],
            this.horizontalPositionsArray[3],
            this.horizontalPositionsArray[1]
        ];

        this.renderCurrentFace();
    };
    Cube.prototype.rotateDown = function () {
        this.verticalPositionsArray = [
            this.commonPositionsArray[0],
            this.commonPositionsArray[3],
            this.commonPositionsArray[2],
            this.commonPositionsArray[1]
        ];

        this.verticalPositionsArray = [
            this.verticalPositionsArray[1],
            this.verticalPositionsArray[2],
            this.verticalPositionsArray[3],
            this.verticalPositionsArray[0]];


        this.commonPositionsArray = [
            this.verticalPositionsArray[0],
            this.verticalPositionsArray[3],
            this.verticalPositionsArray[2],
            this.verticalPositionsArray[1],
            this.commonPositionsArray[4],
            this.commonPositionsArray[5]
        ];
        this.renderCurrentFace();
    };
    Cube.prototype.rotateUp = function () {
        this.verticalPositionsArray = [
            this.commonPositionsArray[0],
            this.commonPositionsArray[3],
            this.commonPositionsArray[2],
            this.commonPositionsArray[1]
        ];
        this.verticalPositionsArray = [
            this.verticalPositionsArray[3],
            this.verticalPositionsArray[0],
            this.verticalPositionsArray[1],
            this.verticalPositionsArray[2]];

        this.commonPositionsArray = [
            this.verticalPositionsArray[0],
            this.verticalPositionsArray[3],
            this.verticalPositionsArray[2],
            this.verticalPositionsArray[1],
            this.commonPositionsArray[4],
            this.commonPositionsArray[5]
        ];
        this.renderCurrentFace();
    };

    Cube.prototype.getCubeFaces = function () {
        return this.cubeFaces;
    };
    //true - up, false - down
    Cube.prototype.rotateColumn = function (numberOfColumn, verticalDirection) {

        var frontFaceColumn = [
            this.cubeFaces[0].getArrayOfCells()[0][numberOfColumn - 1],
            this.cubeFaces[0].getArrayOfCells()[1][numberOfColumn - 1],
            this.cubeFaces[0].getArrayOfCells()[2][numberOfColumn - 1]
        ];
        var topFaceColumn = [
            this.cubeFaces[3].getArrayOfCells()[0][numberOfColumn - 1],
            this.cubeFaces[3].getArrayOfCells()[1][numberOfColumn - 1],
            this.cubeFaces[3].getArrayOfCells()[2][numberOfColumn - 1]
        ];
        var backFaceColumn = [
            this.cubeFaces[2].getArrayOfCells()[0][numberOfColumn - 1],
            this.cubeFaces[2].getArrayOfCells()[1][numberOfColumn - 1],
            this.cubeFaces[2].getArrayOfCells()[2][numberOfColumn - 1]
        ];
        var bottomFaceColumn = [
            this.cubeFaces[1].getArrayOfCells()[0][numberOfColumn - 1],
            this.cubeFaces[1].getArrayOfCells()[1][numberOfColumn - 1],
            this.cubeFaces[1].getArrayOfCells()[2][numberOfColumn - 1]
        ];
        if (verticalDirection) {
            this.cubeFaces[0] = replaceColumnOnFace(this.cubeFaces[0], numberOfColumn, bottomFaceColumn);
            this.cubeFaces[3] = replaceColumnOnFace(this.cubeFaces[3], numberOfColumn, frontFaceColumn);
            this.cubeFaces[2] = replaceColumnOnFace(this.cubeFaces[2], numberOfColumn, topFaceColumn);
            this.cubeFaces[1] = replaceColumnOnFace(this.cubeFaces[1], numberOfColumn, backFaceColumn);

        }
        else {
            this.cubeFaces[0] = replaceColumnOnFace(this.cubeFaces[0], numberOfColumn, topFaceColumn);
            this.cubeFaces[3] = replaceColumnOnFace(this.cubeFaces[3], numberOfColumn, backFaceColumn);
            this.cubeFaces[2] = replaceColumnOnFace(this.cubeFaces[2], numberOfColumn, bottomFaceColumn);
            this.cubeFaces[1] = replaceColumnOnFace(this.cubeFaces[1], numberOfColumn, frontFaceColumn);
        }
        this.renderCurrentFace();
    };
    //true - right, false - left
    Cube.prototype.rotateRow = function (numberOfRow, horizontalDirection) {
        var frontFaceRow = [
            this.cubeFaces[0].getArrayOfCells()[numberOfRow - 1][0],
            this.cubeFaces[0].getArrayOfCells()[numberOfRow - 1][1],
            this.cubeFaces[0].getArrayOfCells()[numberOfRow - 1][2]
        ];
        var rightFaceRow = [
            this.cubeFaces[5].getArrayOfCells()[numberOfRow - 1][0],
            this.cubeFaces[5].getArrayOfCells()[numberOfRow - 1][1],
            this.cubeFaces[5].getArrayOfCells()[numberOfRow - 1][2]
        ];
        var backFaceRow = [
            this.cubeFaces[2].getArrayOfCells()[numberOfRow - 1][0],
            this.cubeFaces[2].getArrayOfCells()[numberOfRow - 1][1],
            this.cubeFaces[2].getArrayOfCells()[numberOfRow - 1][2]
        ];
        var leftFaceRow = [
            this.cubeFaces[4].getArrayOfCells()[numberOfRow - 1][0],
            this.cubeFaces[4].getArrayOfCells()[numberOfRow - 1][1],
            this.cubeFaces[4].getArrayOfCells()[numberOfRow - 1][2]
        ];
        if (horizontalDirection) {
            this.cubeFaces[0].getArrayOfCells()[numberOfRow - 1] = leftFaceRow;
            this.cubeFaces[5].getArrayOfCells()[numberOfRow - 1] = frontFaceRow;
            this.cubeFaces[4].getArrayOfCells()[numberOfRow - 1] = backFaceRow;
            this.cubeFaces[2].getArrayOfCells()[numberOfRow - 1] = rightFaceRow;
        }
        else {
            this.cubeFaces[0].getArrayOfCells()[numberOfRow - 1] = rightFaceRow;
            this.cubeFaces[5].getArrayOfCells()[numberOfRow - 1] = backFaceRow;
            this.cubeFaces[4].getArrayOfCells()[numberOfRow - 1] = frontFaceRow;
            this.cubeFaces[2].getArrayOfCells()[numberOfRow - 1] = leftFaceRow;

        }
        this.renderCurrentFace();
    };


    Cube.prototype.renderCurrentFace = function () {
        var cellsArray = this.cubeFaces[this.commonPositionsArray[0]].getArrayOfCells();
        _renderCurrentFace(cellsArray);
    };


    var replaceColumnOnFace = function (face, columnNumber, newColumn) {
        for (var i = 0; i < 3; i++) {
            face.getArrayOfCells()[i][columnNumber - 1] = newColumn[i];
        }
        return face;
    };

    var findElementInArrayByValue = function (value, array) {
        var elementNumber = null;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) {
                elementNumber = i;
                break;
            }
        }
        return elementNumber;
    };

    var _renderCurrentFace = function (cellsArray) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var row = i + 1;
                var column = j + 1;
                document.getElementById("cell" + row + column).style.background = cellsArray[i][j];
            }
        }
    };

    return {
        Cube: Cube
    };
})(lab2.constants);



