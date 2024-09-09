import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const WhatsOnYourMind = ({ createPost, postCreated }) => {
  const { user } = useContext(UserContext);
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent("");
  },[postCreated]);

  return (
    <div className="max-w-lg w-[512px] min-h-20 bg-[var(--secondary-color)] text-[var(--font-color)] p-4 rounded-xl mb-4">
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
          className="btn btn-sm btn-outline border-none text-[var(--font-color)] hover:bg-neutral-700 py-2 px-4"
          onClick={() => createPost(content)}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default WhatsOnYourMind;
