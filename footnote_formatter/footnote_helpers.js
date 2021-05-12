/*
=================================
Fill in default inputs
=================================
*/

// regex strings for common footnote formattings
const en_wet_top = '<sup id="fnb[0-9\-a-z]+-ref"> *<a class="f(oot)*n(ote)*-link" href="#fnb[0-9\-a-z]+"> *<span class="wb-inv(isible)*">Footnote </span>[0-9\-a-z]+</a>,*</sup>';
const en_wet_bot = '<dt>Footnote [0-9\-a-z]+</dt>(?: |\n)*<dd id="fnb[0-9\-a-z]+">(?: |\n)*((.|\n)*?)<p class="f(oot)*n(ote)*-return"> *<a href="#fnb[0-9\-a-z]+-ref"> *<span class="wb-inv(isible)*"> *Return to footnote *</span>[0-9\-a-z]+(<span class="wb-inv(isible)*"> *referrer *</span>)*</a> *</p>( |\n)*</dd>';
const fr_wet_top = '<sup id="fnb[0-9\-a-z]+-ref"> *<a class="f(oot)*n(ote)*-link" href="#fnb[0-9\-a-z]+"> *<span class="wb-inv(isible)*">Note de bas de page </span>[0-9\-a-z]+</a>,*</sup>';
const fr_wet_bot = '<dt>Note de bas de page [0-9\-a-z]+</dt>(?: |\n)*<dd id="fnb[0-9\-a-z]+">(?: |\n)*((.|\n)*?)<p class="f(oot)*n(ote)*-return"> *<a href="#fnb[0-9\-a-z]+-ref"> *<span class="wb-inv(isible)*"> *Retour à la référence de la note de bas de page *</span>[0-9\-a-z]+(<span class="wb-inv(isible)*"> *referrer *</span>)*</a> *</p>( |\n)*</dd>';
const dw_top = '<a href="#_ftn[0-9\-a-z]+" name="_ftnref[0-9\-a-z]+" title="">(.*?)</a>';
const dw_bot = '<div id="ftn[0-9\-a-z]+">(?:.|\n)*?<a href="#_ftnref[0-9\-a-z]+" name="_ftn[0-9\-a-z]+" title=""> *</a>((.|\n)*?)((<[^>]*>)|\ |\n)*?</div>';
const oca_top = '(<sup>)*\\([0-9\-a-z]+\\)(</sup>)*';
const oca_bot = '<p> *\\([0-9\-a-z]+\\) *(.*?)</p>';

// initial values for top/bot footnote regex
if (document.getElementById("top_footnote") !== null) {
  document.getElementById("top_footnote").value = en_wet_top;
}
if (document.getElementById("bot_footnote") !== null) {
  document.getElementById("bot_footnote").value = en_wet_bot;
}

// set top footnote regex value
function set_top_footnote_regex() {
  document.getElementById("top_warning").innerHTML = "";
	let footnote_format = document.getElementById("top_footnote_format").value;
  if (footnote_format === "en_wet") {
    document.getElementById("top_footnote").value = en_wet_top;
  }
  else if (footnote_format === "fr_wet") {
    document.getElementById("top_footnote").value = fr_wet_top;
  }
  else if (footnote_format === "dw") {
    document.getElementById("top_footnote").value = dw_top;
  }
  else if (footnote_format === "oca") {
    document.getElementById("top_footnote").value = oca_top;
    document.getElementById("top_warning").innerHTML = "Please double-check for false positives.";
  }
}

// set bottom footnote regex value
function set_bot_footnote_regex() {
  document.getElementById("bot_warning").innerHTML = "";
	let footnote_format = document.getElementById("bot_footnote_format").value;
  if (footnote_format === "en_wet") {
    document.getElementById("bot_footnote").value = en_wet_bot;
    document.getElementById("regex_sub").value = 1;
  }
  else if (footnote_format === "fr_wet") {
    document.getElementById("bot_footnote").value = fr_wet_bot;
    document.getElementById("regex_sub").value = 1;
  }
  else if (footnote_format === "dw") {
    document.getElementById("bot_footnote").value = dw_bot;
    document.getElementById("regex_sub").value = 1;
    document.getElementById("bot_warning").innerHTML = "Minor formatting errors may be introduced if the Dreamweaver paste is malformed enough.";
  }
  else if (footnote_format === "oca") {
    document.getElementById("bot_footnote").value = oca_bot;
    document.getElementById("regex_sub").value = 1;
  }
}

