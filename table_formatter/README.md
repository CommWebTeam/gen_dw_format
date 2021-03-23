# HTML table formatting
Provides WET-related options for formatting cells in the specified rows or columns of the specified tables in an HTML document.

[HTML page of tool here.](table_formatter.html)

## Inputs

The inputs are as follows:
- the file for an HTML document with tables.
- the tables to edit:
    - a selection for which tables to edit, which can be one of the following:
        1. "all tables excluding those listed below"
        2. "only the tables listed below".
        3. "all tables"
    - If option 1 or 2 is selected above, you will have to fill in the textbox with the comma-separated values of the indices for the tables to include / exclude. These are the positions the tables appear in from the start of the document, beginning at 0. For example, if you want to exclude the first 2 tables, then you would select "all tables excluding the following", and enter "0,1" into the textbox.
- the action to perform:
    - the type of action. Currently, the following two actions have been implemented:
        1. converting to headers (td to th)
        2. converting to bold (adding the class "osfi-txt--bold").
    - the table dimension to perform the action on, which can be rows or columns.
    - the direction to read the table in. If "top to bottom" is selected, then the rows or columns are read in their regular order; the first row/column is at index 0, the second row/column is at index 1, and so on. If "bottom to top" is selected, then they are read in reverse order instead; the last row/column is at index 0, the second last row/column is at index 1, and so on.
    - a textbox filled in with the comma-separated values of the indices for which rows or columns to apply the action on. As with the earlier textbox, this is the position the row or column appears in from the start or end of the table, depending on the direction selected above, beginning at 0.

If you would like to perform multiple actions on a single document, you can chain the actions together by using the output from one run of the tool as the input for another. The tool increments the name of the output file from "formatted_tables" to "formatted_tables_0" to "formatted_tables_1" and so on in case it needs to be run multiple times.

## Implementation details

The tables in the HTML document are stored in an array. Each table in this array of tables contains an array of its rows. Each row in this array of rows contains an array of its cells, making the overall array a triple nested array:
- [Table One: [Row 1: [Cell 1a, Cell 2a], Row 2: [Cell 2a, Cell 2b]], Table Two: ...]

This array accounts for rowspan and colspan. For example, suppose that in the 2nd row, the 1st cell spans three columns, so [2, 1] contains a value, but [2, 2] and [2, 3] are just spans of [2, 1]. Then, if you apply a function on the 3rd column, [x, 3], the function will see that the 3rd column in the 2nd row [2, 3] is just a placeholder, so it will NOT edit any cells in the 2nd row.

This tool makes some assumptions about the HTML document's formatting when reading the tables into an array. Currently, it does not account for nested tables.
