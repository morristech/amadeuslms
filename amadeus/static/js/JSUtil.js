/**
 * Reserved to codes for general use of aplications
 */

var JSUtil_js = true;

JSON.copyObject = function (object) {
	return JSON.parse(JSON.stringify(object));
}

// Returns the status of device (true - Mobile or tablet; false - Desktop)
window.mobilecheck = function () {
	var check = function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
			return true;
		else
			return false;
	};
	return check(navigator.userAgent || navigator.vendor || window.opera);

};
// source:
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser?rq=1


// Return dimensions of a element whith ID sent by parameter
document.getDimensions = function (id) {
	var el = document.querySelector(id);
	var w = 0,
		h = 0;
	if (el) {
		w = $(el).attr("width");
		if (w == undefined) {
			if (el.getBBox != undefined) {
				var dimensions = el.getBBox();
				w = dimensions.width;
			} else
				w = 0;
		}
		h = $(el).attr("height");
		if (h == undefined) {
			if (el.getBBox != undefined) {
				var dimensions = el.getBBox();
				h = dimensions.height;
			} else
				h = 0;
		}
	} else {
		console.error("getDimensions() " + id + " not found.");
	}
	return {
		w: parseInt(w),
		h: parseInt(h)
	};
}// source:
// http://bl.ocks.org/ChandrakantThakkarDigiCorp/f73b89c530d8d38e074d4f3ab157032b

String.abbreviate = function (string) {
	var words = string.split(" ");
	var ret = "";
	for (var i = 0; i < words.length; i++) {
		if(isNaN(words[i]))
			ret += words[i].substr(0, 3) + ((words[i].length <= 3) ? "" : ".") + " ";
		else
			ret += Math.abbreviate(words[i],"");
	}
	return ret;
}

String.initials = function (string) {
	var words = string.split(" ");
	var ret = "";
	for (var i = 0; i < words.length; i++) {
		ret += words[i].substr(0, 1);
	}
	return ret;
}

String.adjustLength = function (string, font, space,notinitials) {

	var sizeLabel = string.length * font * 0.6;
	if (space < sizeLabel)
		string = String.abbreviate(string);

	sizeLabel = string.length * font * 0.6;

	if (space < sizeLabel && notinitials!= true)
		string = String.initials(string);
	return string;
}

String.adjustWidth = function (string, font, space) {
	while (space < string.length * font * 0.6) {
		font--;
	}
	return font;
}

String.initialsUp = function (string) {
	return String.initials(string).toUpperCase();
}

Math.partRect = function (w, h, x) {
	var n = Math.ceil(Math.sqrt(x));
	var last = n,
		last2 = n;
	do {
		console.log(1);
		var l = w / n;
		var resto = h / l - Math.ceil(x / n);
		if (resto < 0)
			n++;
		else if (resto > 1.25)
			n--;

	} while ((resto < 0 || resto > 1.25) && last2 != n);

	while (x % n != 0 && Math.floor(x / n) + x % n < n) {
		n--;
	}

	return { n: n, l: l };
}

/*d3.textData = function(data,text){
    	text = text.substring(0,text.length);
	
	var index,index2;
	while((index = text.search("<"))!=-1 && (index2 = text.search(">"))!=-1){//search for tags to replace
	//for(var i=0;i<10;i++){index = text.search("<");index2 = text.search(">");
	    var sub = text.substr(index+1,index2-index-1);
		var rep = $(data).attr(sub);
		if(rep == undefined)
			rep = "";
	    var n = text.search(sub);
	    text = text.replace(text.substring(n-1, n+sub.length+1), rep);
	    //text = text.replace(/<.*?>/,rep);//tudo entre caracteres < >
	}
    	return text;
}*/

d3.textData = function (data, text) {
	text = text.substring(0, text.length);
	var index, index2;

	while ((index = text.search("<")) != -1 && (index2 = text.search(">")) != -1) {//search for tags to replace
		//for(var i=0;i<10;i++){index = text.search("<");index2 = text.search(">");
		var sub = text.substr(index + 1, index2 - index - 1);
		var rep = data;
		if(sub != "this"){

		var part = sub.split(".");
		

		for (var i = 0; i < part.length; i++) {
			rep = $(rep).attr(part[i]);
		}

		if (rep == undefined)
			rep = "";
		}
		if (typeof rep == "object") {
			rep = rep.toString();
		}

		var n = text.search(sub);
		text = text.replace(text.substring(n - 1, n + sub.length + 1), rep);
		//text = text.replace(/<.*>/,rep);//tudo entre caracteres < >
	}

	return text;
}

