# Remove false positives for Beyond Compare
Performs some basic string formatting on WET HTML documents that gets rid of common false flags that appear in the process of Beyond Comparing an HTML document to the Word document it was based on.

[HTML page of tool here.](format_bc.html)

This is NOT intended to be used to produce properly formatted documents to be further edited upon, as it intentionally misformats the documents so that those false flags are removed. Any further edits should instead be done on the original HTML document.

## Details

After converting a Word document into a WET HTML document, we usually:
1. Resave that HTML document as a Word document, and then
2. use Beyond Compare 4 to double check the WET HTML-into-Word document against the original Word document that it was based on, to look for and fix any differences we may have introduced.

Beyond Compare uses colour coding to flag differences in the text between the two Word documents, but some of these differences are those that we're fine with, and physically ignoring those differences may mean accidentally missing differences that we do care about. Beyond Compare does support some basic difference-ignoring options (described below), but they only look at *text* differences between the two Word documents we would be comparing in the above process. This tool covers false positive differences that arise from how we format a WET *HTML structure* (during our workflow, we're putting Word documents instead of HTML documents into Beyond Compare).

This tool just aims to get rid of the HTML in the WET HTML document that results in more complex false flags.

## Steps to using this tool

1. Run this tool on a cleaned HTML document, and save the output file to a different location.
2. Use Word to convert this tool's output file to a Word document.
3. Beyond Compare this tool's output file instead of the original HTML document.
4. When making changes, edit *the original cleaned HTML document* instead of this tool's output file.

## Checks

The current formatting checks are as follows (the user can select which to apply):

- Removes text from (both English and French) WET footnote markers, since they show up as regular text in the Beyond Compare.
- Replaces &lt;br/> with an empty paragraph &lt;p>&lt;/p>, creating a newline, since &lt;br/> doesn't break the text into separate lines in Beyond Compare.
- Replaces &lt;math> tags with a placeholder string, MATHPLACEHOLDER. Math tags are usually manually inserted into the WET HTML document, so comparing them to the original Word document through Beyond Compare wouldn't be helpful. Math tags should instead be manually compared to their visual appearances in the original Word document.
- Removes Basel citations, which are citations of the format [BCBS (...)] in English or [CBCB (...)] in French. This is specific to intermediate revisions of the Basel package, as their citations often weren't corrected until the final revision.
    - Note that if there are any words between citations, e.g. "[BCBS xx] and [BCBS xx]", then this will create its own false positive because the line will be left with a floating "and".

## Beyond Compare's difference-ignoring options

Beyond Compare does have some settings to ignore specific character differences. You can set which character differences to ignore by following these steps:
1. Open Beyond Compare.
2. Click **Text Compare**.
3. Go to **Session** -> **Session Settings** -> **Replacements**.
4. Click the **+** symbol to add a new difference to ignore.
5. Enter the original character in **Find**, and the character Beyond Compare should treat it as in **Replace**. For example, I want differences between left fancy single quotes and regular single quotes to be ignored, so I replace the left fancy single quote ‘ with a regular quote '.
6. Make sure the the **Side** is **Left** (values in the left text file get replaced), then click **OK**.
7. Repeat steps 4-6, but make sure the **Side** is **Right** this time. This way, both files have their characters replaced.
8. Change **Use for this view only** to **Also update session defaults**, then click **OK**.
