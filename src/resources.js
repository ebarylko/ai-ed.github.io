import { header } from "./ai-ed.js";

const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
/* Headers for a table of resources
const HEADERS = `
	<tr>
		<th>Name</th>
		<th>Affiliated</th>
		<th>Tags</th>
		<th>Released</th>
		<th>Access</th>
	</tr>
`;
*/

function getcol(seed) {
	const sz = 64;
	let cols = [0, 0, 0];

	for (let i = 0, j = 0; i < 3; i++) {
		// 0x1f is the lower 5 bits of seed[j]; value is 0..63
		cols[i] = 0xdf + 2*(seed.charCodeAt(j++) & 0x1f) - 32;
	}

	let col = "#";

	for (const c of cols)
		col += c.toString(16);

	return col;
}

// res: array of resources
// to see what a resource object contains, see resources.json

// first finds the element to store resources (i.e <table>)
// appends a resource element to this collection for every resource in res

function populate(res) {
	document.getElementById("info").innerHTML = `<p class="info">${res.length} resources loaded.</p>`;
	let flex = document.getElementById("resources");
	// reset innerHTML of flex container
	flex.innerHTML = "";

	for (const r of res) {
		let tags = "";
		for (const t of r.tags)
			tags += `<span class="tag">${t}</span>`;

		flex.innerHTML += `
			<div class="resource" style="background-color: ${getcol(r.name)};">
				<h1>${r.name}</h1>
				${
					r.affiliated == r.name ? "" :
					"<h2>" + r.affiliated + "</h2>"
				}
				<h3>${MONTHS[r.date[1] - 1]} ${r.date[0]}</h3>
				<p>${r.blurb}</p>
				<p>${tags}</p>
				<a href="${r.link}">${r.name} &nearr;</a>
			</div>
		`;
	}
}

let resources;

// map of all tags
// each entry in map looks like [tag, state]
let tag_enabled = new Map();

// sort_mode: modes (case-sensitive; modes are lowercase):
// newest, oldest, name (alphabetical)
let sort_mode = "newest";

function filterResources(res) {
	// if size is 0, then all tags are enabled

	let new_res = res;

	// Iterate over each tag in the tag_enabled map
	// Check if the current tag is enabled, ie state is true or false

	let is_enabled = false;

	for (const [tag, state] of tag_enabled) {
		if (state) {
			is_enabled = true;
			// Filter the new_res array based on the enabled tag
			// r.tags.includes(tag) checks if the current resource's tags include the enabled tag. 
			// If yes, it returns true, keeping the resource in the filtered array.
			new_res = new_res.filter((r) => r.tags.includes(tag));
		}
	}

	// if no tags are enabled, then all tags are enabled
	if (!is_enabled)
		return res;

	return new_res;
}

function sortResources(res) {
	// depending upon the current sort_mode, extracted from sort_by html class
	// sort the items in the res array using sort method of the array

	// a and b represent two elements in the res array
	// a.date represents [year, month] array
	// new Date convert the date: [year, month] array into a date object

	// for name, compare the values of the strings
	// depending upon the string comparison, return -1,0,1 respectively

	switch (sort_mode) {
		case "newest":
			res.sort(function(a, b){
				return new Date(b.date) - new Date(a.date)
			});
			break;
		case "oldest":
			res.sort(function(a, b){
				return new Date(a.date) - new Date(b.date)
			});
			break;
		case "name":
			res.sort(function(a, b){
				return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
			});
			break;
		default:
			break;
	}
	return res;
}

	
function update() {
	let res = [...resources];
	let filtered = filterResources(res);
	let sorted_and_filtered = sortResources(filtered);
	
	populate(sorted_and_filtered);
}

window.onload = async () => {
	header();

	try {
		let response = await fetch("/resources.json");
		resources = await response.json();
	} catch {
		console.log("There was an error retrieving the database.");
		return;
	};

	let tags = document.getElementById("tags");

	for (const r of resources) {
		for (const t of r.tags) {
			// check if the map has the tag
			// if it doesnt, create the tag button and add tag in the map
			if (!tag_enabled.has(t)) {

				tag_enabled.set(t, false);

				// create tag button
				// Eg: <span id="tag-btn">Chat</span>
				let e = document.createElement("span");
				e.classList.add("tag-btn");
				e.innerHTML = t;

				// when tag button is clicked
				// change the state of the "true/false value"
				e.onclick = () => {
					tag_enabled.set(t, tag_enabled.get(t) ? false : true);
					e.classList.toggle("enabled");
					update();
				};

				// add tag button to the div with id tags
				tags.appendChild(e);
			}
		}
	}

	// sorting
	// default sort_mode = newest
	// if sorted_by options value changes, update the table

	let sort_by = document.getElementById("sort-by");
	sort_by.onchange = () => {
		sort_mode = sort_by.value;
		update();
	}

	update();
};
