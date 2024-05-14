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

async function getExerciseByType(type: string): Promise<ExerciseEntity[] | undefined> {
  const result = await db<ExerciseEntity>("exercises").where("type", type);
  return result.length > 0 ? result : undefined;
}

async function getExerciseByChapterId(id: number): Promise<ExerciseEntity[] | undefined> {
  return db<ExerciseEntity>("exercises")
    .join("lessons", "exercises.lesson_id", "lessons.lesson_id")
    .select("exercises.*")
    .where("lessons.chapter_id", id);
}

export default {
    getExerciseById,
    getAllExercise,
    getAllExerciseByLessonId,
    getAllExerciseByTestId,
    getExerciseByType,
    getExerciseByChapterId
}