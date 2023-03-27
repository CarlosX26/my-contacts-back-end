import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";

const PORT = process.env.PORT || 3001;

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Database connected.");
    })
    .catch((err) => {
      console.log("database connection failure.❌", err);
    });

  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}🚀`);
  });
})();
