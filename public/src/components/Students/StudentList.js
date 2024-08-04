import React, { useEffect, useState } from 'react';

export default function StudentList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5127/basicinfo'); // Updated to match API endpoint
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

  return (
    <>
       <ul>
      {data.map(user => (
        <li key={user.id}>
          {user.name} - {user.adm_no}
        </li>
      ))}
    </ul>
    </>
  )
}
