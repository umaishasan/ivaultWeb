import express from "express";
import cors from "cors";

const app = express();

// Allow requests from the frontend dev server and enable credentials
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true }));
app.use(express.json());

app.get("/api/message", (req, res) => {
    res.json({
        message: "Hello from Node.js backend!"
    });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    if(email === "umais@gmail.com" || password === "1234") {
        return res.status(200).json({success: true,  message: "Successfully login." });
    }else{
        return res.status(400).json({success: false,  message: "Invalid credentials." });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});