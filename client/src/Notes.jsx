// displaying a list of notes 

import React, { useState, useEffect } from "react";
import axios from "axios"; // axios for making HTTP requests
import { Link, useNavigate } from "react-router-dom";

function Notes() { // functional component
  const [notes, setNotes] = useState([]); // initialize state variable for notes, initially an empty array
  const MAX_CHARACTERS = 13; // define constant for maximum characters to display in note titles and descriptions
  const navigate = useNavigate();

  useEffect(() => { // fetch notes data from the server 
    axios.get("https://note-server-phi.vercel.app")
      .then((result) => setNotes(result.data)) // set the fetched notes data to the state variable
      .catch((err) => console.log(err)); 
  }, []); // empty array ensures the effect runs only once

  const handleViewNote = (id) => { // function to handle viewing a specific note
    navigate(`/note/${id}`); // navigate to the note details route with the id of the note
  };

  return (
    <div className="note-container">
      <Link to="/create" className="add-note-btn">+ Add Note</Link>
      <div className="note-list">
        {notes.map((note, index) => ( // map over the notes array to render each note
          <div key={index} className="note-item" onClick={() => handleViewNote(note._id)}>
            <h3> 
              {note.title.length > MAX_CHARACTERS // display shortened title if it exceeds MAX_CHARACTERS
                ? `${note.title.substring(0, MAX_CHARACTERS)}...`
                : note.title}
            </h3>
            <p>
              {note.description.length > MAX_CHARACTERS // display shortened description if it exceeds MAX_CHARACTERS
                ? `${note.description.substring(0, MAX_CHARACTERS)}...`
                : note.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;

