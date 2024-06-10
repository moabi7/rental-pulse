import connectDb from "@/config/database";
import Message from "@/models/Message";

import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';
export const GET = async (request) => {
    try {
        await connectDb();

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({message: 'You must be logged in to view messages'}), {status: 401});
        }
        
        const { user } = sessionUser;
        const messages = await Message.find({recipient: user.id})
        .populate('sender','name')
        .populate('property', 'title');

        return new Response(JSON.stringify(messages), {status: 200})

    } catch (error) {
        console.log(error);
        return new Response('Something went wrong!', { status: 500});
    }
}; 

export const POST = async (request) => {
    try {
        const {name, email, phone, message, recipient, property} = await request.json();
        // console.log("Message => ", {name, email, phone, message, recipient, property});

        await connectDb();
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({message: 'You must be logged in to send a message'}), {status: 401});
        }

        const { user } = sessionUser;
        if (user.id === recipient) {
            return new Response(JSON.stringify({message: 'Can not send a message to yourself'}), {status: 400});
        }

        const newMessage = new Message({
            name,
            sender: user.id,
            recipient,
            property,
            email,
            phone,
            body: message,
        });

        await newMessage.save();

        return new Response(JSON.stringify({message: 'Message sent successfull!'}), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong!', { status: 500});
    }
};