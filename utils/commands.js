export const SLAP_COMMAND = {
    name: "slap",
    description: "Sometimes you gotta slap a person with a large trout",
    options: [
        {
            name: "user",
            description: "The user to slap",
            type: 6,
            required: true,
        },
    ],
};

export const INVITE_COMMAND = {
    name: "invite",
    description: "Get an invite link to add the bot to your server",
};

export const ACTIVITY_COMMAND = {
    name: "activity",
    description: "Start a Voice Channel Activity!",
    options: [
        {
            name: "type",
            description: "The type of activity you want",
            type: 3,
            required: true,
            choices: [
                {
		"name": "watch-together",
		"value": "880218394199220334",
		}
	     ]
	},
	{
	    name: "channel",
	    description: "The voice channel you want to start the activity in",
            required: true,
	    type: 7,
	    channel_types: [2],
	}],
}
export const NSFW_COMMAND = {
    name: "nsfw",
    description: "Have some lewds",
    options: [
        {
            name: "category",
            description: "The type of lewds you want",
            type: 3,
            required: true,
            choices: [
                {
                    "name": "ass-real",
                    "value": "ass"
                },
                {
                    "name": "assgif-real",
                    "value": "assgif"
                },
                {
                    "name": "thighs-hentai",
                    "value": "athighs"
                },
                {
                    "name": "bbw-real",
                    "value": "bbw"
                },
                {
                    "name": "bdsm-real",
                    "value": "bdsm"
                },
                {
                    "name": "blow-hentai",
                    "value": "blow"
                },
                {
                    "name": "boobs-real",
                    "value": "boobs"
                },
                {
                    "name": "feet-real",
                    "value": "feet"
                },
                {
                    "name": "furfuta-yiff",
                    "value": "furfuta"
                },
                {
                    "name": "furgif-yiff",
                    "value": "furgif"
                },
                {
                    "name": "futa-hentai",
                    "value": "futa"
                },
                {
                    "name": "gifs-hentai",
                    "value": "gifs"
                },
                {
                    "name": "hboobs-hentai",
                    "value": "hboobs"
                },
                {
                    "name": "hentai",
                    "value": "hentai"
                },
                {
                    "name": "feet-hentai",
                    "value": "hfeet"
                },
                {
                    "name": "femboy-real",
                    "value": "irlfemb"
                },
                {
                    "name": "jackopose-hentai",
                    "value": "jackopose"
                },
                {
                    "name": "latex-hentai",
                    "value": "latex"
                },
                {
                    "name": "milk-hentai",
                    "value": "milk"
                },
                {
                    "name": "pantsu-hentai",
                    "value": "pantsu"
                },
                {
                    "name": "sex-hentai",
                    "value": "sex"
                },
                {
                    "name": "slime-hentai",
                    "value": "slime"
                },
                {
                    "name": "thighs-real",
                    "value": "thighs"
                },
                {
                    "name": "femboy-hentai",
                    "value": "trap"
                },
                {
                    "name": "yuri-hentai",
                    "value": "yuri"
                }
            ]
        },
    ],
};

export const IMAGE_COMMAND = {
    name: "image",
    description: "Apply a fun filter to an image/avatar url.",
    options: [
        {
            name: "category",
            description: "The of filter you want to add.",
            type: 3,
            required: true,
            choices: [
                {
                    "name": "achievement",
                    "value": "achievement"
                },
                {
                    "name": "bisexual",
                    "value": "bisexual"
                },
                {
                    "name": "gay",
                    "value": "gay"
                },
		{
                    "name": "nonbinary",
                    "value": "nonbinary"
                },
                {
                    "name": "pansexual",
                    "value": "pansexual"
                },
                {
                    "name": "sepia",
                    "value": "sepia"
                },
                {
                    "name": "transgender",
                    "value": "transgender"
                }
            ]
        },
        {
            name: "text",
            description: "The text you want to add to an image.",
            type: 3,
            required: false,
        },
        {
            name: "member",
            description: "The member you want to add a filter to.",
            type: 6,
            required: false
        },
    ],
};

