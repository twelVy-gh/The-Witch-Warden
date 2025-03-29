import Fire from "../../assets/elements/fire.jpg"
import Water from "../../assets/elements/water.png"
import Lightning from "../../assets/elements/lightning.png"
import Grass from "../../assets/elements/grass.jpg"
import NA from "../../assets/200px-Debugempty.png"




class ImageHelper {
    getCommandVisualization(command:string){
        switch(command){
            case "fire": return Fire
            case "water": return Water
            case "lightning": return Lightning
            case "grass": return Grass
            default: return NA
        }
    }
}

export default ImageHelper;