import {Request, Response} from "express";
import gameService from "../services/game.service.js";

async function getGameByLessonId(req: Request, res: Response) {
  const lessonId = req.params.id;
  if (!lessonId) {
    return res.status(400).send({
      message: "Lesson id is required",
      isSuccessful: false
    })
  }
  if (isNaN(Number(lessonId))) {
    return res.status(400).send({
      message: "Lesson id must be a number",
      isSuccessful: false
    })
  }
  const game = await gameService.getGameByLessonId(+lessonId);
  if (!game) {
    return res.status(404).send({
      message: "Game not found",
      isSuccessful: false
    })
  }
  return res.status(200).send({
    message: "Game found",
    data: game,
    isSuccessful: true
  });
}


export default {
  getGameByLessonId
}