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
  const [gest, setGest] = useState("NA")

  const setDirection = (direction: number) => dispatch(changeDirection(direction)) 

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

    if (results.poseLandmarks) {
      const grec: GRec = new GRec()
      const hand: Array<any> = results.rightHandLandmarks
      let newGest: any = "NA"
      const gestState = [grec.orientation(hand), grec.fingCurve(hand,1), grec.fingCurve(hand,2), grec.fingCurve(hand,3), grec.fingCurve(hand,4), grec.fingCurve(hand,5)].join("")
      console.log(gestState)
      switch(gestState){
        case ("fISSSS"): newGest = "fire";break
        case ("sIAAAA"): case ("sOAAAA"): newGest =  "water"; break
        case ("fISCCS"): case ("fOSCCS"): newGest =  "lightning"; break
        case ("fOSSCC"): newGest =  "grass"; break
        case ("fOCCCC"): let tDir = grec.direction(grec.atob(hand[0], hand[4])); newGest = tDir==="s" ? "down": tDir==="n" ? "up": newGest; break
        default: "NA"
    }
      if (newGest!=gest){
        setDirection(newGest==="up" ? 1: newGest==="down" ? -1:0)
        setGest(newGest)
      }
    }

    canvasCtx.restore()
  }

  return (
    <div  className="full-size">
      <canvas ref={canvasRef} className="full-size">
        <Webcam audio={false} ref={webcamRef} height="700px"
        width="1080px"/>
        <CommVisualiser command = {gest} />
      </canvas>
      <div className="gest">{gest}</div>
    </div>
  )
}

export default MPStart