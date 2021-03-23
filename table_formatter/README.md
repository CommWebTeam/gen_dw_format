# HTML table formatting
Provides WET-related options for formatting cells in the specified rows or columns of the specified tables in an HTML document.

[HTML page of tool here.](table_formatter.html)

## Inputs

The inputs are as follows:
- the file for an HTML document with tables.
- the tables to edit:
    - a selection for which tables to edit, which can be one of the following:
        1. "only the tables listed below".
        2. "all tables excluding those listed below"
        3. "all tables"
    - If option 1 or 2 is selected above, you will have to fill in the textbox with the comma-separated values of the indices for the tables to include / exclude. These are the positions the tables appear in from the start of the document, beginning at 0. For example, if you want to exclude the first 2 tables, then you would select "all tables excluding the following", and enter "0,1" into the textbox.
- the action to perform on a cell:
    - the type of action. So far, the following actions have been implemented:
        1. convert the cell to a header (td to th)
        2. convert the cell to bold (add the class "osfi-txt--bold").
        2. add the cell contents to the caption, then remove the cell.
    - the table dimension to perform the action on, which can be rows or columns.
    - the direction to read the table in. If "top to bottom" is selected, then the rows or columns are read in their regular order; the first row/column is at index 0, the second row/column is at index 1, and so on. If "bottom to top" is selected, then they are read in reverse order instead; the last row/column is at index 0, the second last row/column is at index 1, and so on.
    - a textbox filled in with the comma-separated values of the indices for which rows or columns to apply the action on. As with the earlier textbox, this is the position the row or column appears in from the start or end of the table, depending on the direction selected above, beginning at 0.

If you would like to perform multiple actions on a single document, you can chain the actions together by using the output from one run of the tool as the input for another. The tool increments the name of the output file from "formatted_tables" to "formatted_tables_0" to "formatted_tables_1" and so on in case it needs to be run multiple times.

## Implementation details

The tables in the HTML document are stored in an array. Each table is an object containing the following properties:
- attr: the table tag itself, including its attributes.
- caption: the caption tag for the table, an empty string if there is no caption.
- rows: an array of the table's rows.

Each row in the array of rows contains the following properties:
- attr: the tr tag itself, including its attributes.
- cells: an array of the row's cells.

This makes the overall array a triple nested array, e.g.
- [Table One: Caption, [Row 1: [Cell 1a, Cell 2a], Row 2: [Cell 2a, Cell 2b]], 
- Table Two: Caption, [Row 1: [Cell 1a]],
- Table Three: ...]

Each table array accounts for rowspan and colspan. For example, suppose that in the 2nd row, (2, y), the 1st cell spans three columns, so (2, 1) contains a value, but (2, 2) and (2, 3) are just spans of (2, 1). Then, if you apply a function on the 3rd column, (x, 3), the function will see that the 3rd column in the 2nd row (2, 3) is just a placeholder, so it will NOT edit any cells in the 2nd row.

### Assumptions

This tool makes some assumptions about the HTML document's formatting when reading the tables into an array. Some major assumptions are as follows:
- there are no nested tables.
- there is only a single caption, located right before the opening &lt;table> tag.

## Adding actions

Functions for actions are at the bottom of table_format_helpers.js. Each function should take in the following as input:
- a single table array representing the current table (i.e. one index in the overall array of tables)
- the current row of the cell to work with
- the current column of the cell to work with

The function should return the array of tables.
