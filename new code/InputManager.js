
enum key_state { None, Down, Up, Hold };
public class input {
    public var key;
    public var state : key_state;
    public var axis;
    public var direction:int;


    function input(key, state, axis, direction) {
    this.key = key;
    this.state = state;
    this.axis = axis;
    this.direction = direction;
}
function input(key, state) {
    this.key = key;
    this.state = state;
    this.axis = null;
}
function ToString() {
    return key + " " + state;
}
}


var up = input("w", key_state.None,   ["1 y axis","1 y dpad"], 1);
var down = input("s", key_state.None, ["1 y axis","1 y dpad"], -1);
var left = input("a", key_state.None,["1 x axis",'1 x dpad'], 1);
var right = input("d", key_state.None,["1 x axis",'1 x dpad'], -1);
var jump = input("joystick button 0", key_state.None);
var fire = input("joystick button 2", key_state.None);
var grab = input("joystick button 3", key_state.None);
var fall = input("h", key_state.None);
var bark = input("j", key_state.None);

var inputs = [up, down, left, right, jump, fire, grab, fall, bark];

function Start() {

}

function Update() {
    for (var i = 0; i < inputs.length; i++) {

  if (inputs[i].axis == null) {
        //Keys
        //None to Down
        if (Input.GetKeyDown(inputs[i].key) && inputs[i].state == key_state.None) inputs[i].state = key_state.Down;
        //Down to Hold and Hold to Hold
        else if (Input.GetKey(inputs[i].key) && (inputs[i].state == key_state.Down || inputs[i].state == key_state.Hold)) inputs[i].state = key_state.Hold;
        //Hold to Up, Down to Up
        else if (Input.GetKeyUp(inputs[i].key) && (inputs[i].state == key_state.Hold || inputs[i].state == key_state.Down)) inputs[i].state = key_state.Up;
        //Otherwise None
        else inputs[i].state = key_state.None;
  }
        //Axis
        //None to Down
        if (inputs[i].axis != null) {
            var axis : int;
            for(var item in inputs[i].axis){axis += Mathf.Clamp(Input.GetAxis(item)*1000,-1,1);}
            var dir = inputs[i].direction;
            var pressed = axis == dir;
            if (pressed && inputs[i].state == key_state.None) inputs[i].state = key_state.Down;
            //Down to Hold and Hold to Hold
            else if (pressed && (inputs[i].state == key_state.Down || inputs[i].state == key_state.Hold)) inputs[i].state = key_state.Hold;
            //Hold to Up, Down to Up
            else if (!pressed && (inputs[i].state == key_state.Hold || inputs[i].state == key_state.Down)) inputs[i].state = key_state.Up;
            //Otherwise None
            else inputs[i].state = key_state.None;
            
       //     print(inputs[i].axis + " " + inputs[i].state);
        }
    }


    var e = System.Enum.GetNames(typeof (KeyCode)).Length;
    for (var ii = 0; ii < e; ii++) {
        if (Input.GetKey(ii)) {
        //   print(ii);
        }
    }

    for (i = 0; i < 20; i++) {
        if (Input.GetKeyDown("joystick 1 button " + i)) {
           // print("joystick 1 button " + i);
        }
    }


}