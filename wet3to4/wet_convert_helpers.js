// array of objects representing classes to convert
const classes_to_convert = [{old: "align-left", new: "text-left"},
                            {old: "align-right", new: "text-right"},
                            {old: "background-accent ", new: "bg-primary"},
                            {old: "background-highlight ", new: "bg-warning"},
                            {old: "border-all", new: "brdr-tp brdr-lft brdr-bttm brdr-rght"},
                            {old: "border-bottom", new: "brdr-bttm"},
                            {old: "border-left", new: "brdr-lft"},
                            {old: "border-right", new: "brdr-rght"},
                            {old: "border-top", new: "brdr-tp"},
                            {old: "button button-accent", new: "btn-primary"},
                            {old: "button button-alert", new: "btn-danger"},
                            {old: "button button-attention", new: "btn-warning"},
                            {old: "button button-confirm", new: "btn-success"},
                            {old: "button button-dark", new: "btn-info"},
                            {old: "button-disabled", new: "disabled "},
                            {old: "button-group", new: "btn-group"},
                            {old: "button button-info", new: "btn-primary"},
                            {old: "button-large", new: "btn-lg"},
                            {old: "button-none", new: "btn-link"},
                            {old: "button-small", new: "btn-sm"},
                            {old: "button-toolbar", new: "btn-toolbar"},
                            {old: "button-xlarge", new: "btn-lg"},
                            {old: "button", new: "btn btn-default"},
                            {old: "menu-horizontal", new: "list-inline"},
                            {old: "clearLeft", new: "clearfix"},
                            {old: "clear-left", new: "clearfix"},
                            {old: "clearRight", new: "clearfix"},
                            {old: "clear-right", new: "clearfix"},
                            {old: "clearboth", new: "clearfix"},
                            {old: "clear", new: "clearfix"},
                            {old: "color-accent", new: "text-primary"},
                            {old: "color-attention", new: "text-danger"},
                            {old: "color-medium", new: "text-muted"},
                            {old: "display-block", new: "show"},
                            {old: "equalize", new: "wb-eqht"},
                            {old: "float-left", new: "pull-left"},
                            {old: "float-right", new: "pull-right"},
                            {old: "font-small ", new: "small"},
                            {old: "font-xlarge", new: "lead"},
                            {old: "footnote-link", new: "fn-lnk"},
                            {old: "footnote-return", new: "fn-rtn"},
                            {old: "form-alert", new: "has-error"},
                            {old: "form-attention", new: "has-warning"},
                            {old: "form-checkbox form-label-inline", new: "checkbox-inline"},
                            {old: "form-confirm", new: "has-success"},
                            {old: "form-alert", new: "has-error"},
                            {old: "form-attention", new: "has-warning"},
                            {old: "form-confirm", new: "has-success"},
                            {old: "form-label-inline", new: "form-inline"},
                            {old: "form-text-inline", new: "form-inline"},
                            {old: "indent-large", new: "mrgn-lft-lg"},
                            {old: "indent-medium", new: "mrgn-lft-md"},
                            {old: "indent-none", new: "mrgn-lft-0"},
                            {old: "indent-small", new: "mrgn-lft-sm"},
                            {old: "indent-xlarge", new: "mrgn-lft-xl"},
                            {old: "list-bullet-none", new: "list-unstyled"},
                            {old: "list-lower-alpha", new: "lst-lwr-alph"},
                            {old: "list-lower-roman", new: "lst-lwr-rmn"},
                            {old: "list-numeric", new: "lst-num"},
                            {old: "list-upper-alpha", new: "lst-upr-alph"},
                            {old: "list-upper-roman", new: "lst-upr-rmn"},
                            {old: "margin-bottom-large", new: "mrgn-bttm-lg"},
                            {old: "margin-bottom-medium", new: "mrgn-bttm-md"},
                            {old: "margin-bottom-none", new: "mrgn-bttm-0"},
                            {old: "margin-bottom-small", new: "mrgn-bttm-sm"},
                            {old: "margin-bottom-xlarge", new: "mrgn-bttm-xl"},
                            {old: "margin-left-large", new: "mrgn-lft-lg"},
                            {old: "margin-left-medium", new: "mrgn-lft-md"},
                            {old: "margin-left-none", new: "mrgn-lft-0"},
                            {old: "margin-left-small", new: "mrgn-lft-sm"},
                            {old: "margin-left-xlarge", new: "mrgn-lft-xl"},
                            {old: "margin-right-large", new: "mrgn-rght-lg"},
                            {old: "margin-right-medium", new: "mrgn-rght-md"},
                            {old: "margin-right-none", new: "mrgn-rght-0"},
                            {old: "margin-right-small", new: "mrgn-rght-sm"},
                            {old: "margin-right-xlarge", new: "mrgn-rght-xl"},
                            {old: "margin-top-large", new: "mrgn-tp-lg"},
                            {old: "margin-top-medium", new: "mrgn-tp-md"},
                            {old: "margin-top-none", new: "mrgn-tp-0"},
                            {old: "margin-top-small", new: "mrgn-tp-sm"},
                            {old: "margin-top-xlarge", new: "mrgn-tp-xl"},
                            {old: "opacity-10", new: "opct-10"},
                            {old: "opacity-100", new: "opct-100"},
                            {old: "opacity-20", new: "opct-20"},
                            {old: "opacity-30", new: "opct-30"},
                            {old: "opacity-40", new: "opct-40"},
                            {old: "opacity-50", new: "opct-50"},
                            {old: "opacity-60", new: "opct-60"},
                            {old: "opacity-70", new: "opct-70"},
                            {old: "opacity-80", new: "opct-80"},
                            {old: "opacity-90", new: "opct-90"},
                            {old: "print-none", new: "hidden-print"},
                            {old: "uppercase", new: "text-uppercase"},
                            {old: "wet-boew-footnotes", new: "wb-fnote"},
                            {old: "wb-invisible", new: "wb-inv"},
                            {old: "wrap-none", new: "nowrap"}];

// Converts wet 3 classes to equivalent wet 4 classes
function convert_wet3_to_wet4() {
	let file_reader_content = new FileReader();
	let content_str = document.getElementById("html_file").files[0];
	file_reader_content.onload = function(event) {
		let html_doc_str = event.target.result.replaceAll("\r\n", "\n");
		for (let i = 0; i < classes_to_convert.length; i++) {
            html_doc_str = convert_class(html_doc_str, classes_to_convert[i].old, classes_to_convert[i].new);
        }
		download(html_doc_str, "formatted.html", "text/html");
	}
	file_reader_content.readAsText(content_str);
}

/* helpers */

// converts all instances of a class in the html string to another class
function convert_class(html_str, old_class, new_class) {
    let old_class_regex = new RegExp('(class *= *("|("[^"]* )))' + old_class + '([" ])', "g");
    return html_str.replaceAll(old_class_regex, "$1" + new_class + "$4");
}
