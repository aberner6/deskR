
console.log(inputValue)

/*** Variables ***/
//Datavis
//number of keywords 0-1, 0 will give a lot of keywords
var filterNum = .2;

var radius = w / 5;

// SVG
var svg;
// var w = window.outerWidth;
// var h = window.innerHeight-50;
// h = h-500;
// for Key
var startingX = 20;
var startingY = 349; //523;
var startingXLabel = 34;
var startingYLabel = 351; //525;
var t = [1];
var keyTypes;
//= ["Video","Article","Book","Exhibit","Installation","Paper","List", "Essay"];

// Keywords
var keywords = [];
var keywordSorted;
var totalKeywords = [];
var theseKeywords = [];
var focusKeywords = [];
var uniqueKeywords;
var mostKeyed;
var uniqueMostKeyed;
var uniqueTotalsKeyed;

//Authors
var authors = [];
var authorsSorted;
var totalAuthors = [];
var theseAuthors = [];
var uniqueAuthors;
var uniqueADone;
var uniqueMostAuthors;
var uniqueTotalsAuthors;
var maxAuthor;
var totalA = [];

//Years
var years = [];
var uniqueYears;
var minYear;
var maxYear;

//Medium/ journal type
var journalTypes = [];
var uniqueTypes;


var eachEntry;
var xScale;
var xAxis;

var alongWidth;



var kLabels = false;
var allLabels = true;


var goSecond = false;
var totals = [];

var huh = [];
var total1 = 0;
var total2 = 0;
var total3 = 0;
var total4 = 0;
var total5 = 0;
var total6 = 0;
var totalss = {};
var opacityMap;
var firstLoadVar;
var firstLoad = -1;
var secLoad = -1;
var secondLoadVar;
var secondLoad = -1;
var padding = 35;
var padX = 100;


var maxCited;
var thisTotal;
var totalsCircles;
var textsAre;
var heightScale;
var singleScale;
var thisData = [];


var uniqueKDone = false;

var theX = [];
var maxEntries;
var citeNums = [];
//Width and height

var newCircle;

var color; //=  d3.scale.category20c();

var colorSpectrum = [
    "#fc5988", "#b14a41", "#6ab054", "#8675ee", "#fcb752", "#89e2fe"
]

var initialZoom = 1,
    maxZoom = 10;
var indexing = 0;

var exitK;
var returnK;
var minK;
var otherTransform;
var doOther;

var animateZoom = false;
var showReset = false;
var overallView = false;
var loadIt;
var itsDone = false;

var fishEyeGo = false;

var whatis = [];

var saveOne = [];
var thisY = [];
var thisX = [];

var links = [];
var nodeCited = [];
var nodes = {};
var drag;
var n;
var maxNodeCited;

var rMap;
var circle, path, text, images;
var images;
var force;
var scaleRadius = 5;
var howLong = [];
var nodes = {};
var thisPaperName;



// svg = d3.select("#container")
//     .append("svg")
//     .attr("width", w)
//     .attr("height", h)

var vis = svg //for the visualization
    .append('svg:g')
    .attr("transform", "translate(" + 0 + "," + 0 + ")");



/***** KEY *****/

$("#key").click(function() {
    $(".keyCirc, .newlabel, .paperCirc, .journoCirc, .descriplabel").toggle();
})

var paperKeyCircle = vis.selectAll("paperCirc")
    .data(t)
    .enter()
    .append("circle").attr("class", "paperCirc")
    .attr("cx", 20)
    .attr("cy", startingY - 20)
    .attr("fill", 'rgb(251,180,174)')
    .attr("r", radius)

var paperLabel = vis.selectAll("keylabel")
    .data(t)
    .enter()
    .append("text").attr("class", "newlabel")
    .attr("x", 34)
    .attr("y", startingYLabel - 18)
    .text("Colored Dot   Paper")

var keyCircle = vis.selectAll("keyCirc")
    .data(t)
    .enter()
    .append("circle").attr("class", "keyCirc")
    .attr("cx", 20)
    .attr("cy", startingY)
    .attr("fill", "white")
    .attr("stroke", "gray")
    .attr("r", 8)

