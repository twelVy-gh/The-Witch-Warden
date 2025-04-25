import  {createContext, useState, useReducer, useContext, ReactNode} from 'react'

interface ContextStruct {
    direction: number,
    angle: number,
    setDirection: (x: any)=> void
    setAngle: ()=> void
}

const initalState: ContextStruct = {direction: 0, angle:0, setAngle: ()=>{}, setDirection: (x)=>{}}
const AppContext = createContext(initalState)

export const useAppContext = () => useContext(AppContext)

interface Props {
    children?: ReactNode
}

export const AppContextProvider = ({ children }: Props) => {

  const [direction, setDirection] = useState(1)
  const [tick, setTick] = useReducer((v) => v + 0.1, 0);
  const [angle, setAngle] = useReducer((a) => a + direction * 0.1, 0);

  const fn = {
    setDirection, 
    setTick,
    setAngle
  }


  return <AppContext.Provider value={{direction, angle,  ...fn}}>
    {children}
  </AppContext.Provider>;
};


