

window.onload = function(){
    let button = document.getElementById("calculate");
    button.addEventListener("click", calculateLove);
}

function calculateLove(){
    let yourName = document.getElementById("your-name").value;
    let crushName = document.getElementById("crush-name").value;

    if(yourName != "" && crushName != ""){
        let percentage = Math.floor(Math.random()* 101 );// Math.random give number between 0.to 1 but not 1.
        document.getElementById("result-message").innerText = yourName + " and " + crushName + " chance of love:"
        document.getElementById("result-percentage").innerText = percentage.toString() + "%"
        }
    if(yourName === "Prashast Rawat" && crushName === "Khushbu Rana"){
        document.getElementById("result-message").innerText = yourName + " and " + crushName + " chance of love:"
        document.getElementById("result-percentage").innerText =  "100%"
       
    }
    if(yourName === "Khushbu Rana" && crushName === "Prashast Rawat"){
        document.getElementById("result-message").innerText = yourName + " and " + crushName + " chance of love:"
        document.getElementById("result-percentage").innerText =  "100%"
       
    }
}

