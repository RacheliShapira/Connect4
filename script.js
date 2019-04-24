(function() {
    var palyer1Name = "Player #1";
    var palyer2Name = "Player #2";

    //Get players name:
    $("#name1").on("click", function() {
        $("#name1").val("");
    });
    $("#name1").on("input", function() {
        palyer1Name = $("#name1").val();
        //console.log("palyer1Name ", palyer1Name);
    });
    $("#name2").on("click", function() {
        $("#name2").val("");
    });
    $("#name2").on("input", function() {
        palyer2Name = $("#name2").val();
        //console.log("palyer2Name ", palyer2Name);
    });

    //loading play screen:
    $("#enter").on("click", function() {
        $("#enterScreen").css({
            opacity: "0",
            transition: "opacity 2s linear"
        });

        $("#playScreen").css({
            opacity: "1",
            transition: "opacity 1s linear"
        });
        $("#enterScreen").css("display", "none");
        player1.html(palyer1Name);
        player2.html(palyer2Name);
    });

    /////////////////////////////////////////////////////////////////main game////////////////////////////////
    var currentPlayer = "player1";
    var currentPlayerColor = "solid #c92323";
    var player1 = $("#playerOne");
    var player2 = $("#playerTwo");
    var victor = "";
    var stopDue2Victory = 0;
    var diags = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 32, 37],
        [23, 28, 33, 38]
    ];
    //Set player 1 as first to play
    player1.css("transform", "scale(2)");
    player2.css("transform", "scale(1)");
    //
    $(".column").on("mouseover", function(e) {
        if (stopDue2Victory == 0) {
            $(e.currentTarget).css("border", currentPlayerColor);
        }
    });

    //mouse out reset board orig color
    $(".column").on("mouseout", function(e) {
        $(e.currentTarget).css("border", "solid #c1701a");
    });

    //The game:
    $(".column").on("click", function(e) {
        var slotsInCol = $(e.currentTarget).find(".slot");
        //Allows cliks only on not full colum and when game han't won yet
        if (
            slotsInCol.eq(0).hasClass("player1") ||
            slotsInCol.eq(0).hasClass("player2") ||
            stopDue2Victory == 1
        ) {
            console.log("no more");
        } else {
            //add coins to board
            for (var i = 5; i >= 0; i--) {
                if (
                    !slotsInCol.eq(i).hasClass("player1") &&
                    !slotsInCol.eq(i).hasClass("player2")
                ) {
                    slotsInCol.eq(i).addClass(currentPlayer);
                    break;
                } //x if
            } //x for loop

            //check for victory:
            var row = $(".row" + i); // verticalVictoryCheck(slotsInCol, row)
            victor = victoryCheck(slotsInCol, row);
            if (victor == "player1") {
                $("#winner")
                    .css({
                        background: "#c92323",
                        opacity: "1",
                        transition: "opacity 2s linear"
                    })
                    .html("The winner is: <br>" + palyer1Name);
            } else if (victor == "player2") {
                $("#winner")
                    .css({
                        background: "#2c7e33",
                        opacity: "1",
                        transition: "opacity 2s linear"
                    })
                    .html("The winner is: <br>" + palyer2Name);
            } //end of check for victory

            if (stopDue2Victory == 0) {
                setTimeout(switchPlayer(), 300000);
            } else {
                $(".slotsInCol").css("border", "solid #c1701a");
            }
            $(e.currentTarget).css("border", currentPlayerColor);
        } //x else (main game code)
    }); //x click event

    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
            currentPlayerColor = "solid #2c7e33";
            player1.css("transform", "scale(1)");
            player2.css("transform", "scale(2)");
        } else if (currentPlayer === "player2") {
            currentPlayer = "player1";
            currentPlayerColor = "solid #c92323";
            player1.css("transform", "scale(2)");
            player2.css("transform", "scale(1)");
        } //x else if
    } // X function switchPlayer

    //check winner function:
    function victoryCheck(slot, row1) {
        var counter = 0;
        var rowCounter = 0;
        var winnersCol = [];
        var winnersRow = [];
        var winnersDig = [];

        for (var i = 0; i < slot.length; i++) {
            //check for v victory
            if (slot.eq(i).hasClass(currentPlayer)) {
                counter++;
                winnersCol.push(i);
                if (counter == 4) {
                    stopDue2Victory = 1;
                    for (var arr = 0; arr < winnersCol.length; arr++) {
                        slot.eq(winnersCol[arr]).addClass("winners");
                    }
                    return currentPlayer;
                }
            } else {
                counter = 0;
                winnersCol = [];
            }
            //
        } //closes for loop
        for (var j = 0; j < row1.length; j++) {
            if (row1.eq(j).hasClass(currentPlayer)) {
                rowCounter++;
                winnersRow.push(j);
                if (rowCounter == 4) {
                    stopDue2Victory = 1;
                    for (var arrR = 0; arrR < winnersRow.length; arrR++) {
                        row1.eq(winnersRow[arrR]).addClass("winners");
                    }
                    return currentPlayer;
                }
            } else {
                rowCounter = 0;
                winnersRow = [];
            }
        }

        for (var d = 0; d < diags.length; d++) {
            var diagsCounter = 0;

            for (var jArr = 0; jArr < diags[d].length; jArr++) {
                if (
                    $(".slot")
                        .eq(diags[d][jArr])
                        .hasClass(currentPlayer)
                ) {
                    diagsCounter++;
                    winnersDig.push(diags[d][jArr]);

                    if (diagsCounter == 4) {
                        stopDue2Victory = 1;
                        for (var arrD = 0; arrD < winnersDig.length; arrD++) {
                            $(".slot")
                                .eq(winnersDig[arrD])
                                .addClass("winners");
                        }
                        return currentPlayer;
                    }
                } else {
                    diagsCounter = 0;
                    winnersDig = [];
                }
            }
        }
    } //X function victory
    $("#reset").on("click", function() {
        $(".slot")
            .removeClass("player1")
            .removeClass("player2")
            .removeClass("winners");

        currentPlayer = "player1";
        victor = "";
        stopDue2Victory = 0;
        player1.css("transform", "scale(2)");
        player2.css("transform", "scale(1)");
        $("#winner").css({
            opacity: "0",
            transition: "opacity 0s linear"
        });
    }); // x  reset

    $("#players").on("click", function() {
        $(".slot")
            .removeClass("player1")
            .removeClass("player2")
            .removeClass("winners");

        currentPlayer = "player1";
        victor = "";
        stopDue2Victory = 0;
        player1.css("transform", "scale(2)");
        player2.css("transform", "scale(1)");
        $("#winner").css({
            opacity: "0",
            transition: "opacity 0s linear"
        });
        $("#enterScreen").css({
            display: "block",
            opacity: "1",
            transition: "opacity 1s linear"
        });

        $("#playScreen").css({
            opacity: "0",
            display: "block"
        });
    }); // x  players
})(); //iife
