const express = require("express");
const dbConfig = require("./src/config/db.config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./src/integration");
const Role = db.role;
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to WDS application." });
});

// routes
require("./src/api/routes/auth.routes")(app);
require("./src/api/routes/user.routes")(app);
require("./src/api/routes/product.routes")(app);
//set port
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
