import express from "express";
import cors from "cors";
import { GetSysteHealth, GetUserData, LoginUser, GetRbacData, GetServerAvailability, GetDeviceConnection } from "./Controller";

const app = express();

// Allow requests from the frontend dev server and enable credentials
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true }));
app.use(express.json());
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
app.get("/api/message", (req, res) => {
    res.json({message: "Hello from Node.js backend!"});
});

app.post("/api/login", async(req, res) => {
    const { email, password } = req.body;
    const result = await LoginUser(email, password);
    res.status(result.success ? 200 : 401).json(result);
});

app.get("/api/rbac", async (req, res) => {
    const result = await GetRbacData();
    res.json(result);
});

app.get("/api/systemhealth", async (req, res) => {
    const result = await GetSysteHealth();
    res.json(result);
});

app.get("/api/server", async (req, res) => {
    const result = await GetServerAvailability();
    res.json(result);
});

app.get("/api/userdata", async (req, res) => {
    const result = await GetUserData();
    res.json(result);
}); 

app.get("/api/deviceconnection", async (req, res) => {
    const result = await GetDeviceConnection();
    res.json(result);
});