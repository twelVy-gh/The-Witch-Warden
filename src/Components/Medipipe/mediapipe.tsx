import { useRef, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { useDispatch } from 'react-redux'
import { changeDirection } from "../../Store/Parts/motion"

import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils,
    GestureRecognizerOptions
  } from '@mediapipe/tasks-vision';
  
  import GestRecognizer from '../../Util/GestRecognizer';
  import {useAppContext} from "../../hooks/useAppContext"

import { Holistic, POSE_LANDMARKS, POSE_CONNECTIONS, POSE_LANDMARKS_LEFT, POSE_LANDMARKS_RIGHT, HAND_CONNECTIONS,
    FACEMESH_TESSELATION,FACEMESH_LIPS,  FACEMESH_RIGHT_EYE,FACEMESH_RIGHT_EYEBROW,FACEMESH_LEFT_EYE,FACEMESH_LEFT_EYEBROW,FACEMESH_FACE_OVAL  } from '@mediapipe/holistic'
import { drawConnectors, drawLandmarks, } from '@mediapipe/drawing_utils'
import { Camera } from '@mediapipe/camera_utils'
import VisualCommand from '../VisualCommand';



const MPStart = () => { 
    const webcamRef = useRef<Webcam>(null) 
    const canvasRef = useRef<HTMLCanvasElement>(null) 
    const dispatch = useDispatch()
    let activeEffect = 'mask';

    // const { setDirection } = useAppContext()

    const [gest, setGest] = useState("Не определен")

    const setDirection = (direction: number) => dispatch(changeDirection(direction)) 

    let gestureRecognizer:GestureRecognizer | null = null
    useEffect(()=>{
       async function getGestureReconizer(){
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
          );
        gestureRecognizer = await GestureRecognizer.createFromOptions(vision, 
            {
                baseOptions: {
                  modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
                  delegate: "GPU"
                },
                runningMode: "IMAGE"
              }
        );
       }
      getGestureReconizer()
    },[])
    useEffect(() => { 
        const holistic = new Holistic({ 
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1675471629/${file}`, 
            // locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`, 
        }) 
    holistic.setOptions({
         modelComplexity: 2, 
         smoothLandmarks: true, 
         minDetectionConfidence: 0.5, 
         minTrackingConfidence: 0.5, }) 

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
     function onResults(results:any): void {
        
        if (!canvasRef.current) return 
            const canvasCtx = canvasRef.current.getContext('2d') 
            if (!canvasCtx) 
                return 

        // Draw the overlays.
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
        if (results.segmentationMask) {
          canvasCtx.drawImage(
              results.segmentationMask, 0, 0, canvasRef.current.width,
              canvasRef.current.height);
      
          // Only overwrite existing pixels.
          if (activeEffect === 'mask' || activeEffect === 'both') {
            canvasCtx.globalCompositeOperation = 'source-in';
            // This can be a color or a texture or whatever...
            canvasCtx.fillStyle = '#00FF007F';
            canvasCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          } else {
            canvasCtx.globalCompositeOperation = 'source-out';
            canvasCtx.fillStyle = '#0000FF7F';
            canvasCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }
      
          // Only overwrite missing pixels.
          canvasCtx.globalCompositeOperation = 'destination-atop';
          canvasCtx.drawImage(
              results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
          canvasCtx.globalCompositeOperation = 'source-over';
        } else {
           canvasCtx.drawImage(
               results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      
        // Connect elbows to hands. Do this first so that the other graphics will draw
        // on top of these marks.
        canvasCtx.lineWidth = 2;
        if (results.poseLandmarks) {
          
          if (results.rightHandLandmarks) {
            canvasCtx.strokeStyle = 'white';
            drawConnectors(canvasCtx, results.rightHandLandmarks, POSE_CONNECTIONS, { color: 'white' })
            drawLandmarks(canvasCtx, results.rightHandLandmarks, 
                             { color: 'white', fillColor: 'rgb(255,138,0)' }
                          ) 
                  }
          if (results.leftHandLandmarks) {
            canvasCtx.strokeStyle = 'white';
            drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
              color: '#00ffff',
              lineWidth: 1,
            });
            drawLandmarks(canvasCtx, results.leftHandLandmarks, {
              color: '#ffff29',
              lineWidth: 1,
            });

          }


        const gest_recognizer: GestRecognizer = new GestRecognizer()
        const recognizedGest = gest_recognizer.gestRecognize(results.leftHandLandmarks)

        if(recognizedGest !== gest){
                  setGest(recognizedGest)
                  switch(recognizedGest){
                    case "Вправо": 
                       setDirection(1); break;
                    case "Влево": 
                       setDirection(-1); break;
                    case "Стоп": 
                       setDirection(0); break
                  }
              }
        //Распознавание жестов стандартной библиотекой
        // const gestures  = gestureRecognizer?.recognize(results.image);
        // if( gestures?.gestures && gestures?.gestures.length > 0 ){
        //     let recognizedGest = gestures.gestures[0][0].categoryName;
        //     if(!recognizedGest) {
        //         recognizedGest = "Не определен"
        //     }
        //      if(recognizedGest !== gest){
        //         setGest(recognizedGest)
              
        //     }
        // }
       
        }
        canvasCtx.restore();
      }


        return ( 
          <div className = "video-wrapper">
             <canvas ref={canvasRef}> 
                <Webcam audio={false} mirrored ref={webcamRef} /> 
             </canvas>
             <div className="gest">{gest}</div>
             <VisualCommand/>
          </div> 
        )
}

export default MPStart