// from data.js
// Just gonna use the data var, but thanks
// var tableData = data;

// Makes the comments in data intelligable. Replaces HTML designations with proper text.
// Also adds the combo of city state and country to be sorted for later on so the concat -
// doesn't have to be done multiple times.
data.forEach(x => {
    x.comments = x.comments.replace(/&#44/g,",");
    x.comments = x.comments.replace(/&#39/g,"'");
    x.comments = x.comments.replace(/&#33/g,"!");
    x.comments = x.comments.replace(/&quot;/g,'"');
    x["combo"] = x.city.concat(", ",x.state,", ",x.country);
});

// Selects table body
var table = d3.select("tbody");

// Selects the form fields and the button that is clicked on submission
var ferm = d3.select("#submission")
var drops = d3.select("#comboInput")
var ships = d3.select("#shapeInput")
var dats = d3.select("#dateInput")

// Get unique combinations of city, state, country and also shapes and also dates
// Alternate way of doing things, slower by about a millisecond on average.
// console.time("heyo")
// /**
//  * This function finds the unique values for a single element in the objects in data, and then
//  * adds them to the field specified in the selection form.
//  * @param {*} check This is the key of the element to find the uniques of in the objects in data
//  * @param {*} field This is the form field d3 selection to add the unique values found to.
//  */
// function testSortAdd(check,field) {
//     // console.log(data.findIndex((thing) => thing[check] === "light"));
//     // Gets the objects with a unique element, in the element field specified by check.
//     var bud = data.filter((element,index) => {

//         return (data.findIndex((query) => query[check] === element[check])) === index;
//         // Below lines were used for testing of the double filter
//         // var bool = (data.findIndex((thing) => thing[check] === element[check]))===index;
//         // console.log([bool,element[check],index]);
//     });
//     // console.log(bud)

//     // Could add a sort feature here for bud to sort alphabetically.

//     // Sets the dropdown fields with the found unique values.
//     bud.forEach((petal) => {
//         let bee = field.append("option");
//         bee.text(petal[check]);
//     });
// };

// // Runs the function for the relevant fields and elements
// testSortAdd("shape",ships);
// testSortAdd("combo",drops);
// testSortAdd("datetime",dats);
// console.timeEnd("heyo")

// console.time("heyo")
// OLD WAY OF DOING THINGS, faster by a about a millisecond.
// Gets unique values from relevant elements of all the objects
var pairs = [];
var shapes = [];
var days = [];
data.forEach((entry) => {
    // The unique combos part
    if (pairs.indexOf(entry.combo)===-1) {
        pairs.push(entry.combo);
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
// console.timeEnd("heyo")

// Checks an object in data to see if it fits the filter criteria.
// Checks if any one of three separate conditions is met.
function wanted(element) {
    return ((element.datetime === dats.node().value) || (dats.node().value === "All")) &&
    ((element.shape === ships.node().value) || (ships.node().value === "All")) && 
    ((element.combo === drops.node().value) || (drops.node().value === "All"));
};

// The function that inserts the filtered data into the table.
function insertData() {
    d3.event.preventDefault();
    table.html("");
    data.filter(wanted).forEach((entry) => {
        var raw = table.append("tr");
        Object.values(entry).forEach((indiv) => {
            if (indiv != entry.combo) {
                raw.append("td").text(indiv);
            }
        });
    });
}

ferm.on("click",insertData);