# Initial formatting for Dreamweaver pastes
Performs some basic string formatting on the HTML documents generated by pasting Word documents into Dreamweaver to help conform the documents to WCAG/WET standards. It assumes proper indentation (in Dreamweaver, you can generate this with Edit -> Code -> Apply Source Formatting).

[HTML page of tool here.](dw_paste_format.html)

The current formatting checks are as follows (the user can select which to apply):


- removes the referential links that Dreamweaver generates (which don't properly function).
- removes the table of contents links that Dreamweaver generates (which don't properly function).
- removes the French logiterms that Dreamweaver generates (which don't properly function).


- makes all space hexcodes consistent by converting invisible non-breaking spaces (where it just looks like a regular space in the editor) into regular spaces.
- replaces all multispaces with single spaces for neatness. You should apply source formatting in Dreamweaver to fix indentation if you include this check.
- removes empty attribute-less tags, and replaces all attribute-less tags that consist solely of spaces or nbsp; with a single regular space.
- removes extra spaces before closing p, li, th, and td tags for neatness.


- replaces fancy quotes with regular quotes.
- replaces the HTML entities for fancy quotes rsquo, lsquo, rdquo, and ldquo with regular quotes.
- replaces the HTML entities for fancy quotes rsquo, lsquo, rdquo, and ldquo with their actual values.
- replaces Word's em dashes with regular dashes.


- joins consecutive em and strong tags that are only separated by spaces into a single tag.
- joins consecutive lists (back-to-back ol tags or back-to-back ul tags) into a single list.


- changes em tags to cite tags on lines that have links. If a line contains the "a" tag, then all em tags on the same line are changed to cite tags.
- changes all em tags to cite tags.
- changes all em tags to span class="osfi-txt--italic" tags. (The above two checks take precedence.)
- changes all em tags to i tags. (The above three checks take precedence.)
- changes all strong tags to span class="osfi-txt--bold" tags.
- changes all strong tags to b tags. (The above check takes precedence.)

The above six checks take precedence in the given order. For example, if both "change em tags to cite tags on lines that have links" and "change all em tags to i tags" are checked, then the first check will take precedence. So on lines that have links, em tags will be changed to cite tags, and on other lines without links, em tags will be changed to i tags.


- splits up blocks of text that are separated from each other by br within a single &lt;p> tag, by moving each block into its own &lt;p> tag.
- splits up blocks of text that are separated from each other by br within a single &lt;p> tag, by moving each block into its own &lt;p> tag, if the chunk before the br ends in one of the following punctuation symbols: . , ; : ! ? ) " ’ ”
- removes br tags at the start or end of p, li, td, and th tags e.g. if a line consists of &lt;p> &lt;br>x &lt;/p>, the  &lt;br> is removed.
- changes all &lt;br> to &lt;br/>.


- ensures that internal links to the OSFI website are relative by removing the OSFI main page from the URL, and adds rel=external to external links. This ignores links that have keywords indicating footnotes, table of contents, already existing internal links, or email addresses.
- replaces Dreamweaver-generated center and right alignment (looks like align="center" or align="right") with their respective WET classes.
- removes attributes from p (paragraph) tags.
- removes attributes from ol and ul tags.
- replaces the formatting for Dreamweaver-generated footnotes with WET footnotes. This uses helper functions from the footnote_formatter tool.


- removes attributes from table, th, and tr tags, and removes attributes from td tags except for colspan and rowspan.


- translates internal links to French by searching for /Eng/ and replacing with /Fra/, and translates the WET footnote structure created by the WET footnote formatting check directly above to French.
- replaces 1er with 1&lt;sup>er&lt;/sup>, and other French list numberings formatted as #e with #&lt;sup>e&lt;/sup>.


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