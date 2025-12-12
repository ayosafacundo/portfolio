import { log, pg } from "./index";
import { type Request, Response } from "express";
import { SelectAllCertificates, SelectAllEducation, SelectAllExperiences, SelectAllProjects, SelectAllSkills, getCurrentAbout } from "./queries/SelectQuerys";
import { PoolClient } from "pg";
import { insertNewContact } from "./queries/PostQuerys";
import { sendGotifyPushNotification } from "./sideeffects/gotify";


const getEndpoint = (query: string, client: PoolClient) => {
  return client.query(query)
    .then((results: any) => {
      return results.rows;
    })
    .catch((error: any) => {
      throw error;
    });
}

const getEverything = async (request: Request, response: Response) => {
  log("Gotten request for everything.", "postgresql/get");
  const client: PoolClient = await pg.connect();
  try {
    const [
      projects,
      skills,
      experiences,
      education,
      certificates,
      about
    ] = await Promise.all([
      getEndpoint(SelectAllProjects, client),
      getEndpoint(SelectAllSkills, client),
      getEndpoint(SelectAllExperiences, client),
      getEndpoint(SelectAllEducation, client),
      getEndpoint(SelectAllCertificates, client),
      getEndpoint(getCurrentAbout, client)
    ]);
    const data = {
      projects,
      skills,
      experiences,
      education,
      certificates,
      about
    };
    response.status(200).json(data)
  } catch (e) {
    log("Failed to fetch all data: " + e, "postgresql");
    console.error(e);
    response.status(500).json({ error: "Failed to fetch data from database." });
  }
}

const postMessage = async (request: Request, response: Response) => {
  log("New Message posted.", "postgresql/post");
  const { name, email, message } = request.body;
  if (!name || !email || !message) {
    log("Post Response failed", "postgresql/post")
    return response.status(400).json({
      success: false,
      message: 'Missing required fields: name, email, and message are required.'
    })
  }
  let gotify = await sendGotifyPushNotification({ message: (`${name} (${email}) says: ${message}`) });
  if (gotify.ok) {
    log("Gotify push notification sent.", "gotify");
  } else {
    log("There was an error sending push notification.", "gotify");
  }
  const client: PoolClient = await pg.connect();
  try {
    await client.query(insertNewContact, [name, email, message]);
    log("Post Response sent", "postgresql/post")
    return response.status(200).json({
      success: true,
      message: 'Message received and processed successfully!'
    });

  } catch (error: any) {
    log(error.message, "postgresql/post")
    return response.status(500).json({
      success: false,
      message: 'An internal error occurred while processing your request.',
    });
  }
}

export { getEverything, postMessage };