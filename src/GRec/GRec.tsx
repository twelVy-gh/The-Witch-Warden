import {Vector2} from 'three';

class GRec{

    atob(a:any, b:any) {
        return new Vector2(b.x-a.x, b.y-a.y)
    }

    orientation(hand: Array<any>){
        if (hand){
        const angle = this.atob(hand[0], hand[5]).angleTo(this.atob(hand[0],hand[17])) * 180 / Math.PI
        if (angle > 15)
            return "f"
        return "s"      
        }
    return "NA"
    }

    direction(v: any){
        const ang = (v.angle()) * 180 / Math.PI
        console.log("d ", ang)
        switch (true){
            case (ang<=22.5):
                return "e"
            case (22.5<ang && ang<=67.5):
                return "ne"
            case (67.5<ang && ang<=112.5):
                return "n"
            case (112.5<ang && ang<=157.5):
                return "nw"
            case (157.5<ang && ang<=202.5):
                return "w"
            case (202.5<ang && ang<=247.5):
                return "sw"
            case (247.5<ang && ang<=292.5):
                return "s"
            case (292.5<ang && ang<=337.5):
                return "se"
            case (337.5<ang):
                return "e"
        }
    }

    normal(hand:Array<any>){
        return (this.atob(hand[0],hand[5]).add(this.atob(hand[0],hand[17]))).multiplyScalar(0.5)
    }

    fingCurve(hand: Array<any>, n:number){
        if (hand){
        const orient = this.orientation(hand)
        if (orient=="s"){   
            if ([2,3,4,5].indexOf(n)+1){
                
                let phal1 = this.atob(hand[n*4-3],hand[n*4-2])
                let phal2 = this.atob(hand[n*4-2],hand[n*4-1])
                let avgAngle: number = (this.normal(hand).angleTo(phal1) * 180 / Math.PI + phal1.angleTo(phal2) * 180 / Math.PI)/2
                if (avgAngle<55){
                    if(avgAngle<25){
                        return "S"
                    }
                    return "A"
                }
                return "C"
            }
            else if (n===1){
                let nangle: number = (this.atob(hand[1], hand[4]).angleTo(this.normal(hand))) * 180 / Math.PI
                console.log("t ",nangle)
                if (nangle>10){
                    return "O"
                }
                else if (nangle<=15){
                    return "I"
                }
                return "NA"
            }
        }
        else if(orient=="f"){
            if ([2,3,4,5].indexOf(n)+1){
                let dist: Vector2 = this.atob(hand[n*4-3], hand[n*4])
                let status: number = dist.dot(this.normal(hand))
                if (status<0){
                    return "C"
                }
                else if (status>0){
                    return "S"
                }
                return "NA"
            }
            else if (n===1){
                let nangle: number = (this.atob(hand[1], hand[4]).angleTo(this.normal(hand))) * 180 / Math.PI
                let sangle: number = (this.atob(hand[1], hand[4]).angleTo(this.atob(hand[0],hand[17]))) * 180 / Math.PI
                console.log("t ",nangle,sangle)
                if (sangle < 10){
                    return "I"
                }
                else if(nangle <= 15){
                    return "S"
                }
                else if (nangle > 15){
                    return "O"
                }
                return "NA"
            }
            return "NA"
        }
        }
        return "NA"
    }

}

export default GRec;