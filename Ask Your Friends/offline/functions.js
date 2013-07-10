var anzahl = 0;
var counter;
var newgroup = new groupname();
var spieler;
var question;
var answerlist = new Array();
var answerproc;
var guessproc;
var gfriend = -1;
var alreadyplayed = new Array();
var diffvalues = new Array();
var left = "";
var right = "";
var check = "true";
var check2 = "true";
var playvar;

function usepopinput(input) {
	//number of players
	if (anzahl == 0) {
		anzahl = parseInt(input);
		if (isNaN(anzahl) || anzahl > 12 || anzahl < 2) {
			document.getElementById('poperror').innerHTML = "Bitte eine Zahl zwischen 2 und 12 eingeben!";
			document.getElementById('indexpop').value = "";
			anzahl = 0;
			state = 0;
			return 0;
		} else {
			counter = anzahl
			document.getElementById('poptext').innerHTML = "Wie heißt Spieler 1?";
			document.getElementById('poperror').innerHTML = "";
			document.getElementById('indexpop').value = "";
			state = 0;
			return 0;
		}
	}

	//name of all players
	if (newgroup.groupar.length < anzahl) {
		personname = input;
		if (personname.length < 1 || personname.length >= 20) {
			document.getElementById('poperror').innerHTML = "Bitte mindestens 1 und maximal 20 Zeichen eingeben.";
			document.getElementById('indexpop').value = "";
			state = 0;
			return 0;
		}

		if (newgroup.groupar.indexOf(personname) >= 0) {
			document.getElementById('poperror').innerHTML = "Name bereits vergeben.";
			document.getElementById('indexpop').value = "";
			state = 0;
			return 0;
		}
		newgroup.groupar.push(personname);

		answerlist.push(0);
		//answer in percs
		answerlist.push(0);
		//person to guess
		answerlist.push(0);
		//guess in percs

		document.getElementById('indexpop').value = "";
		document.getElementById('poperror').innerHTML = "";
		if (newgroup.groupar.length == anzahl) {
			push = "Ihr spielt zu " + anzahl + "."
			document.getElementById('poptext').innerHTML = push;
			document.getElementById('poptext1').innerHTML = newgroup.groupar.join('<br>');
			document.getElementById('indexpop').style.display = 'none';
			return 0;
		} else {
			document.getElementById('poptext').innerHTML = "Wie heißt Spieler " + (newgroup.groupar.length + 1) + "?";
			return 0;
		}
	}
	if (check != "true") {
		$("#contentindex").load("offline/askquest.html", function() {
			document.getElementById('headeruser').innerHTML = playvar
			document.getElementById('frageuser').innerHTML = playvar
			$('#contentindex').appendTo('.ui-page').trigger('create');
		});
		return 0;
	}

	if (check == "true") {
		var n = anzahl
		var rnd = Math.floor(Math.random() * n);
		var starter = newgroup.groupar[rnd];
		spieler = rnd;
		playvar = starter
		document.getElementById('startplayer').innerHTML = starter
		document.getElementById('poptext').innerHTML = "Du darfst die erste Frage stellen!";
		document.getElementById('poptext1').innerHTML = "";
		check = "false";
		return 0
	}
}

function newround() {
	$('.Popup').fadeIn("slow");
	$('#overlay').fadeIn("slow");

	input = "";

	$(document).ready(function() {
		$('.closePopupbtn').click(function(e) {
			e.stopImmediatePropagation();
			input = document.getElementById('indexpop').value;
			usepopinput(input)
		});
	});

	return 0

	anzahl = input;
	counter = anzahl;

	if (anzahl > 12 || anzahl < 2) {
		document.getElementById('poptext').innerHTML = "Bitte eine Zahl zwischen 2 und 12 eingeben!";
	}

	return false;

	confirm("Ihr spielt zu " + anzahl + ".");
	newgroup.addperson(anzahl);
	confirm("Ihr spielt zu " + anzahl + ".\n" + newgroup.groupar.join('\n'));

	$("#contentindex").load("offline/askquest.html", function() {

		$('#contentindex').appendTo('.ui-page').trigger('create');
		randomnmb();
	});

}

