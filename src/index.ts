import express, {Express, Request, Response} from "express";
import "dotenv/config";
import accountRoute from "./routes/account.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import lessonRoute from "./routes/lesson.route.js";
import exerciseRoute from "./routes/exercise.route.js";
import morgan from "morgan";
import achievementRoute from "./routes/achievement.route.js";
import shopRoute from "./routes/shop.route.js";

const app: Express = express();

// Middleware
app.use(cookieParser());
app.use(morgan("dev"));
// Parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use("/account", accountRoute);
app.use("/users", userRoute);
app.get("/health", (req: Request, res: Response) => {
  res.sendStatus(200)
});
app.use("/lessons", lessonRoute);
app.use("/exercises", exerciseRoute);
app.use("/achievements", achievementRoute);
app.use("/shop", shopRoute);

app.listen(process.env.PORT || 3000, (): void => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});