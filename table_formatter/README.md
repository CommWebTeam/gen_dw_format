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
        - convert the cell to a header (td to th).
        - append the cell contents to the caption, then remove the cell.
        - convert the cell to a specific class (e.g. "osfi-txt--bold" or "align-left").
        - remove p tags from the cell.
        - append the preceding paragraph, either immediately above a table or separated by &lt;br>, to its caption. This action ignores cells completely and only uses the table inputs above, as it is only applied once per table, so the next three inputs are ignored.
    - the table dimension to perform the action on, which can be rows or columns.
    - a textbox filled in with the comma-separated values of the indices for which rows or columns to apply the action on. As with the earlier textbox, this is the position the row or column appears in from the start or end of the table, depending on the direction selected below, beginning at 0.
    - the direction to read the table in. If "top to bottom" is selected, then the rows or columns are read in their regular order; the first row/column is at index 0, the second row/column is at index 1, and so on. If "bottom to top" is selected, then they are read in reverse order instead; the last row/column is at index 0, the second last row/column is at index 1, and so on.

If you would like to perform multiple actions on a single document, you can chain the actions together by using the output from one run of the tool as the input for another. The tool increments the name of the output file from "formatted_tables" to "formatted_tables_0" to "formatted_tables_1" and so on in case it needs to be run multiple times.

## Implementation details

The tables in the HTML document are stored in an array. Each table is an object containing the following properties:
- attr: a string for the table tag itself, including its attributes.
    - example: '&lt;table style="width:400px">'
- caption: a string for the caption tag for the table, an empty string if there is no caption.
    - example: '&lt;caption>Caption text here.&lt;/caption>'
- thead: an object containing the following properties:
    - attr: a string for the thead tag itself, including its attributes.
        - example: '&lt;thead>'
    - open_tag_ind: an integer for the row index that the opening &lt;thead tag appears at (i.e. the number of tr tags before thead); -1 if it doesn't exist.
        - example: if &lt;thead is before any &lt;tr tags, then the index is 0.
    - close_tag_ind: an integer for the row index that the closing &lt;/thead tag appears at; -1 if it doesn't exist.
        - example: if there are 5 &lt;tr rows from &lt;table to &lt;/thead, then the index is 5.
- tbody: an object with the same properties as thead, but for tbody tags.
- tfoot: an object with the same properties as thead, but for tfoot tags.
- rows: an array of the table's rows. Each row in the array of rows is an object containing the following properties:
    - attr: a string for the tr tag itself, including its attributes.
        - example: '&lt;tr style="width:400px">'
    - cells: an array of the row's cells.
        - example: ['&lt;th>Header cell&lt;/th>', '&lt;td>Content cell 1&lt;/td>', '&lt;td>Content cell 2&lt;/td>']

This makes the overall array of tables -> rows -> cells a triple nested array, e.g. a single array might be represented as so:
- [Table One: caption / thead / tbody / tfoot, [Row 1: [Cell 1a, Cell 2a], Row 2: [Cell 2a, Cell 2b]], 
-  Table Two: caption / thead / tbody / tfoot, [Row 1: [Cell 1a]],
-  Table Three: ...]

Each table array accounts for rowspan and colspan. For example, suppose that in the 2nd row, (2, y), the 1st cell spans three columns, so (2, 1) contains a value, but (2, 2) and (2, 3) are just spans of (2, 1). Then, if you apply a function on the 3rd column, (x, 3), the function will see that the 3rd column in the 2nd row (2, 3) is just a placeholder, so it will NOT edit any cells in the 2nd row.

New captions are inserted immediately after the opening &lt;table> tag where applicable.

### Assumptions

This tool makes some assumptions about the HTML document's formatting when reading the tables into an array. Some major assumptions are as follows:
- the document structure is valid HTML and XML.
- there are no nested tables.
- each table has at most one caption.
- the only tags in a table that aren't contained within cells (td or th tags) are tr, caption, thead, tbody, and tfoot tags.
- there are at most one of each of thead, tbody, and tfoot tags per table.

## Adding actions

The process to add an action is as follows:
1. In table_formatter.html: Add the action as an option for "Action to perform".
2. In table_format_helpers.js:
    - Create a helper function for the action at the bottom of the script.
    - Refer to the new helper function when the action is selected in format_table().
3. In README.md (this file): If necessary, add a mention of the action in the Inputs section.

### Helper functions

Helper functions for actions are placed at the bottom of table_format_helpers.js. They are referred to in the top level function, format_table().

Each action function should take in the following as input:
- a single table array representing the current table (i.e. one index in the overall array of tables)
- the current row of the cell to work with
- the current column of the cell to work with

The function should return the array of the table.

The action for **appending the preceding paragraph above a table to its caption** is implemented differently from the other actions because it uses code from outside of the tables. It does not use the table array used for other actions.
