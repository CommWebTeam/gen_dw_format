// array of objects representing classes to convert
const classes_to_convert = [{wet3: "align-left", wet4: "text-left"},
                            {wet3: "align-right", wet4: "text-right"},
                            {wet3: "background-accent ", wet4: "bg-primary"},
                            {wet3: "background-highlight ", wet4: "bg-warning"},
                            {wet3: "border-all", wet4: "brdr-tp brdr-lft brdr-bttm brdr-rght"},
                            {wet3: "border-bottom", wet4: "brdr-bttm"},
                            {wet3: "border-left", wet4: "brdr-lft"},
                            {wet3: "border-right", wet4: "brdr-rght"},
                            {wet3: "border-top", wet4: "brdr-tp"},
                            {wet3: "button button-accent", wet4: "btn-primary"},
                            {wet3: "button button-alert", wet4: "btn-danger"},
                            {wet3: "button button-attention", wet4: "btn-warning"},
                            {wet3: "button button-confirm", wet4: "btn-success"},
                            {wet3: "button button-dark", wet4: "btn-info"},
                            {wet3: "button-disabled", wet4: "disabled "},
                            {wet3: "button-group", wet4: "btn-group"},
                            {wet3: "button button-info", wet4: "btn-primary"},
                            {wet3: "button-large", wet4: "btn-lg"},
                            {wet3: "button-none", wet4: "btn-link"},
                            {wet3: "button-small", wet4: "btn-sm"},
                            {wet3: "button-toolbar", wet4: "btn-toolbar"},
                            {wet3: "button-xlarge", wet4: "btn-lg"},
                            {wet3: "button", wet4: "btn btn-default"},
                            {wet3: "menu-horizontal", wet4: "list-inline"},
                            {wet3: "clearLeft", wet4: "clearfix"},
                            {wet3: "clear-left", wet4: "clearfix"},
                            {wet3: "clearRight", wet4: "clearfix"},
                            {wet3: "clear-right", wet4: "clearfix"},
                            {wet3: "clearboth", wet4: "clearfix"},
                            {wet3: "clear", wet4: "clearfix"},
                            {wet3: "color-accent", wet4: "text-primary"},
                            {wet3: "color-attention", wet4: "text-danger"},
                            {wet3: "color-medium", wet4: "text-muted"},
                            {wet3: "display-block", wet4: "show"},
                            {wet3: "equalize", wet4: "wb-eqht"},
                            {wet3: "float-left", wet4: "pull-left"},
                            {wet3: "float-right", wet4: "pull-right"},
                            {wet3: "font-small ", wet4: "small"},
                            {wet3: "font-xlarge", wet4: "lead"},
                            {wet3: "footnote-link", wet4: "fn-lnk"},
                            {wet3: "footnote-return", wet4: "fn-rtn"},
                            {wet3: "form-alert", wet4: "has-error"},
                            {wet3: "form-attention", wet4: "has-warning"},
                            {wet3: "form-checkbox form-label-inline", wet4: "checkbox-inline"},
                            {wet3: "form-confirm", wet4: "has-success"},
                            {wet3: "form-alert", wet4: "has-error"},
                            {wet3: "form-attention", wet4: "has-warning"},
                            {wet3: "form-confirm", wet4: "has-success"},
                            {wet3: "form-label-inline", wet4: "form-inline"},
                            {wet3: "form-text-inline", wet4: "form-inline"},
                            {wet3: "indent-large", wet4: "mrgn-lft-lg"},
                            {wet3: "indent-medium", wet4: "mrgn-lft-md"},
                            {wet3: "indent-none", wet4: "mrgn-lft-0"},
                            {wet3: "indent-small", wet4: "mrgn-lft-sm"},
                            {wet3: "indent-xlarge", wet4: "mrgn-lft-xl"},
                            {wet3: "list-bullet-none", wet4: "list-unstyled"},
                            {wet3: "list-lower-alpha", wet4: "lst-lwr-alph"},
                            {wet3: "list-lower-roman", wet4: "lst-lwr-rmn"},
                            {wet3: "list-numeric", wet4: "lst-num"},
                            {wet3: "list-upper-alpha", wet4: "lst-upr-alph"},
                            {wet3: "list-upper-roman", wet4: "lst-upr-rmn"},
                            {wet3: "margin-bottom-large", wet4: "mrgn-bttm-lg"},
                            {wet3: "margin-bottom-medium", wet4: "mrgn-bttm-md"},
                            {wet3: "margin-bottom-none", wet4: "mrgn-bttm-0"},
                            {wet3: "margin-bottom-small", wet4: "mrgn-bttm-sm"},
                            {wet3: "margin-bottom-xlarge", wet4: "mrgn-bttm-xl"},
                            {wet3: "margin-left-large", wet4: "mrgn-lft-lg"},
                            {wet3: "margin-left-medium", wet4: "mrgn-lft-md"},
                            {wet3: "margin-left-none", wet4: "mrgn-lft-0"},
                            {wet3: "margin-left-small", wet4: "mrgn-lft-sm"},
                            {wet3: "margin-left-xlarge", wet4: "mrgn-lft-xl"},
                            {wet3: "margin-right-large", wet4: "mrgn-rght-lg"},
                            {wet3: "margin-right-medium", wet4: "mrgn-rght-md"},
                            {wet3: "margin-right-none", wet4: "mrgn-rght-0"},
                            {wet3: "margin-right-small", wet4: "mrgn-rght-sm"},
                            {wet3: "margin-right-xlarge", wet4: "mrgn-rght-xl"},
                            {wet3: "margin-top-large", wet4: "mrgn-tp-lg"},
                            {wet3: "margin-top-medium", wet4: "mrgn-tp-md"},
                            {wet3: "margin-top-none", wet4: "mrgn-tp-0"},
                            {wet3: "margin-top-small", wet4: "mrgn-tp-sm"},
                            {wet3: "margin-top-xlarge", wet4: "mrgn-tp-xl"},
                            {wet3: "opacity-10", wet4: "opct-10"},
                            {wet3: "opacity-100", wet4: "opct-100"},
                            {wet3: "opacity-20", wet4: "opct-20"},
                            {wet3: "opacity-30", wet4: "opct-30"},
                            {wet3: "opacity-40", wet4: "opct-40"},
                            {wet3: "opacity-50", wet4: "opct-50"},
                            {wet3: "opacity-60", wet4: "opct-60"},
                            {wet3: "opacity-70", wet4: "opct-70"},
                            {wet3: "opacity-80", wet4: "opct-80"},
                            {wet3: "opacity-90", wet4: "opct-90"},
                            {wet3: "print-none", wet4: "hidden-print"},
                            {wet3: "uppercase", wet4: "text-uppercase"},
                            {wet3: "wet-boew-footnotes", wet4: "wb-fnote"},
                            {wet3: "wb-invisible", wet4: "wb-inv"},
                            {wet3: "wrap-none", wet4: "nowrap"}];

