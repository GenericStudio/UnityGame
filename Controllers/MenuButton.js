#pragma strict
private var movement : PlayerMovement;
function Start () {
	movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();
	
}
function Update() {
	
 if(movement.getPCDebugging()){
   		if((Input.GetMouseButtonDown(0)&& GetComponent.<GUITexture>().HitTest(Input.mousePosition)) || Input.GetKeyDown(KeyCode.Escape)){
   			if(!movement.getIsInMenuMode()){
  				movement.EnterMenuMode();
  			}else{
  				movement.EnterGameMode();
  				movement.ExitPauseMode();
  			}
   		}
   }else{
	var misses : int = 0;
    var count : int = Input.touchCount;
   	 for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(GetComponent.<GUITexture>().HitTest(touch.position)){
        	if(touch.phase == TouchPhase.Began){
            	if(!movement.getIsInMenuMode()){
        			movement.EnterMenuMode();
        		}
        	}
   		 }else{
   		 	misses++;
   		 }
    }
    }
   
    if(movement.getIsInMenuMode()){
    	GetComponent.<GUITexture>().color = Color.blue;
    	GetComponent.<GUITexture>().color.a = .35;
     }else{
    	GetComponent.<GUITexture>().color = Color.gray;
    	GetComponent.<GUITexture>().color.a = .10;
     }

}