let socket = io();
let logs = {
	base:0,
	new:0,
	change:0
}
let runs = {
	base:0,
	new:0,
	change:0
}
let time

socket.on("check", function(data){
	if(logs.base===0 || runs.base===0){
		logs.base = data.logs
		runs.base = data.runs
	}else{
		logs.new = data.logs
		runs.new = data.runs
		newCheck()
	}
	//console.log(logs,runs);
})

function newCheck(){
	let update = {}
	if((runs.new - runs.base)>runs.change){
		console.log("meer logs");
		logs.change = logs.new - logs.base
		badge("logs")
		notify()
	}
	if((runs.new - runs.base)>runs.change){
		console.log("meer runs");
		runs.change = runs.new - runs.base
		badge("runs")
		notify()
	}
}

function notify (){
	if(document.querySelector(".notification")){
		console.log("bestaat");
	}else{
		let today = new Date();
		let hours = ()=>{if(today.getHours()<10){return "0"+today.getHours()}else{return today.getHours()}}
		let minutes = ()=>{if(today.getMinutes()<10){return "0"+today.getMinutes()}else{return today.getMinutes()}}
		time = hours() + ":" + minutes();
		let notification =  document.createElement("div")
		notification.classList.add("alert", "alert-primary", "container-fluid", "notification")
		notification.setAttribute('aria-live', 'polite')
		document.querySelector(".container-fluid").prepend(notification)
	}
	document.querySelector(".notification").innerHTML = `
	<h4 class="alert-heading">New Data</h4>
	<p>There is new data available <a href="#" class="alert-link">reload the page <i class="fas fa-redo"></i></a> for the new data</p>
	<hr>
	<p class="mb-0"><b>${logs.change}</b> New logs</p>
	<p class="mb-0"><b>${runs.change}</b> New runs</p>
	`
}

function badge(type) {
	if(type === "runs"){
		if(document.querySelector(".badge-runs")){
			document.querySelector(".badge-runs").textContent = runs.change
		}else{
			document.querySelector(".runs_link").innerHTML += `<span class="badge badge-info badge-runs">${runs.change}</span>`
		}
	}else if (type === "logs") {
		if(document.querySelector(".badge-logs")){
			document.querySelector(".badge-logs").textContent = logs.change
		}else{
			document.querySelector(".logs_link").innerHTML += `<span class="badge badge-info badge-logs">${logs.change}</span>`
		}
	}
}
