import express, {Express, Request, Response} from "express";
import "dotenv/config";
import accountRoute from "./routes/account.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import lessonRoute from "./routes/lesson.route.js";
import exerciseRoute from "./routes/exercise.route.js";
import imageRoute from "./routes/image.route.js";
import morgan from "morgan";
import achievementRoute from "./routes/achievement.route.js";
import shopRoute from "./routes/shop.route.js";

try {
  const app: Express = express();

  app.use(cookieParser())
    .use(morgan("dev"))
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use("/account", accountRoute)
    .use("/users", userRoute)
    .use("/lessons", lessonRoute)
    .use("/exercises", exerciseRoute)
    .use("/images", imageRoute)
    .use("/achievements", achievementRoute)
    .use("/shop", shopRoute)
    .get("/health", (req: Request, res: Response) => {
      res.sendStatus(200);
    });

  const port = 3000;

  app.listen(port, (): void => {
    console.log(`Server is running on ${process.env.DOMAIN == 'local' ? process.env.SERVER_URL_LOCAL : process.env.SERVER_URL_DEV}`);
  });
} catch (e: any) {
  console.log(e.message)
}