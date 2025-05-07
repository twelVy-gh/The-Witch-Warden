const sounds: Map<string, string> = new Map([
    ['explosion', "/sounds/explosion.mp3"],
    ['shot', "/sounds/shot.mp3"]
  ]);


  export const playSound = (effect: string) => {
    const sound:string | undefined = sounds.get(effect);
    if(sound){
      const audio   = new Audio();
      audio.src = sound;
      audio.volume=0.05;
      audio.play();
    }

  }