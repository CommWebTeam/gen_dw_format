// initial values for top/bot footnote regex
if (document.getElementById("top_footnote") !== null) {
  document.getElementById("top_footnote").value = '<sup id="fnb[0-9]+-ref"> *<a class="footnote-link" href="#fnb[0-9]+"> *<span class="wb-invisible">Footnote </span>[0-9]+</a>,*</sup>';
}
if (document.getElementById("bot_footnote") !== null) {
  document.getElementById("bot_footnote").value = '<dt>Footnote [0-9]+</dt>(?: |\n)*<dd id="fnb[0-9]+">(?: |\n)*((.|\n)*?)<p class="footnote-return"> *<a href="#fnb[0-9]+-ref"> *<span class="wb-invisible"> *Return to footnote *</span>[0-9]+(<span class="wb-invisible"> *referrer *</span>)*</a> *</p>( |\n)*</dd>';
}

// set top footnote regex value
function set_top_footnote_regex() {
  document.getElementById("top_warning").innerHTML = "";
	let footnote_format = document.getElementById("top_footnote_format").value;
  if (footnote_format === "en_wet") {
    document.getElementById("top_footnote").value = '<sup id="fnb[0-9]+-ref"> *<a class="footnote-link" href="#fnb[0-9]+"> *<span class="wb-invisible">Footnote </span>[0-9]+</a>,*</sup>';
  }
  else if (footnote_format === "fr_wet") {
    document.getElementById("top_footnote").value = '<sup id="fnb[0-9]+-ref"> *<a class="footnote-link" href="#fnb[0-9]+"> *<span class="wb-invisible">Note de bas de page </span>[0-9]+</a>,*</sup>';
  }
  else if (footnote_format === "dw") {
    document.getElementById("top_footnote").value = '<a href="#_ftn[0-9]+" name="_ftnref[0-9]+" title="">(.*?)</a>';
  }
  else if (footnote_format === "oca") {
    document.getElementById("top_footnote").value = '\\([0-9]+\\)';
    document.getElementById("top_warning").innerHTML = "Please double-check for false positives.";
  }
}

// set bottom footnote regex value
function set_bot_footnote_regex() {
  document.getElementById("bot_warning").innerHTML = "";
	let footnote_format = document.getElementById("bot_footnote_format").value;
  if (footnote_format === "en_wet") {
    document.getElementById("bot_footnote").value = '<dt>Footnote [0-9]+</dt>(?: |\n)*<dd id="fnb[0-9]+">(?: |\n)*((.|\n)*?)<p class="footnote-return"> *<a href="#fnb[0-9]+-ref"> *<span class="wb-invisible"> *Return to footnote *</span>[0-9]+(<span class="wb-invisible"> *referrer *</span>)*</a> *</p>( |\n)*</dd>';
    document.getElementById("regex_sub").value = 1;
  }
  else if (footnote_format === "fr_wet") {
    document.getElementById("bot_footnote").value = '<dt>Note de bas de page [0-9]+</dt>(?: |\n)*<dd id="fnb[0-9]+">(?: |\n)*((.|\n)*?)<p class="footnote-return"> *<a href="#fnb[0-9]+-ref"> *<span class="wb-invisible"> *Retour à la référence de la note de bas de page *</span>[0-9]+(<span class="wb-invisible"> *referrer *</span>)*</a> *</p>( |\n)*</dd>';
    document.getElementById("regex_sub").value = 1;
  }
  else if (footnote_format === "dw") {
    document.getElementById("bot_footnote").value = '<div id="ftn[0-9]+">(?:.|\n)*?<a href="#_ftnref[0-9]+" name="_ftn[0-9]+" title=""> *</a>((.|\n)*?)((<[^>]*>)|\ |\n)*</div>';
    document.getElementById("regex_sub").value = 1;
    document.getElementById("bot_warning").innerHTML = "Minor formatting errors may be introduced if the Dreamweaver paste is malformed enough.";
  }
}

