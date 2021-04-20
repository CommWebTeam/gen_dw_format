// a collection of general functions that are used across different tools

/*
===========================================
String formatting - character replacement
===========================================
*/

// replace special characters with actual values
function replace_special_chars(str) {
	let new_str = str.replaceAll("&quot;", '"')
		.replaceAll("&rdquo;", '"')
		.replaceAll("&ldquo;", '"')
		.replaceAll("&lsquo;", "'")
		.replaceAll("&rsquo;", "'")
		.replaceAll("‘", "'")
		.replaceAll("“", '"')
		.replaceAll("”", '"')
		.replaceAll("–", "-")
		.replaceAll("&equals;", "=")
		.replaceAll("&minus;", "-")
		.replaceAll("&plus;", "+")
		.replaceAll("&prime;", "*")
		.replaceAll("&times;", "×")
		.replaceAll("&#39;", "'")
		.replaceAll("&#160;", "&nbsp;");
	return new_str;
}

// escape regex characters
function escape_regex_chars(str) {
	let new_str = str.replaceAll("/", "\\/")
				.replaceAll(".", "\\.")
				.replaceAll("(", "\\(")
				.replaceAll(")", "\\)")
				.replaceAll("$", "\\$")
				.replaceAll("+", "\\+")
				.replaceAll("*", "\\*")
				.replaceAll("^", "\\^")
				.replaceAll("[", "\\[")
				.replaceAll("]", "\\]")
				.replaceAll("|", "\\|")
				.replaceAll("?", "\\?")
				.replaceAll("<", "\\<")
				.replaceAll("\\", "\\")
				.replaceAll("=", "\\=")
				.replaceAll("!", "\\!")
				.replaceAll("{", "\\{")
				.replaceAll("}", "\\}");
	return new_str;
}

/*
===========================================
String formatting - better match function behaviour
===========================================
*/

// the match function, but returns an empty array instead of null if no match
function match_with_empty(str_to_match, regex_exp) {
	let match_arr = str_to_match.match(regex_exp);
	if (match_arr === null) {
		return [];
	}
	return match_arr;
}

/*
===========================================
Array formatting
===========================================
*/

// remove empty strings from string array
function rm_empty_lines(html_array) {
	let new_html_array = html_array.filter(function(x) {
		return x !== "";
	})
	return new_html_array;
}
