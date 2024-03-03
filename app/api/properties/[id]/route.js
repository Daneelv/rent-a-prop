import connectDB from "@/config/database";
import Property from "@/models/Property";

// Get /api/properties/:id
//Calls Database and queries DB for data

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);

    if (!property) return new Response("Property not  Found", { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something Went Wrong", { status: 500 });
  }
};
