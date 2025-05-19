// connection.js
const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const connect = () => {
  mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.xzotwcd.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  const connection = mongoose.connection;

  connection.on("error", (err) => {
    console.error("❌ Erro ao conectar com o MongoDB:", err);
  });

  connection.once("open", () => {
    console.log("🟢 Conectado com sucesso ao MongoDB!");
  });
};

module.exports = connect;
