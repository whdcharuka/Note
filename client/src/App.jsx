import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Notes from './Notes'
import FrontPage from './FrontPage'
import CreateNote from './CreateNote'
import UpdateNote from './UpdateNote'
import NoteDetails from "./NoteDetails";

function App() {

  return (
      <div>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<FrontPage/>}></Route>
          <Route path='/note' element={<Notes/>}></Route>
          <Route path='/create' element={<CreateNote/>}></Route>
          <Route path="/note/:id" element={<NoteDetails />}/>
          <Route path='/update/:id' element={<UpdateNote/>}></Route>        
        </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App