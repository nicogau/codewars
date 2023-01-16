/* sort an array of string or number
 *  
 * return a sorted copy of data array   
 */
export const bubbleSort = <T extends string | number> (data: Array<T>): Array<T> => {
  let unorderedPass = true
  let dataCopy = [...data]

  while (unorderedPass) {
    let hasOrderedEl = 0 
    unorderedPass = false

    for (let i = 1; i < dataCopy.length; i++){
      try {
        if (isCurLowerThanPrev<T>(dataCopy[i], dataCopy[i-1] )) {
          inverseArrayValue<T>(dataCopy, i ) 
          unorderedPass = true
        }
      } catch(err: unknown){ 
         throw err 
      }
    }
  }

  return dataCopy
}

// helpers 
const isCurLowerThanPrev = <T extends string | number>(cur: T, prev: T): boolean => {
    if (typeof prev === 'number'  && typeof cur === 'number') return cur < prev 
    if (typeof prev === 'string'  || typeof cur === 'string') return  String(cur).localeCompare(String(prev)) < 0
    else throw new TypeError('value must be string or number') 
}

const inverseArrayValue = <T extends string | number>(arr:Array<T>, index:  number  ): void => {
  let temp: T  = arr[index-1]
  arr[index-1] =  arr[index]
  arr[index] = temp 
}


