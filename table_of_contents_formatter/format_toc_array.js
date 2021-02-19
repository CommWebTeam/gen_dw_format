// list numbering regex
const list_ind_regex = /^[0-9\.]+/g;

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

// formats a table of contents table while checking for list numberings
function format_toc_table_list(toc_arr) {
    // edge case - return empty arrays if toc_arr is empty
    if (toc_arr.length === 0) {
        return [[], [], [], []];
    }
    /*
	============================
	Generate ToC link IDs and levels (for indentation)
	============================
	*/
    let link_ids = [];
    let list_numberings = [];
    let header_contents = [];
    let header_levels = [];
    // set values to use when headers do not have list numberings
    let last_header_level = 1;
    let default_id_counter = 0;
    // try to use list numbering for id, and level of list numbering for header level
    for (let i = 0; i < toc_arr.length; i++) {
        let curr_line = toc_arr[i];
        // set id to default counter value
        let curr_id = default_id_counter;
        // check if table line has a list numbering
        if (list_ind_regex.test(curr_line)) {
            // if so, use that as id instead (without consecutive periods)
            curr_id = curr_line.match(list_ind_regex)[0].trim().replaceAll(/\.+/g, ".");
            link_ids.push("toc_" + curr_id);
            list_numberings.push(curr_id);
            // get level of id based on periods followed by numbers
            last_header_level = count_regex(curr_id, /\.[0-9]/g) + 2;
            header_levels.push(last_header_level);
        }
        else {
            // otherwise, increment internal id counter to keep it unique
            link_ids.push("toc_nolist_" + curr_id);
            list_numberings.push("");
            default_id_counter++;
            // set level of id to be previous properly generated header level + 1
            header_levels.push(last_header_level + 1);
        }
        // get content without list numbering
        header_contents.push(curr_line.replace(list_ind_regex, "").trim());
    }
	/*
	============================
	Format html lines of table with indentation
	============================
	*/
    // create list of html lines (I'm doing this in a separate loop for clarity) - open the table list
    let toc_html_lines = ["<ul>"];
    // create counter for number of sublists to close after looping through all list elements
    let sublist_counter = 0;
    // set first list element - push its contents without closing the list element (in case the next element is a sublist)
    toc_html_lines.push('<li><a href="#' + link_ids[0] + '">' + list_numberings[0] + " " + header_contents[0] + "</a>");
    // store current header level to compare to in the next line
    let prev_header_level = header_levels[0];
    // loop through each line in the table, comparing level of current table line to level of previous table line
    for (let i = 1; i < toc_arr.length; i++) {
        curr_header_level = header_levels[i];
        if (curr_header_level > prev_header_level) {
            // if the level is greater, then it's part of a sublist, so open a sublist 
            toc_html_lines.push("<ul>");
            sublist_counter++;
        }
        else if (curr_header_level === prev_header_level) {
            // if the level is equal, close list element of previous line
            toc_html_lines.push("</li>");
        }
        else {
            // otherwise, the level is smaller, so it ends the sublist of the previous line; close list element of previous line, and then the sublist, and then the list element containing the sublist
            toc_html_lines.push("</li>");
            toc_html_lines.push("</ul>");
            toc_html_lines.push("</li>");
            sublist_counter--;
        }
        // push current contents without closing the list element (in case the next element is a sublist)
        toc_html_lines.push('<li><a href="#' + link_ids[i] + '">' + list_numberings[i] + " " + header_contents[i] + "</a>");
        prev_header_level = curr_header_level;
    }
    // close final list element, then close all sublists, then close table list (expanded for clarity)
    toc_html_lines.push("</li>");
    for (let i = 0; i < sublist_counter; i++) {
        toc_html_lines.push("</ul>");
        toc_html_lines.push("</li>");
    }
    toc_html_lines.push("</ul>");
    return [link_ids, list_numberings, header_contents, header_levels, toc_html_lines];
}


// formats a table of contents table without checking for lists
function format_toc_table_no_list(toc_arr) {
    let link_ids = [];
    let list_numberings = [];
    let header_contents = [];
    let header_levels = [];
    // loop through table lines
    for (let i = 0; i < toc_arr.length; i++) {
        // use index for id
        link_ids.push("toc_" + i);
        // assume empty list numbering
        list_numberings.push("");
        // get content without list numbering
        header_contents.push(toc_arr[i].replace(list_ind_regex, "").trim());
        // set header level to a default of 3 (for h3)
        header_levels.push(3);
    }
    // create list of html lines
    let toc_html_lines = ["<ul>"];
    for (let i = 0; i < toc_arr.length; i++) {
        toc_html_lines.push('<li><a href="#' + link_ids[i] + '">' + list_numberings[i] + " " + header_contents[i] + "</a></li>");
    }
    toc_html_lines.push("</ul>");
    return [link_ids, list_numberings, header_contents, header_levels, toc_html_lines];
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
    // perform basic cleaning on html and split into lines
    cleaned_html_str = replace_special_chars(cleaned_html_str);
    cleaned_html_str = format_spacing(cleaned_html_str);
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
    content_list = content_list.map(x => format_spacing(x));
    content_list = trim_arr(content_list);
    content_list = rm_empty_lines(content_list);
    /*
	============================
	Get ids and headers of table and add to document
	============================
    
    format WET content list - both functions return an array of five arrays:
    - an array of the link id for each entry in the table of contents
    - in the same order, an array of the list numbering for each entry; same length as the first array
    - in the same order, an array of the text for each entry, with list numberings removed; same length as the first array
    - in the same order, an array of the level (indentation) of each entry; same length as the first array
    - an array of html lines for the formatted table of contents; could be a different length

    Each entry is to be formatted as so:
    {<ul> based on level of indentation}
        <li><a href="{link id}">{list numbering} {link text}</a></li>
    {</ul> based on level of indentation}
    */
    let wet_table_info = [];
    if (use_list_indent) {
        wet_table_info = format_toc_table_list(content_list);
    } else {
        wet_table_info = format_toc_table_no_list(content_list);
    }
    let ids_list = wet_table_info[0];
    let numberings_list = wet_table_info[1];
    let headers_list = wet_table_info[2];
    let header_levels_list = wet_table_info[3];
    console.log(header_levels_list)
    let table_html_lines = wet_table_info[4];
    // add ids to headers appearing in the html document's body
    for (let i = 0; i < ids_list.length; i++) {
        // search for tag that contains text of header, list numbering optional
        let header_regex = new RegExp("^((<.*?>)* *)*(" + escape_regex_chars(numberings_list[i]) + ")* *" + escape_regex_chars(headers_list[i]) + "( *(<.*?>)*)*$", "g");
        // replace with header tag with a similar format to: <h3 id="toc_3.1">3.1 Overview</h3>
        let replacement = "<h" + header_levels_list[i] + ' id="' + ids_list[i] + '">' + numberings_list[i] + ' ' + headers_list[i] + "</h" + header_levels_list[i] + ">";
        html_arr = html_arr.map(x => x.replaceAll(header_regex, replacement));
    }
    // replace original table lines with new table
    let new_table_lines = ['<div class="span-6 module-table-contents">', "<h2>Table of Contents</h2>"];
    new_table_lines = new_table_lines.concat(table_html_lines);
    new_table_lines.push("</div>");
    let html_arr_replaced_table = html_arr.slice(0, start_line).concat(new_table_lines).concat(html_arr.slice(end_line + 1));
    return html_arr_replaced_table.join('\n');
}
