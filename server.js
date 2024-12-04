import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";

const app = express();
app.use(cors());

// Define the path to the static files
const publicPath = path.resolve("public");

// Serve static files (HTML, JS, CSS)
app.use(express.static(publicPath));

// Serve welcome.html when the root path ("/") is requested
app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "welcome.html"));
});

// Serve index.html for clevelandart route
app.get("/clevelandart", (req, res) => {
    res.sendFile(path.join(publicPath, "clevelandart.html"));
});

// API route to fetch creators data from Cleveland Museum of Art
app.get("/api/clevelandart", async (req, res) => {
    try {
        const response = await fetch("https://openaccess-api.clevelandart.org/api/creators");
        const data = await response.json();
        res.json(data); // Respond with JSON data (this is for API call)
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
    }
});

// API route to fetch an object from the MET Museum
app.get("/metmuseum", async (req, res) => {   
    res.sendFile(path.join(publicPath, "metmuseum.html"));
});

app.get("/api/metmuseum", async (req, res) => {
    try {
        const response = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/45734");
        const data = await response.json();
        res.json(data); // Respond with JSON data
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
    }
});

// API route to fetch an object from the MET Museum
app.get("/louvre", async (req, res) => {   
    res.sendFile(path.join(publicPath, "louvre.html"));
});

app.get("/api/louvre", async (req, res) => {
    try {
        const response = await fetch("https://collections.louvre.fr/ark:/53355/cl010052603.json");
        const data = await response.json();
        res.json(data); // Respond with JSON data
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
    }
});
app.get("/api/louvre2", async (req, res) => {
    try {
        const response = await fetch("https://collections.louvre.fr/en/ark:/53355/cl010066174.json");
        const data = await response.json();
        res.json(data); // Respond with JSON data
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
    }
});
app.get("/api/louvre3", async (req, res) => {
    try {
        const response = await fetch("https://collections.louvre.fr/en/ark:/53355/cl010000029.json");
        const data = await response.json();
        res.json(data); // Respond with JSON data
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
    }
});
// Start the server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
