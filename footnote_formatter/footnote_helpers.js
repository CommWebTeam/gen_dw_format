// get uploaded file, find indices with footnote, change their values, and download
function add_footnotes() {
	// read in uploaded file as string
	let file_reader = new FileReader();
	let html_file = document.getElementById("html_file").files[0];
	file_reader.onload = function(event) {
		const html_str = event.target.result;
    const top_regex_str = document.getElementById("top_footnote").value;
    const bot_regex_str = document.getElementById("bot_footnote").value;
    const bot_regex_sub = document.getElementById("regex_sub").value;
    const duplicate_footnotes = document.getElementById("dup_footnotes").value;
    let edited_str = replace_footnote_str(html_str, top_regex_str, bot_regex_str,
                                          bot_regex_sub, duplicate_footnotes);
    edited_str = add_footnote_div(edited_str);
    edited_str = add_consecutive_commas(edited_str);
    if (document.getElementById("lang").value === 'f') {
      edited_str = translate_footnotes(edited_str);
    }

		download(edited_str, "footnotes.html", "text/html");
	}
	file_reader.readAsText(html_file);
}

/* helper functions */

// returns indices and values of duplicate footnotes
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

// searches html for footnote regex statements and replaces them
function replace_footnote_str(html_str, top_regex_str, bot_regex_str, bot_regex_sub,
                              duplicate_footnotes) {
    // find indices of matches
    const top_regex = new RegExp(top_regex_str, "g");
    const top_matches = html_str.match(top_regex);
    // print number of matches for debugging
    console.log("Number of top footnotes found:");
    if (top_matches === null) {
      console.log(0);
      return html_str;
    }
    console.log(top_matches.length);
    const bot_regex = new RegExp(bot_regex_str, "g");
    const bot_matches = html_str.match(bot_regex);
    console.log("Number of bottom footnotes found:");
    if (bot_matches === null) {
      console.log(0);
      return html_str;
    }
    console.log(bot_matches.length);
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
          '<dd id="fnb' + ind + '">\n' +
          bot_footnote_content + '\n' +
          '<p class="footnote-return"><a href="#fnb' + ind + '-ref"><span class="wb-invisible">Return to footnote </span>' + ind + '</a></p>\n' +
          '</dd>';
        output_str = output_str.replace(bot_footnote_str, bot_footnote);
    }
    // replace top footnotes - check for duplicate footnotes
    let footnote_nums_dup = get_footnote_nums(num_footnotes, duplicate_footnotes);
    for (i = 0; i < num_footnotes; i++) {
        let footnote_ind = footnote_nums_dup[i];
        let top_footnote = '<sup id="fnb' + footnote_ind + '-ref"><a class="footnote-link" href="#fnb' + footnote_ind + '"><span class="wb-invisible">Footnote </span>' + footnote_ind + '</a></sup>';
        output_str = output_str.replace(top_matches[i], top_footnote);
    }
    return output_str;
}

// creates WET div around bottom footnotes
function add_footnote_div(html_str) {
  let output_str = html_str.replace(/<div>([\s\n]*)<dt>Footnote 1<\/dt>/,
  `<div class="wet-boew-footnotes" role="note">
  <section>
    <h3 class="wb-invisible" id="fnb">Footnotes</h3>
    <dl>
    <dt>Footnote 1</dt>`);
  output_str = output_str.replace(/<\/dd>([\s\n]*)<\/div>/, `</dd>
    </dl>
  </section>
</div>`)
return output_str;
}

// adds commas for consecutive top footnotes
function add_consecutive_commas(html_str) {
  let output_str = html_str.replaceAll(/Footnote *<\/span>([0-9 ]+)<\/a> *<\/sup> *<sup id="fnb([0-9]+)-ref"> *<a class="footnote-link"/g,
  'Footnote </span>$1</a>,</sup><sup id="fnb$2-ref"><a class="footnote-link"')
  return output_str;
}

// changes specific footnote strings to french
function translate_footnotes(html_str) {
  let output_str = html_str.replaceAll("Return to footnote", "Retour à la référence de la note de bas de page");
  output_str = output_str.replaceAll(/Return to table([0-9 ]*)footnote/g, "Retour à la tableau$1note");
  output_str = output_str.replaceAll("Footnotes", "Notes de bas de page");
  output_str = output_str.replaceAll("Footnote", "Note de bas de page");
  return output_str;
}
