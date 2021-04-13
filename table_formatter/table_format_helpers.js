const extra_span_cell = "<td><span placeholder/></td>";
const table_placeholder = "<TABLEPLACEHOLDER/>";
const at_placeholder = "<ATPLACEHOLDER>";
const open_caption_placeholder = "<OPENCAPTIONPLACEHOLDER>";
const close_caption_placeholder = "<CLOSECAPTIONPLACEHOLDER>";

// edit html tables
function format_table() {
	let file_reader_content = new FileReader();
	let content_str = document.getElementById("html_file").files[0];
	file_reader_content.onload = function(event) {
		// read in inputs
		let html_doc_str = event.target.result.replaceAll("\r\n", "\n");
		let table_list_type = document.getElementById("table_list_type").value;
		let table_list = int_csv_to_arr(document.getElementById("table_list").value);
		let row_list_type = document.getElementById("row_list_type").value;
		let row_list = int_csv_to_arr(document.getElementById("row_list").value);
		let row_forward_dir = document.getElementById("row_list_dir").value === "forward";
		let col_list_type = document.getElementById("col_list_type").value;
		let col_list = int_csv_to_arr(document.getElementById("col_list").value);
		let col_forward_dir = document.getElementById("col_list_dir").value === "forward";
		// convert tables to triple nested table array
		let html_table_arr = html_tables_to_arr(html_doc_str);
		console.log("Tables found: " + html_table_arr.length);
		// apply actions on table array
		if (document.getElementById("to_header_col").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, to_header_col);
		}
		if (document.getElementById("to_header_row").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, to_header_row);
		}
		if (document.getElementById("set_caption").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, set_caption);
		}
		if (document.getElementById("rm_p_tag").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, rm_p_tag);
		}
		if (document.getElementById("rm_strong_tag").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, rm_strong_tag);
		}
		if (document.getElementById("to_bold").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, to_otb);
		}
		if (document.getElementById("to_align_left").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, to_align_left);
		}
		if (document.getElementById("to_align_right").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, to_align_right);
		}
		if (document.getElementById("to_align_bottom").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, to_align_bottom);
		}
		if (document.getElementById("to_align_center").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, to_align_center);
		}
		if (document.getElementById("to_bg_white").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, to_bg_white);
		}
		if (document.getElementById("to_bg_light").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, to_bg_light);
		}
		if (document.getElementById("to_indent_small").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, to_indent_small);
		}
		if (document.getElementById("to_indent_medium").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, to_indent_medium);
		}
		if (document.getElementById("to_indent_large").checked) {
			html_table_arr = apply_on_cells(html_table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, to_indent_large);
		}
		// for actions on setting thead/tbody/tfoot index, these only use rows and the first two row indices
		if (document.getElementById("insert_thead").checked) {
			html_table_arr = set_t_inds(html_table_arr, table_list_type, table_list, row_list, row_forward_dir, "thead");
		}
		if (document.getElementById("insert_tbody").checked) {
			html_table_arr = set_t_inds(html_table_arr, table_list_type, table_list, row_list, row_forward_dir, "tbody");
		}
		if (document.getElementById("insert_tfoot").checked) {
			html_table_arr = set_t_inds(html_table_arr, table_list_type, table_list, row_list, row_forward_dir, "tfoot");
		}
		// convert table array to output
		html_doc_str = table_arr_to_doc(html_doc_str, html_table_arr);
		// working directly on document instead of table array, append preceding tags to table captions
		if (document.getElementById("set_caption_para").checked) {
			html_doc_str = set_prev_caption(html_doc_str, "p", table_list_type, table_list);
		}
		if (document.getElementById("set_caption_header").checked) {
			html_doc_str = set_prev_caption(html_doc_str, "h[0-9]+", table_list_type, table_list);
		}
		// revert caption placeholders from set_prev_caption
		html_doc_str = html_doc_str.replaceAll(open_caption_placeholder, "<caption");
		html_doc_str = html_doc_str.replaceAll(close_caption_placeholder, "</caption>");
		// decide output file name - this tool may need to be run multiple times, so append version number to name
		let input_file_path = document.getElementById("html_file").value;
		let input_file_name = input_file_path.split('\\').pop().split('/').pop();
		let output_file_name = "formatted_tables.html";
		if (input_file_name === "formatted_tables.html") {
			output_file_name = "formatted_tables_0.html";
		}
		if (/formatted_tables_[0-9]+/g.test(input_file_name)) {
			let old_vers = input_file_name.replace(/formatted_tables_([0-9]+)/g, "$1");
			output_file_name = "formatted_tables_" + (parseInt(old_vers) + 1) + ".html";
		}
		download(html_doc_str, output_file_name, "text/html");
	}
	file_reader_content.readAsText(content_str);
}

