import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Spinner from "../components/Spinner";

const WhatsOnYourMind = ({ createPost, postCreated }) => {
  const { user } = useContext(UserContext);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setContent("");
  }, [postCreated]);

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      await createPost(content);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-lg w-[512px] min-h-20 bg-[var(--secondary-color)] text-[var(--font-color)] p-4 rounded-xl mb-4">
      <div className="flex items-center space-x-4">
        <img
          src="./images/avatar-icon.png"
          alt="avatar icon"
          className="bg-[var(--font-color)] p-2 w-10 h-10 rounded-full"
        />
        <input
          type="text"
          value={postCreated ? "" : content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-[var(--font-color)] text-[var(--primary-color)] placeholder:text-[var(--secondary-color)] px-4 py-2 rounded-full"
          placeholder="What's on your mind?"
        />
      </div>
      <div className="flex justify-end mt-2">
        <button
          className={`${loading && 'cursor-not-allowed'} flex items-start btn btn-sm btn-outline border-none text-[var(--font-color)] hover:bg-neutral-700 py-2 px-4`}
          onClick={handleCreatePost}
        >
          {loading && <Spinner />} Post
        </button>
      </div>
    </div>
  );
};

export default WhatsOnYourMind;
