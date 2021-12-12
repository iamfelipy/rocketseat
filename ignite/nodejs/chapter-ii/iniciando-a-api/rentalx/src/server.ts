import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup());
app.use(router);

app.listen(3000, () => console.log("Server is running!"));