var keyLabel = vis.selectAll("keylabel")
    .data(t)
    .enter()
    .append("text").attr("class", "newlabel")
    .attr("x", 34)
    .attr("y", startingYLabel)
    .text("White Dot   Major Keyword")

var journoTitle = vis.selectAll("keylabel")
    .data(t)
    .enter()
    .append("text").attr("class", "newlabel")
    .attr("x", 17)
    .attr("y", 391)
    .text("Each color represents a medium:")

d3.select("#titlename").classed("selected", true);
d3.select("#subtitlename").classed("selected", true);
$("#titlename").slideDown("slow")
$("#subtitlename").slideDown("slow")

//new way
var dataG = [];
$(document).ready(function() {
    //troppenmuseum workshop speadsheet:
    $.getJSON("https://spreadsheets.google.com/feeds/list/1EmyZhItPL5UDghf5ECEuiCyheaY6O5sttYLuUSGXbYM/od6/public/values?alt=json", function(datoo) {
        var entry = datoo.feed.entry;
        // console.log(entry);
        for (i = 0; i < entry.length; i++) {
            dataG.push({
                "year": entry[i]['gsx$date']['$t'],
                "keywords": entry[i]['gsx$keywords']['$t'],
                "why": entry[i]['gsx$why']['$t'],
                "img": entry[i]['gsx$image']['$t'],
                "url": entry[i]['gsx$link']['$t'],
                "title": entry[i]['gsx$title']['$t'],
            })
        }
        loadData(dataG, filterNum);

    }); // end get
}); // end document.ready

function loadData(dataName, filterNum) {
        // console.log(dataName)
        citeNums.length = 0; // number of times cited
        keywords.length = 0; // number of unique keywords
        theseKeywords.length = 0;
        totalKeywords.length = 0;

        focusKeywords.length = 0;

        thisData = (dataName);

        data = dataName;
        for (i = 0; i < data.length; i++) {

            // if year data exists
            if (isNaN(data[i].year) == false) {
                years[i] = parseInt(data[i].year);
            }
            //if keywords exist add to array
            if (data[i].keywords != "undefined") {
                keywords[i] = data[i].keywords.split(", ");
            }

            // 1 array with all the keywords
            for (j = 0; j < keywords[i].length; j++) {
                theseKeywords.push(keywords[i][j]);
            }
        };
        keywordSorted = false;

        console.log(keywordSorted)
        for (i = 0; i < theseKeywords.length; i++) {
            if (theseKeywords[i].length == 0) {
                theseKeywords.splice(i, 1)
                i--;
            }
            console.log(keywordSorted)
            keywordSorted = true;
        }

        uniqueKeywords = theseKeywords.filter(onlyUnique); //finds unique keywords
        console.log(filterNum)
            //creates a new array with the sums of all the different Keywords and also creates list of focus Keywords
        if (keywordSorted == true) {
            console.log("keywordSorted")
            for (i = 0; i < theseKeywords.length; i++) {
                totalKeywords[i] = keyConsolidation(theseKeywords[i])
                mostKeyed = d3.max(totalKeywords);
                if (totalKeywords[i] > mostKeyed * filterNum) {
                    focusKeywords.push(theseKeywords[i]);
                } else {
                    console.log("nope")
                }
            }
        }
        uniqueMostKeyed = focusKeywords.filter(onlyUnique); //finds unique keywords from focused
        createNodes();
        /** Functions **/

        //some magic function to return uniquevalues
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        //return number of times a keyword was used
        function keyConsolidation(givenKey, i) {
            var total = 0;
            for (i = 0; i < theseKeywords.length; i++) {
                if (theseKeywords[i] == givenKey) {
                    total++;
                }
            }
            return total;
        }
        //return number of times an year was cited
        function valueConsolidation(givenYear, i) {
            var total = 0;
            for (i = 0; i < data.length; i++) {
                if (data[i].year != "undefined" && data[i].year == givenYear) {
                    total++;
                }
            }
            return total;
        }
        //return title of the journal entry
        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    } 

