import connectDb from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
    try {
        await connectDb();
        const { propertyId } = await request.json();

        const sessionUser = await getSessionUser();
        if (!sessionUser ||!sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }

        // Find user
        const { userId } = sessionUser; 
        const user = await User.findById(userId);

        // Check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId);

        return new Response(JSON.stringify({ isBookmarked }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
};