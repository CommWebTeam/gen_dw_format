# HTML table formatting
Provides WET-related options for formatting cells in the specified rows or columns of the specified tables in an HTML document.

[HTML page of tool here.](table_formatter.html)

## Inputs

The inputs are as follows:
- the file for an HTML document with tables.
- the tables to edit:
- - a selection for which tables to edit, which can be 1. "all tables", 2. "all tables excluding the following", or 3. "only the following tables".
- - If option 2 or 3 is selected above, you will have to fill in the textbox with the comma-separated values of the indices for the tables to include / exclude. These are the positions the tables appear in from the start of the document, beginning at 0. For example, if you want to exclude the first 2 tables, then you would select "all tables excluding the following", and enter "0,1" into the textbox.
- the rows and columns to edit:
- - a selection for which type of edit to perform.
- - a textbox filled in with the comma-separated values of the indices for which rows or columns, depending on the selection for the type of edit, to apply the edits on. As with the earlier textbox, this is the position the row or column appears in from the start of the table, beginning at 0.

If you would like to perform multiple types of edits on a single document, you can chain the edits together by using the output from one run of the tool as the input for another. The tool increments the name of the output file from "formatted_tables" to "formatted_tables_0" to "formatted_tables_1" and so on in case it needs to be run multiple times.

## Implementation details

The tables in the HTML document are stored in an array. Each table in this array of tables contains an array of its rows; and each row in this array of rows contains an array of its cells, making the overall array a triple nested array:
- [Table One: [Row 1: [Cell 1a, Cell 2a], Row 2: [Cell 2a, Cell 2b]], Table Two: ...]

This array accounts for rowspan and colspan. For example, suppose that in the 2nd row, the 1st cell spans three columns, so [2, 1] contains a value, but [2, 2] and [2, 3] are just spans of [2, 1]. Then, if you apply a function on the 3rd column, [x, 3], the function will see that the 3rd column in the 2nd row [2, 3] is just a placeholder, so it will NOT edit any cells in the 2nd row.

This tool makes some assumptions about the HTML document's formatting when reading the tables into an array. Currently, it does not account for nested tables.
