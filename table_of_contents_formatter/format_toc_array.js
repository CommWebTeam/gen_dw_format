// regex for list numbering
const list_ind_regex = /^[0-9\.]+/g;
// @s are used as placeholders, so temporarily replace them
const at_placeholder = "<at_placeholder/>";

// get uploaded file, fix toc div and links, and redownload
function format_toc() {
    // read in uploaded file as string
    let file_reader = new FileReader();
    let html_file = document.getElementById("html_file").files[0];
    file_reader.onload = function(event) {
        let html_str = event.target.result;
        let edited_str = format_toc_arr(html_str, document.getElementById("toc_struc").value, document.getElementById("toc_start").value, document.getElementById("toc_end").value, document.getElementById("indent_type").value, document.getElementById("list_type").value, document.getElementById("page_nums").checked);
        download(edited_str, "toc.html", "text/html");
    }
    file_reader.readAsText(html_file);
}

/* helpers */

/* get toc table values while checking for list numberings
the toc table values consist of an array of objects with four values for each table of contents entry:
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

// using toc table values, generates html lines for table of contents table with indentation
function create_toc_table(toc_values, manual_list, list_type) {
    // edge case - return empty array if input is empty
    if (toc_values.length === 0) {
        return [];
    }
    // get list type from input
    let list_open = "<ul>";
    let list_close = "</ul>";
    if (list_type === "ol") {
        list_open = "<ol>";
        list_close = "</ol>";
    }
    else if (list_type === "no_bullet") {
        list_open = "<ol list-bullet-none>";
        list_close = "</ol>";
    }
    else if (list_type === "ol_numeric") {
        list_open = "<ol list-numeric>";
        list_close = "</ol>";
    }
    else if (list_type === "ol_lower_alpha") {
        list_open = "<ol list-lower-alpha>";
        list_close = "</ol>";
    }
    else if (list_type === "ol_upper_alpha") {
        list_open = "<ol list-upper-alpha>";
        list_close = "</ol>";
    }
    else if (list_type === "ol_lower_roman") {
        list_open = "<ol list-lower-roman>";
        list_close = "</ol>";
    } 
    else if (list_type === "ol_upper_roman") {
        list_open = "<ol list-upper-roman>";
        list_close = "</ol>";
    }
    // create list of html lines - open the table list
    let toc_html_lines = [list_open];
    // create counter for number of sublists to close after looping through all entries
    let sublist_counter = 0;
    // set first entry - push its contents without closing the list element (in case the next element is a sublist)
    if (manual_list) {
        // exclude list numbering in the entry's value if it was manually input
        toc_html_lines.push('<li><a href="#' + toc_values[0].link_id + '">' + toc_values[0].content + "</a>");
    }
    else {
        toc_html_lines.push('<li><a href="#' + toc_values[0].link_id + '">' + toc_values[0].list_numbering + " " + toc_values[0].content + "</a>");
    }
    // store current indent level to compare to in the next entry
    let prev_indent_level = toc_values[0].indent_level;
    // loop through each entry in the table, comparing current indent level to previous indent level
    for (let i = 1; i < toc_values.length; i++) {
        curr_indent_level = toc_values[i].indent_level;
        if (curr_indent_level > prev_indent_level) {
            // if the level increases, then it's part of a sublist, so open one sublist for each level increase
            for (let i = 0; i < (curr_indent_level - prev_indent_level); i++) {
                toc_html_lines.push(list_open);
                // open new list element
                toc_html_lines.push("<li>");
                sublist_counter++;
            }
        }
        else if (curr_indent_level === prev_indent_level) {
            // if the level stays the same, just close list element of previous line
            toc_html_lines.push("</li>");
            // open new list element
            toc_html_lines.push("<li>");
        }
        else {
            // otherwise, the level decreases, so it ends the sublist of the previous line
            // close close list element of previous line
            toc_html_lines.push("</li>");
            // for each level decrease, close the sublist, then the list element containing the sublist
            for (let i = 0; i < (prev_indent_level - curr_indent_level); i++) {
                toc_html_lines.push(list_close);
                toc_html_lines.push("</li>");
                sublist_counter--;
            }
            // open new list element
            toc_html_lines.push("<li>");
        }
        // push current contents without closing the list element (in case the next element is a sublist)
        if (manual_list) {
            // exclude list numbering in the entry's value if it was manually input
            toc_html_lines.push('<a href="#' + toc_values[i].link_id + '">' + toc_values[i].content + "</a>");
        }
        else {
            toc_html_lines.push('<a href="#' + toc_values[i].link_id + '">' + toc_values[i].list_numbering + " " + toc_values[i].content + "</a>");
        }
        // store current indent level to compare to in the next entry
        prev_indent_level = curr_indent_level;
    }
    // close final list element, then close all sublists, then close table list
    toc_html_lines.push("</li>");
    for (let i = 0; i < sublist_counter; i++) {
        toc_html_lines.push(list_close);
        toc_html_lines.push("</li>");
    }
    toc_html_lines.push(list_close);
    return toc_html_lines;
}



// formats html document's table of contents to WET
function format_toc_arr(html_str, toc_struc, input_start_line, input_end_line, indent_type, list_type, rm_page_nums) {
	/*
	============================
	Initial cleanup
	============================
	*/
    // perform basic cleaning on html using general dreamweaver formatting functions
    let cleaned_html_str = rm_ref_links(html_str);
    cleaned_html_str = rm_toc_links(cleaned_html_str);
    cleaned_html_str = rm_bookmark_links(cleaned_html_str);
    cleaned_html_str = rm_logiterms(cleaned_html_str);
    cleaned_html_str = replace_invisible_nbsp(cleaned_html_str);
    cleaned_html_str = rm_multispace(cleaned_html_str);
    cleaned_html_str = rm_end_tag_space(cleaned_html_str);
    cleaned_html_str = rm_empty_tags(cleaned_html_str);
    cleaned_html_str = rm_empty_br(cleaned_html_str);
    cleaned_html_str = fix_br(cleaned_html_str);
    // this will be used for regex statements, so escape regex special chars
    cleaned_html_str = replace_special_chars(cleaned_html_str);
    // need to use @ as placeholders, so remove them for now
    cleaned_html_str = cleaned_html_str.replaceAll("@", at_placeholder);
    // remove indentation
    let html_arr = cleaned_html_str.split("\n");
    html_arr = trim_arr(html_arr);
    cleaned_html_str = html_arr.join("\n");
	/*
	============================
	Get table of contents div lines
	============================
	*/
    // find start to end of table of contents
    let table_str = "";
    if (input_start_line === "" || input_end_line === "") {
        // replace <br clear="all"> with placeholders for now
        cleaned_html_str = cleaned_html_str.replaceAll('<br clear="all">', "@");
        // search for lines between two <br clear="all"> that have at least one separator of the toc structure
        if (toc_struc === "p_br") {
            const p_br_regex = /@([^@]|\n)*?<p([^>]|\n)*>(([^@]|\n)*?<br\/>([^@]|\n)*?)<\/p>([^@]|\n)*@/g;
            let table_str_matches = cleaned_html_str.match(p_br_regex);
            if (table_str_matches === null) {
                console.log('No table of contents structure found: currently searching for a single <p>, between two <br clear="all">, with internal entries separated by <br>');
                return html_str;
            }
            table_str = table_str_matches[0];
            cleaned_html_str = cleaned_html_str.replace(p_br_regex, '<br clear="all">$3<br clear="all">');
        }
        else if (toc_struc === "ul_li") {
            const ul_li_regex = /@(([^@]|\n)*?<\/li>([^@]|\n)*)@/g;
            let table_str_matches = cleaned_html_str.match(ul_li_regex);
            if (table_str_matches === null) {
                console.log('No table of contents structure found: currently searching for a single <p>, between two <br clear="all">, with internal entries separated by <br>');
                return html_str;
            }
            table_str = table_str_matches[0];
            cleaned_html_str = cleaned_html_str.replace(ul_li_regex, '<br clear="all">$1<br clear="all">')
        }
        cleaned_html_str = cleaned_html_str.replaceAll("@", '<br clear="all">');
    } else {
        // use inputs for start/end line if both are provided
        let table_lines = html_arr.slice(parseInt(input_start_line), parseInt(input_end_line) + 1);
        table_str = table_lines.join("\n");
        // mark position of original table
        cleaned_html_str = cleaned_html_str.replace(table_str, "@" + table_str + "@");
    }
    /*
	============================
	Get contents of table
	============================
	*/
    // search for p tag that includes a <br/>
    const para_regex = new RegExp("(^|(<p.*?>))((.|\n)*?)($|(</p>))", "g");
    let content_list_str = "";
    // loop through p tags until one with at least two <br/> tags is found
	let contents = para_regex.exec(table_str);
	while (contents !== null) {
        let curr_p = contents[3];
        let num_br = count_regex(curr_p, /<br\/>/g);
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
    // break content list up by <br/>s
    content_list = content_list_str.split("<br/>");
    // remove other tags inside content list
    content_list = replace_arr(content_list, /<.*?>/g, "");
    // remove page numbers if the option is selected
    if (rm_page_nums) {
        content_list = replace_arr(content_list, /(\.)+\. *[0-9]+/g, "");
    }
    // clean up content
    content_list = content_list.map(x => format_spacing(x));
    content_list = trim_arr(content_list);
    content_list = rm_empty_lines(content_list);
    /*
	============================
	Add entries in table of contents to main document
	============================
    Each entry in the table of contents is to be formatted as so:
    {<ul> based on level of indentation}
        <li><a href="{link id}">{list numbering} {content of link text}</a></li>
    {</ul> based on level of indentation}
    */
    // set how to decide indentation
    let use_list_indent = (indent_type === "list_num") || (indent_type === "manual_list_num");
    let manual_list = (indent_type === "manual_list_num");
    let wet_table_info = [];
    if (use_list_indent) {
        wet_table_info = get_toc_table_listnum(content_list);
    } else {
        wet_table_info = get_toc_table_nonum(content_list);
    }
    // replace certain tags (just <li> for now) with placeholders so they aren't treated as headers
    const list_open_placeholder = "list_open_placeholder";
    const list_close_placeholder = "list_close_placeholder";
    cleaned_html_str = cleaned_html_str.replaceAll("<li>", list_open_placeholder);
    cleaned_html_str = cleaned_html_str.replaceAll("</li>", list_close_placeholder);
    // add headers with ids to the html document's main body
    for (let i = 0; i < wet_table_info.length; i++) {
        let curr_numbering = wet_table_info[i].list_numbering;
        let curr_link = wet_table_info[i].link_id;
        let curr_level = wet_table_info[i].indent_level;
        let curr_content = wet_table_info[i].content;
        // search for tag or line that contains text of table of contents entry, list numbering optional
        let header_regex = new RegExp("^(((<.*?>)* *)*(" + escape_regex_chars(curr_numbering) + ")* *" + escape_regex_chars(curr_content) + "( *(<.*?>)*)*)$", "g");
        // in the replacement string, include a comment of original tag for easier removal of false positives
        let replacement =  "<!-- Original tag: $1 -->\n";
        // replace original tag with header tag following the formatting of <h3 id="toc_3.1">3.1 Overview</h3>
        if (manual_list) {
            // exclude list values in replacement if they were manually input
            replacement = replacement + "<h" + curr_level + ' id="' + curr_link + '">' + curr_content + "</h" + curr_level + ">";
        }
        else {
            replacement = replacement + "<h" + curr_level + ' id="' + curr_link + '">' + curr_numbering + ' ' + curr_content + "</h" + curr_level + ">";
        }
        cleaned_html_str = cleaned_html_str.replaceAll(header_regex, replacement);
    }
    // add placeholder tags back in
    cleaned_html_str = cleaned_html_str.replaceAll(list_open_placeholder, "<li>");
    cleaned_html_str = cleaned_html_str.replaceAll(list_close_placeholder, "</li>");
    /*
	============================
	Replace original table of contents lines with formatted table
	============================
    */
    // generate html for formatted table
    let new_table_lines = ['<div class="span-6 module-table-contents">', "<h2>Table of Contents</h2>"];
    let entry_lines = create_toc_table(wet_table_info, manual_list, list_type);
    new_table_lines = new_table_lines.concat(entry_lines);
    new_table_lines.push("</div>");
    // add formatted table into document
    let new_table_str = new_table_lines.join("\n");
    cleaned_html_str = cleaned_html_str.replace(/@([^@]|\n)*@/g, new_table_str);
    // add @ back in
    cleaned_html_str = cleaned_html_str.replaceAll(at_placeholder, "@");
    return cleaned_html_str.replace(table_str, new_table_str);
}
