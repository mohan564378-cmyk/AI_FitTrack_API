const API_URL = "http://127.0.0.1:8000";


// =========================
// CREATE USER
// =========================

async function createUser() {

    const data = {
        name: document.getElementById("name").value,
        age: Number(document.getElementById("age").value),
        weight: Number(document.getElementById("weight").value),
        height: Number(document.getElementById("height").value),
        fitness_goal: document.getElementById("goal").value
    };

    try {

        const response = await fetch(`${API_URL}/users`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });

        const result = await response.json();

        alert(
            "User created successfully!\nUser ID: "
            + result.id
        );

    } catch (error) {

        alert("Error connecting to API.");
        console.error(error);
    }
}


// =========================
// ADD WORKOUT
// =========================

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
            alert(result.detail);
            return;
        }

        alert("Workout added successfully!");

    } catch (error) {

        alert("Error connecting to API.");
        console.error(error);
    }
}


// =========================
// ADD PROGRESS
// =========================

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
            alert(result.detail);
            return;
        }

        alert("Progress added successfully!");

    } catch (error) {

        alert("Error connecting to API.");
        console.error(error);
    }
}


// =========================
// AI RECOMMENDATION
// =========================

async function getRecommendation() {

    const userId =
        document.getElementById("aiUserId").value;

    const resultBox =
        document.getElementById("result");

    try {

        const response = await fetch(
            `${API_URL}/ai/recommendation/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {

            resultBox.innerHTML =
                `<p>${data.detail}</p>`;

            return;
        }

        resultBox.innerHTML = `
            <h3>Recommendation</h3>

            <p>
                <strong>User ID:</strong>
                ${data.user_id}
            </p>

            <p>
                <strong>Goal:</strong>
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
            "<p>Error connecting to API.</p>";

        console.error(error);
    }
}