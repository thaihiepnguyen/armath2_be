import express, {Express, Request, Response} from "express";
import "dotenv/config";
import accountRoute from "./routes/account.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import lessonRoute from "./routes/lesson.route.js";
import exerciseRoute from "./routes/exercise.route.js";
import imageRoute from "./routes/image.route.js";
import morgan from "morgan";
import fs from 'node:fs';

const folderUsers = './dist/images/users';
const folderBooks = './dist/images/books';
try {
  if (!fs.existsSync(folderUsers)) {
    fs.mkdir(folderUsers, {recursive: true}, err => {})
  }
  if (!fs.existsSync(folderBooks)) {
    fs.mkdir(folderBooks, {recursive: true}, err => {})
  }
} catch (err) {
  console.error(err);
}

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
app.use("/lessons", lessonRoute);
app.use("/exercises", exerciseRoute);
app.use("/images", imageRoute);

app.get("/health", (req: Request, res: Response) => {
  res.sendStatus(200)
});



app.listen(process.env.PORT || 3000, (): void => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});