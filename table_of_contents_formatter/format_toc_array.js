// get uploaded file, fix toc div and links, and redownload
function format_toc() {
    // read in uploaded file as string
    let file_reader = new FileReader();
    let html_file = document.getElementById("html_file").files[0];
    file_reader.onload = function(event) {
        let html_str = event.target.result;
        let edited_str = format_toc_arr(html_str, document.getElementById("toc_start").value, document.getElementById("toc_end").value, document.getElementById("list_indent").checked);
        download(edited_str, "toc.html", "text/html");
    }
    file_reader.readAsText(html_file);
}

/* helpers */

// get indentation from list numbering

// formats a table of contents table without checking for lists
function format_toc_table_no_list(toc_arr) {
    let link_ids = [];
    let header_contents = [];
    let header_levels = [];
    // use array index for ids, and set level to always be 3 (for h3)
    for (let i = 0; i < toc_arr.length; i++) {
        link_ids.push("toc_" + i);
        header_contents.push(toc_arr[i]);
        header_levels.push(3);
    }
    // create list of html lines
    let toc_html_lines = ["<ol>"];
    for (let i = 0; i < toc_arr.length; i++) {
        toc_html_lines.push('<li><a href="#' + link_ids[i] + '">' + header_contents[i] + "</a></li>");
    }
    toc_html_lines.push("</ol>");
    return [link_ids, header_contents, header_levels, toc_html_lines];
}

