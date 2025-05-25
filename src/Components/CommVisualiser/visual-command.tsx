import ImageHelper from "../../helpers/GestHelper"

type Props= {gest:string, flip:boolean}

const CommVisualiser = ({gest, flip}: Props) => {
      const imageHelper = new ImageHelper()
      const comImage = imageHelper.getCommandVisualization(gest)
      const flippedClass = flip? "flip":""
    return (
        <div className="command-visualizer">
           <img src={comImage} alt="command" className={flippedClass}/>
        </div>
    )
}

export default CommVisualiser
