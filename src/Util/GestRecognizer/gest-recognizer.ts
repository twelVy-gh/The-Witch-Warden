import {Vector2} from 'three';


class GestRecognizer {


    getThumbVector(data: Array<any>){
        return new Vector2(data[4].x - data[1].x, data[4].y - data[1].y)
    }

    getForefingerVector(data: Array<any>){
        return new Vector2(data[8].x - data[5].x, data[8].y - data[5].y)
    } 

    gestRecognize(data: Array<any>){

        if(data){
        const thumb = this.getThumbVector(data);
        const fore = this.getForefingerVector(data)
        const angle = thumb.angleTo(fore) * 180 / Math.PI
        // console.log(angle + ' градусов между большим и уазательным')
        if( angle > 60 && angle < 90)
            return "Влево"
        else
          if (angle > 20 && angle<=60)
            return "Вправо"
          else
             return "Стоп"
        // 
      
        // const p1 = data[4]
        // const p2 = data[8]
        // const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
        // console.log(dist)
        // if(dist>0.2)
        //     return "Далеко";
        // else
        //    return "Близко"
        // }
        // return "Не определено"
      }
    }
}

export default GestRecognizer