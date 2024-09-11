import axios from "axios";

export const getPosts = async (setPosts, setToastMessage) => {
  try {
    const res = await axios.get(
      "https://social-media-app-api-nine.vercel.app/posts"
    );
    if (res.data) {
      setPosts([...res.data].reverse());
    } else {
      setToastMessage([
        "something went wrong!. couldn't get posts from our database",
        "error",
      ]);
      setTimeout(() => setToastMessage(["", ""]), 3000);
    }
  } catch (error) {
    setToastMessage([error.message, "error"]);
    setTimeout(() => setToastMessage(["", ""]), 3000);
  }
};

export const createPost = async (
  newContent,
  user,
  posts,
  setPosts,
  setPostCreated,
  setToastMessage
) => {
  try {
    if (newContent.trim()) {
      const res = await axios.post(
        "https://social-media-app-api-nine.vercel.app/posts/create",
        { content: newContent },
        { headers: { Authorization: user.token } }
      );
      const newPost = res.data.newPost;
      if (newPost) {
        newPost.user = user;
        setPosts([newPost, ...posts]);
        setPostCreated(true);
        setTimeout(() => {
          setPostCreated(false);
        }, 2000);
      }
    } else {
      setToastMessage(["add content for your post", "error"]);
      setTimeout(() => setToastMessage(["", ""]), 3000);
    }
  } catch (error) {
    setToastMessage([error.message, "error"]);
    setTimeout(() => setToastMessage(["", ""]), 3000);
  }
};

export const handleEdit = async (
  post,
  user,
  setPostToEdit,
  setContent,
  setToastMessage
) => {
  try {
    if (user && user._id === post.user._id) {
      setPostToEdit(post);
      setContent(post.content);
      document.getElementById("my_modal_1").showModal();
    } else {
      setToastMessage(["can't edit a post that is not yours", "info"]);
      setTimeout(() => setToastMessage(["", ""]), 3000);
    }
  } catch (error) {
    setToastMessage([error.message, "error"]);
    setTimeout(() => setToastMessage(["", ""]), 3000);
  }
};

export const handleConfirmEdit = async (
  content,
  postToEdit,
  user,
  posts,
  setPosts,
  setToastMessage,
  setLoading
) => {
  try {
    if (content && content !== postToEdit.content) {
      setLoading(true);
      const res = await axios.put(
        `https://social-media-app-api-nine.vercel.app/posts/${postToEdit._id}`,
        { content },
        { headers: { Authorization: user.token } }
      );
      if (res.data) {
        document.getElementById("my_modal_1").close();
        const newPosts = posts;
        const index = posts.findIndex((post) => post._id === res.data.post._id);
        newPosts[index] = { ...res.data.post, user };
        setPosts([...newPosts]);
      } else {
        setToastMessage([
          "something went wrong!. couldn't update your post in our database",
          "error",
        ]);
        setTimeout(() => setToastMessage(["", ""]), 3000);
      }
    } else {
      setToastMessage(["no changes made to the post", "info"]);
      setTimeout(() => setToastMessage(["", ""]), 3000);
      document.getElementById("my_modal_1").close();
    }
    setLoading(false);
  } catch (error) {
    setToastMessage([error.message, "error"]);
    setTimeout(() => setToastMessage(["", ""]), 3000);
    setLoading(false);
  }
};

export const handleDelete = async (
  postToDelete,
  user,
  posts,
  setPosts,
  setToastMessage,
  setLoading
) => {
  try {
    if (user && user._id === postToDelete.user._id) {
      setLoading(true);
      const res = await axios.delete(
        `https://social-media-app-api-nine.vercel.app/posts/${postToDelete._id}`,
        { headers: { Authorization: user.token } }
      );
      if (res.data.success) {
        setToastMessage(["post deleted", "success"]);
        setTimeout(() => setToastMessage(["", ""]), 3000);
        const newPosts = posts.filter((post) => post._id !== postToDelete._id);
        setPosts([...newPosts]);
      } else {
        setToastMessage([
          "something went wrong!. couldn't delete post from our database",
          "error",
        ]);
        setTimeout(() => setToastMessage(["", ""]), 3000);
      }
      setLoading(false);
      return "done";
    } else {
      setToastMessage(["can't delete a post that is not yours", "info"]);
      setTimeout(() => setToastMessage(["", ""]), 3000);
      return "done";
    }
  } catch (error) {
    setToastMessage([error.response.data.error, "error"]);
    setTimeout(() => setToastMessage(["", ""]), 3000);
    setLoading(false);
    return "done";
  }
};
