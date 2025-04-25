import Left from "../../assets/left.svg"
import Right from "../../assets/right.svg"
import Stop from "../../assets/stop.svg"
import Unknown from "../../assets/unknown.svg"


class ImageHelper {
    getCommandVisualization(command:number){
        switch(command){
            case -1: return Left; break;
            case 1: return Right; break;
            case 0: return Stop; break;
            default: return Unknown;
        }
    }
}

export default ImageHelper;