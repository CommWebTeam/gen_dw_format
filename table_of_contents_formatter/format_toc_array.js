// regex for list numbering
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

/* get toc table values while checking for list numberings
returns an array of objects with four values for each table of contents entry:
- list numbering extracted from the start of the entry's content
- link id to be used in the main body that includes list numbering
- indentation level, based on list numbering
- entry content without the list numbering
*/
function get_toc_table_listnum(toc_arr) {
    let toc_values = [];
    // set values to use when an entry does not have a list numbering
    let last_indent_level = 1;
    let default_id_counter = 0;
    // loop through toc entries
    for (let i = 0; i < toc_arr.length; i++) {
        let curr_line = toc_arr[i];
        // placeholders
        let link_id = "";
        let indent_level = 0;
        // set list numbering and id number without list numbering initially
        let list_numbering = "";
        // check if entry has a list numbering
        if (list_ind_regex.test(curr_line)) {
            // if so, use that for id instead (remove consecutive periods first)
            list_numbering = curr_line.match(list_ind_regex)[0].trim().replaceAll(/\.+/g, ".");
            link_id = "toc_" + list_numbering;
            // get level of id based on periods followed by numbers in list numbering
            indent_level = count_regex(list_numbering, /\.[0-9]/g) + 2;
            last_indent_level = indent_level;
        }
        else {
            // otherwise, increment internal id counter to keep it unique
            link_id = "toc_nonum_" + default_id_counter;
            default_id_counter++;
            // set level of id to be previous properly generated header level + 1
            indent_level = last_indent_level + 1;
        }
        // get content without list numbering
        let content = curr_line.replace(list_ind_regex, "").trim();
        toc_values.push({list_numbering: list_numbering, link_id: link_id, indent_level: indent_level, content: content});
    }
    return toc_values;
}

/* get toc table values without checking for list numberings
*/
function get_toc_table_nonum(toc_arr) {
    let toc_values = [];
    // loop through table lines
    for (let i = 0; i < toc_arr.length; i++) {
        // get content without list numbering
        let content = toc_arr[i].replace(list_ind_regex, "").trim();
        // use index for id, assume empty list numbering, set header level to a default of 3 (for h3)
        toc_values.push({list_numbering: "", link_id: "toc_" + i, indent_level: 3, content: content});
        
    }
    return toc_values;
}

// generates html lines for table of contents table with indentation
function create_toc_table(toc_values) {
    // edge case - return empty array if input is empty
    if (toc_values.length === 0) {
        return [];
    }
    // create list of html lines - open the table list
    let toc_html_lines = ["<ul>"];
    // create counter for number of sublists to close after looping through all entries
    let sublist_counter = 0;
    // set first entry - push its contents without closing the list element (in case the next element is a sublist)
    toc_html_lines.push('<li><a href="#' + toc_values[0].link_id + '">' + toc_values[0].list_numbering + " " + toc_values[0].content + "</a>");
    // store current indent level to compare to in the next entry
    let prev_indent_level = toc_values[0].indent_level;
    // loop through each entry in the table, comparing current indent level to previous indent level
    for (let i = 1; i < toc_values.length; i++) {
        curr_indent_level = toc_values[i].indent_level;
        if (curr_indent_level > prev_indent_level) {
            // if the level is greater, then it's part of a sublist, so open a sublist 
            toc_html_lines.push("<ul>");
            sublist_counter++;
        }
        else if (curr_indent_level === prev_indent_level) {
            // if the level is equal, just close list element of previous line
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
        toc_html_lines.push('<li><a href="#' + toc_values[i].link_id + '">' + toc_values[i].list_numbering + " " + toc_values[i].content + "</a>");
        prev_indent_level = curr_indent_level;
    }
    // close final list element, then close all sublists, then close table list (expanded for clarity)
    toc_html_lines.push("</li>");
    for (let i = 0; i < sublist_counter; i++) {
        toc_html_lines.push("</ul>");
        toc_html_lines.push("</li>");
    }
    toc_html_lines.push("</ul>");
    return toc_html_lines;
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
	Get content entries in table of contents and their links, and add to document
	============================
    Each entry in the table of contents is to be formatted as so:
    {<ul> based on level of indentation}
        <li><a href="{link id}">{list numbering} {content of link text}</a></li>
    {</ul> based on level of indentation}
    */
    let wet_table_info = [];
    if (use_list_indent) {
        wet_table_info = get_toc_table_listnum(content_list);
    } else {
        wet_table_info = get_toc_table_nonum(content_list);
    }
    // add headers with ids to the html document's main body
    for (let i = 0; i < wet_table_info.length; i++) {
        let curr_entry = wet_table_info[i];
        let curr_numbering = curr_entry.list_numbering;
        let curr_link = curr_entry.link_id;
        let curr_level = curr_entry.indent_level;
        let curr_content = curr_entry.content;
        // search for tag that contains text of header, list numbering optional
        let header_regex = new RegExp("^((<.*?>)* *)*(" + escape_regex_chars(curr_numbering) + ")* *" + escape_regex_chars(curr_content) + "( *(<.*?>)*)*$", "g");
        // replace with header tag following the formatting of <h3 id="toc_3.1">3.1 Overview</h3>
        let replacement = "<h" + curr_level + ' id="' + curr_link + '">' + curr_numbering + ' ' + curr_content + "</h" + curr_level + ">";
        html_arr = html_arr.map(x => x.replaceAll(header_regex, replacement));
    }
    // replace original table lines with new table
    let new_table_lines = ['<div class="span-6 module-table-contents">', "<h2>Table of Contents</h2>"];
    let entry_lines = create_toc_table(wet_table_info);
    new_table_lines = new_table_lines.concat(entry_lines);
    new_table_lines.push("</div>");
    let html_arr_replaced_table = html_arr.slice(0, start_line).concat(new_table_lines).concat(html_arr.slice(end_line + 1));
    return html_arr_replaced_table.join('\n');
}
