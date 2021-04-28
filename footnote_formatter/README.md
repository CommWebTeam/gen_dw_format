# WET Footnote formatter

To conform a document's footnotes to WET standards, the footnotes should be formatted as follows:
1. The footnote markers should follow WET formatting.
2. The footnote text should be put into WET modules. For consistency, we put all of the footnote text into a single **div class="wet-boew-footnotes" role="note"** module at the end of the document or section that the footnotes encompass.
3. The entry for each footnote in the footnote module should follow WET formatting.

This tool aims to use the input regex statements to find footnotes in the document and format them to WET standards. It numbers the footnotes using an internal counter beginning at 1.

[HTML page of tool here.](footnote_gen.html)

# Inputs

## Starting and ending lines

This tool assumes by default that all footnotes in the input html document should be put into a single module. If this is not the case, e.g. if individual tables should have their footnotes in their own modules, then you can choose the starting and ending lines of the document (beginning at index 0, meaning the first line of the document is on line 0) to run the tool on. For example, if a table is from lines 60 to 100 and the following three paragraphs, each of which is one line, describe the table footnotes, then you can enter 60 as the starting line and 103 as the ending line.

## Footnote ID

This is the initial string that begins all footnote links, by default "fnb". For example, "fnb" would label the first top footnote marker as follows:

&lt;sup id="fnb1-ref">&lt;a class="footnote-link" href="#fnb1">&lt;span class="wb-invisible">Footnote &lt;/span>1&lt;/a>&lt;/sup>

## Top and bottom footnotes

**Top footnotes** refers to the footnote markers in the main body of the text. **Bottom footnotes** refers to the module containing the text for the footnotes, which we put at the end of the document.

The default regex statements for these inputs are to find existing English WET footnotes, which is useful for renumbering the footnotes in a cleaned document after any footnotes have been added or removed.

I have included the option to set these regex statements to some common footnote formats, including English/French WET footnotes and Dreamweaver-generated footnotes.

The "group containing content" input for the bottom footnote regex is to indicate which group - subexpression in () - contains the footnote text; the tool will access this with $ to create the bottom module. All provided bottom footnote formats use group 1 (meaning the footnote text is accessed with $1).

You can view the number of top and bottom footnotes found by the regex statements in the console (ctrl+shift+i). These should be the same unless you have duplicate top footnotes (see below). If the number of top and bottom footnotes don't match up after considering duplicates, then you should fix the regex statements to catch all the required markers/footnote text.

## Duplicate top footnotes

You can include which top footnote markers should be duplicated - that is, when multiple top footnote markers point to the same bottom footnote text. The internal counter will not increment for these footnote markers.

These markers should be formatted in comma-separated pairs, with each pair separated by semicolons, like so:

index,value;index,value;...

where the index is the footnote marker's position from the top, and the value is whichever bottom footnote it should point to.

For example, with the following input:

4,3;5,3;10,1
- The 4th footnote marker in the main body would point to the 3rd footnote text in the bottom module.
- The 5th footnote marker in the main body would point to the 3rd footnote text in the bottom module.
- The 10th footnote marker in the main body would point to the 1st footnote text in the bottom module.
