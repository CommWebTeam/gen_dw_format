# WET Footnote formatter

WET footnote formatting requires two things:
1. The footnote markers should follow WET formatting.
2. The footnote text should be put into WET modules. For consistency, we put all of the footnote text into a single **div class="wet-boew-footnotes" role="note"** module at the end of the document. In addition, the entry for each footnote in this module should follow WET formatting.

This tool aims to use the input regex statements to find footnotes in the document and format them to WET standards. It numbers the footnotes using an internal counter.

[HTML document here.](footnote_gen.html)

# Inputs

This tool assumes all footnotes in the document should be put into a single module. If this is not the case, e.g. if individual tables should have their footnotes in their own modules, then the piece of html with its own footnote module, such as the table, should be separated into its own input document.

## Top and bottom footnotes

**Top footnotes** refers to the footnote markers in the main body of the text. **Bottom footnotes** refers to the module containing the text for the footnotes which we put at the end of the document.

The default regex statements for these inputs are to find existing WET footnotes, which is useful for renumbering the footnotes in a cleaned document after any footnotes are added or removed.

Here are some regex statements for [top footnote formats](top_footnote_formats.txt) and [bottom footnote formats](bottom_footnote_formats.txt). Make sure not to accidentally copy surrounding spacing or newlines when using these regex statements. These include the regex statements to find Dreamweaver-formatted footnotes to format a Dreamweaver paste's footnotes from scratch. 

The "group containing content" input for the bottom footnote regex is to indicate which group - subexpression in () - contains the footnote text; the tool will access this with $ to create the bottom module. All formats in the link above use group 1 (meaning the footnote text is accessed with $1).

## Duplicate top footnotes

You can include which top footnote markers should be duplicated - that is, when multiple top footnote markers point to the same bottom footnote text. The internal counter will skip these footnote markers.

These markers should be formatted in comma-separated pairs, with each pair separated by semicolons, like so:

index,value;index,value;...

where the index is the footnote marker's position from the top, and the value is whichever bottom footnote it should point to.

For example, with the following input:

4,3;5,3;10,1
- The 4th footnote marker in the main body would point to the 3rd footnote text in the bottom module.
- The 5th footnote marker in the main body would point to the 3rd footnote text in the bottom module.
- The 10th footnote marker in the main body would point to the 1st footnote text in the bottom module.