function groupname() {

	this.groupar = new Array();

	this.addperson = function(n) {
		var personname;
		var fix = n;
		while (n > 0) {

			personname = prompt("Name Spieler " + (fix - n + 1));

			while (personname.length < 2 || personname.length >= 20) {
				personname = prompt("Bitte mindestens 2 und maximal 20 Zeichen eingeben!");
			}

			while (this.groupar.indexOf(personname) >= 0) {
				personname = prompt("Name bereits vergeben!");
				while (personname.length < 2 || personname.length >= 20) {
					personname = prompt("Bitte einen Namen mit mindestens 2 und maximal 20 Zeichen eingeben!");
				}
			}
			n = n - 1;
			this.groupar.push(personname);
			answerlist.push(0);
			//answer in percs
			answerlist.push(0);
			//person to guess
			answerlist.push(0);
			//guess in percs
			/* TODO: keine Doppelauftreten, Abbrechen ermöglichen*/
		}
	}
}

function randomnmb() {

	var n = anzahl
	var rnd = Math.floor(Math.random() * n);
	var starter = newgroup.groupar[rnd];
	spieler = rnd;
	document.getElementById('headeruser').innerHTML = starter

	$("#contentindex").load("offline/askquest.html", function() {
		document.getElementById('frageuser').innerHTML = starter
		$('#contentindex').appendTo('.ui-page').trigger('create');
	});
}

function loadlimits() {
	var x = $(".mySelect option:selected").val()
	question = x + document.getElementById('frage').value;
	$("#contentindex").load("offline/limits.html", function() {

		$('#contentindex').appendTo('.ui-page').trigger('create');
	});

}

function ask() {
	left = document.getElementById('leftend').value;
	right = document.getElementById('rightend').value;
	l = left.length
	r = right.length
	if (l < 11) {
		left = "<br>" + left
	} else {
		left = left.substr(0, l / 2) + "-<br>" + left.substr(l / 2, l);
	}

	if (r < 11) {
		right = "<br>" + right
	} else {
		right = right.substr(0, r / 2) + "-<br>" + right.substr(r / 2, r);
	}

	$("#contentindex").load("offline/answerquestion.html", function() {
		$(document).ready(function() {
			$(document).bind("touchmove", function(event) {
				event.preventDefault();
			});
		});
		document.getElementById('ansleft').innerHTML = left
		document.getElementById('ansright').innerHTML = right
		$('#contentindex').appendTo('.ui-page').trigger('create');
		getquestion()
	});

}

function getquestion() {
	var questionalt = question;
	question = question.replace(/seid /g, "bist ");
	question = question.replace(/Seid /g, "bist ");
	question = question.replace(/ihr /g, "Du ");
	question = question.replace(/Ihr /g, "Du ");
	question = question.replace(/iha /g, "Du ");
	question = question.replace(/Iha /g, "Du ");
	question = question.replace(/euch /g, "Dir ");
	question = question.replace(/eusch /g, "Dir ");
	question = question.replace(/Euch /g, "Dir ");
	question = question.replace(/Eusch /g, "Dir ");
	question = question.replace(/ihr,/g, "Du,");
	question = question.replace(/Ihr,/g, "Du,");
	question = question.replace(/iha,/g, "Du,");
	question = question.replace(/Iha,/g, "Du,");
	question = question.replace(/euch,/g, "Dir,");
	question = question.replace(/eusch,/g, "Dir,");
	question = question.replace(/Euch,/g, "Dir,");
	question = question.replace(/Eusch,/g, "Dir,");
	question = question.replace(/ihr?/g, "Du");
	question = question.replace(/Ihr?/g, "Du");
	question = question.replace(/iha?/g, "Du");
	question = question.replace(/Iha?/g, "Du");
	question = question.replace(/euch?/g, "Dir");
	question = question.replace(/eusch?/g, "Dir");
	question = question.replace(/Euch?/g, "Dir");
	question = question.replace(/Eusch?/g, "Dir");
	if (question != questionalt) {
		confirm("Du darfst deine Freunde ruhig duzen. ;)");
	}
	if ((question.substr(question.length - 1)) != "?") {
		question = question + "?";
	}
	var firstchar = question.substr(0, 1);
	question = question.replace(firstchar, firstchar.toLowerCase());
	document.getElementById('frageuser').innerHTML = newgroup.groupar[spieler]
	document.getElementById('fragegg').innerHTML = question;
}

