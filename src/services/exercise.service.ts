import { ExerciseEntity } from "../entities/exercise.entity.js";
import db from "../util/db.js";


async function getExerciseById(id: number): Promise<ExerciseEntity[] | undefined> {
  return db<ExerciseEntity>("exercises").where("exercise_id", id);
}
async function getAllExercise(): Promise<ExerciseEntity[] | undefined> {
  return db<ExerciseEntity>("exercises");
}



export default {
    getExerciseById,
    getAllExercise
}