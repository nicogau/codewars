import {expect} from "chai"

import * as codewars from "./index"

describe("codewars algo exercices:", () => {

  describe("repeat a given string", () => {
    it("should return blablabla", () => {
      const result = codewars.repeatStr(3, "bla")
      expect(result).to.equal("blablabla")

    } )
  })

  describe("get difference of 2 arrays. keep only element in a not present in b keep order ", () => {
    const a = [ 1, 4, 2, 5, 3, 8]
    const b =  [5,6,7,8, 4]
    it("should return [1, 2, 3]", () => {
      const result = codewars.arrayDiff(a, b)
      expect(result).deep.equal([1, 2, 3])
    })
  })

  describe('test templating phone numbers', () => {
    it("should return (123) 456-7890", () => {
      const result = codewars.createPhoneNumber([1,2,3,4,5,6,7,8,9,0])
      expect(result).to.equal("(123) 456-7890")
    })
  })

  describe("test square digits function", () => {
    it("should return 818181 ", () => {
     const result = codewars.Kata.squareDigits(999)  
     expect(result).to.equal(818181)
    })
  })
  // set more test here
})

describe("Fixed Tests", () => {
  it("Tests", () => {
    expect(codewars.past(0, 1, 1)).to.equal(61000)
    expect(codewars.past(1, 1, 1)).to.equal(3661000)
    expect(codewars.past(0, 0, 0)).to.equal(0)
    expect(codewars.past(1, 0, 1)).to.equal(3601000)
    expect(codewars.past(1, 0, 0)).to.equal(3600000)
  });
});

describe("transform base10 number to Roman notation", () => {
  it("tests multiple data", () => {
    const unitsArr = Array(9).fill(null).map((_, index) => index +1) 
    const unitsRomanArr = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'] 
    unitsArr.forEach((el, index) => {
      expect(codewars.solution(el)).to.equal(unitsRomanArr[index])
    })
  })

  it("test 1444 should return MCDXLIV ", () => {
      expect(codewars.solution(1444)).to.equal("MCDXLIV")
  })
  it("test 50 should return L ", () => {
      expect(codewars.solution(50)).to.equal("L")
  })

  describe("duplicate encode", () => {
    it("test bunch of values", () => {
      expect(codewars.duplicateEncode2(")((aabbcc")).to.equal("())))))))")
      expect(codewars.duplicateEncode2("(( @")).to.equal("))((")
    })
  })
  
  // cubic house exercise
  describe("Fixed Tests nbMonths", function() {
    it("Basic tests", function() {
      expect(codewars.findNb(4183059834009)).to.equal( 2022)
      expect(codewars.findNb(24723578342962)).to.equal( -1)
      expect(codewars.findNb(40539911473216)).to.equal( 3568)
    });
  });
  
  // door opening exercise
  describe('should return  the timeline of the door opening', ()=> {
    it('should return "12345554321000" given "P......P......" as input', () => {
      // states.indexOf(result).should.not.equal(-1)
      // expect(codewars.door("P....")).to.equal('12345')
      expect(codewars.door("P......P......")).to.equal('12345554321000')
      // expect(codewars.door('P......P......')).to.equal('12345554321000')
    })
  }) 

})


