
var GrabZone: Collider2D;

var player: PlayerMovement;
var Holding: Item;
var Watching: Item;
var items: LayerMask;
var Grip: Transform;
var reach: float;
var Inputs: InputManager;

// Use this for initialization
function Start() {
    player = transform.root.GetComponent("PlayerMovement");
    Inputs = player.gameObject.GetComponent("InputManager");
    Grip = transform.FindChild("Grip").transform;
}

// Update is called once per frame
function Update() {
    // print(Inputs.grab);
    if (Holding == null && Inputs.fire.state == key_state.Down) {
        print("Slap");
    }
    if (Inputs.grab.state == key_state.Down) {
        print("Fire");
        if (Holding == null) {
            print("Looking to pickup");
            var hits = Physics2D.OverlapCircleAll(transform.position, reach, items);
            if (hits.length > 0) {
                print("Found " + hits.length);
                Holding = hits[0].gameObject.transform.root.GetComponent("Item");
                Holding.transform.root.parent = Grip.transform;
                Holding.transform.localPosition = Vector3.zero;
                Holding.transform.rotation = transform.rotation;
                Holding.PickUp(this);
            }
        } else {
            print("Dropping");
            Grip.transform.DetachChildren();
            Holding.Drop();


            Holding.rigid.velocity = new Vector2((player.flipX) ? -15:15, 10);
            if (player.Inputs.up.state == key_state.Hold) {
                Holding.rigid.velocity += new Vector2(0,35);
            }
            if (player.Inputs.right.state == key_state.Hold) {
                Holding.rigid.velocity += new Vector2(35,10);
            }
            if (player.Inputs.left.state == key_state.Hold) {
                Holding.rigid.velocity += new Vector2(-35,10);
            }
             if (player.Inputs.down.state == key_state.Hold) {
                Holding.rigid.velocity=new Vector2();
            }


            Holding.rigid.angularVelocity = Random.Range(-360, 360);
            Holding.transform.position = transform.position;
            Holding = null;

        }
    }
}