/* helpers */

// the match function, but returns an empty array instead of null if no match
function match_with_empty(str_to_match, regex_exp) {
	let match_arr = str_to_match.match(regex_exp);
	if (match_arr === null) {
		return [];
	}
	return match_arr;
}

/*
=================================
Convert html tables to arrays
=================================
*/

// get number of rows in table up to content group tag
// returns an object with 3 values: attr for the tag itself, open_tag_ind for number of rows before opening tag, and close_tag_ind for number of rows before closing tag
function nrow_to_t(table_html_str, tag) {
	const up_to_open_tag = new RegExp("<table(.|\n)*?(<" + tag + "[^>]*>)", "g");
	const up_to_close_tag = new RegExp("<table(.|\n)*?(</" + tag + "[^>]*>)", "g");
	// get tag contents
	let open_tag_match = match_with_empty(table_html_str, up_to_open_tag);
	if (open_tag_match.length === 0) {
		// return object with empty values if tag doesn't exist
		return {attr: "", open_tag_ind: -1, close_tag_ind: -1};
	}
	let tag_contents = open_tag_match[0].replace(up_to_open_tag, "$2");
	// get number of rows before opening tag
	let open_tag_row = match_with_empty(open_tag_match[0], /<tr/g).length;
	// check whether closing tag exists
	let close_tag_match = match_with_empty(table_html_str, up_to_close_tag);
	if (close_tag_match.length === 0) {
		return {attr: tag_contents, open_tag_ind: open_tag_row, close_tag_ind: -1};
	}
	// if so, get number of rows before closing tag
	let close_tag_row = match_with_empty(close_tag_match[0], /<tr/g).length;
	return {attr: tag_contents, open_tag_ind: open_tag_row, close_tag_ind: close_tag_row};
}

