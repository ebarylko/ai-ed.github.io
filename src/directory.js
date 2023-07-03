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
const HEADERS = `
	<tr>
		<th>Name</th>
		<th>Affiliated</th>
		<th>Tags</th>
		<th>Released</th>
		<th>Access</th>
	</tr>
`;

// res: array of resources
// to see what a resource object contains, see resources.json

// first finds the resources class (i.e <table>)
// adds the header inside that table
// goes through every resource, creates a span class for each tag of the resources
// generates html for each resource and appends it to the table.

function populate(res) {

	let table = document.getElementById("resources");
	table.innerHTML = HEADERS;

	for (const r of res) {

		let tags = "";
		for (const t of r.tags)
			tags += `<span class="tag">${t}</span>`;

		table.innerHTML += `
			<tr>
				<td>${r.name}</td>
				<td>${r.affiliated}</td>
				<td style="max-width: 256px;">${tags}</td>
				<td>${MONTHS[r.date[1] - 1]} ${r.date[0]}</td>
				<td><a href="${r.link}">${r.name} &nearr;</a></td>
			</tr>
		`;
	}
}

let resources;

// map of all tags
// each entry in map looks like [tag, state]
let tag_disabled = new Map();

// sort_mode: modes (case-sensitive; modes are lowercase):
// newest, oldest, name (alphabetical)
let sort_mode = "newest";


function filterResources(res) {

	// Iterate over each tag in the tag_disabled map
	// Check if the current tag is disabled, ie state is true or false
	
	for (const [tag, state] of tag_disabled) {
		if (state) {

			// Filter the res array based on the disabled tag
			// !r.tags.includes(tag) checks if the current resource's tags include the disabled tag. 
			// If not, it returns true, keeping the resource in the filtered array.

			res = res.filter((r) => !r.tags.includes(tag));
		}
	}
	return res;
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
			if (!tag_disabled.has(t)) {

				tag_disabled.set(t, false);

				// create tag button
				// Eg: <span id="tag-btn">Chat</span>
				let e = document.createElement("span");
				e.classList.add("tag-btn");
				e.innerHTML = t;

				// when tag button is clicked
				// change the state of the "true/false value"
				e.onclick = () => {
					tag_disabled.set(t, tag_disabled.get(t) ? false : true);
					e.classList.toggle("disabled");
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

	populate(resources);
};
