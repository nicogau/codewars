
/**
  * door opening
  */
export const door = (events:string): string => {
  const MIN_STEP = 1
  const MAX_STEP = 5
  const IDLE_STATE = 0

  const data = {
   result : '',
   currentStep: IDLE_STATE  
  }

  // create a  new state machine
  const state = createStateMachine()

  // process each event
  const doorTiming = () => {
    try {
      for(let i = 0; i < events.length; i++){
        const event = events[i]
        dispatchEvent(state, event)
      }
      return data.result
    } catch(err) {
      throw err
    }
  }

  /* manage the events */
  const dispatchEvent = (state: ReturnType<typeof createStateMachine> ,event: string) => {
    switch(event) {
      case ".": 
        noAction()
        break
      case "P":
        push()
        break
      case "O":
        revert()
        break
      default:
        throw new Error("wrong format")
    }
  }

  /* events actions */
  // push button action
    const push  = () => {
      state.pushButtonEvent()

      switch(state.currentState()) {
        case 'isClosed':
          nextStep()
          break
        case 'closingPaused':
          pauseStep()
          break
        case 'closing':
          prevStep()
          break
        case 'openingPaused':
          pauseStep()
          break
        case 'opening':
          nextStep()
          break
        case 'isOpened':
          prevStep()
          break
        break
      }
  }

  // obstacle action
  const revert  = () => {
      state.obstacleEvent()

      switch(state.currentState()) {
        case 'opening':
          nextStep()
          break
        case 'closing':
          prevStep()
          break
      }
  }
  
 // no new action (obstacle or push) 
  const noAction =  () => {
      switch(state.currentState()) {
        case 'isClosed':
          idleStep()
          break
        case 'closingPaused':
          pauseStep()
          break
        case 'closing':
          prevStep()
          break
        case 'openingPaused':
          pauseStep()
          break
        case 'opening':
          nextStep()
          break
        case 'isOpened':
          data.result += data.currentStep.toString()
          break
        break
      }
  }
 
  /* updating step helpers */

  const nextStep =  () => {
    data.currentStep += 1
    data.result += data.currentStep.toString()

    if (data.currentStep == MAX_STEP) {
      state.transition() 
    }
  }

  const prevStep =  () => {
    data.currentStep -= 1
    data.result += data.currentStep.toString()

    if (data.currentStep == MIN_STEP) {
      data.currentStep = IDLE_STATE
      state.transition() 
    }
  }

  const idleStep =  () => {
    data.currentStep = IDLE_STATE 
    data.result += data.currentStep.toString()
  }
  
  const pauseStep =  () => {
    data.result += data.currentStep.toString()
  }

  /* main */
  try {
    const timingString = doorTiming() 
    return timingString  ? timingString : ""
  } catch (err) {
   throw err 
  }
}

// building a state machine  for the door exercise
const createStateMachine = () => {
  type StateAction = { transition?: () => void, on?: { obstacle?: () => void, push: () => void }}
  type States = Record<keyof typeof states, StateAction>

  let state: keyof typeof states = 'isClosed' 

  const states = {
    closing: {
      transition: () => setState('isClosed'),
      on: {
        obstacle: () => {setState('opening')},
        push : () => {setState('closingPaused')}
      }
    },
    closingPaused: {
      on: {
        push: () => {setState('closing')} 
      }
    },
    isClosed: {
      on: {
        push : () => {setState('opening')}
      }
    },
    opening:  {
      transition: () => setState('isOpened'),
      on: {
        obstacle: () => {setState('closing')},
        push : () => {setState('openingPaused')}
      }
    },
    openingPaused: {
      on: {
        push: () => {setState('opening')} 
      }
    },
    isOpened: {
      on: {
        push : () => {setState('closing')}
      }
    },
  }

  const setState = (newState: keyof typeof states) => {
    state = newState  
  }

  const currentState = (): keyof typeof states => state

  const transition = () => {
    const currentState = states[state] as StateAction
    if (currentState.transition) {
      currentState.transition()
    }
  }

  const obstacleEvent = () => {
    const currentState = states[state] as StateAction
    if (currentState.on?.obstacle) {
      currentState.on.obstacle()
    } 
  } 
  const pushButtonEvent = () => {
    const currentState = states[state] as StateAction
    if (currentState.on?.push) {
      currentState.on.push()
    } 
  } 
  return {currentState, transition, obstacleEvent, pushButtonEvent}
}
