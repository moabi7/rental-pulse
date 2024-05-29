'use client';
import { useState, useEffect } from "react";
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { fetchBookmarks } from '@/utils/requests';

const SavedPropertiesPage = async() => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookmarksData = async () => {
            try {
                const bookmarks = await fetchBookmarks();
                setProperties(bookmarks);
            } catch (error) {
                console.log("Error fetching bookmarks: ", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBookmarksData();
    }, []);

    return loading ? (<Spinner loading={loading}/>) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">My Bookmarked Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {
              properties.length === 0 ? 
              (<p>No book marked properties found</p>) :
              properties.map((property) => <PropertyCard key={property._id} property={property}/>)
            }
          </div>
          </div>
        </section>
    );
}

export default SavedPropertiesPage;