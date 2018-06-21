var data = {
	teams: [
		{"name":"Russia","flag":"images/flag/rus.png","rank":65},
		{"name":"Germany","flag":"images/flag/ger.png","rank":1},
		{"name":"Brazil","flag":"images/flag/bra.png","rank":2},
		{"name":"Portugal","flag":"images/flag/por.png","rank":3},
		{"name":"Argentina","flag":"images/flag/arg.png","rank":4},
		{"name":"Belgium","flag":"images/flag/bel.png","rank":5},
		{"name":"Poland","flag":"images/flag/pol.png","rank":6},
		{"name":"France","flag":"images/flag/fra.png","rank":7},
		{"name":"Spain","flag":"images/flag/esp.png","rank":8},
		{"name":"Peru","flag":"images/flag/per.png","rank":10},
		{"name":"Switzerland","flag":"images/flag/sui.png","rank":11},
		{"name":"England","flag":"images/flag/eng.png","rank":12},
		{"name":"Colombia","flag":"images/flag/col.png","rank":13},
		{"name":"Mexico","flag":"images/flag/mex.png","rank":16},
		{"name":"Uruguay","flag":"images/flag/uru.png","rank":17},
		{"name":"Croatia","flag":"images/flag/cro.png","rank":18},
		{"name":"Denmark","flag":"images/flag/den.png","rank":19},
		{"name":"Iceland","flag":"images/flag/isl.png","rank":21},
		{"name":"Costa Rica","flag":"images/flag/crc.png","rank":22},
		{"name":"Sweden","flag":"images/flag/swe.png","rank":25},
		{"name":"Tunisia","flag":"images/flag/tun.png","rank":28},
		{"name":"Egypt","flag":"images/flag/egy.png","rank":30},
		{"name":"Senegal","flag":"images/flag/sen.png","rank":32},
		{"name":"Iran","flag":"images/flag/irn.png","rank":34},
		{"name":"Serbia","flag":"images/flag/srb.png","rank":38},
		{"name":"Nigeria","flag":"images/flag/nga.png","rank":41},
		{"name":"Australia","flag":"images/flag/aus.png","rank":43},
		{"name":"Japan","flag":"images/flag/jpn.png","rank":44},
		{"name":"Morocco","flag":"images/flag/mar.png","rank":48},
		{"name":"Panama","flag":"images/flag/pan.png","rank":49},
		{"name":"South Korea","flag":"images/flag/kor.png","rank":62},
		{"name":"Saudi Arabia","flag":"images/flag/ksa.png","rank":63}
	],
	groups: [
		{ name: "A", teams: ["Russia", "Saudi Arabia", "Egypt", "Uruguay"] },
		{ name: "B", teams: ["Portugal", "Spain", "Morocco", "Iran"] },
		{ name: "C", teams: ["France", "Australia", "Peru", "Denmark"] },
		{ name: "D", teams: ["Argentina", "Iceland", "Croatia", "Nigeria"] },
		{ name: "E", teams: ["Brazil", "Switzerland", "Costa Rica", "Serbia"] },
		{ name: "F", teams: ["Germany", "Mexico", "Sweden", "South Korea"] },
		{ name: "G", teams: ["Belgium", "Panama", "Tunisia", "England"] },
		{ name: "H", teams: ["Poland", "Senegal", "Colombia", "Japan"] }
	],
	matches: [
		{ round: "group", time: "Jun 14, 2018	15:00", team_1: "Russia", team_2: "Saudi Arabia", score: "5:0" },

		{ round: "group", time: "Jun 15, 2018	12:00", team_1: "Egypt", team_2: "Uruguay", score: "0:1" },
		{ round: "group", time: "Jun 15, 2018	15:00", team_1: "Morocco", team_2: "Iran", score: "0:1" },
		{ round: "group", time: "Jun 15, 2018	18:00", team_1: "Portugal", team_2: "Spain", score: "3:3" },
		
		{ round: "group", time: "Jun 16, 2018	10:00", team_1: "France", team_2: "Australia", score: "2:1" },
		{ round: "group", time: "Jun 16, 2018	13:00", team_1: "Argentina", team_2: "Iceland", score: "1:1" },
		{ round: "group", time: "Jun 16, 2018	16:00", team_1: "Peru", team_2: "Denmark", score: "0:1" },
		{ round: "group", time: "Jun 16, 2018	19:00", team_1: "Croatia", team_2: "Nigeria", score: "2:0" },

		{ round: "group", time: "Jun 17, 2018	12:00", team_1: "Costa Rica", team_2: "Serbia", score: "0:1" },
		{ round: "group", time: "Jun 17, 2018	15:00", team_1: "Germany", team_2: "Mexico", score: "0:1" },
		{ round: "group", time: "Jun 17, 2018	18:00", team_1: "Brazil", team_2: "Switzerland", score: "1:1" },
		
		{ round: "group", time: "Jun 18, 2018	12:00", team_1: "Sweden", team_2: "South Korea", score: "1:0" },
		{ round: "group", time: "Jun 18, 2018	15:00", team_1: "Belgium", team_2: "Panama", score: "3:0" },
		{ round: "group", time: "Jun 18, 2018	18:00", team_1: "Tunisia", team_2: "England", score: "1:2" },
		
		{ round: "group", time: "Jun 19, 2018	12:00", team_1: "Colombia", team_2: "Japan", score: "1:2" },
		{ round: "group", time: "Jun 19, 2018	15:00", team_1: "Poland", team_2: "Senegal", score: "1:2" },
		{ round: "group", time: "Jun 19, 2018	18:00", team_1: "Russia", team_2: "Egypt", score: "3:1" },
		
		{ round: "group", time: "Jun 20, 2018	12:00", team_1: "Portugal", team_2: "Morocco", score: "1:0" },
		{ round: "group", time: "Jun 20, 2018	15:00", team_1: "Uruguay", team_2: "Saudi Arabia", score: "1:0" },
		{ round: "group", time: "Jun 20, 2018	18:00", team_1: "Iran", team_2: "Spain", score: "0:1" },
		
		{ round: "group", time: "Jun 21, 2018	12:00", team_1: "Denmark", team_2: "Australia", score: ":" },
		{ round: "group", time: "Jun 21, 2018	15:00", team_1: "France", team_2: "Peru", score: ":" },
		{ round: "group", time: "Jun 21, 2018	18:00", team_1: "Argentina", team_2: "Croatia", score: ":" },
		
		{ round: "group", time: "Jun 22, 2018	12:00", team_1: "Brazil", team_2: "Costa Rica", score: ":" },
		{ round: "group", time: "Jun 22, 2018	15:00", team_1: "Nigeria", team_2: "Iceland", score: ":" },
		{ round: "group", time: "Jun 22, 2018	18:00", team_1: "Serbia", team_2: "Switzerland", score: ":" },

		{ round: "group", time: "Jun 23, 2018	12:00", team_1: "Belgium", team_2: "Tunisia", score: ":" },
		{ round: "group", time: "Jun 23, 2018	15:00", team_1: "South Korea", team_2: "Mexico", score: ":" },
		{ round: "group", time: "Jun 23, 2018	18:00", team_1: "Germany", team_2: "Sweden", score: ":" },
		
		{ round: "group", time: "Jun 24, 2018	12:00", team_1: "England", team_2: "Panama", score: ":" },
		{ round: "group", time: "Jun 24, 2018	15:00", team_1: "Japan", team_2: "Senegal", score: ":" },
		{ round: "group", time: "Jun 24, 2018	18:00", team_1: "Poland", team_2: "Colombia", score: ":" },
		
		{ round: "group", time: "Jun 25, 2018	14:00", team_1: "Uruguay", team_2: "Russia", score: ":" },
		{ round: "group", time: "Jun 25, 2018	14:00", team_1: "Saudi Arabia", team_2: "Egypt", score: ":" },
		{ round: "group", time: "Jun 25, 2018	18:00", team_1: "Iran", team_2: "Portugal", score: ":" },
		{ round: "group", time: "Jun 25, 2018	18:00", team_1: "Spain", team_2: "Morocco", score: ":" },
		
		{ round: "group", time: "Jun 26, 2018	14:00", team_1: "Denmark", team_2: "France", score: ":" },
		{ round: "group", time: "Jun 26, 2018	14:00", team_1: "Australia", team_2: "Peru", score: ":" },
		{ round: "group", time: "Jun 26, 2018	18:00", team_1: "Nigeria", team_2: "Argentina", score: ":" },
		{ round: "group", time: "Jun 26, 2018	18:00", team_1: "Iceland", team_2: "Croatia", score: ":" },
		
		{ round: "group", time: "Jun 27, 2018	14:00", team_1: "South Korea", team_2: "Germany", score: ":" },
		{ round: "group", time: "Jun 27, 2018	14:00", team_1: "Mexico", team_2: "Sweden", score: ":" },
		{ round: "group", time: "Jun 27, 2018	18:00", team_1: "Serbia", team_2: "Brazil", score: ":" },
		{ round: "group", time: "Jun 27, 2018	18:00", team_1: "Switzerland", team_2: "Costa Rica", score: ":" },
		
		{ round: "group", time: "Jun 28, 2018	14:00", team_1: "Japan", team_2: "Poland", score: ":" },
		{ round: "group", time: "Jun 28, 2018	14:00", team_1: "Senegal", team_2: "Colombia", score: ":" },
		{ round: "group", time: "Jun 28, 2018	18:00", team_1: "England", team_2: "Belgium", score: ":" },
		{ round: "group", time: "Jun 28, 2018	18:00", team_1: "Panama", team_2: "Tunisia", score: ":" },
		
		{ round: "round-of-16", time: "Jun 30, 2018   14:00", team_1: "1C", team_2: "2D", order: 50, score: ":" },
		{ round: "round-of-16", time: "Jun 30, 2018   18:00", team_1: "1A", team_2: "2B", order: 49, score: ":" },
		
		{ round: "round-of-16", time: "Jul 1, 2018   14:00", team_1: "1B", team_2: "2A", order: 51, score: ":" },
		{ round: "round-of-16", time: "Jul 1, 2018   18:00", team_1: "1D", team_2: "2C", order: 52, score: ":" },
		
		{ round: "round-of-16", time: "Jul 2, 2018   14:00", team_1: "1E", team_2: "2F", order: 53, score: ":" },
		{ round: "round-of-16", time: "Jul 2, 2018   18:00", team_1: "1G", team_2: "2H", order: 54, score: ":" },

		{ round: "round-of-16", time: "Jul 3, 2018   14:00", team_1: "1F", team_2: "2E", order: 55, score: ":" },
		{ round: "round-of-16", time: "Jul 3, 2018   18:00", team_1: "1H", team_2: "2G", order: 56, score: ":" },
		
		{ round: "quarter-finals", time: "Jul 6, 2018   14:00", team_1: "W49", team_2: "W50", order: 57, score: ":" },
		{ round: "quarter-finals", time: "Jul 6, 2018   18:00", team_1: "W53", team_2: "W54", order: 58, score: ":" },
		
		{ round: "quarter-finals", time: "Jul 7, 2018   14:00", team_1: "W51", team_2: "W52", order: 59, score: ":" },
		{ round: "quarter-finals", time: "Jul 7, 2018   18:00", team_1: "W55", team_2: "W56", order: 60, score: ":" },
		
		{ round: "semi-finals", time: "Jul 10, 2018   18:00", team_1: "W57", team_2: "W58", order: 61, score: ":" },
		{ round: "semi-finals", time: "Jul 11, 2018   18:00", team_1: "W59", team_2: "W60", order: 62, score: ":" },
		{ round: "third-place", time: "Jul 14, 2018   14:00", team_1: "L61", team_2: "L62", order: 63, score: ":" },
		{ round: "final", time: "Jul 15, 2018   15:00", team_1: "W61", team_2: "W62", order: 64, score: ":" }
	]
}