// Convert between WET 3 and WET 4 classes
function convert_wet() {
	let file_reader_content = new FileReader();
	let content_str = document.getElementById("html_file").files[0];
	file_reader_content.onload = function(event) {
		let html_doc_str = event.target.result.replaceAll("\r\n", "\n");
        // get options
        let check_align_center = document.getElementById("align_center").checked;
        let check_span = document.getElementById("span").checked;
        // convert WET version
        if (document.getElementById("wet_conversion").value === "to_wet4") {
            html_doc_str = convert_wet3_to_wet4(html_doc_str, check_align_center, check_span);
        } else {
            html_doc_str = convert_wet4_to_wet3(html_doc_str, check_align_center, check_span);
        }
		download(html_doc_str, "formatted.html", "text/html");
	}
	file_reader_content.readAsText(content_str);
}

/* helpers */

// Converts instances of a class in the html string to another class
function convert_class(html_str, old_class, new_class) {
    let old_class_regex = new RegExp('(class *= *("|("[^"]* )))' + old_class + '([" ])', "g");
    return html_str.replaceAll(old_class_regex, "$1" + new_class + "$4");
}

// Converts instances of a class for a specific tag in the html string to another class
function convert_tag_class(html_str, old_class, new_class, tag) {
    let old_class_regex = new RegExp('(<' + tag +' [^>]*class *= *("|("[^"]* )))' + old_class + '([" ])', "g");
    return html_str.replaceAll(old_class_regex, "$1" + new_class + "$4");
}

// Converts wet 4 classes to equivalent wet 3 classes
function convert_wet3_to_wet4(html_doc_str, check_align_center, check_span) {
    let edited_html_str = html_doc_str;
    // default one-to-one mappings
    for (let i = 0; i < classes_to_convert.length; i++) {
        edited_html_str = convert_class(edited_html_str, classes_to_convert[i].wet3, classes_to_convert[i].wet4);
    }
    // fix align-center
    if (check_align_center) {
        edited_html_str = convert_tag_class(edited_html_str, "align-center", "center-block", "div");
        edited_html_str = convert_tag_class(edited_html_str, "align-center", "center-block", "img");
        edited_html_str = convert_class(edited_html_str, "align-center", "text-center");
    }
    // fix spans
    if (check_span) {
        edited_html_str = convert_class(edited_html_str, "span-1", "col-md-2");
        edited_html_str = convert_class(edited_html_str, "span-2", "col-md-4");
        edited_html_str = convert_class(edited_html_str, "span-3", "col-md-6");
        edited_html_str = convert_class(edited_html_str, "span-4", "col-md-8");
        edited_html_str = convert_class(edited_html_str, "span-5", "col-md-10");
        edited_html_str = convert_class(edited_html_str, "span-6", "col-md-12");
    }
    return edited_html_str;
}

// Converts WET 4 classes to equivalent WET 3 classes
function convert_wet4_to_wet3(html_doc_str, check_align_center, check_span) {
    let edited_html_str = html_doc_str;
    // default one-to-one mappings
    for (let i = 0; i < classes_to_convert.length; i++) {
        edited_html_str = convert_class(edited_html_str, classes_to_convert[i].wet4, classes_to_convert[i].wet3);
    }
    // fix align-center
    if (check_align_center) {
        edited_html_str = convert_class(edited_html_str, "text-center", "align-center");
        edited_html_str = convert_class(edited_html_str, "center-block", "align-center");
    }
    // fix spans
    if (check_span) {
        edited_html_str = convert_class(edited_html_str, "col-md-2", "span-1");
        edited_html_str = convert_class(edited_html_str, "col-md-4", "span-2");
        edited_html_str = convert_class(edited_html_str, "col-md-6", "span-3");
        edited_html_str = convert_class(edited_html_str, "col-md-8", "span-4");
        edited_html_str = convert_class(edited_html_str, "col-md-10", "span-5");
        edited_html_str = convert_class(edited_html_str, "col-md-12", "span-6");
    }
    return edited_html_str;
}
