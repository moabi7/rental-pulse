'use client';
import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const BookmarkButton = ({property}) => {

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You must be logged in to bookmark a property");
      return;
    }

    try {
      const res = await fetch(`/api/bookmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
          userId: userId,
        }),
      });

      if (res.status === 200) {
        const { isBookmarked, message } = await res.json();
        setIsBookmarked(isBookmarked);
        toast.success(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <button
    onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
        <FaBookmark className="mr-2"/> Bookmark Property
    </button>
  )
}

export default BookmarkButton;