// get array of cells, in array of rows, in array of tables
function html_tables_to_arr(html_str) {
	// get array of tables
	let table_arr = match_with_empty(html_str, /<table( [^>]*)*>(.|\n)*?<\/table>/g);
	
	// loop through each table and get array of rows
	for (let i = 0; i < table_arr.length; i++) {
		let table_str = table_arr[i];
		// get table attributes
		let table_attr = table_str.replaceAll(/(<table[^>]*>)(.|\n)*/g, "$1");
		// get caption
		let caption_arr = match_with_empty(table_str, /<caption(.|\n)*?<\/caption>/g);
		let caption = "";
		if (caption_arr.length > 0) {
			caption = caption_arr[0];
			if (caption_arr.length > 1) {
				console.log("Captions after the first in table " + i + " have been ignored.")
			}
		}
		// get position of thead, tbody, tfoot tags relative to rows
		let thead = nrow_to_t(table_str, "thead");
		let tbody = nrow_to_t(table_str, "tbody");
		let tfoot = nrow_to_t(table_str, "tfoot");
		/*
		=================================
		Create initial 2d array of rows -> cells, factoring in colspan but not rowspan
		=================================
		*/
		let row_arr = match_with_empty(table_str, /<tr( [^>]*)*>(.|\n)*?<\/tr>/g);
		// loop through each row and get array of cells
		for (let j = 0; j < row_arr.length; j++) {
			let curr_row = row_arr[j];
			// get row attributes
			let row_attr = curr_row.replace(/(<tr[^>]*>)(.|\n)*/g, "$1");
			// - add extra cells for colspan first:
			// 1. add markers for colspan and rowspan values after cells
			// (note that the marker is followed by an extra space to prevent confusion with spans of more than 1 digit)
			curr_row = curr_row.replaceAll(/(<t[hd]( [^>]*)*colspan *= *['"]([0-9]+)['"]( [^>]*)*>(.|\n)*?<\/t[hd]>)/g, "$1COLSPAN$3 ");
			curr_row = curr_row.replaceAll(/(<t[hd]( [^>]*)*rowspan *= *['"]([0-9]+)['"]( [^>]*)*>(.|\n)*?<\/t[hd]>)/g, "$1ROWSPAN$3 ");
			// 2. get array of markers for colspans
			const span_marker = />(ROWSPAN[0-9]+ )*COLSPAN([0-9]+) /g;
			let colspan_marker_arr = match_with_empty(curr_row, span_marker);
			// 3. loop through each marker and replace it with appropriate number of extra cells
			for (let k = 0; k < colspan_marker_arr.length; k++) {
				let curr_marker = colspan_marker_arr[k];
				let row_span_val = curr_marker.replace(span_marker, "$1");
				let extra_cell = extra_span_cell + row_span_val;
				let colspan_num = parseInt(curr_marker.replace(span_marker, "$2"));
				curr_row = curr_row.replaceAll(curr_marker, ">" + extra_cell.repeat(colspan_num - 1));
			}
			// set row array value to object with info on its attribute and row cells
			let cell_arr = match_with_empty(curr_row, /<t[hd]( [^>]*)*>(.|\n)*?<\/t[hd]>(ROWSPAN[0-9]+ )*/g);
			row_arr[j] = {attr: row_attr, cells: cell_arr};
		}
		/*
		=================================
		Add rowspan into array 
		=================================
		*/
		// loop backward through rows (so that earlier rowspans set their placeholders after factoring in later rowspan placeholders)
		for (let j = (row_arr.length - 2); j >= 0; j--) {
			let curr_row_cells = row_arr[j].cells;
			// loop through each cell in the row and check if it has rowspan
			for (let k = 0; k < curr_row_cells.length; k++) {
				let curr_cell = curr_row_cells[k];
				if (curr_cell.includes(">ROWSPAN")) {
					// extract rowspan number
					let rowspan_num = parseInt(curr_cell.replace(/(.|\n)*>ROWSPAN([0-9]+).*/g, "$1"));
					// loop through [rowspan #] following rows or until end of table is reached, and add rowspan placeholder at current col index
					let rows_to_loop = Math.min(rowspan_num, row_arr.length - j);
					for (let m = 1; m < rows_to_loop; m++) {
						let span_row_cells = row_arr[j + m].cells;
						row_arr[j + m].cells = span_row_cells.slice(0, k).concat([extra_span_cell]).concat(span_row_cells.slice(k));
					}
				}
			}
		}
		// set table array value to object with info on its values
		table_arr[i] = {attr: table_attr, caption: caption, thead: thead, tbody: tbody, tfoot: tfoot, rows: row_arr};
	}
	return table_arr;
}

/*
=================================
Convert table arrays back to html
=================================
*/

// append thead/tbody/tfoot if at correct row
function append_t(orig_table_str, curr_table, j) {
	let table_str = orig_table_str;
	if (curr_table.thead.open_tag_ind === j) {
		table_str = table_str + "\n" + curr_table.thead.attr;
	}
	if (curr_table.thead.close_tag_ind === j) {
		table_str = table_str + "\n" + "</thead>";
	}
	if (curr_table.tbody.open_tag_ind === j) {
		table_str = table_str + "\n" + curr_table.tbody.attr;
	}
	if (curr_table.tbody.close_tag_ind === j) {
		table_str = table_str + "\n" + "</tbody>";
	}
	if (curr_table.tfoot.open_tag_ind === j) {
		table_str = table_str + "\n" + curr_table.tfoot.attr;
	}
	if (curr_table.tfoot.close_tag_ind === j) {
		table_str = table_str + "\n" + "</tfoot>";
	}
	return table_str;
}

// add array of tables -> rows -> cells back into html document
function table_arr_to_doc(html_str, html_table_arr) {
	// replace table tags in the html document with placeholders for now
	edited_html_str = html_str.replaceAll(/<table( [^>]*)*>(.|\n)*?<\/table>/g, table_placeholder);
	// loop through tables in order
	for (let i = 0; i < html_table_arr.length; i++) {
		let curr_table = html_table_arr[i];
		// create string of edited table with caption
		let table_str = curr_table.attr + "\n" + curr_table.caption;
		// loop through and append rows
		for (let j = 0; j < curr_table.rows.length; j++) {
			// check for thead/tbody/tfoot at current row
			table_str = append_t(table_str, curr_table, j);
			let curr_row = curr_table.rows[j];
			table_str = table_str + "\n" + curr_row.attr;
			// loop through and append cells that aren't span placeholders
			for (let k = 0; k < curr_row.cells.length; k++) {
				let curr_cell = curr_row.cells[k].trim();
				curr_cell = curr_cell.replaceAll(/>ROWSPAN([0-9]+)/g, ">");
				if (curr_cell !== extra_span_cell) {
					table_str = table_str + "\n" + curr_cell;
				}
			}
			table_str = table_str + "\n</tr>";
		}
		// check for thead/tbody/tfoot at the end of table
		table_str = append_t(table_str, curr_table, curr_table.rows.length);
		table_str = table_str + "\n</table>";
		// replace first instance of table placeholder in html document with string of edited table
		edited_html_str = edited_html_str.replace(table_placeholder, table_str);
	}
	return edited_html_str;
}

/*
=================================
Convert string of csv indices to array
=================================
*/

// convert comma-separated string of integers to array of indices
function int_csv_to_arr(csv_str) {
	// return empty array for empty inputs or misformatted strings
	if (csv_str.trim() === "") {
		return [];
	}
	if (/[^0-9, ]/g.test(csv_str) || /, *,/g.test(csv_str)) {
		console.log("Misformatted input: " + csv_str);
		return [];
	}
	// split string by comma and clean values
	let int_arr = csv_str.split(",");
	int_arr = trim_arr(int_arr);
	int_arr = rm_empty_lines(int_arr);
	// convert values to int
	for (let i = 0; i < int_arr.length; i++) {
		int_arr[i] = parseInt(int_arr[i]);
	}
	return int_arr;
}

/*
=================================
Functions for actions to be applied on the cell of a table in the table array 
=================================
*/

// apply a function to the cells in the given rows and columns for table array
function apply_on_cells(table_arr, table_list_type, table_list, row_list_type, row_list, row_forward_dir, col_list_type, col_list, col_forward_dir, apply_func) {
	let edited_table_arr = table_arr;
	// loop over tables to apply function to
	for (let i = 0; i < edited_table_arr.length; i++) {
		if ((table_list_type === "all") ||
		  (table_list_type === "exclude" && !table_list.includes(i)) ||
		  (table_list_type === "include" && table_list.includes(i))) {
		    let curr_table_rows = edited_table_arr[i].rows;
		    // loop over rows to apply function to
			for (let j = 0; j < curr_table_rows.length; j++) {
				let row_list_check = j;
				if (!row_forward_dir) {
					// get index from end of table instead if applicable
					row_list_check = curr_table_rows.length - 1 - j;
				}
				if ((row_list_type === "all") ||
				  (row_list_type === "exclude" && !row_list.includes(row_list_check)) ||
				  (row_list_type === "include" && row_list.includes(row_list_check))) {
					// loop over cells to apply function to, and apply function if it isn't a placeholder
					let curr_row_cells = curr_table_rows[j].cells;
					for (let k = 0; k < curr_row_cells.length; k++) {
						let col_list_check = k;
						if (!col_forward_dir) {
							// get index from end of table instead if applicable
							col_list_check = curr_row_cells.length - 1 - k;
						}
						if ((col_list_type === "all") ||
						(col_list_type === "exclude" && !col_list.includes(col_list_check)) ||
						(col_list_type === "include" && col_list.includes(col_list_check))) {
							if (!curr_row_cells[k].includes(extra_span_cell)) {
								edited_table_arr[i] = apply_func(edited_table_arr[i], j, k);
							}
						}
				    }
				}
			}
		}
	}
	return edited_table_arr;
}


// converts td to th scope col
function to_header_col(table_arr, row, col) {
	let curr_cell = table_arr.rows[row].cells[col];
	// replace td with th
	curr_cell = curr_cell.replace("<td", "<th").replaceAll("</td", "</th");
	// remove existing scope
	curr_cell = curr_cell.replace(/(<th[^>]*)scope *= *['"].*?['"]/g, "$1");
	// add scope of col or colgroup, depending on whether cell tag has a span
	if (/(<th[^>]*)colspan *= */.test(curr_cell)) {
		curr_cell = curr_cell.replace("<th", '<th scope="colgroup"');
	} else {
		curr_cell = curr_cell.replace("<th", '<th scope="col"');
	}
	table_arr.rows[row].cells[col] = curr_cell;
	return table_arr;
}

// converts td to th scope row
function to_header_row(table_arr, row, col) {
	let curr_cell = table_arr.rows[row].cells[col];
	// replace td with th
	curr_cell = curr_cell.replace("<td", "<th").replaceAll("</td", "</th");
	// remove existing scope
	curr_cell = curr_cell.replace(/(<th[^>]*)scope *= *['"].*?['"]/g, "$1");
	// add scope of row
	curr_cell = curr_cell.replace("<th", '<th scope="row"');
	table_arr.rows[row].cells[col] = curr_cell;
	return table_arr;
}

// sets cell value as caption
function set_caption(table_arr, row, col) {
	let curr_caption = table_arr.caption;
	// append caption if none exists
	if (curr_caption === "") {
		curr_caption = "<caption></caption>";
	}
	// append cell to caption
	let curr_cell = table_arr.rows[row].cells[col];
	let curr_cell_contents = curr_cell.replace(/<t[hd][^>]*>(.*?)<\/t[hd]>/g, "$1")
	curr_caption = curr_caption.replace("</caption>", curr_cell_contents + "</caption>");
	table_arr.caption = curr_caption;
	// remove cell contents
	table_arr.rows[row].cells[col] = '<td class="background-light"></td>';
	return table_arr;
}

function remove_tag(table_arr, row, col, tag_type) {
	let curr_cell = table_arr.rows[row].cells[col];
	// find and remove instances of tag
	const open_tag = new RegExp("<" + tag_type + "[^>]*>", "g");
	curr_cell = curr_cell.replaceAll(open_tag, "").replaceAll("</" + tag_type + ">", "");
	table_arr.rows[row].cells[col] = curr_cell;
	return table_arr;
}

function rm_p_tag(table_arr, row, col) {
	return remove_tag(table_arr, row, col, "p");
}

function rm_strong_tag(table_arr, row, col) {
	return remove_tag(table_arr, row, col, "strong");
}

// helper function - adds class to cell
function add_class(table_arr, row, col, class_str) {
	let curr_cell = table_arr.rows[row].cells[col];
	// append class if cell already has a class attribute
	const existing_class = /(<t[dh] [^>]*class *= *['"].*?)(['"])/g;
	if (existing_class.test(curr_cell)) {
		curr_cell = curr_cell.replace(existing_class, "$1 " + class_str + "$2");
	} else {
		// otherwise, add class attribute with otb
		curr_cell = curr_cell.replace(/(<t[dh])/g, '$1 class="' + class_str + '"');
	}
	table_arr.rows[row].cells[col] = curr_cell;
	return table_arr;
}

// adds corresponding class
function to_otb(table_arr, row, col) {
	return add_class(table_arr, row, col, "osfi-txt--bold");
}

function to_align_left(table_arr, row, col) {
	return add_class(table_arr, row, col, "align-left");
}

function to_align_right(table_arr, row, col) {
	return add_class(table_arr, row, col, "align-right");
}

function to_align_bottom(table_arr, row, col) {
	return add_class(table_arr, row, col, "align-bottom");
}

function to_align_center(table_arr, row, col) {
	return add_class(table_arr, row, col, "align-center");
}

function to_bg_white(table_arr, row, col) {
	return add_class(table_arr, row, col, "background-white");
}

function to_bg_light(table_arr, row, col) {
	return add_class(table_arr, row, col, "background-light");
}

function to_indent_small(table_arr, row, col) {
	return add_class(table_arr, row, col, "indent-small");
}

function to_indent_medium(table_arr, row, col) {
	return add_class(table_arr, row, col, "indent-medium");
}

function to_indent_large(table_arr, row, col) {
	return add_class(table_arr, row, col, "indent-large");
}

/*
=================================
Function for actions to be applied on thead/tbody/tfoot row index for a table in the table array 
=================================
*/

// helper function to set group inds for required tables
function set_t_inds(table_arr, table_list_type, table_list, row_inds, forward_dir, group) {
	let edited_table_arr = table_arr;
	// loop over tables to apply function to
	for (let i = 0; i < edited_table_arr.length; i++) {
		if ((table_list_type === "all") ||
		  (table_list_type === "exclude" && !table_list.includes(i)) ||
		  (table_list_type === "include" && table_list.includes(i))) {
			// set new opening tag index
			if (row_inds.length > 0) {
				let open_ind = row_inds[0];
				if (!forward_dir) {
					// get index from end of table instead if applicable
					open_ind = edited_table_arr[i].rows.length - open_ind;
				}
				edited_table_arr[i][group].open_tag_ind = open_ind;
				// set new closing tag index
				if (row_inds.length > 1) {
					let close_ind = row_inds[1];
					if (!forward_dir) {
						// get index from end of table instead if applicable
						close_ind = edited_table_arr[i].rows.length - close_ind;
					}
					edited_table_arr[i][group].close_tag_ind = close_ind;
				}
			}
		}
	}
	return edited_table_arr;
}

/*
=================================
Function to handle the action of setting the preceding paragraph before a table as its caption
=================================
*/

// sets tag preceding table as caption if it is only separated by br
function set_prev_caption(html_doc_str, prev_tag_name, table_list_type, table_list) {
	// temporarily replace table tags with placeholders to mark whether table has been visited yet
	let edited_html_doc_str = html_doc_str.replaceAll("<table", table_placeholder);
	// temporarily replace @ with a placeholder to use it to mark caption tags
	edited_html_doc_str = edited_html_doc_str.replaceAll("@", at_placeholder);
	const prev_open_tag = "<" + prev_tag_name + "([^>]*)>";
	const prev_close_tag = "</" + prev_tag_name + ">";
	edited_html_doc_str = edited_html_doc_str.replaceAll(new RegExp("(" + prev_close_tag + ")", "g"), "@$1");
	// regex to find caption tag before a table placeholder
	const prev_tag = new RegExp(prev_open_tag + "(([^@]|\n)*)@" + prev_close_tag + "( |\n|(<br[^>]*>))*" + table_placeholder, "g");
	// regex to get full document up to the </table that closes the current table
	const close_curr_table = new RegExp("^(.|\n)*?" + table_placeholder + "(.|\n)*?</table>", "g");
	// regex to find the full tag of the current table
	const table_tag = new RegExp("(" + table_placeholder + "[^>]*>)", "g");
	// loop through tables to apply function to
	let i = 0;
	while (edited_html_doc_str.includes(table_placeholder)) {
		if ((table_list_type === "all") ||
		(table_list_type === "exclude" && !table_list.includes(i)) ||
		(table_list_type === "include" && table_list.includes(i))) {
			// get document up to </table> that closes current table
			let orig_doc_part = match_with_empty(edited_html_doc_str, close_curr_table)[0];
			let curr_doc_part = orig_doc_part;
			// check to see if there is a caption tag before current table
			let prev_tag_match = match_with_empty(curr_doc_part, prev_tag);
			if (prev_tag_match.length > 0) {
				// if there is, append its contents to caption, and set caption to placeholder to avoid matching later
				let prev_tag_attr = prev_tag_match[0].replace(prev_tag, "$1");
				let prev_tag_contents = prev_tag_match[0].replace(prev_tag, "$2");
				if (!curr_doc_part.includes("</caption>")) {
					// create empty caption if no caption exists yet
					curr_doc_part = curr_doc_part.replace(table_tag, "$1\n<caption" + prev_tag_attr + "></caption>");
				}
				curr_doc_part = curr_doc_part.replace(/<caption([^>]*)>((.|\n)*?)<\/caption>/g, open_caption_placeholder + "$1 " + prev_tag_attr + ">$2" + prev_tag_contents + close_caption_placeholder);
				// remove original caption tag
				curr_doc_part = curr_doc_part.replace(prev_tag, table_placeholder);
				edited_html_doc_str = edited_html_doc_str.replace(orig_doc_part, curr_doc_part);
			}
		}
		// move to next table by removing placeholder
		edited_html_doc_str = edited_html_doc_str.replace(table_placeholder, "<table");
		i++;
	}
	// add @ back in
	edited_html_doc_str = edited_html_doc_str.replaceAll("@", "");
	edited_html_doc_str = edited_html_doc_str.replaceAll(at_placeholder, "@");
	return edited_html_doc_str;
}
