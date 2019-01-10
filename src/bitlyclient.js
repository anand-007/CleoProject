/**
* Fetches user details
* @returns {Object} returns user details
**/

export function fetchUser(){

	var url = "https://api-ssl.bitly.com/v4/user";

	var request = new Request(url, {
		method:'GET',
		headers:new Headers({'Authorization':`Bearer 09957d150f25858794e5ff2b3f64ea8a44ea3b3d`})
	});

	return fetch(request);
}

/**
* Fetches guid details
* @returns {Object} returns guid details
**/

export function retrieveGUID(){

	var url = "https://api-ssl.bitly.com/v4/groups";

	var request = new Request(url, {
		method:'GET',
		headers:new Headers({'Authorization':`Bearer 09957d150f25858794e5ff2b3f64ea8a44ea3b3d`})
	});

	return fetch(request);
}

/**
* Shortens the rul 
* @returns {Object} returns shortened url data
**/

export function shortenURL(data){

	var url = "https://api-ssl.bitly.com/v4/shorten";

	var request = new Request(url, {
		method:'POST',
		body:JSON.stringify(data),

		headers:new Headers({'Authorization':`Bearer 09957d150f25858794e5ff2b3f64ea8a44ea3b3d`,'Content-Type': 'application/json'})
	});

	return fetch(request);
}


