const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//connect to database

connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the contact Book" });
});

//Define routes

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contact"));
app.use("/api/auth", require("./routes/auth"));

/// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("contactbook/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "contactbook", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
