// set default checks based on type of document
function set_default_checks() {
	if (document.getElementById("select_checks").value === "en_dw") {
		document.getElementById("footnotes").checked = true;
		document.getElementById("dw_empty_a").checked = true;
		document.getElementById("dw_ref").checked = true;
		document.getElementById("dw_toc").checked = true;
		document.getElementById("dw_bookmark").checked = true;
		document.getElementById("logiterms").checked = true;
		document.getElementById("space_format").checked = true;
		document.getElementById("multispace").checked = true;
		document.getElementById("end_tag_space").checked = true;
		document.getElementById("empty_tag").checked = true;
		document.getElementById("space_after_open").checked = true;
		document.getElementById("space_before_close").checked = true;
		document.getElementById("quote_values").checked = true;
		document.getElementById("fancy_quotes").checked = false;
		document.getElementById("fancy_quote_entities").checked = false;
		document.getElementById("fancy_quote_values").checked = false;
		document.getElementById("emdash").checked = true;
		document.getElementById("consecutive_em").checked = true;
		document.getElementById("consecutive_em_punct").checked = false;
		document.getElementById("consecutive_ul").checked = true;
		document.getElementById("consecutive_ol").checked = true;
		document.getElementById("split_p_br").checked = false;
		document.getElementById("split_p_br_punct").checked = true;
		document.getElementById("rm_empty_br").checked = true;
		document.getElementById("fix_br").checked = true;
		document.getElementById("rm_punct_format").checked = true;
		document.getElementById("fix_punct").checked = true;
		document.getElementById("cite_link").checked = true;
		document.getElementById("default_cite").checked = false;
		document.getElementById("default_oti").checked = false;
		document.getElementById("default_i").checked = false;
		document.getElementById("default_otb").checked = false;
		document.getElementById("default_b").checked = false;
		document.getElementById("align").checked = true;
		document.getElementById("ref_links").checked = true;
		document.getElementById("p_tag").checked = true;
		document.getElementById("ol_ul_tag").checked = true;
		document.getElementById("table_tag").checked = true;
		document.getElementById("translate").checked = false;
		document.getElementById("translate_script").checked = false;
		document.getElementById("nbsp_pct").checked = false;
		document.getElementById("fake_script_tag").checked = true;
		document.getElementById("fake_math_tag").checked = true;
	}
	else if (document.getElementById("select_checks").value === "fr_dw") {
		document.getElementById("footnotes").checked = true;
		document.getElementById("dw_empty_a").checked = true;
		document.getElementById("dw_ref").checked = true;
		document.getElementById("dw_toc").checked = true;
		document.getElementById("dw_bookmark").checked = true;
		document.getElementById("logiterms").checked = true;
		document.getElementById("space_format").checked = true;
		document.getElementById("multispace").checked = true;
		document.getElementById("end_tag_space").checked = true;
		document.getElementById("empty_tag").checked = true;
		document.getElementById("space_after_open").checked = true;
		document.getElementById("space_before_close").checked = true;
		document.getElementById("quote_values").checked = true;
		document.getElementById("fancy_quotes").checked = false;
		document.getElementById("fancy_quote_entities").checked = false;
		document.getElementById("fancy_quote_values").checked = false;
		document.getElementById("emdash").checked = true;
		document.getElementById("consecutive_em").checked = true;
		document.getElementById("consecutive_em_punct").checked = false;
		document.getElementById("consecutive_ul").checked = true;
		document.getElementById("consecutive_ol").checked = true;
		document.getElementById("split_p_br").checked = false;
		document.getElementById("split_p_br_punct").checked = true;
		document.getElementById("rm_empty_br").checked = true;
		document.getElementById("fix_br").checked = true;
		document.getElementById("rm_punct_format").checked = true;
		document.getElementById("fix_punct").checked = true;
		document.getElementById("cite_link").checked = true;
		document.getElementById("default_cite").checked = false;
		document.getElementById("default_oti").checked = false;
		document.getElementById("default_i").checked = false;
		document.getElementById("default_otb").checked = false;
		document.getElementById("default_b").checked = false;
		document.getElementById("align").checked = true;
		document.getElementById("ref_links").checked = true;
		document.getElementById("p_tag").checked = true;
		document.getElementById("ol_ul_tag").checked = true;
		document.getElementById("table_tag").checked = true;
		document.getElementById("translate").checked = true;
		document.getElementById("translate_script").checked = true;
		document.getElementById("nbsp_pct").checked = true;
		document.getElementById("fake_script_tag").checked = true;
		document.getElementById("fake_math_tag").checked = true;
	}
	else if (document.getElementById("select_checks").value === "en_wet") {
		document.getElementById("footnotes").checked = true;
		document.getElementById("dw_empty_a").checked = true;
		document.getElementById("dw_ref").checked = true;
		document.getElementById("dw_toc").checked = true;
		document.getElementById("dw_bookmark").checked = true;
		document.getElementById("logiterms").checked = true;
		document.getElementById("space_format").checked = true;
		document.getElementById("multispace").checked = true;
		document.getElementById("end_tag_space").checked = true;
		document.getElementById("empty_tag").checked = true;
		document.getElementById("space_after_open").checked = true;
		document.getElementById("space_before_close").checked = true;
		document.getElementById("quote_values").checked = true;
		document.getElementById("fancy_quotes").checked = false;
		document.getElementById("fancy_quote_entities").checked = false;
		document.getElementById("fancy_quote_values").checked = false;
		document.getElementById("emdash").checked = true;
		document.getElementById("consecutive_em").checked = true;
		document.getElementById("consecutive_em_punct").checked = false;
		document.getElementById("consecutive_ul").checked = true;
		document.getElementById("consecutive_ol").checked = false;
		document.getElementById("split_p_br").checked = false;
		document.getElementById("split_p_br_punct").checked = true;
		document.getElementById("rm_empty_br").checked = true;
		document.getElementById("fix_br").checked = true;
		document.getElementById("rm_punct_format").checked = true;
		document.getElementById("fix_punct").checked = true;
		document.getElementById("cite_link").checked = true;
		document.getElementById("default_cite").checked = false;
		document.getElementById("default_oti").checked = false;
		document.getElementById("default_i").checked = false;
		document.getElementById("default_otb").checked = false;
		document.getElementById("default_b").checked = false;
		document.getElementById("align").checked = true;
		document.getElementById("ref_links").checked = true;
		document.getElementById("p_tag").checked = false;
		document.getElementById("ol_ul_tag").checked = false;
		document.getElementById("table_tag").checked = false;
		document.getElementById("translate").checked = false;
		document.getElementById("translate_script").checked = false;
		document.getElementById("nbsp_pct").checked = false;
		document.getElementById("fake_script_tag").checked = true;
		document.getElementById("fake_math_tag").checked = true;
	}
	else if (document.getElementById("select_checks").value === "fr_wet") {
		document.getElementById("footnotes").checked = true;
		document.getElementById("dw_empty_a").checked = true;
		document.getElementById("dw_ref").checked = true;
		document.getElementById("dw_toc").checked = true;
		document.getElementById("dw_bookmark").checked = true;
		document.getElementById("logiterms").checked = true;
		document.getElementById("space_format").checked = true;
		document.getElementById("multispace").checked = true;
		document.getElementById("end_tag_space").checked = true;
		document.getElementById("empty_tag").checked = true;
		document.getElementById("space_after_open").checked = true;
		document.getElementById("space_before_close").checked = true;
		document.getElementById("quote_values").checked = true;
		document.getElementById("fancy_quotes").checked = false;
		document.getElementById("fancy_quote_entities").checked = false;
		document.getElementById("fancy_quote_values").checked = false;
		document.getElementById("emdash").checked = true;
		document.getElementById("consecutive_em").checked = true;
		document.getElementById("consecutive_em_punct").checked = false;
		document.getElementById("consecutive_ul").checked = true;
		document.getElementById("consecutive_ol").checked = false;
		document.getElementById("split_p_br").checked = false;
		document.getElementById("split_p_br_punct").checked = true;
		document.getElementById("rm_empty_br").checked = true;
		document.getElementById("fix_br").checked = true;
		document.getElementById("rm_punct_format").checked = true;
		document.getElementById("fix_punct").checked = true;
		document.getElementById("cite_link").checked = true;
		document.getElementById("default_cite").checked = false;
		document.getElementById("default_oti").checked = false;
		document.getElementById("default_i").checked = false;
		document.getElementById("default_otb").checked = false;
		document.getElementById("default_b").checked = false;
		document.getElementById("align").checked = true;
		document.getElementById("ref_links").checked = true;
		document.getElementById("p_tag").checked = false;
		document.getElementById("ol_ul_tag").checked = false;
		document.getElementById("table_tag").checked = false;
		document.getElementById("translate").checked = true;
		document.getElementById("translate_script").checked = true;
		document.getElementById("nbsp_pct").checked = true;
		document.getElementById("fake_script_tag").checked = true;
		document.getElementById("fake_math_tag").checked = true;
	}
	else if (document.getElementById("select_checks").value === "uncheck") {
		document.getElementById("footnotes").checked = false;
		document.getElementById("dw_empty_a").checked = false;
		document.getElementById("dw_ref").checked = false;
		document.getElementById("dw_toc").checked = false;
		document.getElementById("dw_bookmark").checked = false;
		document.getElementById("logiterms").checked = false;
		document.getElementById("space_format").checked = false;
		document.getElementById("multispace").checked = false;
		document.getElementById("end_tag_space").checked = false;
		document.getElementById("empty_tag").checked = false;
		document.getElementById("space_after_open").checked = false;
		document.getElementById("space_before_close").checked = false;
		document.getElementById("quote_values").checked = false;
		document.getElementById("fancy_quotes").checked = false;
		document.getElementById("fancy_quote_entities").checked = false;
		document.getElementById("fancy_quote_values").checked = false;
		document.getElementById("emdash").checked = false;
		document.getElementById("consecutive_em").checked = false;
		document.getElementById("consecutive_em_punct").checked = false;
		document.getElementById("consecutive_ul").checked = false;
		document.getElementById("consecutive_ol").checked = false;
		document.getElementById("split_p_br").checked = false;
		document.getElementById("split_p_br_punct").checked = false;
		document.getElementById("rm_empty_br").checked = false;
		document.getElementById("fix_br").checked = false;
		document.getElementById("rm_punct_format").checked = false;
		document.getElementById("fix_punct").checked = false;
		document.getElementById("cite_link").checked = false;
		document.getElementById("default_cite").checked = false;
		document.getElementById("default_oti").checked = false;
		document.getElementById("default_i").checked = false;
		document.getElementById("default_otb").checked = false;
		document.getElementById("default_b").checked = false;
		document.getElementById("align").checked = false;
		document.getElementById("ref_links").checked = false;
		document.getElementById("p_tag").checked = false;
		document.getElementById("ol_ul_tag").checked = false;
		document.getElementById("table_tag").checked = false;
		document.getElementById("translate").checked = false;
		document.getElementById("translate_script").checked = false;
		document.getElementById("nbsp_pct").checked = false;
		document.getElementById("fake_script_tag").checked = false;
		document.getElementById("fake_math_tag").checked = false;
	}
}

