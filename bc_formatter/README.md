# Remove false positives for Beyond Compare
Performs some basic string formatting on WET HTML documents that gets rid of common false flags that appear in the process of Beyond Comparing an HTML document to the Word document it was based on.

[HTML page of tool here.](bc_format.html)

This is NOT intended to be used to produce properly formatted documents to be further edited upon, as it intentionally misformats the documents so that those false flags are removed. Any further edits should instead be done on the original HTML document.

## Details

After converting a Word document into a WET HTML document, we usually:
1. Resave that HTML document as a Word document, and then
2. use Beyond Compare 4 to double check the WET HTML-into-Word document against the original Word document that it was based on, to look for and fix any differences we may have introduced.

Beyond Compare uses colour coding to flag differences in the text between the two Word documents, but some of these differences are those that we're fine with, and physically ignoring those differences may mean accidentally missing differences that we do care about. Beyond Compare does support some basic difference ignoring options, but to my knowledge it's not very in-depth, so this tool just aims to get rid of the text in the WET HTML document that results in more complex false flags.

## Checks

The current formatting checks are as follows (the user can select which to apply):

- Removes text from (both English and French) WET footnote markers, since they show up as regular text in the Beyond Compare.
- Replaces &lt;br/> with an empty paragraph &lt;p>&lt;/p>, creating a newline, since &lt;br/> doesn't break the text into separate lines in Beyond Compare.
- Replaces &lt;math> tags with a placeholder string, MATHPLACEHOLDER. Math tags are usually manually inserted into the WET HTML document, so comparing them to the original Word document through Beyond Compare wouldn't be helpful. Math tags should instead be manually compared to their visual appearances in the original Word document.
- Removes Basel citations, which are citations of the format [BCBS (...)] in English or [CBCB (...)] in French. This is specific to intermediate revisions of the Basel package, as their citations often weren't corrected until the final revision.
    - Note that if there are any words between citations, e.g. "[BCBS xx] and [BCBS xx]", then this will create its own false positive because the line will be left with a floating "and".
