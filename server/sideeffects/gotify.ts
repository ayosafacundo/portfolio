
type GotifyBody = {
  message: string;
  priority?: number;
  description?: string;
}

export const sendGotifyPushNotification = async (message: GotifyBody) => {
    return await fetch(`https://ntfy.ayosafacundo.com.ar/message?token=${process.env.GOTIFY_TOKEN}`, {
      method: 'POST', // Specify the method
      headers: {
        // Tell the server we are sending JSON data
        'Content-Type': 'application/json'
      },
      // Convert the JavaScript object to a JSON string
      body: JSON.stringify(message)
    })
    .then((response) => response)
    .catch((error) => error);
}