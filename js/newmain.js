// i suck at variable naming
// don't worry we all do

clickTimes = [];
deviations = [];
timediffs = [];
testrunning = false; // the lack of camelcase is screwing with me, TODO <----

var current = 0;
var difference = 0;
var xVal = 0;
var yVal = 0;
var updateInterval = 100;
var dataLength = 50; // number of dataPoints visible at any point
//var dps = []; // dataPoints
var runNumber = 0;
var counterNumber = 0;

var baseData = {
	    type: "spline", //try changing to column, area
	    //toolTipContent: "{label}: {y} mm",
	    /*dataPoints: [
		    { label: "Jan",  y: 5.28 },
		    { label: "Feb",  y: 3.83 },
		    { label: "March",y: 6.55 },
		    { label: "April",y: 4.81 },
		    { label: "May",  y: 2.37 },
		    { label: "June", y: 2.33 },
		    { label: "July", y: 3.06 },
		    { label: "Aug",  y: 2.94 },
		    { label: "Sep",  y: 5.41 },
		    { label: "Oct",  y: 2.17 },
		    { label: "Nov",  y: 2.17 },
		    { label: "Dec",  y: 2.80 }
	    ]*/
	    dataPoints: []
};

function beginTest() {
    testrunning = true;
	timeLimit = seconds;
    clickTimes.length = 0;
    deviations.length = 0;
    timediffs.length = 0;
    beginTime = -1;
    key1 = $('#key1').val();
    key2 = $('#key2').val();
    $("div#status").html("Test ready, press assigned keys or click to begin.");
    $("div#Result").html("\
        Tap Speed: 0 taps / 0 seconds<br>\
        Stream Speed: 0 BPM<br>\
        Unstable Rate: 0.\
    ");
    std = 0;
    if (runNumber > 0) {
	$("#chartContainer").CanvasJSChart().options.data.push({
	    type: "spline",
	    dataPoints: []
	});
	$("#chartContainer").CanvasJSChart().options.data[runNumber - 1].visible = false;
    }
    $("#chartContainer").CanvasJSChart().render();
    counterNumber = 0;
    return true;
}

function endTest() {
    testrunning = false;
    update(false);
    beginTime = -1;
    $("div#status").html("Test Finished. Press Enter to ready again.");
    window.clearInterval(endTimer);
    window.clearInterval(updater);
    runNumber++;
    return;
}

