const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'restaurant-booking' folder
app.use(express.static(path.join(__dirname)));

// Root route to serve the HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Dummy database: Tables (with type: 2-seat or 4-seat and booked status)
let tables = [
    { booked: false, type: 2 },
    { booked: false, type: 4 },
    { booked: false, type: 2 },
    { booked: false, type: 4 },
    { booked: false, type: 2 },
    { booked: false, type: 4 },
    { booked: false, type: 2 },
    { booked: false, type: 4 },
    { booked: false, type: 2 },
    { booked: false, type: 4 }
];

// Get table availability
app.get("/tables", (req, res) => {
    res.json(tables);  // Send back both booked status and seat type
});

// Book a table
app.post("/book", (req, res) => {
    const { tableIndex } = req.body;
    if (tables[tableIndex].booked === false) {
        tables[tableIndex].booked = true;
        res.json({ success: true, message: "Table booked!" });
    } else {
        res.status(400).json({ success: false, message: "Table already booked!" });
    }
});

// Unbook a table
app.post("/unbook", (req, res) => {
    const { tableIndex } = req.body;
    if (tables[tableIndex].booked === true) {
        tables[tableIndex].booked = false;
        res.json({ success: true, message: "Table unbooked!" });
    } else {
        res.status(400).json({ success: false, message: "Table is already available!" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
