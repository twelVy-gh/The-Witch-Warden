import ImageHelper from "../../helpers/GestHelper"

type Props= {command:string}

const CommVisualiser = ({command}: Props) => {
      const imageHelper = new ImageHelper()
      const commandImage = imageHelper.getCommandVisualization(command)
    return (
        <div className="command-visualizer">
            <img src={commandImage} alt="command"/>
        </div>
    )
}

export default CommVisualiser
