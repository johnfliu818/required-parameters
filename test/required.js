const expect = require('chai').expect
const reqthrow = require('../required').throw
const reqthrowall = require('../required').throwAll
const reqlist = require('../required').list
const reqfirst = require('../required').first

describe('required(hash)', () => {
    let apple = 'two apples'
    let orange = 3
    let pear = {}
    let grape = null
    let soup

    it('returns correct list of null fields', () => {
        expect(reqlist({apple, orange, pear})).to.deep.equal([])
        expect(reqlist({})).to.deep.equal([])
        expect(reqlist({apple, orange, grape})).to.deep.equal(['grape'])
        expect(reqlist({pear, soup})).to.deep.equal(['soup'])
        expect(reqlist({grape, soup})).to.deep.equal(['grape', 'soup'])        
    })

    it('returns first null field', () => {
        expect(reqfirst({apple, orange, pear})).to.equal(undefined)
        expect(reqfirst({})).to.equal(undefined)
        expect(reqfirst({apple, orange, grape})).to.equal('grape')
        expect(reqfirst({pear, soup})).to.equal('soup')
        expect(reqfirst({grape, soup})).to.equal('grape')        
    })

    it('throws exception properly', () => {
        expect((() => { reqthrowall({apple, orange, pear}) })).to.not.throw()
        expect((() => { reqthrowall({}) })).to.not.throw()
        expect((() => { reqthrowall({apple, orange, grape}) })).to.throw('grape is required')
        expect((() => { reqthrowall({pear, soup}) })).to.throw('soup is required')
        expect((() => { reqthrowall({grape, soup}) })).to.throw('grape, soup are required')
    })

    it('throws exception of first item', () => {
        expect((() => { reqthrow({apple, orange, pear}) })).to.not.throw()
        expect((() => { reqthrow({}) })).to.not.throw()
        expect((() => { reqthrow({apple, orange, grape}) })).to.throw('grape is required')
        expect((() => { reqthrow({pear, soup}) })).to.throw('soup is required')
        expect((() => { reqthrow({grape, soup}) })).to.throw('grape is required')
    })

    it('can handle options', () => {
        expect(reqlist({apple, orange, pear}, 'snzfu')).to.deep.equal([])
        expect(reqlist({apple, orange, grape}, 'nu')).to.deep.equal(['grape'])
        expect(reqlist({apple, orange, grape}, 'n')).to.deep.equal(['grape'])
        expect(reqlist({apple, orange, grape}, 'u')).to.deep.equal([])
        expect(reqlist({grape, pear, soup})).to.deep.equal(['grape', 'soup'])
        expect(reqlist({grape, pear, soup}, 'u')).to.deep.equal(['soup'])
        expect(reqlist({grape, pear, soup, extra: '', f: false}, 'nu')).to.deep.equal(['grape', 'soup'])
        expect(reqlist({grape, pear, soup, extra: '', f: false}, 'snu')).to.deep.equal(['grape', 'soup', 'extra'])
        expect(reqlist({grape, pear, soup, extra: '', f: false}, 'snzfu')).to.deep.equal(['grape', 'soup', 'extra', 'f'])
    })

})