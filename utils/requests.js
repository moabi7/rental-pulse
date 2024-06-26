const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchBookmarks() {
  try {
    // handle the case where the domain is not available yet
    if (apiDomain === null) {
      return [];
    }
    const res = await fetch(`${apiDomain}/bookmarks`, { cache: "no-store"});
    if (!res.ok) {
      console.log("RES => ",res);
      throw new Error("Failed to fetch bookmarks");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // handle the case where the domain is not available yet
    if (apiDomain === null) {
      return {total: 0, properties: []};
    }
    const res = await fetch(`${apiDomain}/properties${showFeatured ? '/featured' : ''}`, { cache: "no-store"});
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return {total: 0, properties: []};
  }
};

// Fetch single property
async function fetchProperty(id) {
  try {
    if (apiDomain === null) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch property");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  } 
}

export { fetchProperties, fetchProperty, fetchBookmarks };