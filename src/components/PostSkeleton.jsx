import React from "react";

const PostSkeleton = () => {
  return (
    // <div className="flex w-52 flex-col gap-4">
    //   <div className="flex items-center gap-4">
    //     <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
    //     <div className="flex flex-col gap-4">
    //       <div className="skeleton h-4 w-20"></div>
    //       <div className="skeleton h-4 w-28"></div>
    //     </div>
    //   </div>
    //   <div className="skeleton h-32 w-full"></div>
    // </div>

    <div className="max-w-lg w-[512px] min-h-44 bg-[var(--secondary-color)] p-4 rounded-xl space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-2">
            <div className="skeleton h-3 w-28"></div>
            <div className="skeleton h-2 w-28"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="skeleton h-3 w-full"></div>
        <div className="skeleton h-3 w-4/5"></div>
        <div className="skeleton h-3 w-3/5"></div>
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

export default PostSkeleton;
