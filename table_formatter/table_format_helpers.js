const extra_span_cell = "<td><span placeholder/></td>";
const table_placeholder = "<TABLEPLACEHOLDER/>";

// edit html tables
function format_table() {
	let file_reader_content = new FileReader();
	let content_str = document.getElementById("html_file").files[0];
	file_reader_content.onload = function(event) {
		let html_doc_str = event.target.result.replaceAll("\r\n", "\n");
		let html_table_arr = html_tables_to_arr(html_doc_str);
		let header_rows = int_csv_to_arr(document.getElementById("edit_list").value);

		let edited_html_doc_str = table_arr_to_doc(html_doc_str, html_table_arr);
		// this tool may need to be run multiple times, so append version number to name
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
		download(edited_html_doc_str, output_file_name, "text/html");
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

// get array of cells, in array of rows, in array of tables
function html_tables_to_arr(html_str) {
	// get array of tables
	let table_arr = match_with_empty(html_str, /<table( [^>]*)*>(.|\n)*?<\/table>/g);
	console.log("Tables found: " + table_arr.length);
	// loop through each table and get array of rows
	for (let i = 0; i < table_arr.length; i++) {
		// get table attributes
		let table_attr = table_arr[i].replaceAll(/(<table[^>]*>)(.|\n)*/g, "$1");
		/*
		=================================
		Create initial 2d array of rows -> cells, factoring in colspan but not rowspan
		=================================
		*/
		let row_arr = match_with_empty(table_arr[i], /<tr( [^>]*)*>(.|\n)*?<\/tr>/g);
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
			// set row array value to object with attribute and row cells
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
					// remove rowspan placeholder
					curr_row_cells[k] = curr_cell.replaceAll(/>ROWSPAN[0-9]+ /g, ">");
				}
			}
		}
		// set table array value to object with attribute and table rows
		table_arr[i] = {attr: table_attr, rows: row_arr};
	}
	return table_arr;
}

// add array of tables -> rows -> cells back into html document
function table_arr_to_doc(html_str, html_table_arr) {
	// replace table tags in the html document with placeholders for now
	edited_html_str = html_str.replaceAll(/<table( [^>]*)*>(.|\n)*?<\/table>/g, table_placeholder);
	// loop through tables in order
	for (let i = 0; i < html_table_arr.length; i++) {
		let curr_table = html_table_arr[i];
		// create string of edited table
		let table_str = curr_table.attr;
		// loop through and append rows
		for (let j = 0; j < curr_table.rows.length; j++) {
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
		table_str = table_str + "\n</table>";
		// replace first instance of table placeholder in html document with string of edited table
		edited_html_str = edited_html_str.replace(table_placeholder, table_str);
	}
	return edited_html_str;
}

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
	return int_arr;
}

