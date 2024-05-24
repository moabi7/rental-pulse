import connectDb from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/properties/:id
export const GET = async (request, { params}) => {
    try {
        await connectDb();
        const property = await Property.findById(params.id);
        if (!property) {
            return new Response('Property Not Found', {status: 404});
        }
        return new Response(JSON.stringify(property), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', {status: 500});
    }
};

// DELETE /api/properties/:id
export const DELETE = async (request, { params}) => {
    try {
        debugger;
        const propertyId = params.id;

        const sessionUser = await getSessionUser();

        // Check for session
        if (!sessionUser ||!sessionUser.userId) {
            return new Response('User ID is required', {status: 401});
        }

        const { userId } = sessionUser;

        await connectDb();
        const property = await Property.findById(propertyId);
        console.log(property)
        if (!property) {
            return new Response('Property Not Found', {status: 404});
        }

        // Verify ownership
        if (property.owner.toString() !== userId) {
            return new Response('Unauthorized', {status: 401});
        }

        await property.deleteOne();

        return new Response('Property Deleted', {status: 200});
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', {status: 500});
    }
};

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
    try {
        await connectDb();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', {status: 401});
        }
        const { id } = params;
        const { userId } = sessionUser;
        // get form data from the request object
        const formData = await request.formData();
        // get all amenities
        const amenities = formData.getAll('amenities');

        // Get property to update
        const existingProperty = await Property.findById(id);


        if (!existingProperty) {
            return new Response(`Property does not exist`, { status: 404 });
        }

        // Verify ownetership
        if (existingProperty.owner.toString() !== userId) {
            return new Response(`Unauthorized`, { status: 401 });
        }

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
            square_meters: formData.get("square_meters"),
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
            owner: userId,
        };

        // Update property in databas
        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

        return new Response(JSON.stringify(updatedProperty), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response('Failed to add property', {status: 500});
    }
};