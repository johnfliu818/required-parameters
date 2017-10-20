const expect = require('chai').expect
const required = require('../simple')
const hasnull = required.hasnull
const reqthrows = required.throws

describe('required(array)', () => {
    let apple = 'two apples'
    let orange = 3
    let pear = {}
    let grape = null
    let soup

    it('returns correct list of null fields', () => {
        expect(required(apple, orange, pear)).to.deep.equal([])
        expect(required()).to.deep.equal([])
        expect(required(apple, orange, grape)).to.deep.equal(['2'])
        expect(required(pear, soup)).to.deep.equal(['1'])
        expect(required(grape, soup)).to.deep.equal(['0', '1'])        
    })

    it('returns correct boolean', () => {
        expect(hasnull(apple, orange, pear)).to.equal(false)
        expect(hasnull()).to.equal(false)
        expect(hasnull(apple, orange, grape)).to.equal(true)
        expect(hasnull(pear, soup)).to.equal(true)
        expect(hasnull(grape, soup)).to.equal(true)        
    })

    it('throws exception properly', () => {
        expect((() => { reqthrows(apple, orange, pear) })).to.not.throw()
        expect((() => { reqthrows() })).to.not.throw()
        expect((() => { reqthrows(apple, orange, grape) })).to.throw('2')
        expect((() => { reqthrows(pear, soup) })).to.throw('1')
        expect((() => { reqthrows(grape, soup) })).to.throw('0, 1')
    })
})