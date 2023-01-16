import {bubbleSort, mergeSort} from "./algo"
import * as cw from "./algo/codewars/typescript"

const testArray = [6, 5, 1, 4, 1, 2, 4, 3]
const positiveNegativeArray = [6, 5, 1, -4, 1, -2, 4, -3]

// bubble sort and merge sort
const runSorting = () => {
  // TODO: fix merge sort (not working)
  try {
    const bubbleResult = bubbleSort(testArray) 
    // const mergeResult =mergeSort(testArray)
    console.log('bubble:', bubbleResult)
    // console.log('merge:', mergeResult)
  } catch (err) {
    if (err instanceof TypeError) console.log(err.message)
    else console.log(err)

  }
}

const runCodewarsAlgo = () => {
  try {
    
    // console.log(positiveNegativeArray, ' inverting array: ', cw.invertNum(positiveNegativeArray) )
    console.log('cata', cw.Kata.squareDigits(9119))

  } catch (err) {
    console.log(err)
  }
}

// runSorting()
runCodewarsAlgo()


export default {}
