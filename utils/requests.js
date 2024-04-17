const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
  try {
    // handle the case where the domain is not available yet
    if (apiDomain === null) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`);
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch single property
async function fetchProperty(id) {
  try {
    // handle the case where the domain is not available yet
    if (apiDomain === null) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);
    console.log("RES", res)
    if (!res.ok) {
      throw new Error("Failed to fetch property");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  } 
}

export { fetchProperties, fetchProperty };