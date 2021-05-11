# WET Footnote formatter

To conform a document's footnotes to WET standards, the footnotes should be formatted as follows:
1. The footnote markers should follow WET formatting.
2. The footnote text should be put into WET modules. For consistency, we put all of the footnote text into a single **div class="wet-boew-footnotes" role="note"** module at the end of the document or section that the footnotes encompass.
3. The entry for each footnote in the footnote module should follow WET formatting.

[WET footnote documentation here.](https://wet-boew.github.io/wet-boew-legacy/v3.1/docs/ref/footnotes/footnotes-en.html)

This tool aims to use the input regex statements to find footnotes in the document and format them to WET standards. It numbers the footnotes using an internal counter beginning at 1.

[HTML page of tool here.](footnote_gen.html)

# Inputs

## Starting and ending lines

This tool assumes by default that all footnotes in the input html document should be put into a single module. If this is not the case, e.g. if individual tables should have their footnotes in their own modules, then you can choose the starting and ending lines of the document (beginning at index 0, meaning the first line of the document is on line 0) to run the tool on. For example, if a table is from lines 60 to 100 and the following three paragraphs, each of which is one line, describe the table footnotes, then you can enter 60 as the starting line and 103 as the ending line.

When formatting footnotes for a Dreamweaver paste, I recommend **formatting inner footnote subsections first** before formatting outer footnote subsections - for example, formatting the footnotes for a single table before formatting the footnotes for the overall document - to minimize confusion when the tool uses regex statements to find and fix the div formatting that Dreamweaver generates around the bottom footnote text.

## Footnote ID

This is the initial string that begins all footnote links, by default "fnb". For example, "fnb" would label the first English top footnote marker as follows:

&lt;sup id="fnb1-ref">&lt;a class="footnote-link" href="#fnb1">&lt;span class="wb-invisible">Footnote &lt;/span>1&lt;/a>&lt;/sup>

The first bottom footnote would link back to this top footnote accordingly.

WET footnotes by default use "fnb" as the initial string for their ids.

You should only change the footnote ID from the default value if you have multiple sets of footnotes in a document, such as for tables, as doing so will break some of the WET footnote module's functionality. If you do change the footnote IDs, I recommend constructing footnote ids out of numbers, letters, and regular dashes "-", as this is what is assumed by the tool's default regex statements.

## Top and bottom footnotes

These are regex strings to search for footnotes in the current document. The tool replaces the footnotes at these locations with WET footnotes.

**Top footnotes** refers to the footnote markers in the main body of the text. **Bottom footnotes** refers to the module containing the text for the footnotes, which we put at the end of the document.

The default regex statements for these inputs are to find existing English WET footnotes, which is useful for renumbering the footnotes in a cleaned document after any footnotes have been added or removed.

I have included the option to set these regex statements to some common footnote formats, including English/French WET footnotes and Dreamweaver-generated footnotes.

The "group containing content" input for the bottom footnote regex is to indicate which regex group - subexpression in () - contains the footnote text. All provided bottom footnote formats use group 1 (meaning the footnote text is accessed with $1).

### Extra steps

Note that WET footnotes and Dreamweaver footnotes are the two primary use cases, and you may have to manually format the results afterwards for other cases. For example, for the OCA table regex statements provided, you will have to additionally do the following:

1. Add a WET div module around the bottom footnotes, which currently has no div around it at all.
2. Move the WET div module into the tfoot of the table.
3. Change the link text to reflect that these are table footnotes:
    - The top footnotes should have <span style="color:green">&lt;span class="wb-invisible">Table Footnote &lt;/span></span> instead of <span style="color:red">&lt;span class="wb-invisible">Footnote &lt;/span></span>.
    - The bottom footnotes should have <span style="color:green">&lt;span class="wb-invisible">Return to table footnote &lt;/span></span> instead of <span style="color:red">&lt;span class="wb-invisible">Return to footnote &lt;/span></span>.

(I have chosen not to code the above steps because I don't think the OCA table case is actually very common.)

### Debugging

You can view the number of top and bottom footnotes found by the regex statements in the console (ctrl+shift+i). These should be the same unless you have duplicate top footnotes (see below). If the number of top and bottom footnotes don't match up after considering duplicates, then you should fix the regex statements to catch all the required markers/footnote text.

## Language

Whether you want the WET footnote structure to be in English or French.

## Duplicate top footnotes

You can include which top footnote markers should be duplicated - that is, when multiple top footnote markers point to the same bottom footnote text. The internal counter will not increment for these footnote markers.

These markers should be formatted in comma-separated pairs, with each pair separated by semicolons, like so:

top footnote location,bottom footnote location;top footnote location,bottom footnote location;...

where
- "top footnote location" is the top footnote's position from the beginning of the document relative to all the top footnotes, beginning at 1;
- similarly, "bottom footnote location" is the bottom footnote's position from the beginning of the bottom footnote div, beginning at 1.

For example, with the following input:

4,3;5,3;10,1
- The 4th footnote marker in the main body would point to the 3rd footnote text in the bottom module.
- The 5th footnote marker in the main body would point to the 3rd footnote text in the bottom module.
- The 7th footnote marker in the main body would point to the 1st footnote text in the bottom module.

### Duplicate top footnote IDs

Duplicate top footnote IDs do not increment the footnote number counter. Instead, they have a letter appended to their ID. In the above example, the top footnote IDs would be:
- fnb1a
- fnb2
- fnb3a
- fnb3b
- fnb3c
- fnb4
- fnb1b

The WET table of contents module allows the "Return to Footnote" link in a bottom footnote to return to the last corresponding top footnote accessed. For example, if top footnote fnb3b (the 4th footnote marker) was used to jump to the 3rd bottom footnote, then clicking "Return to Footnote 3" in the 3rd bottom footnote will return to fnb3b instead of fnb3a.

# Implementation details

The tool formats footnotes using the following steps:

1. **add_footnotes()** - Extract the lines to check for footnotes on (this is the entire document if the line inputs aren't included).
2. **replace_footnote_str()** - Count the number of matches for both the top footnote regex and the bottom footnote regex.
3.  **replace_footnote_str()** - Loop through the list of strings that match the bottom footnote regex, and reformat them to follow WET syntax.
     - To number them, use the internal counter of the loop (from 1 to the number of footnotes).
4.  **replace_footnote_str()** - Loop through the list of strings that match the top footnote regex, and reformat them to follow WET syntax.
    - **get_footnote_nums()** - Number them using the list of duplicate top footnotes; for the rest of the footnotes, use the internal counter, starting at 1, and incrementing on values that are not duplicate top footnotes.
5. **add_footnote_div()** - To fix the incorrect bottom footnote div formatting that Dreamweaver uses, find a div statement whose first item is &lt;dt>Footnote 1&lt;/dt> (indicating the first WET-formatted bottom footnote), and replace it with the opening WET bottom footnote module syntax. Then, find the closing div whose last item is &lt;/dd> (indicating a closing WET-formatted bottom footnote), and replace it with the closing WET bottom footnote module syntax.
6. **add_consecutive_commas()** - Add commas between consecutive top footnotes.
7. **translate_footnotes()** - If the document language is French, translate footnote structure strings to their French equivalents.
8. **add_footnotes()** - Replace the original lines in the document with the edited lines.
