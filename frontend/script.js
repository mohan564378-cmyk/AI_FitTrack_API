// ==========================================
// AI FitTrack Backend URL
// ==========================================

const API_URL = "https://ai-fittrack-api.onrender.com";


// ==========================================
// CREATE USER
// ==========================================

async function createUser() {

    const data = {

        name: document.getElementById("name").value,

        age: Number(
            document.getElementById("age").value
        ),

        weight: Number(
            document.getElementById("weight").value
        ),

        height: Number(
            document.getElementById("height").value
        ),

        fitness_goal:
            document.getElementById("goal").value

    };


    if (
        !data.name ||
        !data.age ||
        !data.weight ||
        !data.height ||
        !data.fitness_goal
    ) {

        alert("Please fill all user details.");

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/users`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        const result = await response.json();


        if (!response.ok) {

            alert(
                result.detail ||
                "Unable to create user."
            );

            return;
        }


        alert(
            "User created successfully!\n\n" +
            "User ID: " +
            result.id
        );


        document.getElementById("workoutUserId").value =
            result.id;

        document.getElementById("progressUserId").value =
            result.id;

        document.getElementById("aiUserId").value =
            result.id;


    } catch (error) {

        alert(
            "Error connecting to AI FitTrack API."
        );

        console.error(error);
    }
}


// ==========================================
// ADD WORKOUT
// ==========================================

async function addWorkout() {

    const data = {

        user_id: Number(
            document.getElementById("workoutUserId").value
        ),

        exercise:
            document.getElementById("exercise").value,

        sets: Number(
            document.getElementById("sets").value
        ),

        reps: Number(
            document.getElementById("reps").value
        ),

        duration: Number(
            document.getElementById("duration").value
        )

    };


    if (
        !data.user_id ||
        !data.exercise ||
        !data.sets ||
        !data.reps ||
        !data.duration
    ) {

        alert("Please fill all workout details.");

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/workouts`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        const result = await response.json();


        if (!response.ok) {

            alert(
                result.detail ||
                "Unable to add workout."
            );

            return;
        }


        alert(
            "Workout added successfully!"
        );


    } catch (error) {

        alert(
            "Error connecting to AI FitTrack API."
        );

        console.error(error);
    }
}


// ==========================================
// ADD PROGRESS
// ==========================================

async function addProgress() {

    const data = {

        user_id: Number(
            document.getElementById("progressUserId").value
        ),

        weight: Number(
            document.getElementById("progressWeight").value
        ),

        date:
            document.getElementById("progressDate").value

    };


    if (
        !data.user_id ||
        !data.weight ||
        !data.date
    ) {

        alert("Please fill all progress details.");

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/progress`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        const result = await response.json();


        if (!response.ok) {

            alert(
                result.detail ||
                "Unable to add progress."
            );

            return;
        }


        alert(
            "Progress added successfully!"
        );


    } catch (error) {

        alert(
            "Error connecting to AI FitTrack API."
        );

        console.error(error);
    }
}


// ==========================================
// AI RECOMMENDATION
// ==========================================

async function getRecommendation() {

    const userId =
        document.getElementById("aiUserId").value;

    const resultBox =
        document.getElementById("result");


    if (!userId) {

        resultBox.innerHTML =
            "<p>Please enter User ID.</p>";

        return;
    }


    resultBox.innerHTML =
        "<p>Loading AI recommendation...</p>";


    try {

        const response = await fetch(
            `${API_URL}/ai/recommendation/${userId}`
        );


        const data =
            await response.json();


        if (!response.ok) {

            resultBox.innerHTML =
                `<p>${data.detail || "User not found."}</p>`;

            return;
        }


        resultBox.innerHTML = `

            <h3>🤖 AI Recommendation</h3>

            <p>
                <strong>User ID:</strong>
                ${data.user_id}
            </p>

            <p>
                <strong>Fitness Goal:</strong>
                ${data.goal}
            </p>

            <p>
                <strong>AI Advice:</strong>
                ${data.recommendation}
            </p>

            <p>
                <strong>Workouts Completed:</strong>
                ${data.workouts_completed}
            </p>

        `;


    } catch (error) {

        resultBox.innerHTML =
            "<p>Error connecting to AI FitTrack API.</p>";

        console.error(error);
    }
}