function mapanswer() {
	answerproc = ($('#slider1').val());
	answerlist.splice(spieler * 3, 1, answerproc);
	$("#contentindex").load("offline/guessanswer.html", function() {
		$(document).ready(function() {
			$(document).bind("touchmove", function(event) {
				event.preventDefault();
			});
		});
		getfriend()
		if (left != "") {
			document.getElementById('label1').innerHTML = left
			document.getElementById('label2').innerHTML = right
		}
		$('#contentindex').appendTo('.ui-page').trigger('create');
	});
}

function getfriend() {
	if (gfriend < 0) {
		gfriend = Math.floor(Math.random() * anzahl);
		while (gfriend == spieler) {
			gfriend = Math.floor(Math.random() * anzahl);
		}
		document.getElementById('guessuser').innerHTML = newgroup.groupar[spieler]
		document.getElementById('guessone').innerHTML = "wie ist " + newgroup.groupar[gfriend] + "s Antwort?";
		answerlist.splice((spieler * 3) + 1, 1, gfriend)
	}
}

function inArray(needle, haystack) {
	var count = haystack.length;
	for (var i = 0; i < count; i++) {
		if (haystack[i] === needle) {
			return true;
		}
	}
	return false;
}

function mapguess() {
	guessproc = ($('#slider2').val());
	answerlist.splice((spieler * 3) + 2, 1, guessproc);
	counter = counter - 1;
	alreadyplayed.push(spieler);
	gfriend = -1;
	if (counter < 1) {
		document.getElementById('poptext').innerHTML = "Die Runde ist vorbei.";

		$('.Popup').fadeIn("slow");
		$('#overlay').fadeIn("slow");

		$(document).ready(function() {
			$('.closePopupbtn').click(function(e) {
				$(".Popup").fadeOut("slow");
				$("#overlay").fadeOut("slow");
			});
		});
		$("#contentindex").load("offline/winoffline.html", function() {
			winner()
			$('#contentindex').appendTo('.ui-page').trigger('create');
		});

	} else {
		var n = anzahl;
		var rnd = Math.floor(Math.random() * n);
		while (inArray(rnd, alreadyplayed)) {
			var rnd = Math.floor(Math.random() * n);
		}
		var starter = newgroup.groupar[rnd];
		spieler = rnd;
		$("#contentindex").load("offline/answerquestion.html", function() {
			document.getElementById('headeruser').innerHTML = starter
			getquestion()
			document.getElementById('ansleft').innerHTML = left
			document.getElementById('ansright').innerHTML = right
			$('#contentindex').appendTo('.ui-page').trigger('create');

			document.getElementById('poptext').innerHTML = "Nächster Spieler:"
			document.getElementById('nextplayer').innerHTML = starter;

			$('.Popup').fadeIn("slow");
			$('#overlay').fadeIn("slow");

			$(document).ready(function() {
				$(document).bind("touchmove", function(event) {
					event.preventDefault();
				});
				$('.closePopupbtn').click(function(e) {
					$(".Popup").fadeOut("slow");
					$("#overlay").fadeOut("slow");
				});
			});
		});
	}
}

