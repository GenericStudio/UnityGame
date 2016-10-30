#pragma strict


public var floor_tile : GameObject;

enum tile_type { floor };
public class tile {
    public var type : tile_type;
    public var position : pos;

    function tile(type, position) {
    this.type = type;
    this.position = position;


}
}

public class pos {
    public var x : int;
    public var y : int;

    function pos(x, y) {
    this.x = x;
    this.y = y;


}
}

public var map: Array = Array();
function Start() {
    for (var i = 0; i < 100; i++) {
            var cube: GameObject = GameObject.Instantiate(floor_tile);
            cube.transform.position = Vector3(i, 0, 0);
            var cube2: GameObject = GameObject.Instantiate(floor_tile);
            cube2.transform.position = Vector3(-i, 0, 0);
    }
     for (var ii = 0; ii < 100; ii++) {
        var cube3: GameObject = GameObject.Instantiate(floor_tile);
            cube3.transform.position = Vector3(-100, ii, 0);
    }
  
       
    
}

function Update() {

}