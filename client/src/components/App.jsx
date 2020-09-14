import React, { useState, useEffect } from "react";
import Mansory from "react-masonry-component";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    getNotes();
  }, []);
  //get notes
  const getNotes = async () => {
    try {
      const response = await fetch("/keeper/notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Header />
      <CreateArea updatedNote={getNotes} />
      <Mansory>
        {notes.map((note) => {
          return (
            <Note
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              getNotes={getNotes}
              date={note.createdAt}
            />
          );
        })}
      </Mansory>
    </div>
  );
}

export default App;
