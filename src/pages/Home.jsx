import React, { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";
import WhatsOnYourMind from "../components/WhatsOnYourMind";
import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [postToEdit, setPostToEdit] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/posts");
        if(res.data){
          setPosts([...res.data]);
        }else{
          console.log("something went wrong!. could get posts from our database");
        }
      } catch (error) {
        setError(error.message);
        console.log(error); // toast to be added
      }
    };
    getPosts();
  }, []);

  const createPost = async (newContent) => {
    try {
      if (newContent.trim()) {
        const res = await axios.post(
          "http://localhost:5000/posts/create",
          { content: newContent },
          { headers: { Authorization: user.token } }
        );
        console.log(res);
        const newPost = res.data.newPost;
        if (newPost) {
          // setContent("");
          newPost.user = user;
          setPosts([...posts, newPost]);
        }
      } else {
        console.log("add content for your post"); // toast to be added
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (post) => {
    try {
      if (user && user._id === post.user._id) {
        setPostToEdit(post);
        setContent((prev) => post.content);
        document.getElementById("my_modal_1").showModal();
      } else {
        console.log("can't edit a post that is not yours"); // toast to be added
      }
    } catch (error) {
      console.log(error.message); // toast to be added
    }
  };

  const handleConfirmEdit = async () => {
    try {
      if (content && content !== postToEdit.content) {
        const res = await axios.put(
          `http://localhost:5000/posts/${postToEdit._id}`,
          { content },
          { headers: { Authorization: user.token } }
        );
        document.getElementById("my_modal_1").close();
      } else {
        console.log("no changes made to the post"); // toast to be added
        document.getElementById("my_modal_1").close();
      }
    } catch (error) {
      console.log(error.message); // toast to be added
    }
  };

  const handleCancelEdit = () => {
    document.getElementById("my_modal_1").close();
    setPostToEdit(null);
  };

  const handleDelete = async (postToDelete) => {
    try {
      if (user && user._id === postToDelete.user._id) {
        const res = await axios.delete(
          `http://localhost:5000/posts/${postToDelete._id}`,
          { headers: { Authorization: user.token } }
        );

        if (res.data.success) {
          console.log("deleted successfully");
          const newPosts = posts.filter(
            (post) => post._id !== postToDelete._id
          );
          setPosts([...newPosts]);
        }
      } else {
        console.log("can't delete a post that is not yours");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="py-4 container flex flex-col items-center gap-2">
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-[var(--primary-color)] rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-neutral-800 text-[var(--font-color)] placeholder-neutral-500 focus:ring-2 focus:ring-[var(--secondary-color)] px-4 py-2 rounded-lg border border-neutral-600 focus:outline-none"
              placeholder="Edit your post..."
            />
          </div>
          <div className="modal-action justify-between">
            <button
              type="button"
              className="px-6 py-2 text-sm text-[var(--primary-color)] bg-red-600 hover:bg-red-700 rounded-lg"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmEdit}
              className="px-6 py-2 text-sm bg-[var(--secondary-color)] text-[var(--font-color)] hover:text-[var(--primary-color)] hover:bg-[var(--font-color)] rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </dialog>

      {user && <WhatsOnYourMind createPost={createPost} />}
      {posts.map((post) => (
        <Post
          post={post}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          key={post._id}
        />
      ))}
    </div>
  );
};

export default Home;
