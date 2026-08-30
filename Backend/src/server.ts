import express from "express";
import cors from "cors";
import { LoginUser } from "./Controller";
import { GetUsers } from "./Controller";
import { GetRbacData } from "./Controller";
const app = express();
// Allow requests from the frontend dev server and enable credentials
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true }));
app.use(express.json());

app.get("/api/message", (req, res) => {
    res.json({message: "Hello from Node.js backend!"});
});

app.post("/api/login", async(req, res) => {
    const { email, password } = req.body;
    const result = await LoginUser(email, password);
    res.status(result.success ? 200 : 401).json(result);
});

app.get("/api/users", async (req, res) => {
    const result = await GetUsers();
    res.json(result);
});

app.get("/api/rbac", async (req, res) => {
    const result = await GetRbacData();
    res.json(result);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});