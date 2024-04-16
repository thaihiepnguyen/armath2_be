import { ExerciseEntity } from "../entities/exercise.entity.js";
import db from "../util/db.js";


async function getExerciseById(id: number): Promise<ExerciseEntity[] | undefined> {
  return db<ExerciseEntity>("exercises").where("exercise_id", id);
}
async function getAllExercise(): Promise<ExerciseEntity[] | undefined> {
  return db<ExerciseEntity>("exercises");
}
async function getAllExerciseByLessonId(id: number): Promise<ExerciseEntity[] | undefined> {
  return db<ExerciseEntity>("exercises").where("lesson_id", id);
}
async function getAllExerciseByTestId(id: number): Promise<ExerciseEntity[] | undefined> {
  return db<ExerciseEntity>("exercises").where("test_id", id);
}

export default {
    getExerciseById,
    getAllExercise,
    getAllExerciseByLessonId,
    getAllExerciseByTestId
}