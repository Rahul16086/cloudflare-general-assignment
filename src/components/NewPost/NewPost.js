import React, { useRef } from "react";
import "../IndividualPost/IndividualPost.css";
import "./NewPost.css";
import { useHistory } from "react-router-dom";
const NewPost = () => {
  const usernameInput = useRef();
  const titleInput = useRef();
  const contentInput = useRef();
  const pictureUrlInput = useRef();
  const history = useHistory();

  const addPost = () => {
    const username = usernameInput.current.value;
    const title = titleInput.current.value;
    const content = contentInput.current.value;
    const pictureUrl = pictureUrlInput.current.value;
    if (username === "" || title === "" || content === "") {
      window.alert("Please fill the mandatory fields");
    } else {
      const post = {
        title: title,
        username: username,
        content: content,
        pictureUrl: pictureUrl,
      };
      console.log(JSON.stringify(post));
      console.log(post);
      fetch("https://r-typescript-worker.rahulprabakar.workers.dev/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            history.push("/");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className={"newpost__container"}>
      <section className={"post"}>
        <div className={"newpost__inputs"}>
          <label>Username</label>
          <input type={"text"} id={"username"} ref={usernameInput} required />
          <label>Title</label>
          <input type={"text"} id={"title"} ref={titleInput} required />
          <label>Content</label>
          <textarea id={"content"} ref={contentInput} required />
          <label>Image to post (URL)</label>
          <input type={"text"} id={"pictureUrl"} ref={pictureUrlInput} />
        </div>
        <button onClick={addPost}>Post</button>
      </section>
    </div>
  );
};

export default NewPost;
