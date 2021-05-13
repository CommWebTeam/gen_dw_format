# HTML table formatting
Provides WET-related options for formatting cells in the specified rows and columns of the specified tables in an HTML document.

[Click here to access the table formatter.](https://commwebteam.github.io/gen_dw_format/table_formatter/format_table.html)

## Inputs

The inputs are as follows:
- the file for an HTML document with tables.
- the tables to edit:
    - a selection for which tables to edit, which can be one of the following:
        1. "Only the listed tables"
        2. "All tables except those listed"
        3. "All tables"
    - If option 1 or 2 is selected above, you will have to fill in the textbox with the comma-separated values of the indices for the tables to include / exclude. These are the positions the tables appear in from the start of the document, beginning at 0.
        - For example, if you want to exclude the first 2 tables, then you would select "all tables excluding the following", and enter "0,1" into the textbox.
- the rows to edit:
    - a selection for which rows to perform the actions on, which can be one of the following:
        1. "Only the listed rows"
        2. "All rows except those listed"
        3. "All rows"
    - If option 1 or 2 is selected above, you will have to fill in the textbox with the comma-separated values of the indices for which rows to include / exclude. These are the positions the rows appear in from the start or end of the table, depending on the direction selected below, beginning at 0.
    - the direction to read the table in for the row indices provided above. If "top to bottom" is selected, then the rows are read in their regular order; the first row is at index 0, the second row is at index 1, and so on. If "bottom to top" is selected, then they are read in reverse order instead; the last row is at index 0, the second last row is at index 1, and so on.
- the columns to edit, formatted in the same way as the rows to edit. Note that only cells that are part of both the specified rows and columns will be edited. For example, if only row 0 and column 0 is specified, then (0,0) will be the only cell that is edited.
- the actions to apply and how to apply them:
    - actions to apply on a cell. So far, the following actions have been implemented:
        - convert the cell to a header (change td to th) with a scope of "col" or "row". If the scope is "col" and the cell also has a colspan attribute, then the scope is changed to "colgroup".
        - append the cell contents to the caption, then remove the cell by changing it to &lt;td class="background-light">&lt;/td>.
        - remove specific tags from the cell (e.g. "&lt;p>" tags).
        - convert the cell to a specific class (e.g. "osfi-txt--bold" or "text-left").
    - actions to set or change the location of thead/tbody/tfoot in terms of index:
        - insert an opening thead, tbody, or tfoot tag at the first row index provided above, and the corresponding closing tag at the second row index provided above. For example, inserting the opening thead at row index 0 means placing it before all tr tags (rows). Only the first two row indices given are used. Since thead/tbody/tfoot are only used to group rows, the column indices given above are ignored.
    - actions that check for and edit tags outside of the tables. These actions are only applied once per table and do not pay attention to cell index; as such, they only use the table inputs above, ignoring the row/column inputs.
        - remove the div surrounding a table, either immediately surrounding the table or separated by &lt;br>.
        - append the paragraph or header preceding a table, either immediately above the table or separated by &lt;br>, to the table's caption.
        - prepend the div following a table, either immediately below the table or separated by &lt;br>, to the table's tfoot.
        - put the WET footnotes immediately following a table into a WET div module, and then run the above action.
        - format an OCA table, and the paragraphs for OCA footnotes immediately following the table, into WET footnotes, and then run the above action.
            - Note that for the last two checks, the WET structure is in English. To translate it to French, you can use the [general Dreamweaver formatting tool](https://commwebteam.github.io/gen_dw_format/dreamweaver_paste_formatter/format_dw_paste.html).

### Running the tool multiple times

If you would like to perform actions across varying rows/columns, dimensions, or tables in a single document, you can chain the actions together by using the output from one run of the tool as the input for another. For example, if you want to:
- convert the first row of all tables to th
- add the align-left class to the last two columns of all tables
- add the osfi-txt--bold class to the last row of only the first table

Then you could just run the tool three times, using the output of the first run as the input for the second run, and the output of the second run as the input for the third.

The tool increments the name of the output file from "formatted_tables" to "formatted_tables_0" to "formatted_tables_1" and so on, in case it needs to be run multiple times, to keep track of how many times it has been run. 

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

This tool makes some assumptions about the HTML document's formatting when reading the tables into an array. Some major assumptions are as follows (this is NOT a comprehensive list):
- the document structure is valid HTML and XML.
- there are no nested tables.
- all tables are rectangular after factoring in colspan and rowspan.
- each table has at most one caption.
- the only tags in a table that aren't contained within cells (td or th tags) are tr, caption, thead, tbody, and tfoot tags.
- there are at most one of each of the thead, tbody, and tfoot tags per table.
- each cell can only have a scope of "col" or "row", not both. (The check that converts a cell to a header overwrites the existing scope attribute.)

## Adding actions

The process to add an action is as follows:
1. In table_formatter.html: Add the action as an option under "Actions to perform".
2. In table_format_helpers.js:
    - At the bottom of the script, create a helper function for the action.
    - In format_table(), refer to the new helper function when the action is selected.
3. In README.md (this file): If necessary, add a mention of the action to the Inputs section at the beginning of the document.

### Helper functions for actions

Helper functions for each action are placed at the bottom of table_format_helpers.js.

Feel free to add more sections if an action does not neatly belong in one of the following categories.

#### Actions applied by cell

Most of the actions are to edit individual cells, so they are in the **Functions for actions to be applied on the cell of a table in the table array** section.

Each of these action functions should take in the following as input:
- a single table array representing the current table (i.e. one index in the overall array of tables)
- the current row of the cell to work with
- the current column of the cell to work with

These action functions should return the table array given in the first input, but with the cell value changed.

Each of these functions is called using the **apply_on_cells()** function, which loops through each cell of each table to apply the action function on, and calls the action function on the cell.

#### Actions for setting thead/tbody/tfoot

These actions are in the **Function for actions to be applied on thead/tbody/tfoot row index for a table in the table array** section. They just set the locations of the opening and closing thead/tbody/tfoot tags relative to the table rows using the **set_t_inds()** function. Since doing this only needs two row indices, one for the row of the opening tag and one for the row of the closing tag, set_t_inds() does not require as many arguments as apply_on_cells().

#### Actions involving tags immediately outside of the table

These actions are in the **Functions that involve tags outside of the table** section. They require both the original html document and the table array. As such, in format_table(), the table array edits are implemented twice: once into the original html document before running these functions so that the html document is up to date, and once after running them to implement their changes.

For consistency, I have tried to format these action functions as so:
- They take in the html document as the 1st input, the table array as the 2nd input, and the list of tables to edit as the 3rd/4th inputs.
- They apply their edits to the table itself only through the table array, not the html document.
- They apply their edits to tags outside of the table through the html document.
- They return an array of two items, the 1st being the edited html document and the 2nd being the table array.
