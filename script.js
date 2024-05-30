document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit');
    const resetButton = document.getElementById('reset');
    const timerDisplay = document.getElementById('timerDisplay');
    let timerInterval;

    submitButton.addEventListener('click', run);
    resetButton.addEventListener('click', () => {
        window.location.reload();
        clearInterval(timerInterval);
    });

    function startCountdown(duration) {
        let timer = duration;
        timerDisplay.style.display = 'block';

        timerInterval = setInterval(() => {
            let minutes = Math.floor(timer / 60);
            let seconds = timer % 60;

            timerDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;

            if (--timer < 0) {
                clearInterval(timerInterval);
                stopSimulation();
                timerDisplay.style.display = 'none';
            }
        }, 1000);
    }

    function pad(number) {
        return number.toString().padStart(2, '0');
    }

    function stopSimulation() {
        // Display a message to the user
        const messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';
    
        // Wait for a few seconds before reloading the page
        setTimeout(() => {
            window.location.reload();
        }, 3000); // Change this value to adjust the delay
    }
    
    function run() {
        let countdownValue = document.getElementById('countdown').value;
        let n = document.getElementById("color").value;
        let set_time = document.getElementById("time").value;
        let unit = document.getElementById("unit").value;
        let view = document.getElementById("view").value;

        if (countdownValue && countdownValue > 0 && Number(n) >= 0 && Number.isInteger(Number(n)) && n !== "" && unit !== "unit" && view !== "select") {
            // Clear error message if everything is correct
            document.getElementById("error").innerHTML = "";

            // Start the simulation
            startSimulation(n, set_time, unit, view);

            // Start the countdown timer
            startCountdown(countdownValue);
        } else {
            // Display error message if any input is missing or invalid
            // document.getElementById("error").innerHTML = "<strong>Please fill out all required fields correctly!</strong>";
            document.getElementById("error").style.color = "red";
            if(((Number(n)<0 || !Number.isInteger(Number(n))|| n==="") && countdownValue <=0) || ((Number(n)<0 || !Number.isInteger(Number(n))|| n==="") && (unit === "unit")) || (Number(n)<0 || !Number.isInteger(Number(n))|| n==="")&&view === "select" || countdownValue <=0 &&unit === "unit" ||view === "select" && countdownValue <=0 ||view === "select" &&unit === "unit" ||
            (Number(n)<0 || !Number.isInteger(Number(n))|| n==="") && countdownValue <=0 && view === "select" || (Number(n)<0 || !Number.isInteger(Number(n))|| n==="") && countdownValue <=0 && unit === "unit" || (Number(n)<0 || !Number.isInteger(Number(n))|| n==="") && countdownValue <=0 && view === "select" && unit === "unit"){
                document.getElementById("error").innerHTML = "<strong>Please fill out all required fields correctly!</strong>";
            }
            else if(Number(n)<0 || !Number.isInteger(Number(n))|| n===""){
                document.getElementById("error").innerHTML = "<strong>The Number of Colours must be a positive integer.</strong>"; 
            }else if(countdownValue <=0){
                document.getElementById("error").innerHTML = "<strong>The CountDown Timer must be a positive value greater than zero.</strong>"; 
            }else if(unit === "unit"){
                document.getElementById("error").innerHTML = "<strong>The Unit field must be selected.</strong>"; 
            }else if(view === "select"){
                document.getElementById("error").innerHTML = "<strong>The View field must be selected.</strong>"; 
            }
            return;
        }
    }

    function startSimulation(n, set_time, unit, view) {
        // Move simulation code here
        alert("Double click on the screen to reload!");

        document.body.children[0].style.display = 'none';
        document.body.style.cursor = "pointer";

        document.body.addEventListener("dblclick", () => {
            let cnf1 = confirm("Are you sure you want to reload?");
            if (cnf1) {
                window.location.reload();
            }
        });

        if (unit === "seconds") {
            set_time *= 1000;
        }

        function getRandomColor() {
            let val1 = parseInt(0 + Math.random() * 256);
            let val2 = parseInt(0 + Math.random() * 256);
            let val3 = parseInt(0 + Math.random() * 256);
            return `rgb(${val1}, ${val2}, ${val3})`;
        }

        function numberColors(num) {
            let colors = `${getRandomColor()}`;
            while (num > 1) {
                colors += `, ${getRandomColor()}`;
                num--;
            }
            return colors;
        }

        if (n == 1) {
            document.body.style.backgroundColor = getRandomColor();
            setInterval(() => {
                document.body.style.backgroundColor = getRandomColor();
            }, set_time);
        } else {
            let gradientType = view === "conic" ? "conic-gradient" : view === "linear" ? "linear-gradient" : "radial-gradient";
            document.body.style.background = `${gradientType}(${numberColors(n - 1)}, ${getRandomColor()})`;
            setInterval(() => {
                document.body.style.background = `${gradientType}(${numberColors(n - 1)}, ${getRandomColor()})`;
            }, set_time);
        }
    }
});
