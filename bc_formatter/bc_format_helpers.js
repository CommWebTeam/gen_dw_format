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

// remove text for top footnotes
function rm_footnote_text(html_str) {
	return html_str.replaceAll(/Footnote <\/span>[0-9]+/g, "</span>").replaceAll(/Note de bas de page <\/span>[0-9]+/g, "</span>");
}

// replace br with newlines
function replace_br_p(html_str) {
	return html_str.replaceAll("<br/>", "<p></p>");
}

// remove math
function rm_math_placeholder(html_str) {
	return html_str.replaceAll(/<math(.|\n)*?<\/math>/g, "MATHPLACEHOLDER");
}

// remove [BCBS] and [CBCB] citations
function rm_basel_cite(html_str) {
	return html_str.replaceAll(/\[BCBS(.*?)\]/g, "").replaceAll(/\[CBCB.*?\]/g, "");
}
