import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import grassTexture from "../../../assets/grass.jpg";

const Ground = () => {
    const texture = useTexture(grassTexture);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return (
        <mesh position={[0, -5, 0]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[500, 500]} />
            <meshStandardMaterial color="gray" map={texture} map-repeat={[360, 360]}/>
        </mesh>
    );
}

export default Ground