globals = {
	productionWebsiteUrl : 'https://www.grownout.com/',
	adminWebsite : 'http://admin.grownout.com/',
	gcsBucket : 'https://storage.googleapis.com/grownout-premium/v2/',
	gcsBucketStringToReplace : 'https://grownout-premium.storage.googleapis.com/v2/'
}

if(Iron.Location.get().rootUrl){
	globals.website = 'http://app.grownout.com/'
}
else{
	globals.website = 'http://app.grownout.com/'
}