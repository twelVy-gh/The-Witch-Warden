import { useSelector } from "react-redux"
import { countEnemies, getScore } from "../../Store/Parts/game-objects";


function ScoreMonitor() {
      const  counter: number  = useSelector(countEnemies);
      const  score: number  = useSelector(getScore);
    return (
        <div className="score-monitor">
            <div># enemies {counter}</div>
            <div>Score:  {score}</div>
        </div>
    )
}

export default ScoreMonitor;