# Initial formatting for Dreamweaver pastes
Performs some basic string formatting on the HTML documents generated by pasting Word documents into Dreamweaver to help conform the documents to WCAG/WET standards. It assumes proper indentation (in Dreamweaver, you can generate this with Edit -> Code -> Apply Source Formatting).

[HTML document here.](basic_format.html)

The current formatting checks done are as follows (the user can select which to apply):
- make all space hexcodes consistent by converting invisible non-breaking spaces (when it just looks like a regular space in the editor) into regular spaces.
- replaces all multispaces with single spaces. You should probably apply source formatting in Dreamweaver to fix indentation if you include this check.
- removes empty tags with no attributes, and replaces all tags that do not have attributes and consist solely of spaces or nbsp; with a single regular space.

- replaces Word's fancy quotes with regular quotes.
- replaces the HTML entities for fancy quotes rsquo, lsquo, rdquo, and ldquo with regular quotes.
- replaces Word's em dashes with regular dashes.

- joins consecutive em and strong tags that are only separated by spaces into a single tag.
- changes em tags to cite tags on lines that have links.
- changes all em tags to cite tags.
- changes all em tags to i tags. Changing to cite tags takes precedence if one of the prior two checks are performed.
- changes all strong tags to b tags.

- removes the referential links that Dreamweaver generates (which don't properly function).
- ensures that internal links to the OSFI website are relative, and adds rel=external to external links. This ignores links that have keywords indicating footnotes, table of contents, already existing internal links, or email addresses.
- replaces Dreamweaver-generated center and right alignment with their respective WET classes.
- joins consecutive lists (ol and ul tags) into a single list.
- replaces the formatting for Dreamweaver-generated footnotes with WET footnotes. This uses helper functions from the footnote_formatter tool.

- translates internal links to French by searching for /Eng/ and replacing with /Fra/, and translates the WET footnote structure created by the WET footnote formatting check directly above to French.

- changes strings indicating superscript and subscript tags in the original Word document to be actual tags, and joins these tags together.
- changes strings indicating math tags in the original Word document to be actual tags.

I sometimes split regex statements up into multiple calls for clarity, but most of these checks can be done in one or two regex statements.

This is not intended to be an in-depth formatting tool and only covers some basic initial steps.

## Details on changing strings indicating tags to actual tags

### Superscripts and subscripts

For the second last check, the tool looks for the following strings in the html document:
- &amp;lt;sup&amp;gt;, which displays as &lt;sup&gt;
- &amp;lt;sub&amp;gt;, which displays as &lt;sub&gt;

and converts them to tags (so that we have a sup tag in that location instead).

This check is to be used in conjunction with some manual find-and-replace in the original Word document before pasting into Dreamweaver. The idea is that when pasting a Word document into Dreamweaver, it doesn't pay attention to superscripts and subscripts, so you have to manually insert them into Dreamweaver's generated html document. The easiest way to do this is to mark down where these superscripts and subscripts are in the Word document first before pasting.

You should mark superscripts and subscripts in the Word document as follows:
1. Open the "replace" box in Word (ctrl+h).
2. Select "More >>" for additional options.
3. Select "Format", then "Font".
4. Only check the "Superscript" box. Leave the "Subscript" box unchecked; all other boxes should be filled in, but not checked. 
5. Click "OK". You are now searching for superscript text.
6. Check "Use wildcards". This is a pattern searcher used by Word that is similar in use to regex.
7. In the "Find what" box, enter ([!(^2)]). This is equivalent to ([^(^2)]) in regex, where ^2 is the character for a footnote/endnote in Word. In other words, we are searching for superscripts that aren't footnotes/endnotes.
8. In the "Replace with" box, enter &lt;sup>\1&lt;/sup>. This is equivalent to &lt;sup>$1&lt;/sup> in regex.
9. Click "Replace All" to surround all superscripts with &lt;sup> and &lt;/sup>.
10. Repeat steps 1-9 for subscripts.

This tool looks for strings indicating subscript/superscript tags in the html document (where the angle brackets <> have been converted to their html entities) and changes them to be actual tags. Afterwards, it joins consecutive sup and sub tags.

### Mathml

For the last check, the tool looks for the following strings:
- &amp;lt;&ast;math.&ast;?&amp;gt;
- &amp;lt;&ast;mi.&ast;?&amp;gt;
- &amp;lt;&ast;mo.&ast;?&amp;gt;
- &amp;lt;&ast;mn.&ast;?&amp;gt;

and replaces them with actual tags.

Similarly to superscripts/subscripts, you can't copy a Word document with equations into Dreamweaver and have the equations formatted properly (assuming you want them formatted as mathml). Since you need to actually copy the equations one-by-one to have them written out as mathml instead of the default linear format, this is best done with a macro, which can be found [here](https://github.com/CommWebTeam/vba/blob/main/ReplaceMathML.vb). The linked macro replaces equations with their mathml code, which this tool then fixes the tags of once the Word document is pasted into Dreamweaver.