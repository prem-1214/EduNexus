import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/conn.js"

dotenv.config({
  path: "../.env",
})

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server is running at http://localhost:${process.env.PORT || 3000}`
      )
    })
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error)
  })
