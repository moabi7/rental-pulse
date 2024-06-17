'use client';
import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';

const Properties = async () => {
    const [loading , setLoading] = useState(true);
    const [ properties, setProperties ] = useState([]);


    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch(`/api/properties`);
                if (!res.ok) {
                  throw new Error("Failed to fetch properties");
                }
                const data = await res.json();
                setProperties(data);
                
              } catch (error) {
                console.log(error);
              } finally {
                setLoading(false);
              }
        };

        fetchProperties();
    }, []);

  return loading ? (<Spinner /> ) : (
    <section className="px-4 py-6">
    <div className="container-xl lg:container m-auto">
    <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">All Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          properties.length === 0 ? 
          (<p>No properties found</p>) :
          properties.map((property) => <PropertyCard key={property._id} property={property}/>)
        }
      </div>
    </div>
  </section>
  )
};

export default Properties;