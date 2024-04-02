// updating a note

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios for making HTTP requests

function UpdateNote () { // functional component
  const { id } = useParams(); // get the id parameter
  const [title, setTitle] = useState(); // initialize state variables for title and description
  const [description, setDescription] = useState();
  const navigate = useNavigate();

  useEffect(() => { // fetch note data from the server based on the id
    axios.get('https://note-server-phi.vercel.app/getNote/'+ id)
      .then((result) => {
        console.log(result); // log the result to the console
        setTitle(result.data.title); // set the fetched title to the state variable
        setDescription(result.data.description); // set the fetched description to the state variable
      })
      .catch((err) => console.log(err)); 
  }, []); // empty array ensures the effect runs only once

  const Update = (e) => { // function to handle updating the note
    e.preventDefault(); // prevent default form submission behavior
    axios.put('https://note-server-phi.vercel.app/updateNote/' + id, { title, description })
      .then((result) => {
        console.log(result);
        navigate('/note');
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => { // function to handle cancellation
    navigate("/note");
  };

  return (
    <div className="note_container">
			<div className="note_form_container">
				<div className="right">
					<form className="form_container" onSubmit={Update}>
						<h1>Update Note</h1>
						<input
							type="text"
							placeholder="Title"
							name="title"
              id="title"
							onChange={(e) => setTitle(e.target.value)} // update the title on input change
              value={title}
							className="input"
						/>
						<textarea
							type="password"
							placeholder="Description"
							name="description"
              id="description"
							onChange={(e) => setDescription(e.target.value)} // update the description on input change
							value={description}
							className="textarea"
						/>
						<div className="button_container">
              <button type="button" className="ash_btn" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="green_btn">
                Update
              </button>
            </div>
					</form>
				</div>
			</div>
		</div>
  );
}

export default UpdateNote;

