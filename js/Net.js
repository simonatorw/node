class Net {
	
	ajax(method, url, params) {
		return new Promise(function(resolve, reject) {
			const xhr = new XMLHttpRequest();
			
			xhr.open(method, url, true);
			if (method === 'POST') {
				xhr.setRequestHeader('Content-type', 'application/X-www-form-urlencoded');
			}
			xhr.onload = resolve;
			xhr.onerror = reject;
			method === 'GET' ? xhr.send() : xhr.send(params);
		});
	}
}