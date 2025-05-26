import { useSelector , useDispatch} from "react-redux"
import { getScore, restart } from "../../Store/Parts/game-objects";

function CastleHealth() {
    const  score: number  = useSelector(getScore);
    const dispatch = useDispatch()
    const restartGame = ()=>dispatch(restart(1));
    return (
        <div className="game-over">
            <div>
                Game Over
            </div>
            <div>
                Your Score: {score}
            </div>
            <button onClick={restartGame}>
                Restart
            </button>
        </div>
    )
}

export default CastleHealth;