const expect = require('chai').expect
const ensurethrow = require('../ensure').throw
const ensurethrowall = require('../ensure').throwAll
const ensurelist = require('../ensure').list
const ensurefirst = require('../ensure').first

describe('required(hash)', () => {
    let apple = 'two apples'
    let orange = 3
    let pear = {}
    let grape = null
    let soup
    let age = 16

    it('returns correct list of null fields', () => {
        expect(ensurelist({apple, orange, pear, age: age > 13})).to.deep.equal([])
        expect(ensurelist({})).to.deep.equal([])
        expect(ensurelist({apple, orange, grape, age: age > 18})).to.deep.equal(['grape', 'age'])
        expect(ensurelist({pear, soup})).to.deep.equal(['soup'])
        expect(ensurelist({age: age > 18, grape, soup})).to.deep.equal(['age', 'grape', 'soup'])        
    })

    it('returns first null field', () => {
        expect(ensurefirst({apple, orange, pear, age: age > 13})).to.equal(undefined)
        expect(ensurefirst({})).to.equal(undefined)
        expect(ensurefirst({apple, orange, grape, age: age > 18})).to.equal('grape')
        expect(ensurefirst({pear, soup})).to.equal('soup')
        expect(ensurefirst({age: age > 18, grape, soup})).to.equal('age')        
    })

    it('throws exception properly', () => {
        expect((() => { ensurethrowall({apple, orange, pear, age: age > 13}) })).to.not.throw()
        expect((() => { ensurethrowall({}) })).to.not.throw()
        expect((() => { ensurethrowall({apple, orange, grape, age: age > 18}) })).to.throw('grape, age are required')
        expect((() => { ensurethrowall({pear, soup}) })).to.throw('soup is required')
        expect((() => { ensurethrowall({age: age > 18, grape, soup}) })).to.throw('age, grape, soup are required')
    })

    it('throws exception of first item', () => {
        expect((() => { ensurethrow({apple, orange, pear, age: age > 13}) })).to.not.throw()
        expect((() => { ensurethrow({}) })).to.not.throw()
        expect((() => { ensurethrow({apple, orange, grape, age: age > 18}) })).to.throw('grape is required')
        expect((() => { ensurethrow({pear, soup}) })).to.throw('soup is required')
        expect((() => { ensurethrow({age: age > 18, grape, soup}) })).to.throw('age is required')
    })
})