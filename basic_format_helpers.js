// perform general formatting for user-selected options
function format_file() {
	let file_reader_content = new FileReader();
	let content_str = document.getElementById("html_file").files[0];
	file_reader_content.onload = function(event) {
		let html_doc_str = event.target.result.replaceAll("\r\n", "\n");
		// make space hexcode consistent
		if (document.getElementById("space_format").checked) {
			html_doc_str = replace_invisible_nbsp(html_doc_str);
		}
		// remove multispaces
		if (document.getElementById("multispace").checked) {
			html_doc_str = remove_multispace(html_doc_str);
		}
		// remove empty tags
		if (document.getElementById("empty_line").checked) {
			html_doc_str = rm_empty_tags(html_doc_str);
		}
		// replace fancy quotes
		if (document.getElementById("quotes").checked) {
			html_doc_str = replace_fancy_quotes(html_doc_str);
		}
		// replace fancy quote html entities
		if (document.getElementById("quote_entities").checked) {
			html_doc_str = replace_fancy_quote_entities(html_doc_str);
		}
		// replace emdashes
		if (document.getElementById("emdash").checked) {
			html_doc_str = replace_dashes(html_doc_str);
		}
		// change italics to cite if the line has a link
		if (document.getElementById("cite_link").checked) {
			html_doc_str = change_link_em_to_cite(html_doc_str);
		}
		// change italics to cite
		if (document.getElementById("default_cite").checked) {
			html_doc_str = default_tag(html_doc_str, "em", "cite");
		}
		// change italics to i
		if (document.getElementById("default_i").checked) {
			html_doc_str = default_tag(html_doc_str, "em", "i");
		}
		// change bold to b
		if (document.getElementById("default_b").checked) {
			html_doc_str = default_tag(html_doc_str, "strong", "b");
		}
		// join consecutive em/strong
		if (document.getElementById("consecutive_em").checked) {
			html_doc_str = join_em_strong(html_doc_str);
		}
		// join consecutive lists
		if (document.getElementById("consecutive_lists").checked) {
			html_doc_str = join_lists(html_doc_str);
		}
		// remove _Ref links
		if (document.getElementById("dw_ref").checked) {
			html_doc_str = remove_ref_links(html_doc_str);
		}
		// remove _Toc links
		if (document.getElementById("dw_toc").checked) {
			html_doc_str = remove_toc_links(html_doc_str);
		}
		// remove logiterms
		if (document.getElementById("logiterms").checked) {
			html_doc_str = remove_logiterms(html_doc_str);
		}
		// fix referential and external links
		if (document.getElementById("ref_links").checked) {
			html_doc_str = fix_ref_links(html_doc_str);
		}
		// fix align-center and align-right
		if (document.getElementById("align").checked) {
			html_doc_str = fix_align(html_doc_str);
		}
		// remove attributes from paragraph tags
		if (document.getElementById("p_tag").checked) {
			html_doc_str = rm_p_attributes(html_doc_str, "p");
		}
		// fix footnotes
		if (document.getElementById("footnotes").checked) {
			html_doc_str = fix_footnotes(html_doc_str);
		}
		// remove attributes from table tags
		if (document.getElementById("table_tag").checked) {
			html_doc_str = rm_table_attributes(html_doc_str, "table");
		}
		// translate links and footnotes to French
		if (document.getElementById("translate").checked) {
			html_doc_str = translate_to_fr(html_doc_str);
		}
		// fix script tags
		if (document.getElementById("fake_script_tag").checked) {
			html_doc_str = fix_fake_scripts(html_doc_str);
		}
		// fix math tags
		if (document.getElementById("fake_math_tag").checked) {
			html_doc_str = fix_fake_math(html_doc_str);
		}
		download(html_doc_str, "formatted.html", "text/html");
	}
	file_reader_content.readAsText(content_str);
}

/* helpers */

// remove empty tags
function rm_empty_tags(html_str) {
	let edited_html_str = html_str;
	const empty_tag_regex = /<[a-zA-Z0-9]*><\/[a-zA-Z0-9]*>/g;
	const space_tag_regex = /<[a-zA-Z0-9]*> *(&nbsp;)* *<\/[a-zA-Z0-9]*>/g;
	// replace empty tags until there are none left
	while (empty_tag_regex.test(edited_html_str) || space_tag_regex.test(edited_html_str)) {
		edited_html_str = edited_html_str.replaceAll(empty_tag_regex, "");
		edited_html_str = edited_html_str.replaceAll(space_tag_regex, " ");
	}
	return edited_html_str;
}

