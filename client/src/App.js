import { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import List from "./components/List";
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

  const addMovieReview = (data) => {
    setMovieContent({
      ...movieContent,
      content: data,
    });
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
              addMovieReview(editor.getData());
              setContentArea(editor);
            }}
          />
        </div>
        <button
          onClick={(event) => {
            event.preventDefault();

            // push함수는 원본배열을 변화시키므로 concat을 사용한다
            setViewContent(viewContent.concat({ ...movieContent }));
            titleRef && (titleRef.current.value = "");
          }}
          className="button"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default App;
