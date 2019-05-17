// from data.js
var tableData = data;

// YOUR CODE HERE!
var table = d3.select("tbody");

// var butt = d3.select("#submission");
// the button is uneeded bc it doesn't catch when the form is submitted with enter.
// form.on("submit") does
var ferm = d3.select("#submission")
var drops = d3.select("#comboInput")
var ships = d3.select("#shapeInput")
var dats = d3.select("#dateInput")

var desire = document.getElementById("dateInput");
var comb = document.getElementById("comboInput");
var stat = document.getElementById("shapeInput");

// Get unique combinations of city, state, country and also shapes and also dates
var pairs = [];
var shapes = [];
var days = [];
tableData.forEach((entry) => {
    // The unique combos part
    var together = entry.city.concat(", ",entry.state,", ",entry.country);
    if (pairs.indexOf(together)===-1) {
        pairs.push(together);
    }

    // The unique shapes part
    if (shapes.indexOf(entry.shape) ===-1) {
        shapes.push(entry.shape);
    }

    // The unique dates
    if (days.indexOf(entry.datetime)===-1) {
        days.push(entry.datetime);
    }
});
// console.log(pairs);

// Set those unique pairs of city, state, and country as dropdown options
pairs.forEach((combo) => {
    var each = drops.append("option");
    each.text(combo);
});

// Set those unique shapes as dropdown options
shapes.forEach((geo) => {
    var metry = ships.append("option");
    metry.text(geo);
});

// Set dates as dropdown options
days.forEach((day) => {
    var filler = dats.append("option");
    filler.text(day)
});

// Checks an object in data to see if it fits the filter criteria.
function wanted(element) {
    var test = element.city.concat(", ",element.state,", ",element.country);
    return ((element.datetime === desire.value) || (desire.value === "All")) &&
    ((element.shape === stat.value) || (stat.value === "All")) && 
    ((test === comb.value) || (comb.value === "All"));
};

// The function that inserts the filtered data into the table.
function insertData() {
    d3.event.preventDefault();
    table.html("");
    tableData.forEach((entry) => {
        if (wanted(entry)) {
            var raw = table.append("tr");
            Object.values(entry).forEach((indiv) => {
                raw.append("td").text(indiv);
            });
        }
    });
}

function insertData2 () {
    d3.event.preventDefault();
    table.html("")
};

ferm.on("click",insertData);