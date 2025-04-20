import ImageHelper from "../../helpers/GestHelper"

type Props= {gestR:string, gestL:string}

const CommVisualiser = ({gestR, gestL}: Props) => {
      const imageHelper = new ImageHelper()
      const comImageR = imageHelper.getCommandVisualization(gestR)
      const comImageL = imageHelper.getCommandVisualization(gestL)
    return (
        <div className="command-visualizer">
            <img src={comImageL} alt="command"/>
            <img src={comImageR} alt="command"/>
        </div>
    )
}

export default CommVisualiser
