import { useRef, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Holistic } from '@mediapipe/holistic'
import { useDispatch, useSelector } from 'react-redux'
import { changeDirection, changeUserAction } from "./Store/Parts/command"
import { Camera } from '@mediapipe/camera_utils'
import "./MPStart.css"
import GRec from './GRec/GRec.tsx'
import CommVisualiser from './Components/CommVisualiser'
import { selectUserAction, isNowFire } from './Store/Parts/command'

const MPStart = () => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dispatch = useDispatch()
  const [gestR, setGestR] = useState("NA")
  const [gestL, setGestL] = useState("NA")

  const setDirection = (direction: number) => dispatch(changeDirection(direction)) 
  const changeAction = (actionCode: number) => dispatch(changeUserAction(actionCode)) 
  
  function getShape(grec: GRec, hand: Array<any>){ 
    let newGest: any = "NA"
    const gestState = [grec.orientation(hand), grec.fingCurve(hand,1), grec.fingCurve(hand,2), grec.fingCurve(hand,3), grec.fingCurve(hand,4), grec.fingCurve(hand,5)].join("")
    switch(gestState){
      case ("fISSSS"): newGest = "fire";break
      case ("sIAAAA"): case ("sOAAAA"): newGest =  "water"; break
      case ("fICCCC"): newGest = "rock";break
      case ("fOCCCC"): let tDir = grec.direction(grec.atob(hand[1], hand[4])); console.log(tDir); newGest = tDir==="s" ? "down": tDir==="n" ? "up": newGest; break
      default: newGest = "NA";
  } 
    return newGest;}
  

  useEffect(() => {
    const holistic = new Holistic({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
    })

    holistic.setOptions({
      modelComplexity: 2,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    holistic.onResults(onResults)
    
    let camera: Camera | null = null
    if (webcamRef.current?.video) {
      camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
             await holistic.send({ image: webcamRef.current!.video! })
        },
      })
      camera.start()
    }

    return () => {
      camera?.stop()
      holistic.close()
    }
  }, [])

  const onResults = (results: any) => {
      let dirChanged: boolean=false
      if (!canvasRef.current) return

      const canvasCtx = canvasRef.current.getContext('2d')
      if (!canvasCtx) return

      canvasCtx.save()
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      )
      
      if(!results.leftHandLandmarks&&!results.rightHandLandmarks){
        changeAction(0)
        setGestR("NA")
        setGestL("NA")
        return
      }
      let newGestR, newGestL
      if (results.rightHandLandmarks) {
        newGestR = getShape(new GRec, results.rightHandLandmarks)
        if (newGestR!=gestR){
          if (newGestR==="up"||newGestR==="down")
            dirChanged=true
          changeAction(newGestR==="up" ? 1: newGestR==="down" ? -1:0)
          setGestR(newGestR)
        }  
      }
      if (results.leftHandLandmarks) {
         newGestL = getShape(new GRec, results.leftHandLandmarks)
        if (newGestL!=gestL){
          if ((newGestL==="up"||newGestL==="down")&&!dirChanged)
            changeAction(newGestL==="up" ? 1: newGestL==="down" ? -1:0)
          setGestL(newGestL)
        }
      }
      

      switch(newGestL+" "+newGestR){
        case "fire fire": changeAction(2);break;
        case "water water": changeAction(4);break;
        case "rock rock": changeAction(3);break;
      }

      canvasCtx.restore()
  }

  return (
    <div  className="cam">
      <CommVisualiser gest={gestL} flip={false}/>
      <canvas ref={canvasRef} className="cam-canvas">
        <Webcam audio={false} mirrored={true}ref={webcamRef}/>
      </canvas>
      <CommVisualiser gest={gestR} flip={true}/>
    </div>
  )
}

export default MPStart