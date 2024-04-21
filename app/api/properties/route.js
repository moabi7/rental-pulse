import connectDb from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties
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

// POST /api/properties
export const POST = async (request) => {
    try {
        // get form data from the request object
        const formData = await request.formData();

        // get all amenities and images 
        const amenities = formData.getAll('amenities');
        const images = formData.getAll('images').filter(image => image.name !== '');

        // Create propertyData object with formData
        const propertyData = {
            type: formData.get("type"),
            name: formData.get("name"),
            description: formData.get("description"),
            location: {
                street: formData.get("location.street"),
                city: formData.get("location.city"),
                state: formData.get("location.state"),
                zipcode: formData.get("location.zipcode")
            },
            beds: formData.get("beds"),
            baths: formData.get("baths"),
            square_feet: formData.get("square_feet"),
            amenities,
            rates: {
                weekly: formData.get("rates.weekly"),
                monthly: formData.get("rates.monthly"),
                nightly: formData.get("rates.nightly")
            },
            seller_info: {
                name: formData.get("seller_info.name"),
                email: formData.get("seller_info.email"),
                phone: formData.get("seller_info.phone")
            },
            images
        };

        console.log(propertyData);

        return new Response(JSON.stringify({message: 'Success'}), {status: 201});
    } catch (error) {
        console.error(error);
        return new Response('Failed to add property', {status: 500});
    }
};