module.exports = class embedManager {

	constructor(opt = {}) {
		this.colors = Object.assign({
			quote: 6482943, // #62EBFF
			leaderboard: 16763981, // #ffcc4d
			list: 8640595, // #83d853
			video: 10041553, // #9938D1
			image: 14707627, // #e06bab
			warn: 16728663, // #B52F49
		}, opt);
		console.log(this.colors);

		this.quote = this.quote.bind(this);
		this.image = this.image.bind(this);
		this.video = this.video.bind(this);
	}

	monocolor(color) {
		for(var k=0; k<Object.keys(this.colors).length;k++) {
			var key = Object.keys(this.colors)[k]
			this.colors[key] = color;
		}
	} 

	// used as base to construct other embeds
	objLoop(object, exclude = []) {
		var ret = "";
		for(var i=0;i<Object.keys(object).length;i++) {
			var key = Object.keys(object)[i];
			if(!exclude.includes(key)) {
				var value = object[key];

				if(typeof(value) == "object") {
					// implement redundancy for trees?
					value = `Sub-Object with ${Object.keys(object[key]).length} keys.`;
				}

				ret += (value + '\n');
			}
		}

		return ret;
	}


	arbitraryObjectDisplay(object, exclude = []) { 
		var embed = {
			color: this.colors.list,
			fields: [],
		}

		for(var i=0;i<Object.keys(object).length;i++) {
			var key = Object.keys(object)[i];
			var value = object[key];

			if(typeof(value) == "object") {
				// implement redundancy for trees?
				// value = `Object with ${Object.keys(object[key]).length} keys.`;
				value = this.objLoop(value, exclude);
			} else if (typeof(value) == "array") {
				value = `Array with ${object[key].length} items.`;
			}

			embed.fields.push({
				name: key,
				value: value
			});
		}

		// returns only normal embed.

		console.log(embed)
		return embed;
	}


	// used lazy binding for these :( fix later

	quote(msg) {
		console.log(msg);
		var author = msg.author;
		var authId = `${author.id}`;
		var embed = {
			description:  msg.content,
			color: this.colors.quote,
			thumbnail: {
				url: "https://media.discordapp.net/attachments/348636325471059978/514654174491836416/Untitled1.png"
			},
			author: {
				name: author.username,
				icon_url: author.avatarURL
			},
		}

		if(msg.attachments.size >= 1) {    
			embed.image = {
				url: msg.attachments.first().url
			}
		}

		if(msg.embeds.length >= 1) {
			embed = msg.embeds[0];
		};

		return({"embed":embed});
	}

	image(url, indexIndicator = "") {
		var embed = {
			title: indexIndicator,
			color: this.colors.image,
			image: {
				url: url
			}
		}

		return({"embed":embed});
	}

	video(data, indexIndicator = "") {
		var embed = {
			title: `${data.title} ${indexIndicator}`,
			color: this.colors.video,
			author: {
				name: data.channelTitle,
				icon_url: "https://cdn1.iconfinder.com/data/icons/logotypes/32/youtube-512.png",
			},
			thumbnail: {
				url: `https://img.youtube.com/vi/${data.id}/maxresdefault.jpg`,
			},
			fields: [{
				name: data.link,
				value: data.description || "...",
			}]
		}

		return({"embed":embed});
	}

	// no binding required

	vote() {
		var embed = {
			title: "Whoa, there!",
			description: "I'm not just gonna let you do that, motherfucker. What say you?",
			color: this.colors.warn,
		}

		return({"embed":embed});
	};

	cancelledVote(count) {
		var embed = {
			title: "Well, there's always next time.",
			description: "It was probably a bad search anyway.",
			fields: [
			{
				name: "Fun Fact #17",
				value: `This is the (${count})-th-st cancelled vote.`
			}
			],
			color: this.colors.quote,
		}

		return({"embed":embed})
	}


	alert(msg) {
		var embed = {
			title: "⚠️✋",
			description: msg,
			color: this.colors.leaderboard
		}

		return({"embed":embed})
	}

	error(msg) {
		var embed = {
			title: "🛑✋",
			description: `**${msg}**`,
			color: this.colors.warn
		}

		return({"embed":embed})
	}

	config(configObject) {
		var embed = this.arbitraryObjectDisplay(configObject);
		embed.title = "Config";
		return({"embed":embed});
	}

	help(helpObject) {
		var embed = this.arbitraryObjectDisplay(helpObject);
		embed.title = "Jordan 2.0b Help Menu";
		return({"embed":embed});
	}

	status(statusObject) {
		var embed = this.arbitraryObjectDisplay(statusObject, ["status", "last", "last-search"]);
		embed.title = "What's Up?";s
		return({"embed":embed});
	}

}

