// from data.js
var tableData = data;

// YOUR CODE HERE!
var table = d3.select("tbody");

// var butt = d3.select("#submission");
// the button is uneeded bc it doesn't catch when the form is submitted with enter.
// form.on("submit") does
var ferm = d3.select("form")

var desire = document.getElementById('dateInput');

function insertData() {
    //preventDefault();
    console.log(desire.value);
    table.html("");
    tableData.forEach((entry) => {
        if (entry.datetime == desire.value) {
            var raw = table.append("tr")
            Object.values(entry).forEach((indiv) => {
                raw.append("td").text(indiv)
            });
        }
    });
}

ferm.on("submit",insertData);