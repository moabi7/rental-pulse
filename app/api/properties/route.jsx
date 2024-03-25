import connectDb from "@/config/database";

export const GET = async (request) => {
    try {
        // await connectDb();
        return new Response(JSON.stringify({"message": "Hello world this is lesego"}), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', {status: 500});
    }
};