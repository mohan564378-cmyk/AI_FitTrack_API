def generate_recommendation(user, workouts):

    goal = user.fitness_goal.lower()

    if "muscle" in goal:
        recommendation = (
            "Focus on progressive strength training "
            "and adequate protein intake."
        )

    elif "weight loss" in goal:
        recommendation = (
            "Focus on regular cardio, strength training "
            "and a balanced diet."
        )

    else:
        recommendation = (
            "Maintain a balanced combination of "
            "strength training and cardio."
        )

    return {
        "user_id": user.id,
        "goal": user.fitness_goal,
        "recommendation": recommendation,
        "workouts_completed": len(workouts)
    }