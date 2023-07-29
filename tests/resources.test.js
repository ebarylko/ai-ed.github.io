const R = require('ramda');
const  {sortResources, filterResources} = require('../src/resources') 

const items = [
    {"name": "a", "date": [2021, 3]},
    {"name": "bell", "date": [2021, 7]},
    {"name": "emil", "date": [2011, 6]},
    {"name": "abe", "date": [2013, 9]},
    {"name": "crane", "date": [2021, 3]}
];


describe('sortResources', () =>{
    describe('When using newest to order', () => {
        it("Sorts by newest date first", () => {
            const orderedByDateDesc = R.sortWith([R.descend(R.prop("date"))], items)
            expect(sortResources(items, "newest")).toEqual(orderedByDateDesc)
        })
    })
    describe('When using oldest to order', () => {
        it("Sorts by oldest date first", () => {
            const orderedByDateAsec = R.sortWith([R.ascend(R.prop("date"))], items)
            expect(sortResources(items, "oldest")).toEqual(orderedByDateAsec)
        })
    })

    describe('When using name to order', () => {
        it("Sorts by name alphabetically", () => {
            const orderedByName = R.sortBy(R.prop("name"), items);
            expect(sortResources(items, "name")).toEqual(orderedByName)
        })
    })

    describe('When using nothing to order', () => {
        it("Does not change the order", () => {
            expect(sortResources(items, "none")).toEqual(items)
        })
    })
})





function isIncluded(tag, item) {
    return R.includes(tag, item);
}

function hasTags(tags, item) {
    console.log(item.tags)
    isWithin = R.partialRight(isIncluded, item.tags);
    return R.all(isWithin, tags);
}

describe('filterResources', () =>{
    const taggedItems = [
        {"name": "a", "tags": ["1", "2"]},
        {"name": "bell", "tags": ["1", "3"]},
        {"name": "emil", "tags": ["1"]},
        {"name": "abe",  "tags": ["1", "4"]},
        {"name": "crane", "tags": ["2"]}
    ];
    describe('When filtering by a collection of tags', () => {
        it.each([
            [["1"], [["1", true], ["2", false], ["3", false], ["4", false]]]
            // [["1", "2"], [["1", true], ["2", true], ["3", false], ["4", false]]]

        ])("Returns every tool with those tags", (filter, tags) => {
            const filteredTags = R.map((tag) => R.includes(tag), filter)
            const hasTagsWithOne = R.allPass(filteredTags)
            const toolsWithOne = R.filter(R.compose(hasTagsWithOne, R.prop('tags')), taggedItems) 
            const tagsToFilterBy = new Map(tags)
            expect(filterResources(taggedItems, tagsToFilterBy)).toEqual(toolsWithOne)
        })
        // it("Returns every tool with that tag", () => {
        //     const toolsWithOne = R.filter(R.compose(R.includes("1"), R.prop('tags')), taggedItems) 
        //     const tagsToFilterBy = new Map([["1", true], ["2", false], ["3", false], ["4", false]])
        //     expect(filterResources(taggedItems, tagsToFilterBy)).toEqual(toolsWithOne)
        // })
    })

    // describe('When filtering by a unique set of tags', () => {
    //     it("Returns the sole tool with those tags", () => {
    //         const toolsWithOneAndTwo = R.filter(R.compose(R.includes("2"), R.includes("1"), R.prop('tags')), taggedItems)
    //         const tagsToFilterBy = new Map([["1", true], ["2", true], ["3", false], ["4", false]])
    //         expect(filterResources(taggedItems, tagsToFilterBy)).toEqual(toolsWithOneAndTwo)
    //     })
    // })

//     describe('When filtering by a tag which no tool has', () => {
//         it("Returns an empty collection", () => {
//             const orderedByName = R.sortBy(R.prop("name"), items);
//             expect(sortResources(items, "name")).toEqual(orderedByName)
//         })
//     })
})
