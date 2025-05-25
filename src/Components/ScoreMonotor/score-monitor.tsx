import { useSelector } from "react-redux"
import { countEnemies, getHealth, getScore } from "../../Store/Parts/game-objects";


function ScoreMonitor() {
      const  health: number  = useSelector(getHealth);
      const  score: number  = useSelector(getScore);
    return (
        <div className="score-monitor">
            <div>Health: {health}</div>
            <div>Score:  {score}</div>
        </div>
    )
}

export default ScoreMonitor;