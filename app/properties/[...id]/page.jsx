
'use client';
import { useEffect, useState } from 'react';
import { useParams } from'next/navigation';
import { fetchProperty } from '@/utils/requests';

const Property = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!d) return;
      try {
        console.log("FETCHING PROPERTY DATA")
        const property = await fetchProperty(id);
        console.log("PROP: ",property)
        setProperty(property);
      } catch (error) {
        console.log("Error fetching property: ", error);
      } finally {
        setLoading(false);
      }

      if (property === null) {
        fetchPropertyData();
      }
    };
  }, [id, property]);

  return <div>Property Page: {id}</div>;
}

export default Property;