// formats html document's table of contents to WET
function format_toc_arr(html_str, input_start_line, input_end_line, use_list_indent) {
	/*
	============================
	Initial cleanup
	============================
	*/
    // get rid of extra existing links, including existing toc links
    let cleaned_html_str = html_str.replaceAll(/<a name="_Ref[0-9]+">(.*?)<\/a>/g, "$1");
    cleaned_html_str = cleaned_html_str.replaceAll(/<a name="_Toc[0-9]+">(.*?)<\/a>/g, "$1");
    cleaned_html_str = cleaned_html_str.replaceAll(/<a name="lt_[a-zA-z0-9]+">(.*?)<\/a>/g, "$1");
    // split html into lines and perform basic cleaning
    cleaned_html_str = replace_special_chars(cleaned_html_str);
    cleaned_html_str = rm_extra_space(cleaned_html_str);
    let html_arr = cleaned_html_str.split("\n");
    html_arr = trim_arr(html_arr);
	/*
	============================
	Get table of contents div lines
	============================
	*/
    // find start and end lines of table of contents
    let start_line = 0;
    let end_line = 0;
    if (input_start_line === "" || input_end_line === "") {
        // search for lines that consist of <br clear="all">
        console.log("Starting line:")
        start_line = html_arr.indexOf('<br clear="all">');
        console.log(start_line);
        console.log("Ending line:")
        end_line = html_arr.indexOf('<br clear="all">', start_line + 1);
        console.log(end_line);
    } else {
        start_line = parseInt(input_start_line);
        end_line = parseInt(input_end_line);
    }
    let table_lines = html_arr.slice(start_line, end_line + 1);
    /*
	============================
	Get contents of table
	============================
	*/
    // search for p tag that includes a <br>
    let table_str = table_lines.join("\n");
    const para_regex = new RegExp("(^|(<p.*?>))((.|\n)*?)($|(</p>))", "g");
    let content_list_str = "";
    // loop through p tags until one with at least two <br> tags is found
	let contents = para_regex.exec(table_str);
	while (contents !== null) {
        let curr_p = contents[3];
        let num_br = count_regex(curr_p, /<br>/g);
        if (num_br >= 2) {
            content_list_str = curr_p;
            console.log("Number of contents: " + num_br);
            contents = null;
        } else {
            contents = para_regex.exec(table_str);
        }
    }
    // end function if no contents are found
    if (content_list_str === "") {
        console.log("No <p> tag with at least 2 <br> breaks found (this is the assumed format of a Dreamweaver ToC)");
        return html_str;
    }
    // break content list up by <br>s
    content_list = content_list_str.split("<br>");
    // remove other tags inside content list
    content_list = content_list.map(x => x.replaceAll(/<.*?>/g, ""));
    content_list = content_list.map(x => rm_extra_space(x));
    content_list = trim_arr(content_list);
    content_list = rm_empty_lines(content_list);
    /*
	============================
	Get ids and headers of table and add to document
	============================
    
    format WET content list - both functions return an array of four arrays:
    - the first with link ids
    - the second with a list of the header values, same length as the first
    - the third with a list of header level, same length as the first
    - the fourth with the html lines for the formatted table of contents, could be a different length
    */
    let wet_table_info = [];
    if (use_list_indent) {

    } else {
        wet_table_info = format_toc_table_no_list(content_list);
    }
    let ids_list = wet_table_info[0];
    let headers_list = wet_table_info[1];
    let header_levels_list = wet_table_info[2];
    let table_html_lines = wet_table_info[3];
    // add ids to headers appearing in the html document's body
    for (let i = 0; i < ids_list.length; i++) {
        let header_regex = new RegExp("^((<.*?>)* *)" + headers_list[i] + "( *(<.*?>)*)$", "g");
        let replacement = "<h" + header_levels_list[i] + ' id="' + ids_list[i] + '">' + headers_list[i] + "</h" + header_levels_list[i] + ">";
        html_arr = html_arr.map(x => x.replaceAll(header_regex, replacement));
    }
    // replace original table lines with new table
    let new_table_lines = ['<div class="span-6 module-table-contents">', "<h2>Table of Contents</h2>"];
    new_table_lines = new_table_lines.concat(table_html_lines);
    new_table_lines.push("</div>");
    let html_arr_replaced_table = html_arr.slice(0, start_line).concat(new_table_lines).concat(html_arr.slice(end_line + 1));
    return html_arr_replaced_table.join('\n');


    // // arrays of toc links to find in main body and their replacements and indentations
    // let toc_links = [];
    // // id counter for toc elements that don't have list index
    // let id_counter = 0;
    // const list_ind_regex = /^[0-9\.]+/g;
    // // loop through lines of unformatted toc
    // for (i = toc_start_line; i < toc_end_line; i++) {
    //     let curr_line = html_arr[i];
    //     // check whether line has a toc link
    //     if (curr_line.includes("#_Toc")) {
    //         let old_link = curr_line.match(/_Toc[0-9]+/g)[0];
    //         let toc_content = curr_line.replace(/.*<a href="#_Toc[0-9]+">(.*)<\/a>.*/g, "$1").trim();
    //         // get previous line's indent
    //         let prev_indent = 0;
    //         if (toc_links.length > 0) {
    //             prev_indent = toc_links[toc_links.length - 1].indentation;
    //         }
    //         // check if toc has list index and use this as id if so, otherwise use counter
    //         if (list_ind_regex.test(toc_content)) {
    //             let toc_ind = toc_content.match(list_ind_regex)[0].trim().replaceAll(/\.+/g, ".");
    //             // get indentation based on periods in list index
    //             let curr_indent = count_regex(toc_content, /\.[0-9]/g);
    //         } else {
    //             let toc_ind = id_counter;
    //             id_counter++;
    //             // set indentation to previous indentation if no list item
    //             let curr_indent = prev_indent;
    //         }
    //         let new_link = "toc_" + toc_ind;
    //         // add links to arrays of toc links
    //         toc_links.push({orig_toc_link: old_link, new_toc_link: new_link, indentation: curr_indent, content: toc_content});
    //     } else {
    //         // add current line to previous contents if it doesn't have a link
    //         if (toc_links.length >= 1) {
    //             toc_links[toc_links.length - 1].content = toc_links[toc_links.length - 1].content + curr_line;
    //         }
    //     }
    // }
    // // add lines to array for toc
    // let toc_arr = ['<div class="span-6 module-table-contents">', '<h3>Table of Contents</h3>', '<ol>'];
    // let first_toc_line = '<li><a href="#' + toc_links[0].new_toc_link + '">' + toc_links[0].content + "</a>";
    // toc_arr.push(first_toc_line);
    // let open_ol = 1;
    // for (i = 1; i < toc_links.length; i++) {
    //     let curr_indent = toc_links[i].indentation;
    //     let prev_indent = toc_links[i - 1].indentation;
    //     let curr_line_edited = '<li><a href="#' + toc_links[i].new_toc_link + '">' + toc_links[i].content + "</a>";
    //     // add indentation
    //     if (curr_indent > prev_indent) {
    //         toc_arr.push("<ol>");
    //         toc_arr.push(curr_line_edited);
    //         open_ol++;
    //     }
    //     else if (curr_indent < prev_indent) {
    //         toc_arr.push("</li>" + "</ol>" + "</li>" + curr_line_edited);
    //         open_ol--;
    //     }
    //     else { // tie - don't indent
    //         toc_arr.push("</li>" + curr_line_edited);
    //     }
    // }
    // // update html aray with new toc list
    // for (i = 0; i < open_ol; i++) {
    //     toc_arr.push("</li>");
    //     toc_arr.push("</ol>");
    // }
    // toc_arr.push("</div>");
    // // document without toc
    // let output_arr = html_arr.slice(0, toc_start_line).concat(html_arr.slice(toc_end_line + 1));
    // // replace all old links in the main body with new links
    // for (i = 0; i < toc_links.length; i++) {
    //     // find line with toc link
    //     let link_ind = output_arr.findIndex(x => x.includes(toc_links[i].orig_toc_link));
    //     let link_line = output_arr[link_ind].trim();
    //     if (link_ind != -1) {
    //         // remove old link
    //         let old_link_regex = '<a name="' + toc_links[i].orig_toc_link + '"> *</a>';
    //         link_line = link_line.replaceAll(old_link_regex, "");
    //         // get header level
    //         header_level = toc_links[i].indentation + 2;
    //         // add header tag with id
    //         link_line = '<h' + header_level + ' id="' + toc_links[i].new_toc_link + '">' + link_line + '</h' + header_level + '>';
    //         // if line is part of a paragraph or list element, move it out
    //         if (!link_line.includes("<p>") && link_line.includes("</p>")) {
    //             link_line = "</p>" + link_line.replace("</p>", "");
    //         }
    //         if (link_line.includes("<p>") && !link_line.includes("</p>")) {
    //             link_line = link_line.replace("<p>", "") + "<p>";
    //         }
    //         if (link_line.includes("<li>") && !link_line.includes("</li>")) {
    //             link_line = link_line.replace("<li>", "") + "<li>";
    //         }
    //         if (!link_line.includes("<li>") && link_line.includes("</li>")) {
    //             link_line = "</li>" + link_line.replace("</li>", "");
    //         }
    //     }
    //     output_arr[link_ind] = link_line;
    // }
    // // add toc in
    // output_arr = output_arr.slice(0, toc_start_line).concat(toc_arr).concat(output_arr.slice(toc_start_line + 1));
    // return output_arr.join('\n');
}
