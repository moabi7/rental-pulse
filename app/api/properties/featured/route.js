import connectDb from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/featured
export const GET = async (request) => {
    try {
        await connectDb();
        const properties = await Property.find({is_featured: true});
        const result = {
            total: 0, properties 
        };

        return new Response(JSON.stringify(result), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', {status: 500});
    }
};
