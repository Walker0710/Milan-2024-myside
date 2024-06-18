import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 7000;

//Events API
// In-memory data store
let matches = [
    {
        id: 1,
        team1: "Charkha",
        team2: "Kalam",
        venue: "SNCC Badminton Court",
        startTime: "1:00 PM",
        score: {
            team1: {
                set1: "0",
                set2: "0",
                set3: "0",
            },
            team2: {
                set1: "0",
                set2: "0",
                set3: "0",
            },
        },
    },
    {
        id: 2,
        team1: "VVS",
        team2: "Bhabha",
        venue: "SNCC Badminton Court",
        startTime: "1:15 PM",
        score: {
            team1: {
                set1: "0",
                set2: "0",
                set3: "1",
            },
            team2: {
                set1: "0",
                set2: "0",
                set3: "0",
            },
        },
    },
];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET All events 
app.get("/", (req, res) => {
    console.log(matches);
    res.json(matches);
});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});






