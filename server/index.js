const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config(); // load environment variables from .env file

const NoteModel = require('./models/Notes');

// Initialize the express application
const app = express();

// Middleware setup
app.use(cors());

// Parse incoming request bodies in JSON format
app.use(express.json());

// Parse JSON request bodies using body-parser
app.use(bodyParser.json());


// Connect to MongoDB using the environment variable
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


// async function allows for better handling of asynchronous operations and error handling

// Route for creating a new note
app.post("/createNote", async (req, res) => {
    // Check for required fields
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({ message: "Title and description are required." });
    }

    try {
        const note = new NoteModel(req.body); // create a new NoteModel instance with request body
        const savedNote = await note.save(); // save the new note to the database

        // Extract only desired properties from savedNote
        const responseNote = {
            id: savedNote.id,
            title: savedNote.title,
            description: savedNote.description,
        };

        res.status(201).json({ message: "Note created successfully.", note: responseNote });
    } catch (err) {
        // Handle specific errors
        if (err.name === "ValidationError") {
            res.status(400).json({ message: "Invalid note data provided." }); // validation errors
        } else {
            console.error(err);
            res.status(500).json({ message: "Error creating note." }); // general server error
        }
    }
});


// Route for fetching all notes
app.get('/', async (req, res) => {
    try {
        const notes = await NoteModel.find({}); // find all notes in the database
        res.json(notes); // send the array of notes as JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving notes." }); // send error response if fetching notes fails
    }
});


// Route for fetching a specific note by its ID
app.get("/getNote/:id", async (req, res) => {
    const id = req.params.id; // extract note ID from request parameters
    try {
        const note = await NoteModel.findById(id); // find note by ID in the database
        if (note) {
            res.json(note); // send the found note as JSON response
        } else {
            res.status(404).json({ message: "Note not found." }); // send error response if note is not found
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving note." }); // send error response if fetching note fails
    }
});


// Route for updating a note by ID
app.put("/updateNote/:id", async (req, res) => {
    const id = req.params.id; // extract note ID from request parameters

    // Validate required fields
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({ message: "Title and description are required." });
    }

    try {
        const updatedNote = await NoteModel.findByIdAndUpdate(
            { _id: id },
            { title: req.body.title, description: req.body.description },
            { new: true } // Return the updated document
        );
        if (updatedNote) {
            res.status(200).json({ message: "Note updated successfully.", note: updatedNote });
        } else {
            res.status(404).json({ message: "Note not found." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating note." });
    }
});


// Route for deleting a note by its ID
app.delete("/deleteNote/:id", async (req, res) => {
    const id = req.params.id; // extract note ID from request parameters

    try {
        const deletedNote = await NoteModel.findByIdAndDelete(id); // find and delete note by ID
        if (deletedNote) {
            res.status(200).json({ message: "Note deleted successfully.", note: deletedNote});
        } else {
            res.status(404).json({ message: "Note not found." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting note." });
    }
});


// Start the Express server on port 3001
app.listen(3001, () => {
    console.log("Server is Running");
});
