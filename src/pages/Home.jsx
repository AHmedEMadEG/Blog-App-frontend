import React, { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import WhatsOnYourMind from "../components/WhatsOnYourMind";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";
import { UserContext } from "../contexts/UserContext";
import {
  getPosts,
  createPost,
  handleEdit,
  handleConfirmEdit,
  handleDelete,
} from "../services/postHandlers";
import PostSkeleton from "../components/PostSkeleton";

const Home = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [toastMessage, setToastMessage] = useState(["", ""]);
  const [content, setContent] = useState("");
  const [postCreated, setPostCreated] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPosts(setPosts, setToastMessage);
  }, []);

  return (
    <div className="py-4 container mx-auto flex flex-col items-center gap-2">
      {toastMessage[0] && (
        <Toast message={toastMessage[0]} type={toastMessage[1]} />
      )}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-[var(--primary-color)] rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-neutral-800 text-[var(--font-color)] placeholder-neutral-500 focus:ring-2 focus:ring-[var(--secondary-color)] px-4 py-2 rounded-lg border border-neutral-600 focus:outline-none"
              placeholder="Edit your post..."
              disabled={loading}
            />
          </div>
          <div className="modal-action justify-between">
            <button
              type="button"
              className={`${
                loading && "cursor-not-allowed"
              } px-6 py-2 text-sm text-[var(--primary-color)] bg-red-600 hover:bg-red-700 rounded-lg`}
              onClick={() => document.getElementById("my_modal_1").close()}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={() =>
                handleConfirmEdit(
                  content,
                  postToEdit,
                  user,
                  posts,
                  setPosts,
                  setToastMessage,
                  setLoading
                )
              }
              className={`${
                loading && "cursor-not-allowed"
              } flex items-center px-6 py-2 text-sm bg-[var(--secondary-color)] text-[var(--font-color)] hover:text-[var(--primary-color)] hover:bg-[var(--font-color)] rounded-lg`}
              disabled={loading}
            >
              {loading && <Spinner />} Save Changes
            </button>
          </div>
        </div>
      </dialog>

      {user && (
        <WhatsOnYourMind
          createPost={(content) =>
            createPost(
              content,
              user,
              posts,
              setPosts,
              setPostCreated,
              setToastMessage
            )
          }
          postCreated={postCreated}
        />
      )}
      {posts.length ? (
        posts.map((post) => (
          <Post
            post={post}
            handleEdit={() =>
              handleEdit(post, user, setPostToEdit, setContent, setToastMessage)
            }
            handleDelete={() =>
              handleDelete(
                post,
                user,
                posts,
                setPosts,
                setToastMessage,
                setLoading
              )
            }
            key={post._id}
            loading={loading}
          />
        ))
      ) : (
        <PostSkeleton />
      )}
    </div>
  );
};

export default Home;
