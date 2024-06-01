import connectDb from "@/config/database";
import Property from  "@/models/Property";

// api/properties/seasrch
export const GET = async (request) => {
    try {
        await connectDb();

        const { searchParams } = new URL(request.url);

        const location = searchParams.get('location');
        const propertyType = searchParams.get('propertyType');

        const locationPattern = new RegExp(location, 'i');
        // Match location property agains database fields
        const query = {
            $or : [
                {name: locationPattern},
                {description: locationPattern},
                {'location.street': locationPattern},
                {'location.city': locationPattern},
                {'location.state': locationPattern},
                {'location.zipcode': locationPattern},
            ]
        };

        // Only check for properties if its not 'All'
        if (propertyType && propertyType != 'All') {
            const typePattern = new RegExp(propertyType, 'i');
            query.type = typePattern;
        }

        const properties = await Property.find(query);
        return new Response(JSON.stringify(properties), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", {status: 200});
    }
};