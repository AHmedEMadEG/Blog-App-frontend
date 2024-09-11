import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostSkeleton from "../components/PostSkeleton";

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`https://social-media-app-api-nine.vercel.app/posts/${id}`);
        if (res.data.post) {
          setPost(res.data.post);
        } else {
          setToastMessage([
            "something went wrong!. couldn't get post details from our database",
            "error",
          ]);
          setTimeout(() => setToastMessage(["", ""]), 3000);
        }
      } catch (error) {
        setToastMessage([error.message, "error"]);
        setTimeout(() => setToastMessage(["", ""]), 3000);
      }
    };
    getPost();
  }, []);

  return !post ? (
    <div className="flex items-center justify-center mt-3">
      <PostSkeleton />
    </div>
  ) : (
    <div className="flex items-center justify-center mt-3">
      <div className="max-w-lg w-[512px] min-h-44 bg-[var(--secondary-color)] p-4 rounded-xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="../images/avatar-icon.png"
              alt="avatar icon"
              className="bg-[var(--font-color)] p-2 w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="text-lg font-semibold">{post.user.name}</h4>
              <p className="text-sm">about an hour ago</p>
            </div>
          </div>
        </div>
        <div>
          <p>{post.content}</p>
        </div>
        <div className="flex justify-between">
          <button className="btn btn-sm btn-outline border-none text-[var(--font-color)] hover:bg-neutral-700 py-2 px-8">
            Like
          </button>
          <button className="btn btn-sm btn-outline border-none text-[var(--font-color)] hover:bg-neutral-700 py-2 px-8">
            Comment
          </button>
          <button className="btn btn-sm btn-outline border-none text-[var(--font-color)] hover:bg-neutral-700 py-2 px-8">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
