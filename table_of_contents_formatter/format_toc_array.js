// get uploaded file, fix toc div and links, and redownload
function format_toc() {
    // read in uploaded file as string
    let file_reader = new FileReader();
    let html_file = document.getElementById("html_file").files[0];
    file_reader.onload = function(event) {
        let html_arr = event.target.result.split("\n");
        let edited_str = format_toc_arr(html_arr, document.getElementById("toc_start").value, document.getElementById("toc_end").value);
        download(edited_str, "toc.html", "text/html");
    }
    file_reader.readAsText(html_file);
}

/* helpers */

// formats the table of contents to WET
function format_toc_arr(html_arr, toc_start_line, toc_end_line) {
    // arrays of toc links to find in main body and their replacements and indentations
    let toc_links = [];
    // id counter for toc elements that don't have list index
    let id_counter = 0;
    const list_ind_regex = /^[0-9\.]+/g;
    // loop through lines of unformatted toc
    for (i = toc_start_line; i < toc_end_line; i++) {
        let curr_line = html_arr[i];
        // check whether line has a toc link
        if (curr_line.includes("#_Toc")) {
            let old_link = curr_line.match(/_Toc[0-9]+/g)[0];
            let toc_content = curr_line.replace(/.*<a href="#_Toc[0-9]+">(.*)<\/a>.*/g, "$1").trim();
            // get previous line's indent
            let prev_indent = 0;
            if (toc_links.length > 0) {
                prev_indent = toc_links[toc_links.length - 1].indentation;
            }
            // check if toc has list index and use this as id if so, otherwise use counter
            if (list_ind_regex.test(toc_content)) {
                let toc_ind = toc_content.match(list_ind_regex)[0].trim().replaceAll(/\.+/g, ".");
                // get indentation based on periods in list index
                let curr_indent = count_regex(toc_content, /\.[0-9]/g);
            } else {
                let toc_ind = id_counter;
                id_counter++;
                // set indentation to previous indentation if no list item
                let curr_indent = prev_indent;
            }
            let new_link = "toc_" + toc_ind;
            // add links to arrays of toc links
            toc_links.push({orig_toc_link: old_link, new_toc_link: new_link, indentation: curr_indent, content: toc_content});
        } else {
            // add current line to previous contents if it doesn't have a link
            if (toc_links.length >= 1) {
                toc_links[toc_links.length - 1].content = toc_links[toc_links.length - 1].content + curr_line;
            }
        }
    }
    // add lines to array for toc
    let toc_arr = ['<div class="span-6 module-table-contents">', '<h3>Table of Contents</h3>', '<ol>'];
    let first_toc_line = '<li><a href="#' + toc_links[0].new_toc_link + '">' + toc_links[0].content + "</a>";
    toc_arr.push(first_toc_line);
    let open_ol = 1;
    for (i = 1; i < toc_links.length; i++) {
        let curr_indent = toc_links[i].indentation;
        let prev_indent = toc_links[i - 1].indentation;
        let curr_line_edited = '<li><a href="#' + toc_links[i].new_toc_link + '">' + toc_links[i].content + "</a>";
        // add indentation
        if (curr_indent > prev_indent) {
            toc_arr.push("<ol>");
            toc_arr.push(curr_line_edited);
            open_ol++;
        }
        else if (curr_indent < prev_indent) {
            toc_arr.push("</li>" + "</ol>" + "</li>" + curr_line_edited);
            open_ol--;
        }
        else { // tie - don't indent
            toc_arr.push("</li>" + curr_line_edited);
        }
    }
    // update html aray with new toc list
    for (i = 0; i < open_ol; i++) {
        toc_arr.push("</li>");
        toc_arr.push("</ol>");
    }
    toc_arr.push("</div>");
    // document without toc
    let output_arr = html_arr.slice(0, toc_start_line).concat(html_arr.slice(toc_end_line + 1));
    // replace all old links in the main body with new links
    for (i = 0; i < toc_links.length; i++) {
        // find line with toc link
        let link_ind = output_arr.findIndex(x => x.includes(toc_links[i].orig_toc_link));
        let link_line = output_arr[link_ind].trim();
        if (link_ind != -1) {
            // remove old link
            let old_link_regex = '<a name="' + toc_links[i].orig_toc_link + '"> *</a>';
            link_line = link_line.replaceAll(old_link_regex, "");
            // get header level
            header_level = toc_links[i].indentation + 2;
            // add header tag with id
            link_line = '<h' + header_level + ' id="' + toc_links[i].new_toc_link + '">' + link_line + '</h' + header_level + '>';
            // if line is part of a paragraph or list element, move it out
            if (!link_line.includes("<p>") && link_line.includes("</p>")) {
                link_line = "</p>" + link_line.replace("</p>", "");
            }
            if (link_line.includes("<p>") && !link_line.includes("</p>")) {
                link_line = link_line.replace("<p>", "") + "<p>";
            }
            if (link_line.includes("<li>") && !link_line.includes("</li>")) {
                link_line = link_line.replace("<li>", "") + "<li>";
            }
            if (!link_line.includes("<li>") && link_line.includes("</li>")) {
                link_line = "</li>" + link_line.replace("</li>", "");
            }
        }
        output_arr[link_ind] = link_line;
    }
    // add toc in
    output_arr = output_arr.slice(0, toc_start_line).concat(toc_arr).concat(output_arr.slice(toc_start_line + 1));
    return output_arr.join('\n');
}