String.replaceAll = function (s, a, b) {
	ret = s.substr(0, s.length);

	while (ret.search(a) != -1) {
		ret = ret.replace(a, b);
	}
	return ret;
}

Math.percent = function (val) {
	val = val * 100;
	val = Math.round(val);
	return val.toString() + "%";
}

Math.roundRole = function(num,decimals,role) {
	decimals = decimals==undefined?0:decimals;	
	var n = Math.pow(10,decimals);
	if(role == "ceil")
		return Math.ceil(num*n)/n;
	else if(role == "floor")
		return Math.floor(num*n)/n;
	else 
		return Math.round(num*n)/n;
}

Math.abbreviate = function (num, model, unid,round,decimals) {
	//round = "ceil"||"round"||"floor"
	//model = "%"||"e"|| /*potencias*/ "a"||"f"||"p"||"n"||"μ||mu"||"m"||"c"||"d"||""||"da"||"h"||"k"||"M"||"G"||"T"||"P"||"E"||"Z"||"Y"
	//unid = "string"
	var role = [["y",1e-24],["z",1e-21],["a",1e-18],["f",1e-15],["p",1e-12],["n",1e-9],["μ",1e-6],["m",1e-3],["c",1e-2],["d",1e-1],["", 1],
				["da",1e1],["h",1e2],["k",1e3],["M",1e6],["G",1e9],["T",1e12],["P",1e15],["E",1e18],["Z",1e21],["Y",1e24],["%", .01],,["mu",1e-6]
	];
	if(typeof num == "string"){
		var temp = parseFloat(num);
		var temp2 = num.replace(temp,"");
		for(var i=0;i<role.length;i++){
			if(temp2.search(role[i][0]) == 0){
				num = temp*role[i][1];
				unid = temp2.replace(role[i][0],"");
				break;
			}
		}
	}
	unid = unid==undefined?"":unid;
	switch (model) {
		case undefined:
			break;
		case "":
			var temp = Math.log10(num);
			temp = Math.roundRole(temp,0,round);
			if(temp>=-3 && temp<=3){
				temp += 9;//se zero, encontra no vetor a posição de não fazer nada;
			}else{
				temp = temp<-24?-24:(temp>24?24:temp);
				temp = temp/3;
				temp = Math.roundRole(temp,0,round);
				temp += temp>0?12:8;
			}
			num = num/role[temp][1];
			num = Math.roundRole(num,decimals,round);
			return ""+num+role[temp][0]+unid;				
			
		case "e":
			return ""+num.toExpoential()+unid;
		default:
			for(var i=0;i<role.length;i++){
				if(model == role[i][0]){
					var temp = num/role[i][1];
					temp = Math.roundRole(temp,decimals,round);
					if(role[i][1]=="mu")
					return ""+temp+"μ"+unid;
					return ""+temp+role[i][0]+unid;
				}
			}
			
	}
	return ""+num+unid;
}

/**
 * func={click:function(element,data) or vector function(element,data),
 	mouseover:function(element,data) or vector function(element,data),
 	mouseout:function(element,data) or vector function(element,data),
 	mousemove:function(element,data) or vector function(element,data)
 }
 * */

d3.validEvents = function (events) {
	if (events == undefined) events = {};
	if (events.click == undefined) events.click = [];
	if (typeof events.click == "function") events.click = [events.click];
	if (events.mouseover == undefined) events.mouseover = [];
	if (typeof events.mouseover == "function") events.mouseover = [events.mouseover];
	if (events.mousemove == undefined) events.mousemove = [];
	if (typeof events.mousemove == "function") events.mousemove = [events.mousemove];
	if (events.mouseout == undefined) events.mouseout = [];
	if (typeof events.mouseout == "function") events.mouseout = [events.mouseout];
	return events;
}