// replace fancy quotes
function replace_fancy_quotes(html_str) {
	let edited_html_str = html_str.replaceAll("‘", "'");
	edited_html_str = edited_html_str.replaceAll("’", "'");
	edited_html_str = edited_html_str.replaceAll("“", '"');
	edited_html_str = edited_html_str.replaceAll("”", '"');
	return edited_html_str;
}

// replace fancy quote html entities
function replace_fancy_quote_entities(html_str) {
	let edited_html_str = html_str.replaceAll("&rsquo;", "'");
	edited_html_str = edited_html_str.replaceAll("&lsquo;", "'");
	edited_html_str = edited_html_str.replaceAll("&rdquo;", '"');
	edited_html_str = edited_html_str.replaceAll("&ldquo;", '"');
	return edited_html_str;
}

// replace emdashes with regular dashes
function replace_dashes(html_str) {
	return html_str.replaceAll("–", "-");
}

// change italics to citations if there is a link on the line
function change_link_em_to_cite_helper(html_line) {
	let edited_html_line = html_line.split("\n");
	if (edited_html_line.includes("<a ") || edited_html_line.includes("<a>")) {
        edited_html_line = edited_html_line.replaceAll("<em>", "<cite>");
        edited_html_line = edited_html_line.replaceAll("</em>", "</cite>");
    }
	return edited_html_line.join("\n");
}

// change italics to citations if there is a link in the html
function change_link_em_to_cite(html_str) {
	let html_arr = html_str.split("\n");
	html_arr = html_arr.map(change_link_em_to_cite_helper);
	return html_arr.join("\n");
}

// change instances of one tag to another
function default_tag(html_str, old_tag, new_tag) {
	let edited_html_str = html_str.replaceAll("<" + old_tag + ">", "<" + new_tag + ">");
	edited_html_str = edited_html_str.replaceAll("</" + old_tag + ">", "</" + new_tag + ">");
	return edited_html_str;
}

// join consecutive fonts
function join_em_strong(html_str) {
	let edited_html_str = html_str.replaceAll(/<\/em>( *)<em>/g, "$1");
	edited_html_str = edited_html_str.replaceAll(/<\/strong>( *)<strong>/g, "$1");
	return edited_html_str;
}

// join consecutive lists
function join_lists(html_str) {
	const ol_str = `</ol>
*<ol>`;
		 const ul_str = `</ul>
*<ul>`;
	const ol_regex = new RegExp(ol_str, "g");
	const ul_regex = new RegExp(ul_str, "g");
	return html_str.replaceAll(ol_regex, "").replaceAll(ul_regex, "");
}

// remove reference links
function remove_ref_links(html_str) {
	return html_str.replaceAll(/<a name="_Ref[a-zA-z0-9]+">(.*?)<\/a>/g, "$1");
}

// remove toc links
function remove_toc_links(html_str) {
	return html_str.replaceAll(/<a name="_Toc[a-zA-z0-9]+">(.*?)<\/a>/g, "$1");
}

// remove logiterms
function remove_logiterms(html_str) {
	return html_str.replaceAll(/<a name="lt_[a-zA-z0-9]+">(.*?)<\/a>/g, "$1");
}

// fix referential and internal links in line
function fix_ref_links(html_str) {
	let edited_html_str = html_str;
	// get links
	let orig_links = html_str.match(/<a (.*?)>/g);
	if (orig_links === null) {
		orig_links = [];
	}
	// loop through links
	for (i = 0; i < orig_links.length; i++) {
		let curr_link = orig_links[i];
		let new_link = curr_link;
		// make internal links relative
		if (curr_link.includes("osfi-bsif.gc.ca")) {
			new_link = curr_link.replaceAll(/(https*:\/\/)*(www.)*osfi-bsif.gc.ca/g, "");
		}
		else {
			// add rel to external links, excluding footnotes, toc, internal links, and emails
			new_link = curr_link;
			if (!curr_link.includes("_ftn") && !curr_link.includes("_Toc") && !curr_link.includes("toc_") && !curr_link.includes("fnb") && !curr_link.includes('href *= *"/') && !curr_link.includes("mailto")) {
				new_link = curr_link.replace(/rel *= *"external"/g, "").replace(/<a /g, '<a rel="external" ');
			}
		}
		edited_html_str = edited_html_str.replaceAll(curr_link, new_link);
	}
	return edited_html_str;
}

