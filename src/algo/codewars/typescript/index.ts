import {door} from "./doorOpening"
/**
  * transform  positive number to negative and negative to positive
  * oneliner solution: constinvertNum = (array: number[]) => array.map( num => -num )
  */
export const invertNum = (array: number[]) => {
  if (array.length <= 0) return []
  const invertArr = array.map(num => num >= 0 ? Number(`-${num}`) : Math.abs(Number(num)))
  return invertArr
}

/**
  * repeat n times string s
  */
export function repeatStr(n: number, s: string): string {
  return s.repeat(n);
}

/** Your goal in this kata is to implement a difference function, which subtracts one list from another and returns the result.
  * It should remove all values from list a, which are present in list b keeping their order.
  */
export function arrayDiff(a: number[], b: number[]): number[] {
   
  return a.filter(aEl => !b.includes(aEl) )
}


/**
  * Write a function that accepts an array of 10 integers (between 0 and 9), that returns a string of those numbers in the form of a phone number.
  * createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890" 
  */
export function createPhoneNumber(numbers: number[]): string {
  return `(${numbers.slice(0,3).join('')}) ${numbers.slice(3,6).join('')}-${numbers.slice(6).join('')}`  
}



/**
  * Welcome. In this kata, you are asked to square every digit of a number and concatenate them.
  * For example, if we run 9119 through the function, 811181 will come out, because 92 is 81 and 12 is 1.
  *Note: The function accepts an integer and returns an integer 
  */
export class Kata {
  static squareDigits(num: number): number {
    // may the code be with you
    return +[...num.toString()].reduce((prev,next) => prev + Math.pow(parseInt(next), 2),'')
  }
}

/** 
  * return time elapsed since midnight in millisecs 
  */
export const past = (h: number, m: number, s: number): number => {
  return (h * 36 *10 ** 5) + (m * 6 *10 ** 4 ) + (s * 10**3)    
}

/** 
  * transform number to roman notation 
  */
export function solution(num: number): string {
  // convert the number to a roman numeral
  type Quantifier = {u: string, val:number, mid?: string, next?: string}

  let res: string[] = [] 

  const table: Record<string, {u: string, val:number, mid?: string, next?: string}> = {
    units: {u:"I", val: 1, mid:"V", next: "X"},
    tens: {u:"X", val: 10, mid:"L", next: "C"},
    hundreds: {u: "C", val: 100, mid: "D", next: "M"},
    thousands: {u: "M", val: 1000}
  }
  const dividers: Array< keyof typeof table> = ['thousands', 'hundreds', 'tens', 'units']

  const  transformPattern = (n: number, quant: Quantifier ): string => {
    if (n <= 3) return quant.u.repeat(n) 
    if (n == 4 ) return `${quant.u}${quant.mid}`
    if(quant.mid && n > 4 && n < 9) return  `${quant.mid}${quant.u.repeat(n % 5)}` 
    if (n == 9 ) return `${quant.u}${quant.next}`
    throw new Error("invalid format")
  }

  const calc = (n: number) => {
    let rest = n 
    dividers.forEach(divider => {
      let supToDivider = Math.floor(rest / table[divider].val)
      if (supToDivider > 0) {
        res = [...res, transformPattern(supToDivider, table[divider])]
        rest =  rest % table[divider].val
      }
    })
  }

  calc(num)
  return res.join('') 
}


/** 
  * validating braces order
  */
export const validBraces = (braces: string): boolean =>  {
  let openBracesStack: string[] = []
  const map = new Map()
  map.set(')', '(')
  map.set(']','[')
  map.set('}', '{')

  for(let i = 0; i < braces.length;  i++ ) {
   const newOpeningBraces =  /[\(\[\{]/.test(braces[i]) 
   if (newOpeningBraces) {
     openBracesStack = [ ...openBracesStack, braces[i] ] 
     continue
   }
   const closingBraces = /[\)\]\}]/.test(braces[i]) 
   if (closingBraces) {
      const validBrace =  openBracesStack.slice(-1).toString() === map.get(braces[i]) && openBracesStack.splice(-1) ? true : false
      if (!validBrace) return false
   }
  }

  return openBracesStack.length <= 0 
}



/**
  * The goal of this exercise is to convert a string to a new string where each character in the new string is
  * "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string.
  * Ignore capitalization when determining if a character is a duplicate.
  * Examples

  * "din"      =>  "((("
  * "recede"   =>  "()()()"
  * "Success"  =>  ")())())"
  * "(( @"     =>  "))((" 
  */
export function duplicateEncode2(word: string){
  
  const wordLowerCase = word.toLowerCase()
  const duplicate = [... new Set(wordLowerCase.split(""))].reduce((acc, curr) =>  {
    acc += wordLowerCase.indexOf(curr) !== wordLowerCase.lastIndexOf(curr) ? curr : ""
    return acc
  },"" )
  const sanitizeDuplicate = duplicate.replace(/[^a-z0-9]/gi,'\\$&')
  console.log(sanitizeDuplicate)

  const duplicateRegex = new RegExp(`([${sanitizeDuplicate}])|(.)`, 'gi')
  const replacedDuplicate = word.replace(duplicateRegex, (match, p1, p2): string =>  p1 ? ')' : '(' )
  return replacedDuplicate 
}

/** 
  * Your task is to construct a building which will be a pile of n cubes. The cube
  * at the bottom will have a volume of n3 n^3 n3, the cube above will have volume of
  * (n−1)3 (n-1)^3 (n−1)3 and so on until the top which will have a volume of 13 1^3 13.
  * 
  * You are given the total volume m of the building. Being given m can you find the number n 
  * of cubes you will have to build?
  * 
  * The parameter of the function findNb (find_nb, find-nb, findNb, ...) will be an integer
  * m and you have to return the integer n such as 
  * n3+(n−1)3+(n−2)3+...+13=m n^3 + (n-1)^3 + (n-2)^3 + ... + 1^3 = m n3+(n−1)3+(n−2)3+...+13=m 
  * if such a n exists or -1 if there is no such n.
  * Examples:
  * 
  * findNb(1071225) --> 45
  * 
  * findNb(91716553919377) --> -1
 */
export function findNb(m: number): number {
  let total = 0
  let n = 0 
  while (total < m) {
    n++
    total += n ** 3
  } 
  return total === m ? n : -1 
}

/** 
  * door exercise:
  * managed with a state machine
  */
export {door}
