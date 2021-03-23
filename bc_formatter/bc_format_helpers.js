// perform general formatting for user-selected options
function format_file() {
	let file_reader_content = new FileReader();
	let content_str = document.getElementById("html_file").files[0];
	file_reader_content.onload = function(event) {
		let html_doc_str = event.target.result.replaceAll("\r\n", "\n");
		// remove footnote text
		if (document.getElementById("footnotes").checked) {
			html_doc_str = rm_footnote_text(html_doc_str);
		}
        // replace br with p newline
		if (document.getElementById("br_newline").checked) {
			html_doc_str = replace_br_p(html_doc_str);
		}
        // remove math
		if (document.getElementById("math_placeholder").checked) {
			html_doc_str = rm_math_placeholder(html_doc_str);
		}
        // remove basel citations
		if (document.getElementById("basel_cite").checked) {
			html_doc_str = rm_basel_cite(html_doc_str);
		}
		download(html_doc_str, "formatted.html", "text/html");
	}
	file_reader_content.readAsText(content_str);
}

/* helpers */

// remove reference links
function remove_ref_links(html_str) {
	return html_str.replaceAll(/<a name="_Ref[a-zA-z0-9]+">(.*?)<\/a>/g, "$1").replaceAll(/<a href="#_Ref[a-zA-z0-9]+">(.*?)<\/a>/g, "$1");
}
