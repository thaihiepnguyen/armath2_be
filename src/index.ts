import express, {Express, Request, Response} from "express";
import "dotenv/config";
import accountRoute from "./routes/account.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import lessonRoute from "./routes/lesson.route.js";
import exerciseRoute from "./routes/exercise.route.js";
import questionResultRoute from "./routes/questionResult.route.js";
import testResultRoute from "./routes/testResult.route.js";
import morgan from "morgan";
import achievementRoute from "./routes/achievement.route.js";
import shopRoute from "./routes/shop.route.js";
import testRoute from "./routes/test.route.js";
import testPurchaseRoute from "./routes/testPurchase.route.js"; 

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
app.use("/question_result", questionResultRoute);
app.use("/test_result", testResultRoute);
app.use("/achievements", achievementRoute);
app.use("/test",testRoute);
app.use("/test_purchase",testPurchaseRoute);
app.use("/shop", shopRoute);

const port = 3000;

app.listen(port, (): void => {
    console.log(`Server is running on ${process.env.DOMAIN == 'local' ? process.env.SERVER_URL_LOCAL : process.env.SERVER_URL_DEV}`);
});