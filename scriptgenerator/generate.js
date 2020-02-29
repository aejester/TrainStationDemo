const fs = require("fs");

const generate = (filename) => {

    let contents = fs.readFileSync("./input/"+filename, "utf-8").split("**\n");

    let boardArray = [];
    let longestInLine = "";

    for (let i = 0; i < contents.length; i++) {
        let lines = contents[i].split("\n");
        let board = [];
        let line = {};
        let lineNumber = 0;

        for (let x = 0; x < lines.length; x++) {

            if (lineNumber == 0) {
                line["number"] = lines[x];
            } else if (lineNumber == 1) {
                line["hour"] = lines[x];
            } else if (lineNumber == 2) {
                line["destination"] = lines[x];

                if (lines[x].length > longestInLine) {
                    longestInLine = lines[x].length;
                }
            } else if (lineNumber == 3) {
                line["track"] = lines[x];
            } else if (lineNumber == 4) {
                line["notes"] = {};

                line["notes"]["text"] = lines[x];
                if (lines[x].includes("part") || lines[x].includes("Emba")) {
                    line["notes"]["color"] = "green";
                } else if (lines[x].includes("Retard")) {
                    line["notes"]["color"] = "red";
                } else {
                    line["notes"]["color"] = "none";
                }
            }

            if (lineNumber == 4) {
                board.push(line);
                line = {};
                lineNumber = 0;
            } else {
                lineNumber++;
            }

        }
        board.push(longestInLine);
        console.log(board)
        boardArray.push(board);
        longestInLine = 0;

    }

    return boardArray;

}

let obj = {};

let departuresBoard = generate("script.txt");
let arrivingBoard = generate("script2.txt");

obj["departures"] = departuresBoard;
obj["arrivals"] = arrivingBoard;

fs.writeFileSync("./output/output.json", JSON.stringify(obj));