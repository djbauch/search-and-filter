/*
MIT License

Copyright (c) 2018 Erik Escoffier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
//https://github.com/nerik/formatcoords

//Added the ability to zero pad values

function Coords() {}

Coords.prototype.init = function() {
	if (!arguments.length) {
		throw new Error('no arguments');
	}
	else if (arguments[0].lat && arguments[0].lng) {
		this.lat = arguments[0].lat;
		this.lon = arguments[0].lng;
	}
	else if (typeof arguments[0] === "string") {
		var strarr = arguments[0].split(",");
		this.lat = parseFloat(strarr[0].trim());
		this.lon = parseFloat(strarr[1].trim());
	}
	else if (Object.prototype.toString.call(arguments[0]) === "[object Array]" ) {
		var arr = arguments[0];
		if (arguments[1] === true) {
			this.lat = arr[1];
			this.lon = arr[0];
		} else {
			this.lat = arr[0];
			this.lon = arr[1];
		}
	}
	else if (arguments[2] === true) {
		this.lat = arguments[1];
		this.lon = arguments[0];
	} 
	else {
		this.lat = arguments[0];
		this.lon = arguments[1];
	}

	this.compute();
};

Coords.prototype.compute = function() {
	this.north = this.lat > 0;
	this.east = this.lon > 0;
	this.latValues = computeFor(this.lat);
	this.lonValues = computeFor(this.lon);

	function computeFor(initValue) {
		var values = {};
		values.initValue = initValue;
		values.degrees = Math.abs(initValue);
		values.degreesInt = Math.floor(values.degrees);
		values.degreesFrac = values.degrees - values.degreesInt;
		values.secondsTotal = 3600 * values.degreesFrac; 
		values.minutes = values.secondsTotal / 60; 
		values.minutesInt = Math.floor(values.minutes);
		values.seconds = values.secondsTotal - (values.minutesInt * 60);
		return values;
	}
};

var shortFormats = {
	'FFf' : 'DD MM ss X',
	'Ff' : 'DD mm X',
	'f': 'dd X'
};

var units = {
	degrees: '°',
	minutes: '′',
	seconds: '″',
};

Coords.prototype.format = function(format, options) {
	if (typeof format === 'object') {
		var submittedFormat = format
		options = format;
		format = 'FFf';
	}
	if (typeof format === 'undefined'){
		format = 'FFf';
	} 
	if (typeof options === 'undefined') {
		options = {};
	}
	if (typeof options === 'string'){
		var submittedString = options;
		options = {
			latLonSeparator: submittedString
		}
	}
	if (typeof options.latLonSeparator === 'undefined') {
		options.latLonSeparator = ' ';
	}
	if(typeof options.decimalPlaces === 'undefined') {
		options.decimalPlaces = 5;
	}
	else {
		options.decimalPlaces = parseInt(options.decimalPlaces);
	}
	

	if ( Object.keys(shortFormats).indexOf(format) > -1 ) {
		format = shortFormats[format];
	}

	var lat = formatFor(this.latValues, (this.north) ? 'N' : 'S', false);
	var lon = formatFor(this.lonValues, (this.east) ? 'E' : 'W' , true);

	function formatFor(values, X, isLon) {
		var formatted = format;

        let degreesPadding = (degrees) => {
            let padding = "";
            if(isLon){
                if(degrees < 10) padding = "00";
                else if(degrees < 100) padding = "0";
            }else{
                if(degrees < 10) padding = "0";
            }
            return padding;
        }

        formatted = formatted.replace(/pDD/g, degreesPadding(values.degreesInt) + values.degreesInt+units.degrees);
		formatted = formatted.replace(/DD/g, values.degreesInt+units.degrees);
        formatted = formatted.replace(/pdd/g, degreesPadding(values.degrees) + values.degrees.toFixed(options.decimalPlaces)+units.degrees);
		formatted = formatted.replace(/dd/g, values.degrees.toFixed(options.decimalPlaces)+units.degrees);
        formatted = formatted.replace(/pD/g, degreesPadding(values.degreesInt) + values.degreesInt);
		formatted = formatted.replace(/D/g, values.degreesInt);
        formatted = formatted.replace(/pd/g, degreesPadding(values.degrees) + values.degrees.toFixed(options.decimalPlaces));
		formatted = formatted.replace(/d/g, values.degrees.toFixed(options.decimalPlaces));

        let minutesPadding = (minutes) => {
            return minutes < 10 ? "0" : "";
        }

        formatted = formatted.replace(/pMM/g, minutesPadding(values.minutesInt) + values.minutesInt+units.minutes);
		formatted = formatted.replace(/MM/g, values.minutesInt+units.minutes);
        formatted = formatted.replace(/pmm/g, minutesPadding(values.minutes) + values.minutes.toFixed(options.decimalPlaces)+units.minutes);
		formatted = formatted.replace(/mm/g, values.minutes.toFixed(options.decimalPlaces)+units.minutes);
        formatted = formatted.replace(/pM/g, minutesPadding(values.minutesInt) + values.minutesInt);
		formatted = formatted.replace(/M/g, values.minutesInt);
        formatted = formatted.replace(/pm/g, minutesPadding(values.minutes) + values.minutes.toFixed(options.decimalPlaces));
		formatted = formatted.replace(/m/g, values.minutes.toFixed(options.decimalPlaces));

        let secondsPadding = (seconds) => {
            return seconds < 10 ? "0" : "";
        }

        formatted = formatted.replace(/pss/g, secondsPadding(values.seconds) + values.seconds.toFixed(options.decimalPlaces)+units.seconds);
		formatted = formatted.replace(/ss/g, values.seconds.toFixed(options.decimalPlaces)+units.seconds);
        formatted = formatted.replace(/ps/g, secondsPadding(values.seconds) + values.seconds.toFixed(options.decimalPlaces));
		formatted = formatted.replace(/s/g, values.seconds.toFixed(options.decimalPlaces));
		
		formatted = formatted.replace(/-/g, (values.initValue<0) ? '-' : '');
		
		formatted = formatted.replace(/X/g, X);

		return formatted;
	}

	return lat + options.latLonSeparator + lon;
};

function formatcoords() {
	var c = new Coords();
	c.init.apply(c, arguments);
	return c;
}

export default formatcoords;