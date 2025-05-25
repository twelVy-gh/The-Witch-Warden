import Fire from "/public/textures/bracelet/fire.png"
import Water from "/public/textures/bracelet/water.png"
import Rock from "/public/textures/bracelet/rock.png"
import Up from "/public/textures/bracelet/up.png"
import Down from "/public/textures/bracelet/down.png"
import NA from "/public/textures/bracelet/idle.png"




class ImageHelper {
    getCommandVisualization(command:string){
        switch(command){
            case "fire": return Fire
            case "water": return Water
            case "rock": return Rock
            case "up": return Up
            case "down": return Down
            default: return NA
        }
    }
}

export default ImageHelper;