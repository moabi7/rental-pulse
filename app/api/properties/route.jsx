import connectDb from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request) => {
    try {
        await connectDb();
        const properties = await Property.find();
        return new Response(JSON.stringify(properties), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', {status: 500});
    }
};