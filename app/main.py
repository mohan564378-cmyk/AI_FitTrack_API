from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from .models import User, Workout, Progress
from .schemas import (
    UserCreate,
    UserResponse,
    WorkoutCreate,
    WorkoutResponse,
    ProgressCreate,
    ProgressResponse
)
from .ai import generate_recommendation


# =========================
# DATABASE
# =========================

Base.metadata.create_all(bind=engine)


# =========================
# FASTAPI APPLICATION
# =========================

app = FastAPI(
    title="AI FitTrack API",
    description="Fitness tracking API with AI recommendations",
    version="1.0.0"
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# HOME
# =========================

@app.get("/")
def home():
    return {
        "project": "AI FitTrack API",
        "status": "running",
        "message": "Welcome to AI FitTrack API"
    }


# =========================
# USERS
# =========================

@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@app.post("/users", response_model=UserResponse)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    new_user = User(
        name=user.name,
        age=user.age,
        weight=user.weight,
        height=user.height,
        fitness_goal=user.fitness_goal
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


# =========================
# WORKOUTS
# =========================

@app.post("/workouts", response_model=WorkoutResponse)
def create_workout(
    workout: WorkoutCreate,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == workout.user_id
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    new_workout = Workout(
        user_id=workout.user_id,
        exercise=workout.exercise,
        sets=workout.sets,
        reps=workout.reps,
        duration=workout.duration
    )

    db.add(new_workout)
    db.commit()
    db.refresh(new_workout)

    return new_workout


@app.get("/workouts/{user_id}")
def get_workouts(
    user_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Workout).filter(
        Workout.user_id == user_id
    ).all()


# =========================
# PROGRESS
# =========================

@app.post("/progress", response_model=ProgressResponse)
def create_progress(
    progress: ProgressCreate,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == progress.user_id
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    new_progress = Progress(
        user_id=progress.user_id,
        weight=progress.weight,
        date=progress.date
    )

    db.add(new_progress)
    db.commit()
    db.refresh(new_progress)

    return new_progress


@app.get("/progress/{user_id}")
def get_progress(
    user_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Progress).filter(
        Progress.user_id == user_id
    ).all()


# =========================
# AI RECOMMENDATION
# =========================

@app.get("/ai/recommendation/{user_id}")
def get_ai_recommendation(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    workouts = db.query(Workout).filter(
        Workout.user_id == user_id
    ).all()

    return generate_recommendation(user, workouts)