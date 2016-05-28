var Api = new Restivus({
	useDefaultAuth: true,
	prettyJson: true
});


Api.addRoute('importSaas', {
	post: function () {
		return externalApi.importSaas(this.bodyParams)
	}
});

Api.addRoute('decryptUserId', {
	get: function () {
		var fut = new Future();

		if(this.queryParams.candidateId && this.queryParams.passKey == globals.gEncryptAmoebaId){
			fut['return']({error: false, 'candidateId': this.queryParams.candidateId, decryptedId: decryptAmoebaId(this.queryParams.candidateId)});
		}
		else{
			fut['return']({error: true, message:'Invalid Query Parameters'});
		}
		return fut.wait();
	}
});