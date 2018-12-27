/*
Sử dụng mLab (Cloud DB)
	http://docs.mlab.com/
	http://docs.mlab.com/data-api/
		https://api.mlab.com/api/1/databases?apiKey=lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s
		https://api.mlab.com/api/1/databases/lockex1987/collections?apiKey=lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s
		https://api.mlab.com/api/1/databases/lockex1987/collections/coordinate?apiKey=lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s
*/
class Mlab {

	// Base URL của mLab
	static get MLAB_BASE_URL() {
		return 'https://api.mlab.com/api/1';
	}

	constructor(database, collection, apiKey) {
		this.database = database;
		this.collection = collection;
		this.apiKey = apiKey;
	}

	listDocuments(callback) {
		var url = Mlab.MLAB_BASE_URL +
				'/databases/' + this.database +
				'/collections/' + this.collection +
				'?apiKey=' + this.apiKey;
		$.ajax({
			url: url,
			type: 'GET',
			contentType: 'application/json',
			success: function(resp) {
				if (callback) {
					callback(resp);
				}
			}
		});
	}

	insertDocument(docObj, callback) {
		var url = Mlab.MLAB_BASE_URL +
				'/databases/' + this.database +
				'/collections/' + this.collection +
				'?apiKey=' + this.apiKey;
		var params = JSON.stringify(docObj);
		$.ajax({
			url: url,
			type: 'POST',
			data: params,
			contentType: 'application/json',
			success: function(resp) {
				if (callback) {
					callback(resp);
				}
			}
		});
	}

	deleteDocument(docId, callback) {
		var url = Mlab.MLAB_BASE_URL +
				'/databases/' + this.database +
				'/collections/' + this.collection +
				'/' + docId +
				'?apiKey=' + this.apiKey;
		$.ajax({
			url: url,
			type: 'DELETE',
			success: function(resp) {
				if (callback) {
					callback(resp);
				}
			}
		});
	}

	deleteAllDocument(callback) {
		var url = Mlab.MLAB_BASE_URL +
				'/databases/' + this.database +
				'/collections/' + this.collection +
				'?apiKey=' + this.apiKey;
		var params = JSON.stringify([]); // empty list
		$.ajax({
			url: url,
			data: params,
			type: 'PUT',
			contentType: 'application/json',
			success: function(resp) {
				if (callback) {
					callback(resp);
				}
			}
		});
	}
}