// get uploaded file, find footnotes, change their values, and download
function add_footnotes() {
	// read in uploaded file as string
	let file_reader = new FileReader();
	let html_file = document.getElementById("html_file").files[0];
	file_reader.onload = function(event) {
		let html_str = event.target.result.replaceAll("\r\n", "\n");
    // get line numbers of input line range
    let html_arr = html_str.split("\n");
    let first_line = document.getElementById("footnote_start").value;
    let last_line = document.getElementById("footnote_end").value;
    if (first_line.trim() === "") {
      first_line = 0;
    }
    else {
      first_line = parseInt(first_line);
    }
    if (last_line.trim() === "") {
      last_line = html_arr.length;
    }
    else {
      last_line = parseInt(last_line) + 1;
    }
    // get original lines of input line range
    let lines_to_edit = html_arr.slice(first_line, last_line).join("\n");
    // edit lines of input line range
    let edited_str = lines_to_edit;
    edited_str = replace_footnote_str(edited_str, document.getElementById("init_id").value, document.getElementById("top_footnote").value, document.getElementById("bot_footnote").value, document.getElementById("regex_sub").value, document.getElementById("dup_footnotes").value);
    edited_str = add_footnote_div(edited_str, document.getElementById("init_id").value);
    edited_str = add_consecutive_commas(edited_str, document.getElementById("init_id").value);
    if (document.getElementById("lang").value === 'f') {
      edited_str = translate_footnotes(edited_str);
    }
    // replace original document lines with edited lines
    html_str = html_str.replace(lines_to_edit, edited_str);
    // download edited document
		download(html_str, "footnotes.html", "text/html");
	}
	file_reader.readAsText(html_file);
}

/* helper functions */

/*
=================================
deal with duplicate top footnotes
=================================
*/

// returns two arrays for indices and values of duplicate footnotes
function get_dup_array(duplicate_footnotes) {
  // record indices and values of duplicate footnotes
  let dup_footnote_inds = [];
  let dup_footnote_vals = [];
  // parse duplicate footnotes string into array of pairs of values
  let dup_footnotes_arr = duplicate_footnotes.split(';');
  const num_dup = dup_footnotes_arr.length;
  for (let i = 0; i < num_dup; i++) {
    // for each pair, get the index of the duplicate footnote and its value
    let value_pair = dup_footnotes_arr[i].split(',');
    let footnote_ind = parseInt(value_pair[0].trim());
    dup_footnote_inds.push(footnote_ind);
    let footnote_val = parseInt(value_pair[1].trim());
    dup_footnote_vals.push(footnote_val);
  }
  // add start indices
  dup_footnote_inds = [0].concat(dup_footnote_inds);
  dup_footnote_vals = [0].concat(dup_footnote_vals);
  return [dup_footnote_inds, dup_footnote_vals];
}

// returns an array from start to end inputs
function arr_range(start, end) {
  let arr = [];
  for (let j = start; j < end; j++) {
    arr.push(j);
  }
  return arr;
}

// creates array for footnote number, including exceptions (duplicates)
function get_footnote_nums(num_footnotes, duplicate_footnotes) {
  // base case - no duplicate footnotes
  if (duplicate_footnotes.trim() === "") {
    return arr_range(1, num_footnotes + 1);
  }
  // get duplicate footnotes
  let dup_array = get_dup_array(duplicate_footnotes);
  let dup_footnote_inds = dup_array[0];
  let dup_footnote_vals = dup_array[1];
  // loop through each duplicate footnote index and get values until next duplicate
  let footnote_nums = [];
  let curr_footnote_num = 1;
  const num_dup = dup_footnote_inds.length;
  for (let i = 0; i < num_dup; i++) {
    // number of values between duplicates, excluding duplicates
    let dup_diff = dup_footnote_inds[i + 1] - dup_footnote_inds[i] - 1;
    // append range of values from current footnote counter to next duplicate, exclusive
    footnote_nums = footnote_nums.concat(arr_range(curr_footnote_num, curr_footnote_num + dup_diff));
    // append next duplicate
    footnote_nums.push(dup_footnote_vals[i + 1]);
    // increment footnote counter
    curr_footnote_num += dup_diff;
  }
  // get values from last duplicate to end
  const dup_to_end = num_footnotes - dup_footnote_inds[num_dup];
  footnote_nums = footnote_nums.concat(arr_range(curr_footnote_num, curr_footnote_num + dup_to_end));
  return footnote_nums;
}