// fix alignment classes
function fix_align(html_str) {
	let edited_html_str = html_str.replaceAll(/align="center"/g, 'class="align-center"');
	edited_html_str = edited_html_str.replaceAll(/align="right"/g, 'class="align-right"');
	return edited_html_str;
}

// remove attributes from paragraph tags
function rm_p_attributes(html_str) {
	return html_str.replaceAll(/<p [^>]*>/g,  "<p>");
}

// fix footnotes using functions from footnote_helpers.js
function fix_footnotes(html_str) {
	// set regex statements that find footnotes using Dreamweaver's formatting
	const footnote_top_regex = '<a href="#_ftn[0-9]+" name="_ftnref[0-9]+" title="">(.*?)</a>';
	const footnote_bot_regex = `<div id="ftn[0-9]+">(<br>)* *
* *(
 *<ul> *
 *<li>)*(<p>)*<a href="#_ftnref[0-9]+" name="_ftn[0-9]+" title=""> *</a>((\n*.)*?)(</p> *
)* *(</li> *
 *</ul> *
 *)* *</div>`;
	// use wet footnote formatting functions
	let edited_html_str = replace_footnote_str(html_str, footnote_top_regex, footnote_bot_regex, 4, "");
	edited_html_str = add_footnote_div(edited_html_str);
	edited_html_str = add_consecutive_commas(edited_html_str);
	return edited_html_str;
}

// remove attributes from table tags
function rm_table_attributes(html_str) {
	// remove attributes from table, th, and tr tags 
	let edited_html_str = html_str.replaceAll(/<table [^>]*>/g,  "<table>");
	edited_html_str = edited_html_str.replaceAll(/<th [^>]*>/g,  "<th>");
	edited_html_str = edited_html_str.replaceAll(/<tr [^>]*>/g,  "<tr>");
	// for td tags, keep span attributes - temporarily move them out of the tag
	edited_html_str = edited_html_str.replaceAll(/<td( [^>]*)colspan *= *["']([ 0-9]+)["']/g, "COLSPAN$2<td$1");
	edited_html_str = edited_html_str.replaceAll(/<td( [^>]*)rowspan *= *["']([ 0-9]+)["']/g, "ROWSPAN$2<td$1");
	// remove other attributes from td tags, then move span attributes back in
	edited_html_str = edited_html_str.replaceAll(/<td [^>]*>/g,  "<td>");
	edited_html_str = edited_html_str.replaceAll(/ROWSPAN([ 0-9]+)<td/g,  '<td rowspan="$1"');
	edited_html_str = edited_html_str.replaceAll(/COLSPAN([ 0-9]+)<td/g,  '<td colspan="$1"');
	return edited_html_str;
}

// translate internal links and footnotes to French
function translate_to_fr(html_str) {
	// replace internal links
	let edited_html_str = html_str.replaceAll("/eng/", "/fra/");
	edited_html_str = edited_html_str.replaceAll("/Eng/", "/Fra/");
	// translate footnotes using helper from footnote_helpers.js
	edited_html_str = translate_footnotes(edited_html_str);
	return edited_html_str;
}

// fix fake script tags
function fix_fake_scripts(html_str) {
	let edited_html_str = html_str.replaceAll(/&lt;(sup.*?)&gt;/g, "<$1>");
	edited_html_str = edited_html_str.replaceAll(/&lt;(\/sup)&gt;/g, "<$1>");
	edited_html_str = edited_html_str.replaceAll(/&lt;(sub.*?)&gt;/g, "<$1>");
	edited_html_str = edited_html_str.replaceAll(/&lt;(\/sub)&gt;/g, "<$1>");
	// join consecutive subscripts/superscripts
	edited_html_str = edited_html_str.replaceAll(/<\/sub>( *)<sub>/g, "$1");
	edited_html_str = edited_html_str.replaceAll(/<\/sup>( *)<sup>/g, "$1");
	return edited_html_str;
}

// fix fake math tags
function fix_fake_math(html_str) {
	let edited_html_str = html_str.replaceAll(/&lt;(math.*?)&gt;/g, "<$1>");
	edited_html_str = edited_html_str.replaceAll(/&lt;(\/math)&gt;/g, "<$1>");
	edited_html_str = edited_html_str.replaceAll(/&lt;(m[ion].*?)&gt;/g, "<$1>");
	edited_html_str = edited_html_str.replaceAll(/&lt;(\/m[ion])&gt;/g, "<$1>");
	return edited_html_str;
}
