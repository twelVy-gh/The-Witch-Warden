import { useSelector } from "react-redux"
import {getHealth} from "../../Store/Parts/game-objects";
import { useThree } from "@react-three/fiber";


function CastleHealth() {
    let {size} =  useThree();
    const  health: number  = useSelector(getHealth);
    return (
        <mesh position={[150-size.width/2,size.height/2-15,0]}>
            <mesh>
                <boxGeometry args={[300,30,1]}/>
                <meshBasicMaterial color="#010203"/>
            </mesh>
            <mesh position={[(3*health-300)/2,0,0]}>
                <boxGeometry args={[3*health-10,20,1]}/>
                <meshBasicMaterial color="#ff0505"/>
            </mesh>
        </mesh>
    )
}

export default CastleHealth;