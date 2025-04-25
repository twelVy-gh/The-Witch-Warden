// import {useAppContext} from "../../hooks/useAppContext"
import ImageHelper from "../../Util/ImageHelper"
import { useSelector } from "react-redux"
import {selectDirection} from "../../Store/Parts/motion"


const VisualCommand = () => {
    const  direction  = useSelector(selectDirection)
      const imageHelper = new ImageHelper()
      const commandImage = imageHelper.getCommandVisualization(direction)
    return (
        <div className="command-visualizer">
            <img src={commandImage} alt="command"/>
        </div>
    )
}

export default VisualCommand
