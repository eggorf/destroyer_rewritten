module.exports = {
	name: 'l',
	description: 'Leaderboard!',
	required: ["embeds", "stats"],
	execute(message, args, managers = {}) {
		if(args != "") {
			message.channel.send(mangers.embeds.leaderboard(args, managers.stats.getLeaderboard(args)));
		} else {
			message.channel.send(managers.embeds.leaderboardList(managers.stats.getStatNames()))
		}
	},
};
