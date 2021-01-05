# Summary of common changes to Dreamweaver pastes

In general, our workflow for converting Word documents into HTML web pages is as follows:

1. Copy the Word document into the *Design* tab of Dreamweaver, which will generate (relatively) non-bloated HTML code of the document.
2. Edit the Dreamweaver-generated HTML code so that it conforms to WET, WCAG, and internal accessibility standards. This step contains the bulk of the work.
3. Use Beyond Compare to make sure that the HTML document's text still matches the Word document's text.
4. Visually compare the HTML document to the Word document to make sure that the formatting is still the same where possible.
5. Upload the HTML document to the SharePoint internal website.

The OSFI website uses the WET toolkit and its corresponding CSS classes.

The rest of this document concerns step 2 and lists the changes to the initial Dreamweaver-generated HTML code that I've come across most frequently. Since the process of making a web page more accessible largely consists of subjective design, it can't and/or shouldn't be fully automated, but some specific checks that exist to explicitly meet a standard can be automated.

This is neither a definitive nor exhaustive list of every change that may have to be made to Dreamweaver-generated HTML documents and should not be treated as such.

Some readings:

[WET content formatting](https://wet-boew.github.io/wet-boew-legacy/v3.1/demos/guide-design/format-en.html)

[WCAG fundamentals](https://www.w3.org/WAI/fundamentals/accessibility-principles/)

Some references:

[WET design guide](https://wet-boew.github.io/wet-boew-legacy/v3.1/demos/guide-design/guide-en.html)

[HTML5 tags](https://www.tutorialspoint.com/html5/html5_tags.htm)

*Table of Contents*
- [Coding style](#coding-style)
- [Links](#links)
- [Alignment](#alignment)
- [Headers](#headers)
- [Font formatting](#font-formatting)
- [Lists](#lists)
- [Tables](#tables)
- [Table of Contents](#table-of-contents)
- [Footnotes](#footnotes)
- [Math](#math)

# Coding style

This section covers how an HTML document should be formatted. This is technically optional since this formatting will be invisible to the reader once the document is on-site, but having properly formatted code will make the document significantly more readable and maintainable for both the current author and future editors.

Here is the [Google HTML and CSS style guide](https://google.github.io/styleguide/htmlcssguide.html) for reference, although we do not currently follow it perfectly.

## Indentation

Indent the HTML code consistently. You can do this in Dreamweaver by going to Edit -> Code -> Apply Source Formatting.

## HTML entities

Outside of **<** and **&**, which are reserved characters in HTML, avoid using HTML entities, e.g. &amp;rsquo; (anything that begins in & and ends in ;). Use the actual character it represents instead.

Note that Sharepoint automatically inserts HTML entities, so you should replace them before making any major edits on your own copy. You can regex search for HTML entities using

&.*?;

- Automatable (for each individual entity).

## Multiple spaces

This is my own preference, but I prefer getting rid of multiple consecutive regular spaces and replacing them with a single space for legibility. These would show up as a single space to a reader, but may get in the way of search functions when editing the document.

Note that this does *not* apply to no break spaces (&amp;nbsp;), which will actually change the appearance of the document to the reader.

- Automatable (reapply source formatting afterward).

# Links

- internal links are referential
- mention that external links are so

- Automatable.

# Alignment

- use wet class

- Automatable.

# Headers

- follow document structure not style - no skipping headers etc

# Font formatting

- cite for links/citations
- em for emphasis
- i for names
- osfi-txt--italic otherwise

- strong for emphasis
- b for names
- osfi-txt--bold otherwise

- Partially automatable (can set a default tag for each formatting type, but exceptions will have to use human judgment).

# Lists

- for ol, use wet classes for list numberings
- try not to include list numberings within text unless necessary
- Not easily automated.

- join consecutive lists together
- Automatable.

- use start=... to go around headers and so on
- Not easily automated.

# Tables

- include which rows are headers/data, and use scope for headers
- Not easily automated.

# Table of contents

- use wet class
- Potentially automatable - not currently implemented.

# Footnotes

- use wet class
- Automatable.

# Math

This section is a WIP as we continue to familiarize ourselves with MathML.

- Areas of text that are clearly math - either they are clearly equations, or consist of complicated variables with superscripts or subscripts - should be written as MathML. Whether a piece of text should be in MathML will require human judgment.
- You can copy math from word documents as MathML equations.
- Make sure to remove the *mml:* at the start of each tag (these will prevent the math from loading properly), and the extra attributes in the &lt;math> tag (for legibility), that Word will automatically generate for copied MathML equations. This step is automatable.
- Variable names should be joined into a single &lt;mi> tag.
- Use invisible attributes where applicable.
- Use &lt;mspace> tags where applicable if the space isn't part of a variable name.