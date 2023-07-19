/**
 * @jest-environment jsdom
 */
const page = require('../page')
const R = require('ramda');
const  {sortResources} = require('../src/directory') 
//import {sortResources} from '../src/directory';

const items = [{"name": "a", "date": [2021, 3]},
               {"name": "bell", "date": [2021, 7]},
               {"name": "emil", "date": [2011, 6]},
               {"name": "abe", "date": [2013, 9]},
               {"name": "crane", "date": [2021, 3]}];


describe('Items are sorted correctly by date descending', () =>{
    const orderedByDateDesc = [...items]
    //orderedByDateDesc.sort
    expect(sortResources(items)).toBe(orderedByDateDesc)
})
