# Initial formatting for Dreamweaver pastes
Performs some basic string formatting on the HTML documents generated by pasting Word documents into Dreamweaver to help conform the documents to WCAG/WET standards. It assumes proper indentation (in Dreamweaver, you can generate this with Edit -> Code -> Apply Source Formatting).

[HTML document here.](basic_format.html)

The current formatting checks are as follows (the user can select which to apply):

- removes the referential links that Dreamweaver generates (which don't properly function).
- removes the table of contents links that Dreamweaver generates (which don't properly function).
- removes the French logiterms that Dreamweaver generates (which don't properly function).

- makes all space hexcodes consistent by converting invisible non-breaking spaces (where it just looks like a regular space in the editor) into regular spaces.
- replaces all multispaces with single spaces. You should apply source formatting in Dreamweaver to fix indentation if you include this check.
- removes empty attribute-less tags, and replaces all attribute-less tags that consist solely of spaces or nbsp; with a single regular space.

- replaces Word's fancy quotes with regular quotes.
- replaces the HTML entities for fancy quotes rsquo, lsquo, rdquo, and ldquo with regular quotes.
- replaces Word's em dashes with regular dashes.

- changes em tags to cite tags on lines that have links. If a line contains the "a" tag, then all em tags on the same line are changed to cite tags.
- changes all em tags to cite tags.
- changes all em tags to span class="osfi-txt--italic" tags. (The above two checks take precedence.)
- changes all em tags to i tags. (The above three checks take precedence.)
- changes all strong tags to span class="osfi-txt--bold" tags.
- changes all strong tags to b tags. (The above check takes precedence.)

The above six checks take precedence in the given order. For example, if both "change em tags to cite tags on lines that have links" and "change all em tags to i tags" are checked, then the first check will take precedence. So on lines that have links, em tags will be changed to cite tags, and on other lines without links, em tags will be changed to i tags.

- joins consecutive em and strong tags that are only separated by spaces into a single tag.
- joins consecutive lists (back-to-back ol tags or back-to-back ul tags) into a single list.

- ensures that internal links to the OSFI website are relative by removing the OSFI main page from the URL, and adds rel=external to external links. This ignores links that have keywords indicating footnotes, table of contents, already existing internal links, or email addresses.
- replaces Dreamweaver-generated center and right alignment (looks like align="center" or align="right") with their respective WET classes.
- removes attributes from p (paragraph) tags.
- replaces the formatting for Dreamweaver-generated footnotes with WET footnotes. This uses helper functions from the footnote_formatter tool.

- removes attributes from table, th, and tr tags, and removes attributes from td tags except for colspan and rowspan.

- translates internal links to French by searching for /Eng/ and replacing with /Fra/, and translates the WET footnote structure created by the WET footnote formatting check directly above to French.

- changes strings indicating superscript and subscript tags in the original Word document to be actual tags, and joins these tags together.
- changes strings indicating math tags in the original Word document to be actual tags.

In my implementations, I sometimes split regex statements up into multiple calls for clarity, but a lot of these checks can be done in one or two regex statements.

This is not intended to be an in-depth formatting tool and only covers some basic initial steps.

## Details on changing strings indicating tags to actual tags

### Superscripts and subscripts

For the second last check, the tool looks for the following strings in the html document:
- &amp;lt;sup&amp;gt;, which displays as &lt;sup&gt;
- &amp;lt;sub&amp;gt;, which displays as &lt;sub&gt;

and converts them to tags (so that we have a sup or sub tag in that location instead).

This check is to be used in conjunction with some manual find-and-replace in the original Word document before pasting into Dreamweaver. The idea is that when pasting a Word document into Dreamweaver, it doesn't pay attention to superscripts and subscripts, so you have to manually insert them into Dreamweaver's generated html document. The easiest way to do this involves marking down where these superscripts and subscripts are in the Word document before pasting.

For this tool, you should mark superscripts and subscripts in the Word document with &lt;sup>, &lt;/sup>, &lt;sub>, and &lt;/sub>, as described below.

This tool looks for strings indicating subscript/superscript tags in the html document (where the angle brackets <> have been converted to their html entities by Dreamweaver) and changes them to be actual tags. Afterwards, it joins consecutive sup and sub tags.

#### Steps to mark superscripts and subscripts in Word

1. Open the "replace" box in Word (ctrl+h).
2. Select "More >>" for additional options.
3. Check "Use wildcards". This is a pattern searcher used by Word that is similar to regex.
4. In the "Find what" box, enter ([!(^2)]). This is equivalent to ([^(^2)]) in regex, where ^2 is the character for a footnote/endnote in Word. In other words, we are searching for superscripts that aren't footnotes/endnotes.
5. While in the "Find what" box, select "Format", then "Font".
6. Only check the "Superscript" box. Leave the "Subscript" box unchecked; all other boxes should be filled in, but not checked.
7. Click "OK". You are now searching for superscript text.
8. In the "Replace with" box, enter &lt;sup>\1&lt;/sup>. This is equivalent to &lt;sup>$1&lt;/sup> in regex.
9. While in the "Replace with" box, select "Format", then "Font".
10. Only check the "Superscript" box. Leave the "Subscript" box unchecked; all other boxes should be filled in, but not checked.
11. Click "OK". You are now replacing superscript text.
12. Click "Replace All" to surround all superscripts with &lt;sup> and &lt;/sup>.

Afterwards, repeat these steps for subscripts.

### Mathml

For the last check, the tool looks for the following strings:
- &amp;lt;&ast;math.&ast;?&amp;gt;
- &amp;lt;&ast;mi.&ast;?&amp;gt;
- &amp;lt;&ast;mo.&ast;?&amp;gt;
- &amp;lt;&ast;mn.&ast;?&amp;gt;

and replaces them with actual tags.

Similarly to superscripts/subscripts, you can't copy a Word document with equations into Dreamweaver and have the equations formatted properly (assuming you want them formatted as mathml). Since you need to actually copy the equations one-by-one to have them written out as mathml instead of the default linear format, this is best done with a macro, which can be found [here](https://github.com/CommWebTeam/vba/blob/main/ReplaceMathML.vb). The linked macro replaces equations with their mathml code, which this tool then fixes the tags of once the Word document is pasted into Dreamweaver.

# Dreamweaver Table of Contents Formatting

Formats Dreamweaver table of contents tables and adds their links to the main body following WET.

I'm considering integrating this with the general formatting tool, but I haven't yet because it may introduce HTML structural errors, and the code itself is a lot more involved than other checks.

[HTML document here.](table_of_contents_formatter/toc_format.html)

Different Word documents produce very different content structures when pasted into Dreamweaver; I've tried to go through a few different cases and work out some patterns, but the inconsistency here means that this tool may not be generally reliable - be sure to double check the output and click through the table of contents links to check that they work.

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

For table of contents entries that do not have list numberings, the tool sets the level to be [the level of the last list numbering that did exist] + 1. If there have been no list numberings so far, then the tool uses a level of 2. The list numbering value itself is set to a blank string. For example, if the table of contents has the following entries:
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