function checkAcc(hit)
{
    current = (Date.now() - beginTime);
    if (hit)
    {
        stepper += step;
        difference = (current - (stepper));
        checkOD(difference);
    }
    else
    {
        difference = (current - (stepper + step));
        if (difference > 1000)
        {
            document.getElementById("hiterror").innerHTML = "";
            document.getElementById("acc").src = "";
        }
    }
}
function checkOD(error)
{
    if (document.getElementById("acc").name != 300)
    {
        if (error >= 0) // hit too late
        {
            document.getElementById("hiterror").innerHTML = "Late";
        }
        else
        {
            // too early
            document.getElementById("hiterror").innerHTML = "Early";
        }
    }
    else
    {
        document.getElementById("hiterror").innerHTML = "";
    }
    if (OD == 0)
    {
        if ((error <= 79.5) && (error >= -79.5))
        {
            document.getElementById("acc").src = "img/hit300.png";
            document.getElementById("acc").name = 300;
            return;
        }
        else if ((error <= 139.5) && (error >= -139.5))
        {
            document.getElementById("acc").src = "img/hit100.png";
            document.getElementById("acc").name = 100;
            return;
        }
        else if ((error <= 199.5) && (error >= -199.5))
        {
            document.getElementById("acc").src = "img/hit50.png";
            document.getElementById("acc").name = 50;
            return;
        }
        else
        {
            document.getElementById("acc").src = "img/hit0.png";
            document.getElementById("acc").name = 0;
            return;
        }
    }
    else if (OD == 1)
    {
        if ((error <= 73.5) && (error >= -73.5))
        {
            document.getElementById("acc").src = "img/hit300.png";
            document.getElementById("acc").name = 300;
            return;
        }
        else if ((error <= 131.5) && (error >= -131.5))
        {
            document.getElementById("acc").src = "img/hit100.png";
            document.getElementById("acc").name = 100;
            return;
        }
        else if ((error <= 189.5) && (error >= -189.5))
        {
            document.getElementById("acc").src = "img/hit50.png";
            document.getElementById("acc").name = 50;
            return;
        }
        else
        {
            document.getElementById("acc").src = "img/hit0.png";
            document.getElementById("acc").name = 0;
            return;
        }
    }
    else if (OD == 2)
    {
        if ((error <= 67.5) && (error >= -67.5))
        {
            document.getElementById("acc").src = "img/hit300.png";
            document.getElementById("acc").name = 300;
            return;
        }
        else if ((error <= 123.5) && (error >= -123.5))
        {
            document.getElementById("acc").src = "img/hit100.png";
            document.getElementById("acc").name = 100;
            return;
        }
        else if ((error <= 179.5) && (error >= -179.5))
        {
            document.getElementById("acc").src = "img/hit50.png";
            document.getElementById("acc").name = 50;
            return;
        }
        else
        {
            document.getElementById("acc").src = "img/hit0.png";
            document.getElementById("acc").name = 0;
            return;
        }
    }
    else if (OD == 3)
    {
        if ((error <= 61.5) && (error >= -61.5))
        {
            document.getElementById("acc").src = "img/hit300.png";
            document.getElementById("acc").name = 300;
            return;
        }
        else if ((error <= 115.5) && (error >= -115.5))
        {
            document.getElementById("acc").src = "img/hit100.png";
            document.getElementById("acc").name = 100;
            return;
        }
        else if ((error <= 169.5) && (error >= -169.5))
        {
            document.getElementById("acc").src = "img/hit50.png";
            document.getElementById("acc").name = 50;
            return;
        }
        else
        {
            document.getElementById("acc").src = "img/hit0.png";
            document.getElementById("acc").name = 0;
            return;
        }
    }
    else if (OD == 4)
    {
        if ((error <= 55.5) && (error >= -55.5))
        {
            document.getElementById("acc").src = "img/hit300.png";
            document.getElementById("acc").name = 300;
            return;
        }
        else if ((error <= 107.5) && (error >= -107.5))
        {
            document.getElementById("acc").src = "img/hit100.png";
            document.getElementById("acc").name = 100;
            return;
        }
        else if ((error <= 159.5) && (error >= -159.5))
        {
            document.getElementById("acc").src = "img/hit50.png";
            document.getElementById("acc").name = 50;
            return;
        }
        else
        {
            document.getElementById("acc").src = "img/hit0.png";
            document.getElementById("acc").name = 0;
            return;
        }
    }
    else if (OD == 5)
    {
        if ((error <= 49.5) && (error >= -49.5))
        {
            document.getElementById("acc").src = "img/hit300.png";
            document.getElementById("acc").name = 300;
            return;
        }
        else if ((error <= 99.5) && (error >= -99.5))
        {
            document.getElementById("acc").src = "img/hit100.png";
            document.getElementById("acc").name = 100;
            return;
        }
        else if ((error <= 149.5) && (error >= -149.5))
        {
            document.getElementById("acc").src = "img/hit50.png";
            document.getElementById("acc").name = 50;
            return;
        }
        else
        {
            document.getElementById("acc").src = "img/hit0.png";
            document.getElementById("acc").name = 0;
            return;
        }
    }
    else if (OD == 6)
    {
        if ((error <= 43.5) && (error >= -43.5))
        {
            document.getElementById("acc").src = "img/hit300.png";
            document.getElementById("acc").name = 300;
            return;
        }
        else if ((error <= 91.5) && (error >= -91.5))
        {
            document.getElementById("acc").src = "img/hit100.png";
            document.getElementById("acc").name = 100;
            return;
        }
        else if ((error <= 139.5) && (error >= -139.5))
        {
            document.getElementById("acc").src = "img/hit50.png";
            document.getElementById("acc").name = 50;
            return;
        }
        else
        {
            document.getElementById("acc").src = "img/hit0.png";
            document.getElementById("acc").name = 0;
            return;
        }
    }
    else if (OD == 7)
    {
        if ((error <= 37.5) && (error >= -37.5))
        {
            document.getElementById("acc").src = "img/hit300.png";
            document.getElementById("acc").name = 300;
            return;
        }
        else if ((error <= 83.5) && (error >= -83.5))
        {
            document.getElementById("acc").src = "img/hit100.png";
            document.getElementById("acc").name = 100;
            return;
        }
        else if ((error <= 129.5) && (error >= -129.5))
        {
            document.getElementById("acc").src = "img/hit50.png";
            document.getElementById("acc").name = 50;
            return;
        }
        else
        {
            document.getElementById("acc").src = "img/hit0.png";
            document.getElementById("acc").name = 0;
            return;
        }
    }
    else if (OD == 8)
    {
        if ((error <= 31.5) && (error >= -31.5))
        {
            document.getElementById("acc").src = "img/hit300.png";
            document.getElementById("acc").name = 300;
            return;
        }
        else if ((error <= 75.5) && (error >= -75.5))
        {
            document.getElementById("acc").src = "img/hit100.png";
            document.getElementById("acc").name = 100;
            return;
        }
        else if ((error <= 119.5) && (error >= -119.5))
        {
            document.getElementById("acc").src = "img/hit50.png";
            document.getElementById("acc").name = 50;
            return;
        }
        else
        {
            document.getElementById("acc").src = "img/hit0.png";
            document.getElementById("acc").name = 0;
            return;
        }
    }
    else if (OD == 9)
    {
        if ((error <= 25.5) && (error >= -25.5))
        {
            document.getElementById("acc").src = "img/hit300.png";
            document.getElementById("acc").name = 300;
            return;
        }
        else if ((error <= 67.5) && (error >= -67.5))
        {
            document.getElementById("acc").src = "img/hit100.png";
            document.getElementById("acc").name = 100;
            return;
        }
        else if ((error <= 109.5) && (error >= -109.5))
        {
            document.getElementById("acc").src = "img/hit50.png";
            document.getElementById("acc").name = 50;
            return;
        }
        else
        {
            document.getElementById("acc").src = "img/hit0.png";
            document.getElementById("acc").name = 0;
            return;
        }
    }
    else if (OD == 10)
    {
        if ((error <= 19.5) && (error >= -19.5))
        {
            document.getElementById("acc").src = "img/hit300.png";
            document.getElementById("acc").name = 300;
            return;
        }
        else if ((error <= 59.5) && (error >= -59.5))
        {
            document.getElementById("acc").src = "img/hit100.png";
            document.getElementById("acc").name = 100;
            return;
        }
        else if ((error <= 99.5) && (error >= -99.5))
        {
            document.getElementById("acc").src = "img/hit50.png";
            document.getElementById("acc").name = 50;
            return;
        }
        else
        {
            document.getElementById("acc").src = "img/hit0.png";
            document.getElementById("acc").name = 0;
            return;
        }
    }
}
function update(click) {
    if (click)
    {
        if (timediffs.length > 0)
        {
            sum = timediffs.reduce(function(a, b){return a + b});
            avg = sum / timediffs.length;
            $.each(timediffs, function(i,v) {
                deviations[i] = (v - avg) * (v - avg);
            });
            variance = deviations.reduce(function(a, b) {return a + b;});
            std = Math.sqrt(variance / deviations.length);
            unstableRate = std * 10;
        }
        clickTimes.push(Date.now());
        if (clickTimes.length > 1)
            timediffs.push(clickTimes[clickTimes.length - 1] - clickTimes[clickTimes.length - 2]);
        if (clickTimes.length > 2) {
            var chart = $("#chartContainer").CanvasJSChart();
            chart.options.data[runNumber].dataPoints.push({
                x: ((Date.now() - beginTime)/1000.0),
                y: (Math.round((((clickTimes.length) / (Date.now() - beginTime) * 60000)/4) * 100) / 100)
            });
            chart.render();
        }
    }
    else
    {
        checkAcc(false);
        counterNumber = (counterNumber + 1) % 30;
        streamtime = (Date.now() - beginTime)/1000;
        if (timediffs.length < 2) {
            $("div#Result").html("\
            Tap Speed: " + (clickTimes.length.toString() + " taps / " + streamtime.toFixed(3)) + " seconds.<br>\
            Stream Speed: " + (Math.round((((clickTimes.length) / (Date.now() - beginTime) * 60000)/4) * 100) / 100).toFixed(2) + " BPM.<br>\
            Unstable Rate: n/a.\ ");
        } else {
            $("div#Result").html("\
                Tap Speed: " + (clickTimes.length.toString() + " taps / " + streamtime.toFixed(3)) + " seconds.<br>\
                Stream Speed: " + (Math.round((((clickTimes.length) / (Date.now() - beginTime) * 60000)/4) * 100) / 100).toFixed(2) + " BPM.<br>\
                Unstable Rate: " + (Math.round(unstableRate * 100000) / 100000).toFixed(3) + "\ ");
            if (counterNumber == 0) {
            var chart = $("#chartContainer").CanvasJSChart();
            chart.options.data[runNumber].dataPoints.push({
                x: ((Date.now() - beginTime)/1000.0),
                y: (Math.round((((clickTimes.length) / (Date.now() - beginTime) * 60000)/4) * 100) / 100)
            });
            chart.render();
            }
        }
    }
}

