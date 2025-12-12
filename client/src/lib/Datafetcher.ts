import { sqlResponse } from '@/types/datatypes';
import { useState, useEffect } from 'react';

const backendUrl = 'https://ayosafacundo.com.ar';

function DataFetcher() {
  const [data, setData] = useState<sqlResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/data`);
        if (!response.ok) {
          setError(new Error(`HTTP error! status: ${response.status}`));
        }
        const result = await response.json();
        setData(result);
      } catch (e: any) {
        
        console.error("Could not fetch data:", e.message);
        setError(e);
      }
    };

    fetchData();
  }, []);
  return ({data, error});
}

/**
 * Sends contact information (name, email, message) to an Express backend.
 *
 * @param {string} name - The name of the sender.
 * @param {string} email - The email address of the sender.
 * @param {string} message - The message content.
 */
async function sendContactForm(name: string, email:string, message:string) {
  const data = {
    name: name,
    email: email,
    message: message
  };

  try {
    // 3. Use the fetch API to send the POST request
    console.log({data, a: JSON.stringify(data)})
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST', // Specify the method
      headers: {
        // Tell the server we are sending JSON data
        'Content-Type': 'application/json'
      },
      // Convert the JavaScript object to a JSON string
      body: JSON.stringify(data)
    });

    // 4. Handle the response from the server
    if (!response.ok) {
      // If the HTTP status is 4xx or 5xx, throw an error
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    // 5. Parse the successful response body (if the backend sends one)
    const result = await response.json();
    console.log('Success:', result);
    return result; // Return the success data

  } catch (error: any) {
    console.error('Error sending form data:', error.message);
    // You could re-throw the error or handle it (e.g., show an error message to the user)
    throw error;
  }
}

export {DataFetcher, sendContactForm};