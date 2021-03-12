const extra_colspan_cell = "<td><colspan placeholder/></td>"

// perform general formatting for user-selected options
function format_table() {
	let file_reader_content = new FileReader();
	let content_str = document.getElementById("html_file").files[0];
	file_reader_content.onload = function(event) {
		let html_doc_str = event.target.result.replaceAll("\r\n", "\n");
		let html_table_matr = html_tables_to_matrix(html_doc_str);
		let header_rows = int_csv_to_arr(document.getElementById("row_header").value);
		let header_cols = int_csv_to_arr(document.getElementById("col_header").value);
		// download(html_doc_str, "formatted.html", "text/html");
	}
	file_reader_content.readAsText(content_str);
}

/* helpers */

// the match function, but returns an empty array if no match instead of null
function match_with_empty(str_to_match, regex_exp) {
	let match_arr = str_to_match.match(regex_exp);
	if (match_arr === null) {
		return [];
	}
	return match_arr;
}

// get array of cells, in array of rows, in array of tables
function html_tables_to_matrix(html_str) {
	// get array of tables
	let table_arr = match_with_empty(html_str, /<table( [^>]*)*>(.|\n)*?<\/table>/g);
	console.log("Tables found: " + table_arr.length);
	// loop through each table and replace with array of rows
	for (let i = 0; i < table_arr.length; i++) {
		/*
		=================================
		Create initial 2d array of rows -> cells without factoring in rowspan
		=================================
		*/
		let init_row_arr = match_with_empty(table_arr[i], /<tr( [^>]*)*>(.|\n)*?<\/tr>/g);
		// record maximum number of cols in the table
		let max_cols = 0;
		// loop through each row and replace with array of cells
		for (let j = 0; j < init_row_arr.length; j++) {
			let curr_row = init_row_arr[j];
			// - add extra cells for colspan first:
			// 1. add markers for colspan and rowspan values after cells
			// (note that the marker is followed by an extra space to prevent confusion with spans of more than 1 digit)
			curr_row = curr_row.replaceAll(/(<t[hd]( [^>]*)*colspan *= *['"]([0-9]+)['"]( [^>]*)*>(.|\n)*?<\/t[hd]>)/g, "$1COLSPAN$3 ");
			curr_row = curr_row.replaceAll(/(<t[hd]( [^>]*)*rowspan *= *['"]([0-9]+)['"]( [^>]*)*>(.|\n)*?<\/t[hd]>)/g, "$1ROWSPAN$3 ");
			// 2. get array of markers for colspans
			const span_marker = />(ROWSPAN[0-9]+ )*COLSPAN([0-9]+) /g
			let colspan_marker_arr = match_with_empty(curr_row, span_marker);
			// 3. loop through each marker and replace it with appropriate number of extra cells
			for (let k = 0; k < colspan_marker_arr.length; k++) {
				let curr_marker = colspan_marker_arr[k];
				let row_span_val = curr_marker.replace(span_marker, "$1");
				let extra_cell = extra_colspan_cell + row_span_val;
				let colspan_num = parseInt(curr_marker.replace(span_marker, "$2"));
				curr_row = curr_row.replaceAll(curr_marker, ">" + extra_cell.repeat(colspan_num - 1));
			}
			// get array of cells and set the row array to it
			let cell_arr = match_with_empty(curr_row, /<t[hd]( [^>]*)*>(.|\n)*?<\/t[hd]>/g);
			init_row_arr[j] = cell_arr;
			// update max_col if need be
			if (cell_arr.length > max_cols) {
				max_cols = cell_arr.length;
			}
		}
		/*
		=================================
		Create 2d matrix of rows -> cells with rowspan
		=================================
		*/
		// initialize matrix with blank values, of same row # as init_row_arr and col # of max_cols
		let row_arr = [];
		for (let j = 0; j < init_row_arr.length; j++) {
			let col_arr = [];
			for (let j = 0; j < max_cols; j++) {
				col_arr.push("");
			}
			row_arr.push(col_arr);
		}
		console.log(row_arr);
	}
	return table_arr;
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

