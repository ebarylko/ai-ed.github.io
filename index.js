window.onload = async () => {
	// get the div where we will add each resource element
	table = document.getElementById("resources");

	// attempt to read resources.json

	try {
		res = await fetch("resources.json");
	} catch {
		console.log("Could not read resources.json.");
		return;
	}

	if (!res.ok) {
		console.log("Could not read resources.json.");
		return;
	}

	// get JavaScript object
	resources = await res.json();

	// resources is an array; iterate over it
	for (let i = 0; i < resources.length; i++) {
		let r = resources[i];

		// append this resource to the table
		table.innerHTML += `
			<tr>
				<td class="name">${r.name}</td>
				<td>${r.blurb}</td>
				<td>${r.released}</td>
				<td class="link"><a href="${r.link}">View &nearr;</a></td>
			</tr>
		`;
	}
}
