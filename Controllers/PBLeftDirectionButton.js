#pragma strict
private var movement : PlayerMovement;
function Start () {
	movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();
}
function Update() {
	var misses : int = 0;
    var count : int = Input.touchCount;
   	 for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(GetComponent.<GUITexture>().HitTest(touch.position)){
        	if(touch.phase == TouchPhase.Began){
        		movement.setIsPressingLeft(true);
        		if(movement.getGameIsPaused() && movement.getIsInGameMode()){
        			movement.ExitPauseMode();
        		}  
        	}else if(touch.phase == TouchPhase.Moved ){
        		movement.setIsPressingLeft(true);
        	}else if(touch.phase == TouchPhase.Ended){
        		movement.setIsPressingLeft(false);
        	}
   		 }else{
   		 	misses++;
   		 }
    }
    if(movement.getIsPressingLeft()  && misses == count){
    	movement.setIsPressingLeft(false);
    }
    if(movement.getPCDebugging()){
    
    if(Input.GetAxis("Horizontal")<-0.1){
    	movement.setIsPressingLeft(true);
    }
    }
    if(movement.getIsPressingLeft()){
    	GetComponent.<GUITexture>().color = Color.gray;
    	GetComponent.<GUITexture>().color.a = .35;
    }else if(movement.getIsInGameMode() && movement.getGameIsPaused()){
    	GetComponent.<GUITexture>().color = Color.green;
    	GetComponent.<GUITexture>().color.a = 0.35;
    }else{
    	GetComponent.<GUITexture>().color = Color.gray;
    	GetComponent.<GUITexture>().color.a = .15;
     }

}