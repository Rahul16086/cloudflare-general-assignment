import React, { useRef, useState } from "react";
import "./IndividualPost.css";

const IndividualPost = (data) => {
  const [commentsClicked, setCommentsClicked] = useState(false);
  const [moreClicked, setMoreClicked] = useState(false);
  const [entered, setEntered] = useState("");
  const [like, setLike] = useState(data.likes);
  const [disLike, setDislike] = useState(data.dislikes);
  const [comments, setComments] = useState(data.comments);
  const [commentsLength, setCommentsLength] = useState(data.comments.length);
  const comment = useRef();
  const img =
    "https://cdn.vox-cdn.com/thumbor/JgCPp2BBxETY596wCp50ccosCfE=/0x0:2370x1574/1200x800/filters:focal" +
    "(996x598:1374x976)" +
    "/cdn.vox-cdn.com/uploads/chorus_image/image/68870438/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png";
  const baseUrl = "https://r-typescript-worker.rahulprabakar.workers.dev";
  const commentsToggle = () => {
    setCommentsClicked(() => !commentsClicked);
  };
  const readCommentInput = (event) => {
    setEntered(event.target.value);
  };
  const addLike = (postId) => {
    fetch(`${baseUrl}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: postId }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message === "Liked") {
          setLike((prev) => {
            return prev + 1;
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addDislike = (postId) => {
    console.log(postId);
    fetch(`${baseUrl}/dislike`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: postId }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === "Disliked") {
          setDislike((prev) => {
            return prev + 1;
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postComment = (postId) => {
    commentsToggle();
    const commentTo = comment.current.value;
    fetch(`${baseUrl}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: postId, comment: commentTo }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message === "Commented") {
          setComments((prev) => {
            setEntered("");
            return [...prev, commentTo];
          });
          setCommentsLength((prev) => {
            return prev + 1;
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let latestComments;
  let remainingComments;
  if (comments.length > 5) {
    let reversed = [...comments].reverse();
    latestComments = reversed.slice(0, 5);
    remainingComments = reversed.slice(5);
  } else {
    latestComments = [...comments].reverse();
  }

  const moreToggle = () => {
    setMoreClicked(() => !moreClicked);
  };
  return (
    <section className={"post"}>
      <div className={"post__user"}>
        <img src={img} alt={"avatar"} />
        <div className={"post__user__details"}>
          <h1>{data.title}</h1>
          <p>@{data.username}</p>
        </div>
      </div>
      <div className={"post__content"}>
        <p>{data.content}</p>
        {data.picture && (
          <img src={data.picture} alt={"post pic"} className={"post__pic"} />
        )}
      </div>
      <hr />
      <div className={"post__buttons"}>
        <div className={"post__buttons__votes"}>
          <p>{like}</p>
          <button onClick={() => addLike(data.id)}>👍</button>
          <p style={{ color: "red" }}>{disLike}</p>
          <button onClick={() => addDislike(data.id)}>👎</button>
        </div>
        <div className={"post__buttons__comments"}>
          <p>{commentsLength}</p>
          <p>{commentsLength > 1 ? "Comments" : "Comment"}</p>
          <button onClick={commentsToggle}>💬</button>
        </div>
      </div>
      {commentsClicked && (
        <>
          <hr />
          <div className={"post__comments__area__container"}>
            <img src={img} alt={"for comments"} />
            <input
              className={"post__comments__area"}
              ref={comment}
              value={entered}
              onChange={readCommentInput}
              id={"commentArea"}
            />
            <button disabled={!entered} onClick={() => postComment(data.id)}>
              Post
            </button>
          </div>
        </>
      )}
      {latestComments?.length > 0 && (
        <div className={"post__comments"}>
          {latestComments.map((comment, key) => (
            <div className={"post__comments__individual"} key={key}>
              <img src={img} alt={"for comments"} />
              <p>{comment}</p>
            </div>
          ))}
          {remainingComments?.length > 0 && (
            <div className={"post__comments__more"}>
              <button onClick={moreToggle}>
                {moreClicked ? "Less" : "View more..."}
              </button>
            </div>
          )}
          {moreClicked && (
            <>
              {remainingComments.map((remComment, key) => (
                <div className={"post__comments__individual"} key={key}>
                  <img src={img} alt={"for comments"} />
                  <p>{remComment}</p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default IndividualPost;
