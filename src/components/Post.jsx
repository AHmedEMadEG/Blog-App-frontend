import { Link } from "react-router-dom";

const Post = ({ post, handleEdit, handleDelete }) => {
  return (
    <div className="max-w-lg w-96 md:w-[512px] min-h-44 bg-[var(--secondary-color)] p-4 rounded-xl space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="./images/avatar-icon.png"
            alt="avatar icon"
            className="bg-[var(--font-color)] p-2 w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="text-lg font-semibold">{post.user.name}</h4>
            <p className="text-sm">about an hour ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              {/* onClick={() => setPostToEdit(post)} */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-9 p-1 cursor-pointer rounded-full hover:bg-neutral-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-[1] p-3 shadow bg-[var(--primary-color)] rounded-lg w-52"
            >
              <li className="rounded-lg hover:bg-[var(--primary-color)] p-2">
                <Link
                  to={`/post/${post._id}`}
                  className="cursor-pointer md:text-lg"
                >
                  open
                </Link>
              </li>
              <li
                onClick={() => handleEdit(post)}
                className="rounded-lg hover:bg-[var(--primary-color)] p-2"
              >
                <p className="cursor-pointer md:text-lg">edit post</p>
              </li>
            </ul>
          </div>
          <svg
            onClick={() => handleDelete(post)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-9 p-1 cursor-pointer rounded-full hover:bg-neutral-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
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
  );
};

export default Post;