/*
=================================
Generate and format WET footnotes
=================================
*/

// searches html for footnote regex statements and replaces them
function replace_footnote_str(html_str, init_id, top_regex_str, bot_regex_str, bot_regex_sub, duplicate_footnotes) {
    // find indices of matches
    const top_regex = new RegExp(top_regex_str, "g");
    const top_matches = match_with_empty(html_str, top_regex);
    // print number of matches for debugging
    console.log("Number of top footnotes found: " + top_matches.length);
    if (top_matches.length === 0) {
      return html_str;
    }
    const bot_regex = new RegExp(bot_regex_str, "g");
    const bot_matches = match_with_empty(html_str, bot_regex);
    console.log("Number of bottom footnotes found: " + bot_matches.length);
    if (bot_matches.length === 0) {
      return html_str;
    }
    // loop through smaller number of footnotes and number them with counter
    let output_str = html_str;
    const num_footnotes = Math.min(top_matches.length, bot_matches.length);
    // replace bot footnotes first
    for (let i = 0; i < num_footnotes; i++) {
        let bot_footnote_str = bot_matches[i];
        let ind = i + 1;
        let bot_footnote_content = bot_footnote_str.replace(bot_regex, "$" + bot_regex_sub);
        // add paragraph tags if needed
        if (!bot_footnote_content.includes("<p>")) {
          bot_footnote_content = "<p>" + bot_footnote_content + "</p>";
        }
        let bot_footnote = '<dt>Footnote ' + ind + '</dt>\n' +
          '<dd id="' + init_id + ind + '">\n' +
          bot_footnote_content + '\n' +
          '<p class="footnote-return"><a href="#' + init_id + ind + '-ref"><span class="wb-invisible">Return to footnote </span>' + ind + '</a></p>\n' +
          '</dd>';
        output_str = output_str.replace(bot_footnote_str, bot_footnote);
    }
    // replace top footnotes - check for duplicate footnotes
    let footnote_nums_dup = get_footnote_nums(num_footnotes, duplicate_footnotes);
    for (i = 0; i < num_footnotes; i++) {
        let footnote_ind = footnote_nums_dup[i];
        let top_footnote = '<sup id="' + init_id + footnote_ind + '-ref"><a class="footnote-link" href="#' + init_id + footnote_ind + '"><span class="wb-invisible">Footnote </span>' + footnote_ind + '</a></sup>';
        output_str = output_str.replace(top_matches[i], top_footnote);
    }
    return output_str;
}

// creates WET div around bottom footnotes
function add_footnote_div(html_str, init_id) {
  let output_str = html_str.replace(/<div>( |\n)*<dt>Footnote 1<\/dt>/,
  `<div class="wet-boew-footnotes" role="note">
  <section>
    <h3 class="wb-invisible" id="` + init_id + `">Footnotes</h3>
    <dl>
    <dt>Footnote 1</dt>`);
  output_str = output_str.replace(/<\/dd>( |\n)*<\/div>/, `</dd>
    </dl>
  </section>
</div>`);
return output_str;
}

// adds commas for consecutive top footnotes
function add_consecutive_commas(html_str, init_id) {
  const consecutive_footnote_regex = new RegExp('Footnote *<\/span>([0-9 ]+)<\/a> *<\/sup> *<sup id="' + init_id + '([0-9]+)-ref"> *<a class="footnote-link"', "g");
  let output_str = html_str.replaceAll(consecutive_footnote_regex, 'Footnote </span>$1</a>,</sup><sup id="' + init_id + '$2-ref"><a class="footnote-link"');
  return output_str;
}

/*
=================================
Optional  - translate French footnotes
=================================
*/

// changes specific footnote strings to french
function translate_footnotes(html_str) {
  let output_str = html_str.replaceAll("Return to footnote", "Retour à la référence de la note de bas de page");
  output_str = output_str.replaceAll(/Return to table([0-9 ]*)footnote/g, "Retour à la tableau$1note");
  output_str = output_str.replaceAll("Footnotes", "Notes de bas de page");
  output_str = output_str.replaceAll("Footnote", "Note de bas de page");
  return output_str;
}
