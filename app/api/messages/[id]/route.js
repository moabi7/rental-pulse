import connectDb from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
    try {
        await connectDb();

        const { id } = params;
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify('You must be logged in to view messages'), {status: 401});
        }
        
        const { userId } = sessionUser;
        const message = await Message.findById(id);
        if (!message) return new Response('Message Not Found', {status: 404});

        // Verify ownership
        if (message.recipient.toString() !== userId) {
            return new Response('Unauthorized request', {status: 404});
        }

        // Update the message to read or unread
        message.read = !message.read;
        await message.save();

        return new Response(JSON.stringify(message), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong!', { status: 500});
    }
};

// DELETE /api/messages:id
export const DELETE = async (request, { params}) => {
    try {
        const { id } = params;

        const sessionUser = await getSessionUser();

        // Check for session
        if (!sessionUser ||!sessionUser.userId) {
            return new Response('User ID is required', {status: 401});
        }

        const { userId } = sessionUser;

        await connectDb();
        const message = await Message.findById(id);
        if (!message) return new Response('Message Not Found', {status: 404});

        // Verify ownership
        if (message.recipient.toString() !== userId) {
            return new Response('Unauthorized request', {status: 404});
        }

        await message.deleteOne();

        return new Response('Message Deleted', {status: 200});
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', {status: 500});
    }
};