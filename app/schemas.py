from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str
    age: int
    weight: float
    height: float
    fitness_goal: str


class UserResponse(UserCreate):
    id: int

    class Config:
        from_attributes = True


class WorkoutCreate(BaseModel):
    user_id: int
    exercise: str
    sets: int
    reps: int
    duration: int


class WorkoutResponse(WorkoutCreate):
    id: int

    class Config:
        from_attributes = True


class ProgressCreate(BaseModel):
    user_id: int
    weight: float
    date: str


class ProgressResponse(ProgressCreate):
    id: int

    class Config:
        from_attributes = True