// perform general formatting for user-selected options
function format_file() {
	let file_reader_content = new FileReader();
	let content_str = document.getElementById("html_file").files[0];
	file_reader_content.onload = function(event) {
		let html_doc_str = event.target.result.replaceAll("\r\n", "\n");
		/*
		Footnote format
		*/
		// fix footnotes
		if (document.getElementById("footnotes").checked) {
			html_doc_str = fix_footnotes(html_doc_str);
		}
		/*
		Remove dw links
		*/
		// remove empty links
		if (document.getElementById("dw_empty_a").checked) {
			html_doc_str = rm_empty_links(html_doc_str);
		}
		// remove _Ref links
		if (document.getElementById("dw_ref").checked) {
			html_doc_str = rm_ref_links(html_doc_str);
		}
		// remove _Toc links
		if (document.getElementById("dw_toc").checked) {
			html_doc_str = rm_toc_links(html_doc_str);
		}
		// remove _bookmark links
		if (document.getElementById("dw_bookmark").checked) {
			html_doc_str = rm_bookmark_links(html_doc_str);
		}
		// remove logiterms
		if (document.getElementById("logiterms").checked) {
			html_doc_str = rm_logiterms(html_doc_str);
		}
		/*
		Fix spacing
		*/
		// make space hexcode consistent
		if (document.getElementById("space_format").checked) {
			html_doc_str = replace_invisible_nbsp(html_doc_str);
		}
		// remove multispaces
		if (document.getElementById("multispace").checked) {
			html_doc_str = rm_multispace(html_doc_str);
		}
		// remove spaces at the end of tags
		if (document.getElementById("end_tag_space").checked) {
			html_doc_str = rm_end_tag_space(html_doc_str);
		}
		// remove empty tags
		if (document.getElementById("empty_tag").checked) {
			html_doc_str = rm_empty_tags(html_doc_str);
		}
		// remove spaces after opening p, li, th, td, header tags
		if (document.getElementById("space_after_open").checked) {
			html_doc_str = rm_space_after_open(html_doc_str);
		}
		// remove spaces before closing p, li, th, td, header tags
		if (document.getElementById("space_before_close").checked) {
			html_doc_str = rm_space_before_close(html_doc_str);
		}
		/*
		Fix Word values
		*/
		// replace quote entities
		if (document.getElementById("quote_values").checked) {
			html_doc_str = replace_quote_entities(html_doc_str);
		}
		// replace fancy quotes
		if (document.getElementById("fancy_quotes").checked) {
			html_doc_str = replace_fancy_quotes(html_doc_str);
		}
		// replace fancy quote entities
		if (document.getElementById("fancy_quote_entities").checked) {
			html_doc_str = replace_fancy_quote_entities(html_doc_str);
		}
		// set fancy quote values
		if (document.getElementById("fancy_quote_values").checked) {
			html_doc_str = set_fancy_quotes(html_doc_str);
		}
		// replace emdashes
		if (document.getElementById("emdash").checked) {
			html_doc_str = replace_dashes(html_doc_str);
		}
		/*
		Join consecutive tags
		*/
		// join consecutive em/strong
		if (document.getElementById("consecutive_em").checked) {
			html_doc_str = join_em_strong(html_doc_str);
		}
		// join consecutive em/strong over punctuation
		if (document.getElementById("consecutive_em_punct").checked) {
			html_doc_str = join_em_strong_punct(html_doc_str);
		}
		// join consecutive ul
		if (document.getElementById("consecutive_ul").checked) {
			html_doc_str = join_ul(html_doc_str);
		}
		// join consecutive ol
		if (document.getElementById("consecutive_ol").checked) {
			html_doc_str = join_ol(html_doc_str);
		}
		/*
		Remove/fix br
		*/
		// split single p separated by br into multiple p
		if (document.getElementById("split_p_br").checked) {
			html_doc_str = split_p_by_br(html_doc_str);
		}
		// split single p separated by br into multiple p, if character before br is punctuation
		if (document.getElementById("split_p_br_punct").checked) {
			html_doc_str = split_p_by_punct_br(html_doc_str);
		}
		// remove start or end br for p, li, th, td
		if (document.getElementById("rm_empty_br").checked) {
			html_doc_str = rm_empty_br(html_doc_str);
		}
		// change <br> to <br />
		if (document.getElementById("fix_br").checked) {
			html_doc_str = fix_br(html_doc_str);
		}
		/*
		Fix punctuation
		*/
		// remove foramtting around . , : ;
		if (document.getElementById("rm_punct_format").checked) {
			html_doc_str = rm_punctuation_format(html_doc_str);
		}
		// fix spacing/duplicates for . , : ;
		if (document.getElementById("fix_punct").checked) {
			html_doc_str = fix_punctuation(html_doc_str);
		}
		/*
		Set italic/bold
		*/
		// change italics to cite if the line has a link
		if (document.getElementById("cite_link").checked) {
			html_doc_str = change_link_em_to_cite(html_doc_str);
		}
		// change italics to cite
		if (document.getElementById("default_cite").checked) {
			html_doc_str = default_tag(html_doc_str, "em", "cite");
		}
		// change italics to oti
		if (document.getElementById("default_oti").checked) {
			html_doc_str = default_tag(html_doc_str, "em", 'span class="osfi-txt--italic"');
		}
		// change italics to i
		if (document.getElementById("default_i").checked) {
			html_doc_str = default_tag(html_doc_str, "em", "i");
		}
		// change bold to otb
		if (document.getElementById("default_otb").checked) {
			html_doc_str = default_tag(html_doc_str, "strong", 'span class="osfi-txt--bold"');
		}
		// change bold to b
		if (document.getElementById("default_b").checked) {
			html_doc_str = default_tag(html_doc_str, "strong", "b");
		}
		/*
		Remove/fix tag attributes
		*/
		// fix align-center and align-right
		if (document.getElementById("align").checked) {
			html_doc_str = fix_align(html_doc_str);
		}
		// fix referential and external links
		if (document.getElementById("ref_links").checked) {
			html_doc_str = fix_ref_links(html_doc_str);
		}
		// remove attributes from paragraph tags
		if (document.getElementById("p_tag").checked) {
			html_doc_str = rm_p_attributes(html_doc_str, "p");
		}
		// remove attributes from ol and ul tags
		if (document.getElementById("ol_ul_tag").checked) {
			html_doc_str = rm_ol_ul_attributes(html_doc_str, "p");
		}
		// remove attributes from table tags
		if (document.getElementById("table_tag").checked) {
			html_doc_str = rm_table_attributes(html_doc_str, "table");
		}
		/*
		Translate to French
		*/
		// translate links and footnotes to French
		if (document.getElementById("translate").checked) {
			html_doc_str = translate_to_fr(html_doc_str);
		}
		// add superscripts around 1er and #e
		if (document.getElementById("translate_script").checked) {
			html_doc_str = add_fr_num_superscript(html_doc_str);
		}
		// add nbsp in front of % and $
		if (document.getElementById("nbsp_pct").checked) {
			html_doc_str = format_fr_space(html_doc_str);
		}
		/*
		Fix fake tags
		*/
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
// I sometimes split regex statements up into multiple calls for clarity, but a lot of these checks can be done in one or two regex statements.

/*
Footnote format
*/

// fix footnotes using functions from footnote_helpers.js
function fix_footnotes(html_str) {
	// set regex statements that find footnotes using Dreamweaver's formatting
	const footnote_top_regex = '<a href="#_ftn[0-9]+" name="_ftnref[0-9]+" title="">(.*?)</a>';
	const footnote_bot_regex = '<div id="ftn[0-9]+">(?:.|\n)*?<a href="#_ftnref[0-9]+" name="_ftn[0-9]+" title=""> *</a>((.|\n)*?)((<[^>]*>)|\ |\n)*</div>';
	// use wet footnote formatting functions
	let edited_html_str = replace_footnote_str(html_str, "fnb", footnote_top_regex, footnote_bot_regex, 1, "");
	edited_html_str = add_footnote_div(edited_html_str, "fnb");
	edited_html_str = add_consecutive_commas(edited_html_str, "fnb");
	return edited_html_str;
}

/*
Remove dw links
*/

// remove empty links
function rm_empty_links(html_str) {
	return html_str.replaceAll(/<a>(\s*)<\/a>/g, "$1").replaceAll(/<a [^>]*>(\s*)<\/a>/g, "$1");
}

// remove reference links
function rm_ref_links(html_str) {
	return html_str.replaceAll(/<a name="_Ref[a-zA-z0-9]+">(.*?)<\/a>/g, "$1").replaceAll(/<a href="#_Ref[a-zA-z0-9]+">(.*?)<\/a>/g, "$1");
}

// remove toc links
function rm_toc_links(html_str) {
	return html_str.replaceAll(/<a name="_Toc[a-zA-z0-9]+">(.*?)<\/a>/g, "$1").replaceAll(/<a href="#_Toc[a-zA-z0-9]+">(.*?)<\/a>/g, "$1");
}

// remove bookmark links
function rm_bookmark_links(html_str) {
	return html_str.replaceAll(/<a name="_bookmark[a-zA-z0-9]+">(.*?)<\/a>/g, "$1").replaceAll(/<a href="#_bookmark[a-zA-z0-9]+">(.*?)<\/a>/g, "$1");
}

// remove logiterms
function rm_logiterms(html_str) {
	return html_str.replaceAll(/<a name="lt_[a-zA-z0-9]+">(.*?)<\/a>/g, "$1");
}

/*
Fix spacing
*/

// replace invisible nbsp
function replace_invisible_nbsp(html_line) {
	return html_line.replaceAll(/[  ­­	]+/g, " ");
}

// remove multispaces
function rm_multispace(html_line) {
	return html_line.replaceAll(/  +/g, " ");
}

// remove spaces at the end of tags
function rm_end_tag_space(html_str) {
	return html_str.replaceAll(/(<[^>]*?) *>/g, "$1>");
}

// remove empty attribute-less tags
function rm_empty_tags(html_str) {
	const empty_tag_regex = /<[a-zA-Z0-9 ]*><\/[a-zA-Z0-9 ]*>/g;
	const space_tag_regex = /<[a-zA-Z0-9 ]*> *(&nbsp;)* *<\/[a-zA-Z0-9 ]*>/g;
	// temporarily exclude br and td tags, since they can be empty
	let edited_html_str = html_str.replaceAll("<br>", "<br///>");
	edited_html_str = edited_html_str.replaceAll("<td>", "<td///>");
	// replace empty tags until there are none left
	while (empty_tag_regex.test(edited_html_str) || space_tag_regex.test(edited_html_str)) {
		edited_html_str = edited_html_str.replaceAll(empty_tag_regex, "");
		edited_html_str = edited_html_str.replaceAll(space_tag_regex, " ");
	}
	return edited_html_str.replaceAll("<br///>", "<br>").replaceAll("<td///>", "<td>");
}

// remove spaces after opening p, li, th, td, header tags
function rm_space_after_open(html_str) {
	let edited_html_str = html_str.replaceAll(/<p( [^>]*)*> */g, "<p$1>");
	edited_html_str = edited_html_str.replaceAll(/<li( [^>]*)*> */g, "<li$1>");
	edited_html_str = edited_html_str.replaceAll(/<th( [^>]*)*> */g, "<th$1>");
	edited_html_str = edited_html_str.replaceAll(/<td( [^>]*)*> */g, "<td$1>");
	edited_html_str = edited_html_str.replaceAll(/<h([0-9]+)( [^>]*)*> */g, "<h$1$2>");
	return edited_html_str;
}

// remove spaces before closing p, li, th, td, header tags
function rm_space_before_close(html_str) {
	let edited_html_str = html_str.replaceAll(/ *<\/p>/g, "</p>");
	edited_html_str = edited_html_str.replaceAll(/ *<\/li>/g, "</li>");
	edited_html_str = edited_html_str.replaceAll(/ *<\/th>/g, "</th>");
	edited_html_str = edited_html_str.replaceAll(/ *<\/td>/g, "</td>");
	edited_html_str = edited_html_str.replaceAll(/ *<\/h([0-9]+)>/g, "</h$1>");
	return edited_html_str;
}

/*
Fix Word values
*/

// replace straight quote entities
function replace_quote_entities(html_str) {
	let edited_html_str = html_str.replaceAll("&apos;", "'");
	edited_html_str = edited_html_str.replaceAll("&quot;", '"');
	edited_html_str = edited_html_str.replaceAll("&#39;", "'");
	edited_html_str = edited_html_str.replaceAll("&#34;", '"');
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
	let edited_html_str = html_str.replaceAll("&lsquo;", "'");
	edited_html_str = edited_html_str.replaceAll("&rsquo;", "'");
	edited_html_str = edited_html_str.replaceAll("&ldquo;", '"');
	edited_html_str = edited_html_str.replaceAll("&rdquo;", '"');
	edited_html_str = edited_html_str.replaceAll("&#8216;", "'");
	edited_html_str = edited_html_str.replaceAll("&#8217;", "'");
	edited_html_str = edited_html_str.replaceAll("&#8220;", '"');
	edited_html_str = edited_html_str.replaceAll("&#8221;", '"');
	return edited_html_str;
}

// replace fancy quote html entities with actual fancy quotes
function set_fancy_quotes(html_str) {
	let edited_html_str = html_str.replaceAll("&lsquo;", "‘");
	edited_html_str = edited_html_str.replaceAll("&rsquo;", "’");
	edited_html_str = edited_html_str.replaceAll("&ldquo;", '“');
	edited_html_str = edited_html_str.replaceAll("&rdquo;", '”');
	edited_html_str = edited_html_str.replaceAll("&#8216;", "‘");
	edited_html_str = edited_html_str.replaceAll("&#8217;", "’");
	edited_html_str = edited_html_str.replaceAll("&#8220;", '“');
	edited_html_str = edited_html_str.replaceAll("&#8221;", '”');
	return edited_html_str;
}

// replace emdashes with regular dashes
function replace_dashes(html_str) {
	return html_str.replaceAll("–", "-");
}

/*
Join consecutive tags
*/

// join consecutive fonts
function join_em_strong(html_str) {
	let edited_html_str = html_str.replaceAll(/<\/em><em>/g, "");
	edited_html_str = edited_html_str.replaceAll(/<\/strong><strong>/g, "");
	edited_html_str = edited_html_str.replaceAll(/<\/em>(( |\n)*)<em>/g, " ");
	edited_html_str = edited_html_str.replaceAll(/<\/strong>(( |\n)*)<strong>/g, " ");
	return edited_html_str;
}

// join consecutive fonts over punctuation
function join_em_strong_punct(html_str) {
	let edited_html_str = join_em_strong(html_str);
	edited_html_str = edited_html_str.replaceAll(/<\/em>(([^a-zA-Z0-9]|\n)*)<em>/g, "$1");
	edited_html_str = edited_html_str.replaceAll(/<\/strong>(([^a-zA-Z0-9]|\n)*)<strong>/g, "$1");
	return edited_html_str;
}

// join consecutive ul
function join_ul(html_str) {
	return html_str.replaceAll(/<\/ul>( |\n)*<ul[^>]*>/g, "");
}

// join consecutive ol
function join_ol(html_str) {
	return html_str.replaceAll(/<\/ol>( |\n)*<ol[^>]*>/g, "");
}

/*
Remove/fix br
*/

// splits a p tag divided by br into individual p tags
function split_p_by_br(html_str) {
	let edited_html_str = html_str;
	// replace p into br with closing p until there are no p into br left
	const p_br_regex = /(<p( [^>]*)*>.*?) *<br[ \/]*>( |\n)*/g;
	while (p_br_regex.test(edited_html_str)) {
		// note that Dreamweaver source formatting places any <br> following </p> on its own line, so this regex should not capture any </p><br>, and will only match an unclosed <p> into <br>
		edited_html_str = edited_html_str.replaceAll(p_br_regex, "$1</p>\n<p>");
	}
	return edited_html_str;
}

// splits a p tag divided by br into individual p tags, if the br is before punctuation
function split_p_by_punct_br(html_str) {
	let edited_html_str = html_str;
	// replace p into (punctuation + br) with closing p until there are no p into (punctuation + br) left
	const p_punct_br_regex = /(<p( [^>]*)*>.*?[\.,;:!?\)"’”]) *<br[ \/]*>( |\n)*/g;
	while (p_punct_br_regex.test(edited_html_str)) {
		edited_html_str = edited_html_str.replaceAll(p_punct_br_regex, "$1</p>\n<p>");
	}
	return edited_html_str;
}

// removes br at the start or end of p, li, th, or td tags
function rm_empty_br(html_str) {
	// remove br next to opening tags
	let edited_html_str = html_str.replaceAll(/(<p( [^>]*)*>) *<br[ \/]*>( |\n)*/g, "$1");
	edited_html_str = edited_html_str.replaceAll(/(<li( [^>]*)*>) *<br[ \/]*>( |\n)*/g, "$1");
	edited_html_str = edited_html_str.replaceAll(/(<th( [^>]*)*>) *<br[ \/]*>( |\n)*/g, "$1");
	edited_html_str = edited_html_str.replaceAll(/(<td( [^>]*)*>) *<br[ \/]*>( |\n)*/g, "$1");
	edited_html_str = edited_html_str.replaceAll(/(<h[0-9]+( [^>]*)*>) *<br[ \/]*>( |\n)*/g, "$1");
	// remove br next to closing tags
	edited_html_str = edited_html_str.replaceAll(/( |\n)*<br[ \/]*> *<\/p>/g, "</p>");
	edited_html_str = edited_html_str.replaceAll(/( |\n)*<br[ \/]*> *<\/li>/g, "</li>");
	edited_html_str = edited_html_str.replaceAll(/( |\n)*<br[ \/]*> *<\/th>/g, "</th>");
	edited_html_str = edited_html_str.replaceAll(/( |\n)*<br[ \/]*> *<\/td>/g, "</td>");
	edited_html_str = edited_html_str.replaceAll(/( |\n)*<br[ \/]*> *<\/h([0-9]+)>/g, "</h$2>");
	return edited_html_str;
}

// replace <br> with <br />
function fix_br(html_str) {
	return html_str.replaceAll("<br>", "<br />").replaceAll("<br/>", "<br />");
}

/*
Fix punctuation
*/

// remove em/strong with only punctuation
function rm_punctuation_format(html_str) {
	let edited_html_str = html_str.replaceAll(/<em>([.,:; ]*)<\/em>/g, "$1");
	edited_html_str = edited_html_str.replaceAll(/<strong>([.,:; ]*)<\/strong>/g, "$1");
	return edited_html_str;
}

// fix common punctuation/spacing mistakes
function fix_punctuation(html_str) {
	let edited_html_str = html_str.replaceAll(/ +\./g, ".");
	edited_html_str = edited_html_str.replaceAll(/ +,/g, ",");
	edited_html_str = edited_html_str.replaceAll(/ +;/g, ";");
	edited_html_str = edited_html_str.replaceAll(/\.\.+/g, ".");
	edited_html_str = edited_html_str.replaceAll(/,,+/g, ",");
	edited_html_str = edited_html_str.replaceAll(/;;+/g, ";");
	edited_html_str = edited_html_str.replaceAll(/: *:/g, ":");
	edited_html_str = edited_html_str.replaceAll(/::+/g, ":");
	return edited_html_str;
}

/*
Set italic/bold
*/

// helper: change italics to citations if there is a link on the line
function change_link_em_to_cite_helper(html_line) {
	let edited_html_line = html_line;
	if (edited_html_line.includes("<a ") || edited_html_line.includes("<a>")) {
        edited_html_line = edited_html_line.replaceAll("<em>", "<cite>").replaceAll("<em ", "<cite ");
        edited_html_line = edited_html_line.replaceAll("</em>", "</cite>");
    }
	return edited_html_line;
}

// change italics to citations on each line if there is a link on that line
function change_link_em_to_cite(html_str) {
	let html_arr = html_str.split("\n");
	html_arr = html_arr.map(change_link_em_to_cite_helper);
	return html_arr.join("\n");
}

// change instances of one tag to another - old_tag and new_tag can have attributes
function default_tag(html_str, old_tag, new_tag) {
	let old_tag_open = "<" + old_tag + ">";
	let new_tag_open = "<" + new_tag + ">";
	// remove attributes from old and new tags for closing tag
	let old_tag_close = old_tag.trim().replace(/^([a-zA-Z0-9]+).*/g, "</$1>");
	let new_tag_close = new_tag.trim().replace(/^([a-zA-Z0-9]+).*/g, "</$1>");
	// replace tags
	let edited_html_str = html_str.replaceAll(old_tag_open, new_tag_open);
	edited_html_str = edited_html_str.replaceAll(old_tag_close, new_tag_close);
	return edited_html_str;
}

/*
Remove/fix tag attributes
*/

// fix alignment classes
function fix_align(html_str) {
	let edited_html_str = html_str.replaceAll(/align *= *"center"/g, 'class="align-center"');
	edited_html_str = edited_html_str.replaceAll(/align *= *"right"/g, 'class="align-right"');
	return edited_html_str;
}

// fix referential and internal links in line
function fix_ref_links(html_str) {
	let edited_html_str = html_str;
	// get links
	let orig_links = html_str.match(/<a (.*?)>/g);
	if (orig_links === null) {
		return html_str;
	}
	// loop through links
	for (i = 0; i < orig_links.length; i++) {
		let curr_link = orig_links[i];
		let new_link = curr_link;
		// make internal links relative
		if (curr_link.includes("osfi-bsif.gc.ca")) {
			new_link = curr_link.replaceAll(/(https*:\/\/)*(www.)*osfi-bsif.gc.ca(\/)*/g, "/");
		}
		// addd rel to external links
		else {
			// exclude links for footnote, toc, and email
			if (!curr_link.includes("_ftn") && !curr_link.includes("fnb") && !curr_link.includes("_Toc") && !curr_link.includes("toc_") && !curr_link.includes("mailto") && !curr_link.includes("@")) {
				// exclude already internal links, which begin with either eng or fra
				if (!(/"[/]*[Ee]ng/g.test(curr_link)) && !(/"[/]*[Ff]ra/g.test(curr_link)) && !curr_link.includes('"/"')) {
					new_link = curr_link.replace(/ *rel *= *"external"/g, "").replace(/<a /g, '<a rel="external" ');
				}
			}
		}
		edited_html_str = edited_html_str.replaceAll(curr_link, new_link);
	}
	return edited_html_str;
}

// remove attributes from paragraph tags
function rm_p_attributes(html_str) {
	return html_str.replaceAll(/<p [^>]*>/g,  "<p>");
}

// remove attributes from ol and ul tags
function rm_ol_ul_attributes(html_str) {
	return html_str.replaceAll(/<ol [^>]*>/g,  "<ol>").replaceAll(/<ul [^>]*>/g,  "<ul>");
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

/*
Translate to French
*/

// translate internal links and footnotes to French
function translate_to_fr(html_str) {
	// replace internal links
	let edited_html_str = html_str.replaceAll("/eng/", "/fra/");
	edited_html_str = edited_html_str.replaceAll("/Eng/", "/Fra/");
	// translate footnotes using helper from footnote_helpers.js
	edited_html_str = translate_footnotes(edited_html_str);
	return edited_html_str;
}

// add superscripts to 1er and #e
function add_fr_num_superscript(html_str) {
	let edited_html_str = html_str.replaceAll(/\b1er\b/g, "1<sup>er</sup>");
	edited_html_str = edited_html_str.replaceAll(/\b([0-9]+)e\b/g, "$1<sup>e</sup>");
	return edited_html_str;
}

// format french % and $ with nbsp
function format_fr_space(html_str) {
	let edited_html_str = html_str.replaceAll(/([a-zA-Z0-9]) *%/g, "$1&nbsp;%");
	edited_html_str = edited_html_str.replaceAll(/([a-zA-Z0-9]) *\$/g, "$1&nbsp;$$");
	return edited_html_str;
}

/*
Fix fake tags
*/

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
	let edited_html_str = html_str.replaceAll(/&lt;(m.*?)&gt;/g, "<$1>");
	edited_html_str = edited_html_str.replaceAll(/&lt;(\/m.*?)&gt;/g, "<$1>");
	return edited_html_str;
}