function createNodes() {
    links = [];
    if (itsDone == false) {
        for (i = 0; i < thisData.length; i++) {
            for (j = 0; j < uniqueMostKeyed.length; j++) {
                if (isNaN(uniqueMostKeyed[j])) {
                    if (keywords[i].indexOf(uniqueMostKeyed[j]) != -1) {
                        links.push({
                            "source": thisData[i].img,
                            "target": uniqueMostKeyed[j],
                            "key": keywords[i],
                            "year": thisData[i].year,
                            "img": thisData[i].img,
                            "url": thisData[i].url,
                            "why": thisData[i].why
                        })
                    }
                }
            }
        }
        simpleNodes();
    }
}

var callback1;
var valColor = d3.scale.ordinal()
    .domain(["low", "mid", "high"])
    .range(["#66ccff", "#009933", "#ff5050"])
var greyColor = "#808080";
var majorNodes = [];

function simpleNodes() {
    var thisMap;
    var thisWeight = [];
    var maxWeight;

    links.sort(function(a, b) {
            return d3.ascending(a.year, b.year);
        })
    var angle2, x2, y2;
    links.forEach(function(link, i) {
        angle = (i / ((links.length) / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
        x = (radius * Math.cos(angle)) + (w / 2); // Calculate the x position of the element.
        y = (radius * Math.sin(angle)) + (h / 2); // Calculate the y position of the element.

        link.source = nodes[link.source] || (nodes[link.source] = {
            name: link.key,
            img: link.img,
            xIs: x,
            yIs: y
        });

        link.target = nodes[link.target] || (nodes[link.target] = {
            name: link.target,
            xIs: x,
            yIs: y
        });

    });

    force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([w, h])
        .linkDistance(600)
        .charge(-600)
        .on("tick", tick)
        .start();

    drag = force.drag()
        .on("dragstart", dragstart);


var nodeImg = [];
var nodeData = force.nodes();
for(i=0; i<nodeData.length; i++){
    howLong.push(nodeData[i].name);
    if(nodeData[i].img!=undefined){
        nodeImg.push(nodeData[i]);
    }else{
    }
}
    images = vis.selectAll("node")
        .data(nodeImg)
        .enter().append("svg:image")
        .attr("xlink:href", function(d) {
            return d.img;
        })
        .attr("x", function(d) {
            return -25;
        })
        .attr("y", function(d) {
            return -25;
        })
        .attr("height", h / 3)
        .attr("width", h / 3)
        .attr("transform", function(d, i) {
            return "translate(" + -w + "," + h / 4 + ")";
        });
    text = vis.selectAll("labels")
        .data(nodeImg)
        .enter().append("text")
        .attr("class", "labels")
        .attr("x", -25)
        .attr("y", -25)
        .attr("text-anchor", "start")
        .attr("transform", function(d, i) {
            return "translate(" + -w + "," + h / 4 + ")";
        })
        .text(function(d, i) {
            return d.name;
        });
    $(".labels").show();

    // function go(){
    var move = setInterval(function() {
        var moveIt = d3.select(images[0][indexing]);
        var moveTxt = d3.select(text[0][indexing]);

        moveIt
            .transition()
            .duration(1000)
            .attr("transform", transformAcross1(moveIt))
            .attr("class","looked")
            .each("end", function(d){
                d3.select(this)
                    .transition()
                    .duration(2000)
                    .attr("transform", function(d){
                        if(d.name.includes(inputValue)){
                        console.log(d.name)
                            return transformAcross2(moveIt)
                        } else{
                            return transformAcross3(moveIt)
                        }
                    })
            })                  
        moveTxt
            .transition()
            .duration(1000)
            .attr("transform", transformAcross1(moveTxt))
            .attr("class","looked")
            .each("end", function(d){
                d3.select(this)
                    .transition()
                    .duration(2000)
                    .attr("transform", function(d){
                        if(d.name.includes("migration")){
                        console.log(d.name)
                            return transformAcross2(moveTxt)
                        } else{
                            return transformAcross3(moveTxt)
                        }
                    })
            })  
        indexing++;
        if (indexing > nodeImg.length) {
            clearInterval(move);
        }
    }, 1000)
    // }

    function transformAcross1(d) {
        d.x = w / 2 - h / 6;
        d.y = h / 4;
        return "translate(" + d.x + "," + d.y + ")";
    }
    function transformAcross2(d, i) {
        d.x = w / 2 - h / 6;
        d.y = h - h/6;
        return "translate(" + d.x + "," + d.y + ")";
    }
    function transformAcross3(d, i) {
        d.x = w*2;
        d.y = h/4;
        return "translate(" + d.x + "," + d.y + ")";
    }
    function doNothing() {
    }

    // path = vis.selectAll("path")
    //     .data(force.links())
    //     .enter().append("path")
    //     .attr("class", "link")
    //     .attr("stroke", "grey")

    function dblclick(d) {
        d3.select(this).classed("fixed", d.fixed = false);
    }
    function dragstart(d) {
        d3.select(this).classed("fixed", d.fixed = true);
    }
    function tick() {
        // path.attr("d", linkArcNorm);
        // circle
        //     .attr("transform", transform);
        // text.attr("transform", transformSmall);
        // images.attr("transform", transformCircular);
    }

    function transformCircular(d) {
        return "translate(" + d.xIs + "," + d.yIs + ")";
    }
    var rad = 4;

    function transformNorm(d) {
        d.x = Math.max(rad, Math.min(w - rad, d.x));
        d.y = Math.max(rad, Math.min(h - rad, d.y));
        return "translate(" + d.x + "," + d.y + ")";
    }

    var c = false;
    $('#citeRate').slideDown();
    d3.select("#citeRate").classed("selected", true);
}

var radi = 50;
var all = [];

function stopBigNet() {
    force.stop()
    circle
        .transition()
        .duration(2000)
        .attr("transform", newTransform);
    path
        .transition()
        .duration(2000)
        .attr("d", linkArc);

    function newTransform(d, i) {
        d.y = h; //not links[i].cites
        return "translate(" + d.x + "," + d.y + ")";
    }
}
var xScale = d3.scale.linear()
    .domain([0, w])
    .range([w / 3, (w * 2 / 3)])
var yScale = d3.scale.linear()
    .domain([0, h])
    .range([h / 3, (h * 2 / 3)])

function transformSmall(d) {
    return "translate(" + xScale(d.xIs) + "," + yScale(d.yIs) + ")";
}

function linkArcNorm(d) {
    var dx = xScale(d.target.xIs) - d.source.xIs,
        dy = yScale(d.target.yIs) - d.source.yIs,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.xIs + "," + d.source.yIs + "A" + dr + "," + dr + " 0 0,1 " + xScale(d.target.xIs) + "," + yScale(d.target.yIs);
}

function linkArc(d) {
    var dx = d.target.xIs - d.source.xIs,
        dy = d.target.yIs - d.source.yIs,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.xIs + "," + d.source.yIs + "A" + dr + "," + dr + " 0 0,1 " + d.target.xIs + "," + d.target.yIs;
}

function transCirc(d) {
        var nodes = [],
            width = (radius * 2) + 100,
            height = (radius * 2) + 100,
            angle,
            x,
            y,
            i;
        for (i = 0; i < links.length; i++) {
            angle = (i / ((links.length) / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
            // For a semicircle, we would use (i / numNodes) * Math.PI.
            d.x = (radius * Math.cos(angle)) + (width / 2); // Calculate the x position of the element.
            d.y = (radius * Math.sin(angle)) + (width / 2); // Calculate the y position of the element.
            nodes.push({
                'id': i,
                'x': x,
                'y': y,
                'audio': ''
            });
        }
        return "translate(" + d.x + "," + d.y + ")";

    }

function chosen(keyIs) {
    var keyIs = keyIs;
    force.stop();
    images
        .transition()
        .attr("transform", function(d) {
            if (d.name.length > 1) {
                for (var j = 0; j < d.name.length; j++) {
                    if (d.name[j] == keyIs) {
                        return transformDown(d);
                    } else {
                        return transformUp(d);
                    }
                }
            }
        })
    text
        .transition()
        .attr("transform", function(d) {
            if (d.name.length > 1) {
                for (var j = 0; j < d.name.length; j++) {
                    if (d.name[j] == keyIs) {
                        return transformDown(d);
                    } else {
                        return transformUp(d);
                    }
                }
            }
        })
    path
        .transition()
        .attr("d", linkArc)
}
