import db from "../util/db.js";
import {GameConfigEntity} from "../entities/gameConfig.entity.js";
import {GameDataEntity} from "../entities/gameData.entity.js";

interface TGameData {
  id: number;
  question: string;
  answer: string;
  right_answer: string;
}

interface TGame {
  gameConfig: GameConfigEntity;
  gameData: TGameData[];
}

async function getGameByLessonId(id: number): Promise<TGame | undefined> {
  const gameConfig = await db<GameConfigEntity>("game_configs").where("lesson_id", id).first();
  if (!gameConfig) {
    return undefined;
  }
  const gameDataEntities = await db<GameDataEntity>("game_data").where("game_config_id", gameConfig.id);
  const gameData = gameDataEntities.map((gameDataEntity) => {
    return {
      id: gameDataEntity.id,
      question: gameDataEntity.question,
      answer: gameDataEntity.answer,
      right_answer: gameDataEntity.right_answer
    }
  });
  return {
    gameConfig,
    gameData
  }
}

export default {
  getGameByLessonId
}