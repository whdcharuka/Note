// view, edit, delete note

import React, { useState, useEffect } from "react";
import axios from "axios"; // axios for making HTTP requests
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function NoteDetails() { // functional components
  const { id } = useParams(); // get the id parameter from the URL using useParams hook
  const navigate = useNavigate();
  const [note, setNote] = useState(null); // initialize state variable for note, initially set to null

  useEffect(() => { // fetch note data
    axios.get(`https://note-server-phi.vercel.app/getNote/${id}`) // fetch note data from the server based on the id
      .then((result) => setNote(result.data)) // set the fetched note data to the state variable
      .catch((err) => console.log(err));
  }, [id]);

  const handleEditNote = () => { // function to handle editing
    navigate(`/update/${id}`); // navigate to UpdateNote.jsx to handle editing
  };


  const handleDeleteNote = () => { // function to handle deleting
    axios.delete(`https://note-server-phi.vercel.app/deleteNote/${id}`)
      .then(() => {
        navigate("/note");
      })
      .catch((err) => {
        console.error("Error deleting note:", err);
      });
  };

  if (!note) { // if note data is not available, return nothing
    return;
  }

  return (
    <div className="popup">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div className="popup-actions">
        <button className="edit-btn" onClick={handleEditNote}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
        <button className="delete-btn" onClick={handleDeleteNote}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
}

export default NoteDetails;




