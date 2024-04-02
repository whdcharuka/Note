const mongoose = require('mongoose') // import mongoose library for MongoDB object modeling

// define a Mongoose schema for the note model
const NoteSchema = new mongoose.Schema({
    title: String, // define a field 'title'
    description: String, // define a field 'description'
})

// create a mongoose model named 'notes'
const NoteModel = mongoose.model("notes", NoteSchema)

module.exports = NoteModel