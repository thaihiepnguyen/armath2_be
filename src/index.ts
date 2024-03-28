import express, {Express, Request, Response} from "express";
import "dotenv/config";
import accountRoute from "./routes/account.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app: Express = express();

// Middleware
app.use(cookieParser());

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

app.listen(process.env.PORT || 3000, (): void => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});