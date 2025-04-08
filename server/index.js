const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));

const start = async () => {
    try {
      app
        .listen(PORT, () => {
          console.log("Server started on port ", PORT);
        })
        .on("error", (err) => {
          if (err.code === "EADDRINUSE") {
            console.error(`Port ${PORT} is already in use`);
            process.exit(1);
          }
        });
    } catch (e) {
      console.error("Ошибка при запуске сервера:", e);
      console.error("Полная ошибка:", e);
      process.exit(1);
    }
  };
  
  start();