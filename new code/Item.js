
var MarkedForDeath: boolean;


var Holder: HandScript;
var WatchedBy: HandScript;
var rigid: Rigidbody2D;
var coll: Collider2D;
var solid_with_speed: boolean;
var _sprite: SpriteRenderer;
var fire;

// Use this for initialization
function Start() {
    rigid = GetComponent("Rigidbody2D");
    coll = GetComponent("Collider2D");
    _sprite = gameObject.transform.Find("Sprite").GetComponent("SpriteRenderer");
}

function PickUp(holder: HandScript) {
    if (Holder == null) {
        Holder = holder;
        rigid.isKinematic = true;
        coll.enabled = false;
        transform.localScale.x = -1;
    }
}
function Drop() {
    if (Holder != null) {
        rigid.isKinematic = false;
        coll.enabled = true;
        Holder = null;
    }
}
function Update() {

}

