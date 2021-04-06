# Dreamweaver Table of Contents Formatting

Formats Dreamweaver table of contents tables and adds their links to the main body following WET.

I'm considering integrating this with the Dreamweaver paste formatting tool, but I haven't yet because unlike the currently pretty safe checks in that tool, this tool is likely to introduce HTML structural errors. Also, the code itself is a lot more involved than other checks.

[HTML page of tool here.](toc_format.html)

Different Word documents produce very different content structures when pasted into Dreamweaver; I've tried to go through a few different cases and work out some patterns, but the inconsistency here means that this tool may not be generally reliable - be sure to double check the output and click through the table of contents links to check that they work.

## Inputs

1. How the Dreamweaver table of contents is structured, i.e. which entry separators are used.  The following have been implemented so far:
    - All entries are placed into a single &lt;p> tag, and each entry is separated by &lt;br/> or &lt;br>, e.g.
        - &lt;p>Entry 1 &lt;br>
        - Entry 2 &lt;br>
        - Entry 3 &lt;&lt;/p>
    - All entries are placed into a single &lt;ul> tag, and each entry is its own &lt;li> element, e.g.
        - &lt;ul>
            - &lt;li>Entry 1&lt;/li>
            - &lt;li>Entry 2&lt;/li>
            - &lt;li>Entry 3&lt;/li>
        - &lt;/ul>
2. Inputs for where the table of contents is located in the document.
    - This can optionally consist of two inputs explicitly indicating which line the table of contents starts on, and which it ends on.
        - These should start at index 0, i.e. the first line in the document is 0, the second line is 1, and so on.
        - These should include the entire encompassing structure of the Dreamweaver-formatted table of contents, including the div tag that Dreamweaver usually puts the table into. Everything between these two lines, inclusive, will be removed and replaced with a WET-formatted div for the updated table of contents, so include all surrounding lines that you do not want to appear in the cleaned document.
    - From what I have seen, Dreamweaver usually formats the table of contents tables to be surrounded by two lines that consist of &lt;br clear="all">. So if the start/end lines are not provided, then the tool searches for a block of text between two &lt;br clear="all"> that contains at least two instances of entry separators (described in the first input).