d3.addEvents = function (obj, func) {
	if (obj == undefined || func == undefined)
		return;
	obj.on("click", function (d) {
		if (func.click != undefined) {
			if (typeof func.click == "function")
				func.click(this, d);
			else {
				for (var i = func.click.length; i >=0 ; i--)
					if (typeof func.click[i] == "function")
						func.click[i](this, d);
			}
		}
	});
	obj.on("mouseover", function (d) {
		if (func.mouseover != undefined) {
			if (typeof func.mouseover == "function")
				func.mouseover(this, d);
			else {
				for (var i = func.mouseover.length; i >=0 ; i--)
					if (typeof func.mouseover[i] == "function")
						func.mouseover[i](this, d);
			}
		}
	});
	obj.on("mousemove", function (d) {
		if (func.mousemove != undefined) {
			if (typeof func.mousemove == "function")
				func.mousemove(this, d);
			else {
				for (var i = func.mousemove.length; i >=0 ; i--)
					if (typeof func.mousemove[i] == "function")
						func.mousemove[i](this, d);
			}
		}
	});
	obj.on("mouseout", function (d) {
		if (func.mouseout != undefined) {
			if (typeof func.mouseout == "function")
				func.mouseout(this, d);
			else {
				for (var i = func.mouseout.length; i >=0 ; i--)
					if (typeof func.mouseout[i] == "function")
						func.mouseout[i](this, d);
			}
		}
	});
}

d3.titleValid = function (title) {
	if (title != undefined) {
		if (title.text == undefined)
			title = undefined;
		else {
			if (title.color == undefined) title.color = "#FFF";
			if (title.font == undefined) title.font = {};
			if (title.font.name == undefined) title.font.name = "sans-serif";
			if (title.font.size == undefined) title.font.size = 50;
			if (title.position == undefined) title.position = {};
			if (title.position.dx == undefined) title.position.dx = 0;
			if (title.position.dy == undefined) title.position.dy = 0;
			if (title.position.align == undefined) title.position.align = "start";
		}
	}
	return title;
}

