using System;
using UnityEngine;
using System.Linq;
using System.Collections.Generic;

[Serializable]
public class HandScript : MonoBehaviour
{
    public Collider2D GrabZone;

    public PlayerMovement player;

    public Item Holding;

    public Item Watching;

    public LayerMask items;

    public Transform Grip;

    public float reach;

    public InputManager Inputs;
    public bool ActionPerformed;

    public void Start()
    {
        this.player = (PlayerMovement)this.transform.root.GetComponent("PlayerMovement");
        this.Inputs = (InputManager)this.player.gameObject.GetComponent("InputManager");
        this.Grip = this.transform.FindChild("Grip").transform;
    }

    public void Update()
    {
        if (!(this.Holding == null) || this.Inputs.fire.state == key_state.Down)
        {
        }
        if (this.Inputs.grab.state == key_state.Down)
        {
            if (this.Holding == null)
            {
                Grab(Search());
            }
            else
            {
                Drop();
            }
        }
        ActionPerformed = false;
    }

    public Item Search()
    {
        List<Collider2D> array = Physics2D.OverlapCircleAll(this.transform.position, this.reach, this.items).ToList();
        if (array.Count() == 0) return null;
        if (array.Count() > 1)
        {
            array.Sort((p1, p2) => Vector3.Distance(Grip.transform.position, p1.gameObject.transform.position).CompareTo(Vector3.Distance(Grip.transform.position, p2.gameObject.transform.position)));
        }
        return array[0].GetComponent("Item") as Item;
    }

    public void Grab(Item item)
    {

        if (item == null) return;
        this.Holding = item;
        this.Holding.transform.root.parent = this.Grip.transform;
        this.Holding.transform.localPosition = Vector3.zero;
        this.Holding.transform.rotation = this.transform.rotation;
        this.Holding.PickUp(this);
    }

    public void Drop()
    {
        this.Grip.transform.DetachChildren();
        this.Holding.Drop();
        this.Holding.rigid.velocity = new Vector2((float)((!this.player.flipX) ? 15 : -15), (float)15);
        if (this.player.Inputs.up.state == key_state.Hold)
        {
            this.Holding.rigid.velocity = this.Holding.rigid.velocity + new Vector2((float)((!this.player.flipX) ? -15 : 15), (float)20);
        }
        if (this.player.Inputs.right.state == key_state.Hold)
        {
            this.Holding.rigid.velocity = this.Holding.rigid.velocity + new Vector2((float)45, (float)10);
        }
        if (this.player.Inputs.left.state == key_state.Hold)
        {
            this.Holding.rigid.velocity = this.Holding.rigid.velocity + new Vector2((float)-45, (float)10);
        }
        if (this.player.Inputs.down.state == key_state.Hold)
        {
            this.Holding.rigid.velocity = default(Vector2);
        }
        this.Holding.rigid.angularVelocity = (float)UnityEngine.Random.Range(-360, 360);
        this.Holding.transform.position = this.transform.position;
        this.Holding = null;
    }

    public void Main()
    {
    }
}
