// perform general formatting for user-selected options
function format_file() {
	let file_reader_content = new FileReader();
	let content_str = document.getElementById("html_file").files[0];
	file_reader_content.onload = function(event) {
		/*
		line-by-line checks
		*/
		let html_list = event.target.result.split("\n");
		// make space hexcode consistent
		if (document.getElementById("space_format").checked) {
			html_list = replace_arr(html_list, /[  ]+/g, " ")
		}
		// remove multispaces
		if (document.getElementById("multispace").checked) {
			html_list = replace_arr(html_list, /  +/g, " ")
		}
		// remove empty tags
		if (document.getElementById("empty_line").checked) {
			const empty_tag_regex = /<[a-zA-Z0-9]*><\/[a-zA-Z0-9]*>/g;
			const space_tag_regex = /<[a-zA-Z0-9]*> *(&nbsp;)* *<\/[a-zA-Z0-9]*>/g;
			// replace empty tags until there are none left
			while (in_arr(html_list, empty_tag_regex) || in_arr(html_list, space_tag_regex)) {
				html_list = replace_arr(html_list, empty_tag_regex, "");
				html_list = replace_arr(html_list, space_tag_regex, " ");
			}
		}
		// replace fancy quotes
		if (document.getElementById("quotes").checked) {
			html_list = replace_arr(html_list, "‘", "'");
			html_list = replace_arr(html_list, "’", "'");
			html_list = replace_arr(html_list, "“", '"');
			html_list = replace_arr(html_list, "”", '"');
		}
		// replace fancy quote html entities
		if (document.getElementById("quote_entities").checked) {
			html_list = replace_arr(html_list, "&rsquo;", "'");
			html_list = replace_arr(html_list, "&lsquo;", "'");
			html_list = replace_arr(html_list, "&rdquo;", '"');
			html_list = replace_arr(html_list, "&ldquo;", '"');
		}
		// replace emdashes
		if (document.getElementById("emdash").checked) {
			html_list = replace_arr(html_list, "–", "-");
		}
		// join consecutive em/strong
		if (document.getElementById("consecutive_em").checked) {
			html_list = replace_arr(html_list, /<\/em>( *)<em>/g, "$1");
			html_list = replace_arr(html_list, /<\/strong>( *)<strong>/g, "$1");
		}
		// change italics to cite if the line has a link
		if (document.getElementById("consecutive_em").checked) {
			html_list = html_list.map(change_link_em_to_cite);
		}
		// change italics to cite
		if (document.getElementById("default_cite").checked) {
			html_list = replace_arr(html_list, "<em>", "<cite>");
			html_list = replace_arr(html_list, "</em>", "</cite>");
		}
		// change italics to i
		if (document.getElementById("default_i").checked) {
			html_list = replace_arr(html_list, "<em>", "<i>");
			html_list = replace_arr(html_list, "</em>", "</i>");
		}
		// change bold to b
		if (document.getElementById("default_b").checked) {
			html_list = replace_arr(html_list, "<strong>", "<b>");
			html_list = replace_arr(html_list, "</strong>", "</b>");
		}
		// remove _Ref links
		if (document.getElementById("dw_ref").checked) {
			html_list = replace_arr(html_list, /<a name="_Ref[0-9]+">(.*?)<\/a>/g, "$1");
		}
		// fix referential and external links
		if (document.getElementById("ref_links").checked) {
			html_list = html_list.map(fix_ref_links);
		}
		// fix align-center and align-right
		if (document.getElementById("align").checked) {
			html_list = replace_arr(html_list, /align="center"/g, 'class="align-center"');
			html_list = replace_arr(html_list, /align="right"/g, 'class="align-right"');
		}
		/*
		multi-line checks
		*/
		let html_doc_str = html_list.join("\n").replaceAll("\r\n", "\n");
		// join consecutive lists
		if (document.getElementById("consecutive_lists").checked) {
			const ol_str = `</ol>
 *<ol>`;
      const ul_str = `</ul>
 *<ul>`;
			const ol_regex = new RegExp(ol_str, "g");
			const ul_regex = new RegExp(ul_str, "g");
			html_doc_str = html_doc_str.replaceAll(ol_regex, "").replaceAll(ul_regex, "");
		}
		// fix footnotes
		if (document.getElementById("footnotes").checked) {
			const footnote_top_regex = '<a href="#_ftn[0-9]+" name="_ftnref[0-9]+" title="">(.*?)</a>';
			const footnote_bot_regex = `<div id="ftn[0-9]+">(<br>)* *
* *(
 *<ul> *
 *<li>)*(<p>)*<a href="#_ftnref[0-9]+" name="_ftn[0-9]+" title=""> *</a>((\n*.)*?)(</p> *
)* *(</li> *
 *</ul> *
 *)* *</div>`;
			html_doc_str = replace_footnote_str(html_doc_str, footnote_top_regex, footnote_bot_regex, 4, "");
			html_doc_str = add_footnote_div(html_doc_str);
			html_doc_str = add_consecutive_commas(html_doc_str);
		}
		download(html_doc_str, "formatted.html", "text/html");
	}
	file_reader_content.readAsText(content_str);
}

/* helpers */

// fix referential and internal links in line
function fix_ref_links(html_line) {
	let edited_line = html_line;
	// get links
	let orig_links = html_line.match(/<a (.*?)>/g);
	if (orig_links === null) {
		orig_links = [];
	}
	for (i = 0; i < orig_links.length; i++) {
		let curr_link = orig_links[i];
		// make internal links relative
		if (curr_link.includes("osfi-bsif.gc.ca")) {
			let new_link = curr_link.replaceAll(/(https*:\/\/)*(www.)*osfi-bsif.gc.ca/g, "");
		}
		else {
			// add rel to external links, excluding footnotes and toc
			let new_link = curr_link;
			if (!curr_link.includes("_ftn") && !curr_link.includes("_Toc") && !curr_link.includes("toc_") && !curr_link.includes("fnb") && !curr_link.includes('href="/') && !curr_link.includes("mailto")) {
				new_link = curr_link.replace(/rel *= *"external"/g, "").replace(/<a /g, '<a rel="external" ');
			}
		}
		edited_line = edited_line.replaceAll(curr_link, new_link);
	}
	return edited_line;
}

// change italics to citations if there is a link on the line
function change_link_em_to_cite(html_line) {
	let edited_line = html_line;
	if (edited_line.includes("<a ") || edited_line.includes("<a>")) {
        edited_line = edited_line.replaceAll("<em>", "<cite>");
        edited_line = edited_line.replaceAll("</em>", "</cite>");
    }
	return edited_line;
}