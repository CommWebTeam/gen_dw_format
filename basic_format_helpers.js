// fix referential and internal links in line
function fix_ref_links(html_line) {
	edited_line = html_line
	// get links
	orig_links = html_line.match(/<a (.*?)>/g)
	if (orig_links == null) {
		orig_links = []
	}
	for (i = 0; i < orig_links.length; i++) {
		curr_link = orig_links[i]
		// make internal links relative
		if (curr_link.includes("osfi-bsif.gc.ca")) {
			new_link = curr_link.replaceAll(/(https*:\/\/)*(www.)*osfi-bsif.gc.ca/g, "")
		}
		else {
			// add rel to external links, excluding footnotes and toc
			new_link = curr_link
			if (!curr_link.includes("_ftn") && !curr_link.includes("_Toc") && !curr_link.includes("toc_") && !curr_link.includes("fnb") && !curr_link.includes('href="/') && !curr_link.includes("mailto")) {
				new_link = curr_link.replace(/rel *= *"external"/g, "").replace(/<a /g, '<a rel="external" ')
			}
		}
		edited_line = edited_line.replaceAll(curr_link, new_link)
	}
	return edited_line
}

// change italics to citations if there is a link on the line
function change_link_em_to_cite(html_line) {
	edited_line = html_line
	if (edited_line.includes("<a ") || edited_line.includes("<a>")) {
        edited_line = edited_line.replaceAll("<em>", "<cite>")
        edited_line = edited_line.replaceAll("</em>", "</cite>")
    }
	return edited_line
}