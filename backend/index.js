const express = require("express");
const cors = require("cors");
const commentsRouter = require("./routes/comments");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api", commentsRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
