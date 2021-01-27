function openForm() {
	$("#myForm").css("display", "block");
}
$(".timerbutton").attr("disabled");
function show_longbr() {
	$(".lgrange").empty();
	var o = $("<option></option>").text(0);
	$(".lgrange").append(o);
	var total_sess = $(".no_sess :selected").val();
	for (let i = 2; i < total_sess - 1; i++) {
		o = $("<option></option>").text(i);
		$(".lgrange").append(o);
	}
	if (total_sess >= 4) {
		$(".lgbreak").css("display", "block");
	} else {
		$(".lgbreak").css("display", "none");
	}

	if (total_sess < 4) {
		$(".timerbutton").prop("disabled", false);
	}
}

function brlen() {
	var no_of_lgbr = $(".lgrange :selected").val();
	if (no_of_lgbr > 0) {
		$(".lgbr_len").css("display", "block");
		$(".timerbutton").prop("disabled", true);
	} else {
		$(".lgbr_len").css("display", "none");
		$(".timerbutton").prop("disabled", false);
	}
}

function lgbrValidate() {
	var lgbr_len = $(".lgbr_len :selected").val();
	var no_of_lgbr = $(".lgrange :selected").val();

	if (lgbr_len == 0 && no_of_lgbr > 0) {
		$(".timerbutton").prop("disabled", true);
		$(".lgbr_len").addClass("is-invalid");
	} else {
		$(".lgbr_len").removeClass("is-invalid");
		$(".timerbutton").prop("disabled", false);
	}
}

// ------------ Rendering Actual Timer ----------- //

// Getting current timer value
var wm = document.querySelector(".wmin");
var ws = document.querySelector(".wsec");

var bm = document.querySelector(".bmin");
var bs = document.querySelector(".bsec");

var lbm = document.querySelector(".lbmin");
var lbs = document.querySelector(".lbsec");

var brtext = document.querySelector("h3.btimer");
var start_timer;

//Audio to play after end of each sess
var x = document.querySelector(".sound");
function Playbell() {
	x.play();
}
//User input
var no_of_sess;
var br_leng;
var lgbr_fre;
var lgbr_len;
var curr_sess;
var count = 1;

function closeForm() {
	$(".start_timer").css("display", "none");
	no_of_sess = $(".no_sess :selected").val();
	br_leng = $(".br_len :selected").val();
	bm.innerText = br_leng;
	lgbr_fre = $(".lgrange :selected").val();
	lgbr_len = $(".lgbr_len :selected").val();
	$("#Modal").modal("toggle");

	if (start_timer === undefined) {
		start_timer = setInterval(timer, 1000);
	}
}

function timer() {
	$(".wtimer").css("display", "flex");
	if (ws.innerText != 0) {
		ws.innerText--;
	} else if (wm.innerText != 0 && ws.innerText == 0) {
		ws.innerText = 59;
		wm.innerText--;
	}

	if (wm.innerText == 0 && ws.innerText == 0) {
		Playbell();
	}
	if (wm.innerText == 0 && ws.innerText == 0) {
		// work timer finished
		$(".wtimer").css("display", "none");
		$(".btimer").css("display", "flex");

		if (count == no_of_sess) {
			clearInterval(start_timer);
			$(".btimer").css("display", "none");
			$(".wtimer").css("display", "none");
			$(".start_timer").css("display", "block");
			Playbell();
			wm.innerText = 25;
			ws.innerText = 0;
			bm.innerText = "";
			bs.innerText = 0;
			start_timer = undefined;
		}

		if (bs.innerText != 0) {
			bs.innerText--;
		} else if (bm.innerText != 0 && bs.innerText == 0) {
			bs.innerText = 59;
			bm.innerText--;
		} else if (bm.innerText == 0 && bs.innerText == 0) {
			Playbell();
			count++;
			if (count == lgbr_fre) {
				wm.innerText = 25;
				ws.innerText = 0;
				bm.innerText = lgbr_len;
				bs.innerText = 0;
				lgbr_fre = lgbr_fre + lgbr_fre;
				brtext.innerText = "Long break";
			} else {
				wm.innerText = 25;
				ws.innerText = 0;
				bm.innerText = br_leng;
				bs.innerText = 0;
				brtext.innerText = "Short break";
			}
			$(".btimer").css("display", "none");
		}
	}
}

function reset() {
	clearInterval(start_timer);
	$(".btimer").css("display", "none");
	$(".wtimer").css("display", "none");
	$(".start_timer").css("display", "block");
	wm.innerText = 25;
	ws.innerText = 0;
	bm.innerText = "";
	bs.innerText = 0;
	start_timer = undefined;
}
