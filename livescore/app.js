import express from "express";
import axios from "axios"; 
import http from "http";
import { Server } from 'socket.io';
import bodyParser from "body-parser";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST'],
    },
});

const port = 5000;
const API_URL = "http://localhost:7000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
// const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.json());

const updatedScore = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        const update = response.data;
        io.emit('update', update);
    } catch (error) {
        console.error('Error fetching live score:', error);
    }
};

setInterval(updatedScore, 10000);

// Handle client connections
io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Fetch and send current score to the newly connected client
    updatedScore().then(() => {
        //Send initial score update to the newly connected client
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.get("/", (req, res) => {
    res.render("page.ejs");
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
