import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
import { INVITE_COMMAND, NSFW_COMMAND, ACTIVITY_COMMAND, IMAGE_COMMAND } from "./commands.js";

const guildId = process.env.GUILDID;
if (guildId && process.env.guildOnly == 'true'){
  const response = await fetch(
    `https://discord.com/api/v9/applications/${process.env.APPLICATION_ID}/guilds/${guildId}/commands`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bot ${process.env.TOKEN}`,
      },
      method: "PUT",
      body: JSON.stringify([NSFW_COMMAND, INVITE_COMMAND, IMAGE_COMMAND, ACTIVITY_COMMAND ]),
    }
  );

  if (response.ok) {
    console.log("Registered all guild commands");
  } else {
    console.error("Error registering commands");
    const text = await response.text();
    console.error(text);
}
}else{
  const response = await fetch(
    `https://discord.com/api/v9/applications/${process.env.APPLICATION_ID}/commands`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bot ${process.env.TOKEN}`,
      },
      method: "PUT",
      body: JSON.stringify([NSFW_COMMAND, INVITE_COMMAND, IMAGE_COMMAND]),
    }
  );

  if (response.ok) {
    console.log("Registered all global commands");
  } else {
    console.error("Error registering commands");
    const text = await response.text();
    console.error(text);
}
}