3. How the tool should attempt to indent the output WET-formatted table of contents, decide header tag level, and generate IDs. The options are as follows:
    - use existing list numberings from the document (explanation [#list-numbering](in this section)).
    - use manually inserted list numberings (differences from using existing list numberings explained [#manual-list-numbering](in this section)).
    - use existing indentation in the table. This is only helpful if the Dreamweaver table is formatted as a list, as described in the first input.
4.  The list type for the output WET-formatted table of contents. For example, if &lt;ol list-numeric> is selected, then the WET table of contents might be formatted as so:
    - &lt;ol class="list-numeric">
        - &lt;li>Entry 1
        - &lt;ol class="list-numeric">
            - &lt;li>Entry 2&lt;/li>
            - &lt;li>Entry 3&lt;/li>
        - &lt;/ol>&lt;/li>
    - &lt;/ol>
5. The option for whether to remove table of contents page numbers from entries, such as in the following:
    - Entry ........ 5

## Details

This tool does two things:
1. It formats the table containing the table of contents to fit WET standards. This includes adding in the surrounding div.
2. It looks for tags/lines with the same values as the entries in the table of contents, and converts them to header tags containing IDs to be linked to by the table of contents.

Individual entries in a WET table of contents table use this formatting:

&lt;li>&lt;a href="#toc_3.1">3.1 Overview&lt;/a>&lt;/li>

This entry should represent a header in the main document, which should then be linked to in the table of contents entry by ID. For the above entry, there would be the following header later in the document:

&lt;h3 id="toc_3.1">3.1 Overview&lt;/h3>

The table of contents entry contains the link "#toc_3.1", which links to this header with an ID of "toc_3.1".

### Misformatting introduced in step 2

Step 2 is very likely to produce false positives because it replaces *all* tags and lines, except for &lt;li> tags, that have the same value as each table of contents entry. For example, if there is a table of contents entry containing "3.1 Overview", then if there are multiple paragraphs later in the document that consist solely of "3.1 Overview" or "Overview", then all of them will be replaced, even though only one of them can be the actual header.

These false positives will have to be manually fixed afterward. Since the IDs will be duplicated as well, this will show up as an error in the HTML structure (IDs have to be unique), which should make them easier to locate in Dreamweaver.

The tool adds a comment above every tag/line that is replaced which consists of the original value of the line. This is to help with figuring out whether the replaced line was a false positive or not.

&lt;li> tags in particular are ignored by the tool in this step because headers are usually not formatted as list items, so those tags are almost always false positives.

In addition, since the entire tag or line is replaced, the resulting HTML may not be well structured. For example, it may find the following lines:

- &lt;p>Overview&lt;br>
- &amp;nbsp;&lt;/p>

and only replace the first line, resulting in this:

- &lt;h3 id="toc_3.1">3.1 Overview&lt;/h3>
- &amp;nbsp;&lt;/p>

which contains an extra closing p tag. You will likely have to go through and fix any errors with the HTML structure yourself afterwards; the comments containing the original values above the lines that have been replaced should help with this as well.

## Lines for the table of contents

I have noticed that after pasting into Dreamweaver, each line (entry) in a table of contents is split up by &lt;br>. So within the lines of the document that contain the table of contents, I split by &lt;br> to get individual entries.

If this assumption is incorrect, then the tool will not work.

I have also noticed that the table of contents tables are usually surrounded by two lines that consist of &lt;br clear="all">. So if no inputs are provided for the start/end line positions of the table of contents in the HTML document, then the tool searches for a block of text between two &lt;br clear="all"> that contains at least two &lt;br>, and uses that block of text as the table of contents. If this does not properly find the lines of the HTML document that consist of the table of contents, then you should manually enter the start/end line positions instead.

## Header IDs

If the option for list numbering is selected:
- If the table of contents entry contains a list numbering, the header IDs are formatted as "toc_*list numbering*", e.g. "toc_3.0" for "3.0 Overview".
- Otherwise, the header IDs are formatted as "toc_nonum_*internal counter*", e.g. "toc_nonum_1" for "Overview".

If the option for list numbering is not selected, then header IDs are all formatted as "toc_*internal counter*", e,g, "toc_1".

In either case, the internal counter increments at each table of contents entry that uses it, to keep the IDs unique.

## List numbering

List numberings are only checked for if the option to do so is selected. If the option isn't selected, then the table of contents will have no indentation, and all of the headers will default to h3.

Most of the usefulness in the tool comes from its attempt at guessing the hierarchy of the table of contents, which it does using list numberings at the start of each entry. List numberings must be formatted with numbers and periods. The hierarchy of the table of contents is used for two things:
- in step 1 (described [earlier](#details)), to indent the table; and
- in step 2, to decide the level of the header tag being linked to.

For indentation, each entry is compared to the previous entry to see whether it is higher or lower in the hierarchy; a sublist is created if it is higher, and the previous sublist is closed if it is lower.

For the header level, the tool checks how many times a period followed by a number appears in the list numbering. The lowest level is 2, for h2. For example:
- "3" has a level of 2 because it has no periods. It uses a header tag of h2.
- "3.1" has a level of 3 because it has one period followed by a number. It uses a header tag of h3.
- "3.1.2" has a level of 4 because it has two periods followed by numbers. It uses a header tag of h4.
- "3.1.2." also has a level of 4 because the last period is not followed by a number. It uses a header tag of h4.
- "3.1.2.1" has a level of 5. It uses a header tag of h5.

Any initial list numberings are set to be optional in step 2's regex statement that searches for tags/lines consisting of entries. So if a table of contents entry consists of "Overview", both of the following tags would match:
- &lt;p>3.1 Overview&lt;/p>
- &lt;p>Overview&lt;/p>

### Entries without list numbering

For entries that do not have list numberings, the level is set to be to be [the level of the last list numbering that did exist] + 1. If there have been no list numberings so far, then the tool uses a level of 2. The list numbering value itself is set to a blank string, so it will not be included in the entry.

For example, if the table of contents has the following entries:
- Introduction
- 3 Author's note
- 3.0 Overview
- 3.1.1 Definitions
- Value 1
- Value 2
- 3.1.2 Rules

Then the levels would be 2, 2, 3, 4, 5, 5, and 4.

### Manual list numbering

Some documents may not have list numberings, or the list numberings may be misformatted (not formatted with numbers and periods), so the tool wouldn't be able to indent the table of contents or choose header levels properly. In this case, you can manually add the list numberings into the Dreamweaver document after pasting it from Word.

For example, if you had the following table of contents entries:
- Introduction
- Definitions

and you wanted Definitions to be indented one level more than Introductions, then you could manually add in list numberings yourself:
- 1 Introduction
- 1.1 Definitions

If the option to remove manual list numbering is checked, then list numberings will be excluded from table of contents entry text, as well as the headers that replace tags/lines in step 2. So after generating the table of contents links and indentation with the manual list numberings, the table of contents entries would still be formatted as so:
- Introduction
- Definitions

Note that the list numberings will still be included as optional parts of the tag/line search regex used in step 2. 

This option is ignored if the option to use list numberings isn't also selected.

## Tips

- Sometimes, when copying a Word document into Dreamweaver, the page numberings in a table of contents will be copied over as well. You should manually remove them with a find and replace before running this tool, as those page numberings will prevent string matching.
- If there are multiple table of contents (e.g. one for sections and one for tables), you can run the tool multiple times.
- It may be worth running the general Dreamweaver formatting tool on the document first to fix spacing issues that may prevent string matching.
- don't forget to manually fix any structural errors that may result from running this tool on badly formatted documents.
