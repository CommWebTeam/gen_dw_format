// downloads text file
function download(values, file_name, datatype) {
	// sourced from https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
	let placeholder = document.createElement('a');
	placeholder.setAttribute('href', 'data:' + datatype + ';charset=utf-8,' + encodeURIComponent(values));
	placeholder.setAttribute('download', file_name);
	document.body.appendChild(placeholder);
	placeholder.click();
	document.body.removeChild(placeholder);
}
