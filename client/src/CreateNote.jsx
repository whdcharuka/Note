// creating a note

import React, { useState } from "react";
import axios from "axios"; // axios for making HTTP requests
import { useNavigate } from "react-router-dom";

function CreateNote() { // functional components
  const [title, setTitle] = useState(); // initialize state variables for title and description
  const [description, setDescription] = useState();
  const navigate = useNavigate(); // useNavigate hook to manage navigation

  const handleSubmit = (e) => { // handle form submission
    e.preventDefault(); // prevent default form submission behavior
    axios.post("http://localhost:3001/createNote", { title, description })
      .then((result) => {
        console.log(result); // log the result to the console
        navigate("/note");
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => { // handle cancellation
    navigate("/note");
  };

  return (

    <div className="note_container">
			<div className="note_form_container">
				<div className="right">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Add Note</h1>
						<input
							type="text"
							placeholder="Title"
							name="title"
              id="title"
							onChange={(e) => setTitle(e.target.value)}
							required
							className="input"
						/>
						<textarea
							type="password"
							placeholder="Description"
							name="description"
              id="description"
							onChange={(e) => setDescription(e.target.value)}
							required
							className="textarea"
						/>
            <div className="button_container">
              <button type="button" className="ash_btn" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="green_btn">
                Create
              </button>
            </div>
					</form>
				</div>
			</div>
		</div>
  );
}

export default CreateNote;
