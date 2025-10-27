import dbConnect from "./db/index";
import { app } from "./app";

dbConnect()
  .then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening on port: ${process.env.PORT || 8000}`);
    });

    // Handle server errors
    server.on("error", (error: Error) => {
      console.log("Error while listening !!!", error);
      throw error;
    });
  })
  .catch((error: Error) => {
    console.log("MySQL Connection Failed !!!! ", error);
  });