$(document).keypress(function(event)
{
    if (event.keyCode == 13)
    {
        begin();
    }
    if (testrunning)
    {
        if ((String.fromCharCode(event.which) == key1) || (String.fromCharCode(event.which) == key2))
        {
            switch (beginTime)
            {
                case -1:
                    beginTime = Date.now();
                    $("div#status").html("Test currently running, press Enter to stop early.");
                    updater = setInterval(function() { update(false); }, 16.6);
                    endTimer = setTimeout(function() { begin(); }, timeLimit * 1000);
                default:
                    checkAcc(true);
                    update(true);
                    break;
            }
        }
    }
});

$(document).mousedown(function(event)
{
    document.oncontextmenu = function(e) {stopEvent(e); return false;};

    if (testrunning)
    {
        if ((event.which) == 1 || (event.which) == 3)
        {
            switch (beginTime)
            {
                case -1:
                    beginTime = Date.now();
                    $("div#status").html("Test currently running, press Enter to stop early.");
                    updater = setInterval(function() { update(false); }, 16.6);
                    endTimer = setTimeout(function() { begin(); }, timeLimit * 1000);
                default:
                    checkAcc(true);
                    update(true);
                    break;
            }
        }
    }
});

function stopEvent(event){
 if(event.preventDefault != undefined)
  event.preventDefault();
 if(event.stopPropagation != undefined)
  event.stopPropagation();
}

$(document).ready(function() {
    resetvalues();
    $("#chartContainer").CanvasJSChart({
    zoomEnabled: true,
    exportEnabled: true,
    title: {
        text: "Streaming Rate"
    },
    axisY: {
        title: "Stream BPM",
        includeZero: false
    },
    axisX: {
        title: "Time (Seconds)",
        //interval: 1
    },
    data: [
    {
        type: "spline", //try changing to column, area
			    //toolTipContent: "{label}: {y} mm",
			    /*dataPoints: [
				    { label: "Jan",  y: 5.28 },
				    { label: "Feb",  y: 3.83 },
				    { label: "March",y: 6.55 },
				    { label: "April",y: 4.81 },
				    { label: "May",  y: 2.37 },
				    { label: "June", y: 2.33 },
				    { label: "July", y: 3.06 },
				    { label: "Aug",  y: 2.94 },
				    { label: "Sep",  y: 5.41 },
				    { label: "Oct",  y: 2.17 },
				    { label: "Nov",  y: 2.17 },
				    { label: "Dec",  y: 2.80 }
			    ]*/
        dataPoints: []
    }
		    ]
    });
});
