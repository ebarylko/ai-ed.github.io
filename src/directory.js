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
function populate(res) {
	// locate table which we will populate with resources
	let table = document.getElementById("resources");

	// reset table's innerHTML to just include the headers
	table.innerHTML = HEADERS;

	for (const r of res) {
		// tags is a string of <span>s where each <span> is a tag
		let tags = "";

		for (const t of r.tags)
			tags += `<span class="tag">${t}</span>`;

		// add row to table about this resource
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

let resources; // array of every resource; DO NOT CHANGE OUTSIDE OF window.onload()

// map of all tags; use tag_disabled.keys() to see all tags;
// if tag_disabled.get(tag) is true, then that tag is DISABLED.
// if tag_disabled.get(tag) is false, then it is DISABLED.
// this is for filtering resources.
let tag_disabled = new Map();

// sort_mode
// modes (case-sensitive; modes are lowercase):
// - newest
// - oldest
// - name (alphabetical)
let sort_mode = "newest";

// filter the resources array with respect to tag_disabled and then sort with respect to sort_mode
function update() {
	let res = [...resources]; // copy resources

	// perform filtering and sorting

	populate(res);
}

window.onload = async () => {
	header(); // add header to document

	// load resources from resources.json
	// NOTE: resources is an array local to this file defined above

	try {
		let response = await fetch("/resources.json"); 
		resources = await response.json();
	} catch {
		console.log("There was an error retrieving the database.");
		return;
	};

	// get container for tag buttons
	let tags = document.getElementById("tags");

	// populate tag_disabled and tags list by parsing all tags in each resource
	for (const r of resources) {
		for (const t of r.tags) {
			// check if this tag has been taken into account
			if (!tag_disabled.has(t)) {
				// start with no tags disabled
				tag_disabled.set(t, false);

				// create tag span
				let e = document.createElement("span");
				e.classList.add("tag-btn");
				e.innerHTML = t; // innerHTML is the tag itself

				// when this span is clicked, it should toggle its disabled state
				e.onclick = () => {
					// toggle
					tag_disabled.set(t, tag_disabled.get(t) ? false : true);
					// this works because none of the spans start with the disabled class
					e.classList.toggle("disabled");
					update(); // filtering changed; update the listing of resources
				};

				// add this tag button to the list of tags
				tags.appendChild(e);
			}
		}
	}

	// handle change of sort mode
	let sort_by = document.getElementById("sort-by");
	sort_by.onchange = () => {
		sort_mode = sort_by.value;
		update(); // sort mode changed; update the listing of resources
	}

	// populate table with all resources
	populate(resources);
};
