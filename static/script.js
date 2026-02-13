async function analyzeMood() {

    let text = document.getElementById("moodText").value;

    let response = await fetch("/analyze", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text: text
        })
    });

    let data = await response.json();

    document.getElementById("result").innerHTML = `

        <div class="card p-3 mt-3">

            <h4>Mood: ${data.mood}</h4>

            <p><b>Plan:</b> ${data.plan}</p>

            <p><b>Tip:</b> ${data.tip}</p>

            <a href="${data.music}"
            target="_blank"
            class="btn btn-info">
            Play Music
            </a>

        </div>
    `;
}


let time = 1500;
let interval;

function startTimer(){

    clearInterval(interval);

    interval = setInterval(function(){

        let minutes = Math.floor(time/60);
        let seconds = time%60;

        document.getElementById("timer").innerText =
        minutes + ":" + String(seconds).padStart(2,"0");

        time--;

        if(time<0){

            clearInterval(interval);

            alert("Session Complete!");
        }

    },1000);
}


function resetTimer(){

    clearInterval(interval);

    time = 1500;

    document.getElementById("timer").innerText = "25:00";
}