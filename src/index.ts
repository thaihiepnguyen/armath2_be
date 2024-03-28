import express, {Express, Request, Response} from "express";
import "dotenv/config";
import accountRoute from "./routes/account.route.js";

const app: Express = express();

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

app.use("/account", accountRoute);
app.get("/health", (req: Request, res: Response) => {
  res.sendStatus(200)
});

app.listen(process.env.PORT, (): void => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});