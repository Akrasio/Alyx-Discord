import fetch from "node-fetch";
export const config = {
    functions: {
        createTogetherCode: async (voiceChannelId, option)=> {
            /**
             * @param {string} code The invite link (only use the blue link)
             */
            let returnData = {
                code: 'none',
            };
            if (option) {
                let applicationID = option;
                try {
                    await fetch(`https://discord.com/api/v9/channels/${voiceChannelId}/invites`, {
                        method: 'POST',
                        body: JSON.stringify({
                            max_age: 86400,
                            max_uses: 0,
                            target_application_id: applicationID,
                            target_type: 2,
                            temporary: false,
                            validate: null,
                        }),
                        headers: {
                            Authorization: `Bot ${process.env.TOKEN}`,
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((res) => res.json())
                        .then((invite) => {
                            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
                            if (Number(invite.code) === 50013) console.warn('Your bot lacks permissions to perform that action');
                            returnData.code = `https://discord.com/invite/${invite.code}`;
                        });
                } catch (err) {
                    throw new Error('An error occured while starting Youtube together !');
                }
                return returnData;
            } else {
                throw new SyntaxError('Invalid option !');
            }
        },
        nsfw: async function (id, guildId) {
            return fetch(`https://discord.com/api/v9/channels/${id}`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bot " + process.env.TOKEN,
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(json => {
                if (json.type == 11 && json.parent_id) {
                    return nsfw(json.parent_id);
                }
                if (json.type == 0) {
                    return json
                } else if (json.type == 2){
			return json
		}
            });
        },
        member: async function (guildId, userId) {
            return fetch(`https://discord.com/api/v9/guilds/${guildId}/members/${userId}`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bot " + process.env.TOKEN,
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(json => {
                return json
            });
        }
    }
}