/*
=================================
Fix footnotes
=================================
*/

// get uploaded file, find footnotes, change their values, and download
function add_footnotes() {
	// read in uploaded file as string
	let file_reader = new FileReader();
	let html_file = document.getElementById("html_file").files[0];
	file_reader.onload = function(event) {
		let html_str = event.target.result.replaceAll("\r\n", "\n");
    // read in inputs
    let init_id = document.getElementById("init_id").value;
    let top_footnote = document.getElementById("top_footnote").value;
    let bot_footnote = document.getElementById("bot_footnote").value;
    let regex_sub = document.getElementById("regex_sub").value;
    let dup_footnotes = document.getElementById("dup_footnotes").value;
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
    // replace original footnote strings with WET footnotes
    edited_str = replace_footnote_str(edited_str, init_id, top_footnote, bot_footnote, regex_sub, dup_footnotes);
    // replace the div around bottom footnotes with WET module, if the div exists
    edited_str = add_footnote_div(edited_str, init_id);
    // add spaces and optionally commas between consecutive footnotes
    edited_str = format_consecutive_footnotes(edited_str, init_id, document.getElementById("consecutive_comma").checked);
    // translate footnote structure if needed
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
Deal with duplicate top footnotes
=================================
*/

// helper function to sort duplicate_footnote objects
function sort_duplicate_footnotes(a, b) {
  return a.top_location < b.top_location;
}

/* takes in a string formatted as i1, v1; i2, v2; ...
returns an array of objects with two properties:
1) top_location - the location of the duplicate top footnote relative to all top footnotes
2) bot_location - the bottom footnote location that the duplicate top footnote points to
sorted by the first property
*/
function get_duplicate_arr(duplicate_footnote_str) {
  // record top and bottom footnote locations of duplicate top footnotes in an array of objects
  let duplicate_footnotes = [];
  // parse duplicate footnotes string into array of pairs of values
  let duplicate_footnotes_str_arr = duplicate_footnote_str.split(';');
  for (let i = 0; i < duplicate_footnotes_str_arr.length; i++) {
    // for each pair, get the location of the duplicate top footnote and its bottom footnote value
    let value_pair = duplicate_footnotes_str_arr[i].split(',');
    if (value_pair.length > 1) {
      let top_location = parseInt(value_pair[0].trim());
      let bot_location = parseInt(value_pair[1].trim());
      duplicate_footnotes.push({top_location: top_location, bot_location: bot_location});
    }
  }
  // sort the array by top footnote location
  duplicate_footnotes.sort(sort_duplicate_footnotes);
  return duplicate_footnotes;
}

// creates array for footnote number ids, including duplicates
function get_top_footnote_ids(footnote_count, duplicate_footnotes, bot_duplicates) {
  // array of footnote number ids to return
  let footnote_nums = [];
  /*
  Add numbers for all top footnotes
  */
  // counter for current footnote id for non-duplicates
  let footnote_id = 1;
  // counter for current index in duplicate footnote array
  let duplicate_arr_ind = 0;
  // loop through number of top footnotes
  for (let i = 1; i <= footnote_count; i++) {
    // check if current top footnote is a duplicate
    if ((duplicate_footnotes.length > duplicate_arr_ind) && (i === duplicate_footnotes[duplicate_arr_ind].top_location)) {
      // if so, use its bottom footnote location
      footnote_nums.push(duplicate_footnotes[duplicate_arr_ind].bot_location);
      duplicate_arr_ind++;
    }
    // otherwise, use counter for non-duplicates
    else {
      footnote_nums.push(footnote_id);
      footnote_id++;
    }
  }
  /*
  Add letters for duplicate top footnotes
  */
  // counter for current letter to append
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let curr_letter_ind = 0;
  // loop through bottom footnotes that have multiple top footnote references
  for (let i = 0; i < bot_duplicates.length; i++) {
    // loop through top footnote ids to check whether they point to the current multiple reference bottom footnote
    for (let j = 0; j < footnote_nums.length; j++) {
      if (footnote_nums[j] === bot_duplicates[i]) {
        // if so, append a letter to the top footnote id to try to keep it unique
        footnote_nums[j] = footnote_nums[j] + letters[curr_letter_ind % 26];
        curr_letter_ind++;
      }
    }
    // reset letter counter for next multiple reference bottom footnote
    curr_letter_ind = 0;
  }
  return footnote_nums;
}

/*
=================================
Generate and format WET footnotes
=================================
*/

// formats top WET footnote
function get_top_footnote(init_id, footnote_ind, duplicate_id) {
  return '<sup id="' + init_id + footnote_ind + '-ref"><a class="fn-link" href="#' + init_id + footnote_ind + '"><span class="wb-inv">Footnote </span>' + footnote_ind + '</a></sup>';
}

// formats bottom WET footnote
function get_bot_footnote(init_id, ind, top_ref_id, bot_footnote_content) {
  return '<dt>Footnote ' + ind + '</dt>\n' +
  '<dd id="' + init_id + ind + '">\n' +
  bot_footnote_content + '\n' +
  '<p class="fn-return"><a href="#' + init_id + top_ref_id + '-ref"><span class="wb-inv">Return to footnote </span>' + ind + '</a></p>\n' +
  '</dd>';
}

// searches html for footnote regex statements and replaces them
function replace_footnote_str(html_str, init_id, top_regex_str, bot_regex_str, bot_regex_sub, duplicate_footnote_str) {
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
    // check for duplicate top footnotes
    let duplicate_footnotes = get_duplicate_arr(duplicate_footnote_str);
    // get unique array of bottom footnotes that have duplicate top footnote references
    let bot_duplicates = [];
    for (let i = 0; i < duplicate_footnotes.length; i++) {
      if (!bot_duplicates.includes(duplicate_footnotes[i].bot_location)) {
        bot_duplicates.push(duplicate_footnotes[i].bot_location);
      }
    }
    // loop through footnotes and number them with counter
    let output_str = html_str;
    // replace top footnotes, accounting for duplicates
    let top_footnote_ids = get_top_footnote_ids(top_matches.length, duplicate_footnotes, bot_duplicates);
    for (i = 0; i < top_matches.length; i++) {
        let top_footnote = get_top_footnote(init_id, top_footnote_ids[i]);
        output_str = output_str.replace(top_matches[i], top_footnote);
    }
    // replace bottom footnotes
    for (let i = 0; i < bot_matches.length; i++) {
        let bot_footnote_str = bot_matches[i];
        let ind = i + 1;
        let bot_footnote_content = bot_footnote_str.replace(bot_regex, "$" + bot_regex_sub);
        // add paragraph tag around content if needed
        if (!bot_footnote_content.includes("<p>")) {
          bot_footnote_content = "<p>" + bot_footnote_content + "</p>";
        }
        // get top footnote to link back to, which is the first top footnote that points to this bot footnote if there are duplicates
        let top_ref_id = ind;
        if (bot_duplicates.includes(ind)) {
          top_ref_id = top_ref_id + "a";
        }
        let bot_footnote = get_bot_footnote(init_id, ind, top_ref_id, bot_footnote_content);
        output_str = output_str.replace(bot_footnote_str, bot_footnote);
    }
    return output_str;
}

// creates WET div around bottom footnotes
function add_footnote_div(html_str, init_id) {
  let output_str = html_str.replace(/<div>( |\n)*<dt>Footnote 1<\/dt>/,
  `<div class="wb-fnote" role="note">
  <section>
    <h3 class="wb-inv" id="` + init_id + `">Footnotes</h3>
    <dl>
    <dt>Footnote 1</dt>`);
  output_str = output_str.replace(/<\/dd>( |\n)*<\/div>/, `</dd>
    </dl>
  </section>
</div>`);
return output_str;
}

// and spaces and optionally a comma between consecutive footnotes
function format_consecutive_footnotes(html_str, init_id, consecutive_comma) {
  let edited_str = html_str;
  // regex search to find consecutive footnotes - note that this assumes English footnotes and no "referrer", as this is how WET footnotes were formatted in replace_footnote_str (footnotes are translated later if required)
  const consecutive_footnote_regex = new RegExp('(Footnote *<\/span>[0-9 ]+<\/a>)([ ,]*)(<\/sup> *)(<sup id="' + init_id + '[0-9\-a-z]+-ref"> *<a class="fn-link")', "g");
  // add comma between consecutive footnotes if option is checked
  if (consecutive_comma) {
    edited_str = edited_str.replaceAll(consecutive_footnote_regex, "$1,$3$4");
  }
  // add space between consecutive footnotes
  return edited_str.replaceAll(consecutive_footnote_regex, "$1$2</sup> $4");
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