function winner() {
	var np = anzahl;
	var ccount = 0;
	while (ccount < np) {
		var pers = answerlist[ccount * 3 + 1];
		var persans = answerlist[pers * 3];
		diffvalues.push((persans - answerlist[ccount * 3 + 2]) * (persans - answerlist[ccount * 3 + 2]));
		ccount = ccount + 1;
		pers = 0;
		persans = 0;
	}
	var difmin = Math.min.apply(null, diffvalues);
	ccount = 0;
	var minima = new Array();
	while (ccount < np) {
		if (diffvalues[ccount] == difmin) {
			minima.push(ccount);
		}
		ccount = ccount + 1;
	}
	var rnd = Math.floor(Math.random() * (minima.length - 1));
	var roundwinner = newgroup.groupar[minima[rnd]];
	document.getElementById('headeruser').innerHTML = roundwinner
	document.getElementById('winnerpers').innerHTML = roundwinner
	document.getElementById('winner').innerHTML = "hat die Runde gewonnen!"
	document.getElementById('winnerperc').innerHTML = roundwinner + " verfehlte<br>" + newgroup.groupar[answerlist[diffvalues.indexOf(difmin) * 3 + 1]] + "s Antwort<br>um nur<br>" + Math.sqrt(difmin) + "%!"
	spieler = newgroup.groupar.indexOf(roundwinner);
}

function onlywinner() {
	document.getElementById('listfor').innerHTML = newgroup.groupar[spieler];
	$('.Popup').fadeIn("slow");
	$('#overlay').fadeIn("slow");

	$(document).ready(function() {
		$('.closePopupbtn').click(function(e) {
			e.stopImmediatePropagation();
			if (check2 == "true") {
				getlist()
			} else {
				$("#contentindex").load("offline/askquest.html", function() {
					document.getElementById('frageuser').innerHTML = newgroup.groupar[spieler]
					check2 = "true";
					$('#contentindex').appendTo('.ui-page').trigger('create');
				});
			}
		});
	});
}

function getlist() {
	var anslist = new Array();
	var guepers = new Array();
	var guelist = new Array();
	var perslist = new Array();
	var n = 0;
	while (n < anzahl) {
		var pers = newgroup.groupar[n];
		var guessedperson = newgroup.groupar[answerlist[n * 3 + 1]];
		var guess = answerlist[n * 3 + 2];
		var answ = answerlist[n * 3];
		anslist.push(answ);
		perslist.push(pers);
		guepers.push(guessedperson);
		guelist.push(guess);
		n = n + 1;
	}
	var ausgabe = "";
	n = 0;
	while (n < anzahl) {
		ausgabe = ausgabe + perslist[n] + " antwortete mit " + anslist[n] + "%<br>"
		var i = 0;
		while (i < guepers.length) {
			if (guepers[i] == perslist[n]) {
				ausgabe = ausgabe + perslist[i] + " schätzte " + perslist[n] + "s Antwort auf " + guelist[i] + "%<br>";
			}
			i = i + 1;
		}
		ausgabe = ausgabe + "<br>";
		n = n + 1;
	}
	var firstchar = question.substr(0, 1);
	var questionedit = question.replace(firstchar, firstchar.toUpperCase());

	document.getElementById('listff').innerHTML = questionedit
	document.getElementById('listfor').innerHTML = ""
	document.getElementById('poptext1').innerHTML = ""
	document.getElementById('poptext').innerHTML = ""
	document.getElementById('poptext2').innerHTML = ausgabe
	//confirm(questionedit + "\n\n" + ausgabe);

	alreadyplayed = new Array();
	answerlist = new Array();
	gfriend = -1;
	diffvalues = new Array();
	counter = anzahl;

	n = 0
	while (n < anzahl) {
		answerlist.push(0);
		//answer in percs
		answerlist.push(0);
		//person to guess
		answerlist.push(0);
		//guess in percs
		n += 1
	}

	right = ""
	left = ""
	check2 = "false";

}