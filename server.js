import fastify from 'fastify';
import rawBody from 'fastify-raw-body';
import fetch from "node-fetch";
import dotenv from 'dotenv';
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions';
import { MessageEmbed } from 'discord.js';
import { SLAP_COMMAND, INVITE_COMMAND, NSFW_COMMAND } from './utils/commands.js';
dotenv.config()
import { AhniClient } from 'ahnidev';
const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${process.env.APPLICATION_ID}&scope=applications.commands%20bot`;
const ahni = new AhniClient({ KEY: process.env.AHNIKEY });
const server = fastify({
  logger: false,
});
server.register(rawBody, {
  runFirst: true,
});

server.get('/api/interactions', (request, response) => {
  console.log('Handling GET request');
});
const embed = new MessageEmbed()
	.setTitle('Here you go:')
	.setTimestamp()
	.setColor("RANDOM");

server.addHook('preHandler', async (request, response) => {
  // We don't want to check GET requests to our root url
  if (request.method === 'POST') {
    const signature = request.headers['x-signature-ed25519'];
    const timestamp = request.headers['x-signature-timestamp'];
    const isValidRequest = verifyKey(
      request.rawBody,
      signature,
      timestamp,
      process.env.PUBLIC_KEY
    );

    if (!isValidRequest) {
      server.log.info('Invalid Request');
      return response.status(401).send({ error: 'Bad request signature ' });
    }
  }
});
server.post('/api/interactions', async (request, response) => {
  const message = request.body;
  if (message.type === InteractionType.PING) {
    console.log('Handling Ping request');
    response.send({
      type: InteractionResponseType.PONG,
    });
}
  else if (message.type === InteractionType.APPLICATION_COMMAND) {
    switch (message.data.name.toLowerCase()) {
      case SLAP_COMMAND.name.toLowerCase():
        response.status(200).send({
          type: 4,
          data: {
            content: `*<@${message.member.user.id}> slaps <@${message.data.options[0].value}> around a bit with a large trout*`,
          },
        });
        server.log.info('Slap Request');
        break;
      case INVITE_COMMAND.name.toLowerCase():
        response.status(200).send({
          type: 4,
          data: {
            content: INVITE_URL,
            flags: 64,
          },
        });
        server.log.info('Invite request');
        break;
      case NSFW_COMMAND.name.toLowerCase():
	nsfw(message.channel_id).then(nsfws =>{
	if (nsfws.nsfw == false) return response.status(200).send({
          type: 4,
          data: {
            content: "This Channel is __NOT__ an NSFW channel!",
            flags: 64,
          },
	});
	ahni.nsfw(message.data.options[0].value).then(IMGURL=>{
        response.status(200).send({
          type: 4,
          data: {
            embeds: [embed.setImage(IMGURL).setURL(IMGURL)],
            flags: 64,
          },
        });
	});
	console.log('NSFW Command Ran');
      })
      break;
      default:
        server.log.error('Unknown Command');
        response.status(400).send({ error: 'Unknown Type' });
        break;
    }
  } else {
    server.log.error('Unknown Type');
    response.status(400).send({ error: 'Unknown Type' });
  }
});
process.on("unhandledRejection", (err)=>{
	console.log("Ooops! "+err.message)
})
process.on("unhandledException", (err)=>{
	console.log("Ooops! "+err.message)
})
server.listen(2003, async (error, address) => {
  if (error) {
    server.log.error(error);
//    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});

function nsfw(id){
return fetch(`https://discord.com/api/v9/channels/${id}`, {
 	method: 'GET',
	headers: {
		"Authorization": "Bot "+process.env.TOKEN,
		"Content-Type": "application/json"
	}
	}).then(res =>res.json()).then(json=>{
		return json
	});
}
