

/* not working */

export const mergeSort = (data: Array<number>): Array<number> => {
  if (data.length <= 1) return data
  // diviser le tableau 
  const middle = Math.floor(data.length / 2)
  const leftArray  =  mergeSort(data.slice(0, middle)) 
  const rightArray = mergeSort(data.slice(middle))

  // console.log("left", data.slice(0, middle))
  // console.log("right", data.slice(middle))
  // return [...leftArray, ...rightArray]  
  return merge(leftArray, rightArray) 
}

const merge = (left: number[], right: number[]): number[] => {
  let output: number[] = []
  let i = 0 
  let j  = 0

    while ((i < left.length) && (j < right.length)) {
        if (left[i] < right[j]) {
            output = [...output, left[i]]
            i++
        } else {
            output = [...output, right[j]]
            j++
        }
    }
    
    output =[...output, ...left.slice(i)]
    output =[...output, ...right.slice(i)]
    
    return output
}
