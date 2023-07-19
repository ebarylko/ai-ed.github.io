const R = require('ramda');
const  {sortResources} = require('../src/resources') 

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
})
