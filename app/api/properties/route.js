import connectDB from "@/config/database";
import Property from "@/models/Property";

// Get /api/properties
//Calls Database and queries DB for data

export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something Went Wrong", { status: 500 });
  }
};
