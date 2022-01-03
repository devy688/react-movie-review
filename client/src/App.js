import { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import List from "./components/List";
import axios from "axios";
import "./App.css";

function App() {
  const titleRef = useRef();

  const [contentArea, setContentArea] = useState(); // CKEditor textArea
  const [viewContent, setViewContent] = useState([]); // List
  const [movieContent, setMovieContent] = useState({
    title: "",
    content: "",
  });

  const getTitle = (event) => {
    const { name, value } = event.target;
    setMovieContent({
      ...movieContent,
      [name]: value,
    });
  };

  // const sendData = () => {

  // }

  const addMovieReview = (data) => {
    setMovieContent({
      ...movieContent,
      content: data,
    });
  };

  const submitReview = () => {
    axios
      .post("/api/insert", {
        title: movieContent.title,
        content: movieContent.content,
      })
      .then(() => alert("등록 완료!"));
  };

  useEffect(() => {
    // review 등록 후 게시글 리셋
    contentArea && contentArea.setData("<p></p>");
  }, [viewContent, contentArea]);

  return (
    <div className="App">
      <h1 className="header">Movie Review</h1>
      <ul className="movieContainer">
        {viewContent.map((contents, index) => (
          <List key={Date.now() + index} contents={contents} />
        ))}
      </ul>
      <form className="formWrapper">
        <input
          ref={titleRef}
          onChange={getTitle}
          className="titleInput"
          placeholder="Write a title..."
          name="title"
        />
        <div className="textArea">
          <CKEditor
            editor={ClassicEditor}
            // data="<p>Write a review! </p>"
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  "height",
                  "350px",
                  editor.editing.view.document.getRoot()
                );
              });
            }}
            onChange={(editor) => {
              // console.log(editor);
              const data = editor.getData();
              setContentArea(editor);
              addMovieReview(data);
            }}
          />
        </div>
        <button onClick={submitReview} className="button">
          Add
        </button>
      </form>
    </div>
  );
}

export default App;
