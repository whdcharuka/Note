import { Link } from "react-router-dom";

function CreateNote() {

  return (
    <div className="front_container">
      <div className="front">
        <div className="right">
          <h1>Take Your Notes</h1>
          <Link to="/note" className="note_btn">Your Notes</Link>
            <div className="image">
            </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNote;

