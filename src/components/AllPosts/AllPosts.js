import React, { useEffect, useState } from "react";
import IndividualPost from "../IndividualPost/IndividualPost";
import "./AllPosts.css";

const AllPosts = () => {
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    return fetch("https://r-typescript-worker.rahulprabakar.workers.dev/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.length > 0) {
          data?.reverse();
          setFinalData(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {finalData.length > 0 ? (
        <div className={"main"}>
          {finalData?.map((data, key) => {
            return (
              <IndividualPost
                title={data.title}
                username={data.username}
                content={data.content}
                comments={data.comments}
                id={data.id}
                likes={data.like}
                dislikes={data.dislike}
                picture={data.pictureUrl}
                key={key}
              />
            );
          })}
        </div>
      ) : (
        <div className={"main"}>
          <h1>No Posts yet :(</h1>
        </div>
      )}
    </>
  );
};

export default AllPosts;
