var vm = new Vue({
	el: '#app',
	data: function() {
		var peopleCodes = people.map(p => p.code);
		return {
			peopleCodes: peopleCodes,
			you: peopleCodes[0],
			relative: peopleCodes[1],
			linkType: '',
			personObj: {}
		};
	},
	methods: {
		changed() {
			this.linkType = calculateRelation(this.you, this.relative);
		},
	
		swap() {
			var temp = this.you;
			this.you = this.relative;
			this.relative = temp;
			this.changed();
		},

		initChart() {
			// Vẽ biểu đồ
			var dTreeData = [personMap['ONGNGOAI']];

			var options = {
				target: '#graph',
				width: 1600,
				height: 600,
				callbacks: {
					nodeClick: function(name, extra) {
						var personCode = extra.code;
						vm.viewPersonByCode(personCode);
					}
				},
				nodeWidth: 100
			};

			dTree.init(dTreeData, options);
		},

		viewPersonByCode(personCode) {
			this.personObj = personMap[personCode];
		},

		closePopup() {
			this.personObj = {};
		}
	},
	mounted() {
		this.changed();
		this.initChart();
	}
});
