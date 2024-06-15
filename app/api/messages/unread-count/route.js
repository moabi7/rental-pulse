import connectDb from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// GET /api/messages/unread-count
export const GET = async (request) => {
    try {
        await connectDb();
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({ message: 'You must be logged in' }), { status: 401 });
        }

        const { user } = sessionUser;
        const count = await Message.countDocuments({ recipient: user.id, read: false });

        return new Response(JSON.stringify(count), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response('Something went wrong!', { status: 500 });
    }
};