import { useSelector } from "react-redux"
import { countEnemies } from "../../Store/Parts/game-objects";


function ScoreMonitor() {
      const  counter: number  = useSelector(countEnemies);
    return (
        <div className="score-monitor">
            <div># enemies {counter}</div>
        </div>
    )
}

export default ScoreMonitor;