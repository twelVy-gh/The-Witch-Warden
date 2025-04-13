import { useRef, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Holistic } from '@mediapipe/holistic'
import { useDispatch } from 'react-redux'
import { changeDirection } from "./Store/Parts/command"
import { Camera } from '@mediapipe/camera_utils'
import "./MPStart.css"
import GRec from './GRec/GRec.tsx'
import CommVisualiser from './Components/CommVisualiser'

const MPStart = () => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dispatch = useDispatch()
  const [gestR, setGestR] = useState("NA")
  const [gestL, setGestL] = useState("NA")

  const setDirection = (direction: number) => dispatch(changeDirection(direction)) 
  function getShape(grec: GRec, hand: Array<any>){ 
    let newGest: any = "NA"
    const gestState = [grec.orientation(hand), grec.fingCurve(hand,1), grec.fingCurve(hand,2), grec.fingCurve(hand,3), grec.fingCurve(hand,4), grec.fingCurve(hand,5)].join("")
    switch(gestState){
    case ("fISSSS"): newGest = "fire";break
      case ("sIAAAA"): case ("sOAAAA"): newGest =  "water"; break
      case ("fISCCS"): case ("fOSCCS"): newGest =  "lightning"; break
      case ("fOSSCC"): newGest =  "grass"; break
      case ("fOCCCC"): let tDir = grec.direction(grec.atob(hand[1], hand[4])); console.log(tDir); newGest = tDir==="s" ? "down": tDir==="n" ? "up": newGest; break
      default: newGest = "NA"
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

    if (results.rightHandLandmarks) {
      let newGestR: any = getShape(new GRec, results.rightHandLandmarks)
      if (newGestR!=gestR){
        if (newGestR==="up"||newGestR==="down")
          dirChanged=true
        setDirection(newGestR==="up" ? 1: newGestR==="down" ? -1:0)
        setGestR(newGestR)
      }
    }
    if (results.leftHandLandmarks) {
      let newGestL: any = getShape(new GRec, results.leftHandLandmarks)
      if (newGestL!=gestL){
        if ((newGestL==="up"||newGestL==="down")&&!dirChanged)
            setDirection(newGestL==="up" ? 1: newGestL==="down" ? -1:0)
        setGestL(newGestL)
      }
    }

    canvasCtx.restore()
  }

  return (
    <div  className="cam">
      <canvas ref={canvasRef} className="cam-canvas">
        <Webcam audio={false} mirrored= {false}ref={webcamRef}/>
      </canvas>
      <CommVisualiser gestR={gestR} gestL={gestL} />
      <div className="gestR">{gestR}</div>
      <div className="gestL">{gestL}</div>
    </div>
  )
}

export default MPStart