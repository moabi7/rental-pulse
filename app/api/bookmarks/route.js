import connectDb from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/bookmarks
export const GET = async (request) => {
    try {
        await connectDb();
        const sessionUser = await getSessionUser();
        if (!sessionUser ||!sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }
        // Get all user bookmarks
        const { userId } = sessionUser;
        const user = await User.findById(userId);
        const bookmarks = user.bookmarks;

        // Get all properties
        const properties = await Property.find({ _id: { $in: bookmarks } });

        return new Response(JSON.stringify(properties), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    } 
}

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

        let message;
        if (isBookmarked) {
            // Remove property from bookmarks
            user.bookmarks = user.bookmarks.pull(propertyId);
            message = 'Property removed from bookmarks';
            isBookmarked = false;
        } else {
            // Add property to bookmarks
            user.bookmarks.push(propertyId);
            message = 'Property added to bookmarks';
            isBookmarked = true;
        }

        user.save();

        return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
};