class MyDate {
	constructor(year, month, day, hour, value, dayOfWeek) {
		if (year == undefined && month == undefined && day == undefined && hour == undefined && dayOfWeek == undefined)
			year = new Date();
		if (year == undefined || typeof year == "number") {
			this.year = year;
			this.month = month;
			this.day = day;
			this.hour = hour;
			this.value = value;
			this.dayOfWeek = dayOfWeek;
		} else {

			this.year = year.getFullYear();
			this.month = year.getMonth();
			this.day = year.getDate();
			this.dayOfWeek = year.getDay();
			this.value = month;
			if (this.value == undefined)
				this.value = 0;
		}
		this.valid();
	}
	valid() {
		if (this.day <= 0) {
			this.month--;
			if (this.month < 0) {
				this.month = 11;
				this.year--;
			}
			var nday = MyDate.nDays(this);
			this.day = nday + this.day;
		}
		if (this.month > 11) {
			this.month = 0;
			this.year++;
		}
		return this;
	}
	toString() {
		return "" + (this.day < 10 ? "0" : "") + this.day + "/" + String.abbreviate(MyDate.monthName()[this.month]).replace(".", "");
	}
	static dayOfWeek(day, day1) {// informa o dia da semana a partir do primeiro dia do mes
		if (typeof day == "number") {
			var ret = (day % 7 + day1 - 1) % 7;
			return ret >= 0 ? ret : 6;
		} else {
			return (new Date(day.year, day.month, day.day)).getDay();
		}
	}
	static weekVal(domain, day) {
		var i = 0;
		for (i = 0; i < domain.length - 1; i++) {
			//if(day == undefined){
			//	console.log("oi");return;}
			if (MyDate.greatThan(day, domain[i + 1]) == -1)
				return domain[i];
		}
		return domain[i];
	}
	static nDays(date) {// informa quantos dias tem aquele mes
		return date.month != 1 ?
			MyDate.daysByMonth()[date.month] :
			MyDate.daysByMonth()[date.month](date.year)
	}
	static daysByMonth(month,year) {//retorna retor com quantos dias todos os meses têm
		var nday = [31, function (year) {
			if (year % 4 != 0)
				return 28;
			else if (year % 100 == 0) {
				if (year % 400 == 0)
					return 29;
				else
					return 28;
			} else
				return 29;
		}, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if(month==undefined)
			return nday;
		else if(month==1)
			if(year==undefined)
				return nday[1];
			else
				return nday[1](year);
		else
			return nday[month];
	}
	static monthName(val, model) {
		var month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
		if(val ==undefined || isNaN(val))
			if(model == "initials")
				return month.map(function(d){return String.initials(d);});
			else if(model == "abbreviate")
				return month.map(function(d){return String.abbreviate(d);});
			else
				return month;
		else
			if(model == "initials")
				return month.map(function(d){return String.initials(d);})[val];
			if(model == "abbreviate")
				return month.map(function(d){return String.abbreviate(d).replace(".","");})[val];
			else
				return month[val];
	};
	static weekName(val, model) {
		var week = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
		if(val ==undefined || isNaN(val))
			if(model == "initials")
				return week.map(function(d){return String.initials(d);});
			else if(model == "abbreviate")
				return week.map(function(d){return String.abbreviate(d);});
			else
				return week;
		else
			if(model == "initials")
				return week.map(function(d){return String.initials(d);})[val];
			if(model == "abbreviate")
				return week.map(function(d){return String.abbreviate(d).replace(".","");})[val];
			else
				return week[val];
	};
	static sum(d1, d2) {
		var ret = new MyDate();

		d2.hour = d2.hour == undefined ? 0 : d2.hour;
		d2.day = d2.day == undefined ? 0 : d2.day;
		d2.month = d2.month == undefined ? 0 : d2.month;
		d2.year = d2.year == undefined ? 0 : d2.year;

		d1.hour = d1.hour == undefined ? 0 : d1.hour;
		d1.day = d1.day == undefined ? 0 : d1.day;
		d1.month = d1.month == undefined ? 0 : d1.month;
		d1.year = d1.year == undefined ? 0 : d1.year;

		ret.hour = d1.hour + d2.hour;
		ret.day = d1.day + d2.day;
		ret.month = d1.month + d2.month;
		ret.year = d1.year + d2.year;

		while (ret.hour >= 24) {
			ret.day++;
			ret.hour -= 24;
		}

		while (ret.month >= 12) {
			ret.year++;
			ret.month -= 12;
		}

		var nday = MyDate.nDays(ret);
		while (ret.day > nday) {
			ret.day -= nday;
			ret.month++;
			nday = MyDate.nDays(ret);
		}

		return ret.valid();
	}
	static greatThan(d1, d2,hour) {
		if (d1.year 
			> d2.year)
			return 1;
		else if (d1.year 
			< d2.year)
			return -1;
		else if (d1.month > d2.month)
			return 1;
		else if (d1.month < d2.month)
			return -1;
		if (d1.day == undefined || d2.day == undefined)
			return 0;
		else if (d1.day > d2.day)
			return 1;
		else if (d1.day < d2.day)
			return -1;
		if (d1.hour == undefined || d2.hour == undefined)
			return 0;
		else if (d1.hour > d2.hour && !hour)
			return 1;
		else if (d1.hour < d2.hour && !hour)
			return -1;
		else
			return 0;
	}
	static hourNames(val, model) {
		var m12 = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am",
			"12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];
		var m24 = ["00h", "01h", "02h", "03h", "04h", "05h", "06h", "07h", "08h", "09h", "10h", "11h",
			"12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", "22h", "23h"];
		var m4 = ["06h-12h","12h-18h","18h-24h","00h-06h"];
		if (model == 12)
			if (val != undefined)
				return m12[val];
			else
				return m12;
		else if(model == 4)
			if(val != undefined)
				return m4[val/6];
			else
				return m4;
		else
			if (val != undefined)
				return m24[val];
			else
				return m24;
	}
	static dayVal(domain,val){
		if(typeof val == "string")
			return val;
		else{
			if(domain.length == 4){
				return domain[parseInt(val.hour/6)];
			}else{
				return domain[val.hour];
			}
		}
	}
}

Array.removeRepetitions = function(vector){
	return vector.filter(function(este, i) {
		return vector.indexOf(este) == i;
	});
}
//https://pt.stackoverflow.com/questions/16483/remover-elementos-repetido-dentro-de-um-vetor-em-javascript
if(d3.path)
d3.path.lineFunction = function(param){
	return d3.line()
		.x(function (d) { return d.x; }) // set the x values for the line
		// generator
		.y(function (d) { return d.y; }) // set the y values for the line
		// generator
		.curve(param?param:d3.curveLinearClosed);
}
if(d3.path)
d3.path.icons = {
	plus:function(size){return [
		{ "x": size*.0, "y": .3 * size },
		{ "x": size*.3, "y": .3 * size },
		{ "x": size*.3, "y": .0 * size },
		{ "x": size*.7, "y": .0 * size },
		{ "x": size*.7, "y": .3 * size },
		{ "x": size*1, "y": .3 * size },
		{ "x": size*1, "y": .7 * size },
		{ "x": size*.7, "y": .7 * size },
		{ "x": size*.7, "y": 1 * size },
		{ "x": size*.3, "y": 1* size },
		{ "x": size*.3, "y": .7 * size },
		{ "x": size*.0, "y": .7 * size },
	];},
	minus:function(size){return [
		{ "x": size*.0, "y": .3 * size },
		{ "x": size*.3, "y": .3 * size },
		{ "x": size*.3, "y": .3 * size },
		{ "x": size*.7, "y": .3 * size },
		{ "x": size*.7, "y": .3 * size },
		{ "x": size*1, "y": .3 * size },
		{ "x": size*1, "y": .7 * size },
		{ "x": size*.7, "y": .7 * size },
		{ "x": size*.7, "y": .7 * size },
		{ "x": size*.3, "y": .7 * size },
		{ "x": size*.3, "y": .7 * size },
		{ "x": size*.0, "y": .7 * size },
	];},
	arrow_right:function(size){
		return [
			{"x":size*.5,"y":size*0},
			{"x":size*.5,"y":size*0},
			{"x":size*1,"y":size*.35},
			{"x":size*1,"y":size*.35},
			{"x":size*1,"y":size*.65},
			{"x":size*1,"y":size*.65},
			{"x":size*.5,"y":size*1},
			{"x":size*.5,"y":size*1},
			{"x":size*.5,"y":size*2/3},
			{"x":size*.5,"y":size*2/3},
			{"x":size*.75,"y":size*0.5},
			{"x":size*.5,"y":size*1/3},
		]
	},
	arrow_down:function(size){
		return [
			{"x":	size*0	,"y":	size*.5	},
			{"x":	size*0	,"y":	size*.5	},
			{"x":	size*.35	,"y":	size*1	},
			{"x":	size*.35	,"y":	size*1	},
			{"x":	size*.65	,"y":	size*1	},
			{"x":	size*.65	,"y":	size*1	},
			{"x":	size*1	,"y":	size*.5	},
			{"x":	size*1	,"y":	size*.5	},
			{"x":	size*2/3	,"y":	size*.5	},
			{"x":	size*2/3	,"y":	size*.5	},
			{"x":	size*0.5	,"y":	size*.75	},
			{"x":	size*1/3	,"y":	size*.5	},
		];
	},
}

function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

d3.downloadSVG = function(svg){
    d3.event.preventDefault(),
    echoContentType.attr("value","image/svg+xml;charset=utf-8"),
    echoInput.attr("value",svg.attr("version","1.1").attr("xmlns","http://www.w3.org/2000/svg").node().parentNode.innerHTML),
    echoForm.node().submit()
}

d3.scaleCategory = function(pallet){
	if(pallet == undefined)
	if(d3.interpolateRainbow)
		pallet = d3.interpolateRainbow;
	else
		return d3.scale.category20b();
	var categories = [];
	var values = [];
	var prescale = 1/2;
	var current = 0;
	return function(tag){
		var temp = categories.indexOf(tag);
		if(temp >=0)
			return pallet(values[temp])
		else{
			categories.push(tag);
			values.push(current);
			temp = current;
			current += prescale;
			while(values.indexOf(current)>=0)
				current += prescale;
			if(current>1){
				prescale /=2;
				current = prescale;
			
			}
			return pallet(temp);
		}
	}
}
	