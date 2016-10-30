using System;
using UnityEngine;
using UnityScript.Lang;

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

	public override void Start()
	{
		this.player = (PlayerMovement)this.transform.root.GetComponent("PlayerMovement");
		this.Inputs = (InputManager)this.player.gameObject.GetComponent("InputManager");
		this.Grip = this.transform.FindChild("Grip").transform;
	}

	public override void Update()
	{
		if (!(this.Holding == null) || this.Inputs.fire.state == key_state.Down)
		{
		}
		if (this.Inputs.grab.state == key_state.Down)
		{
			if (this.Holding == null)
			{
				Collider2D[] array = Physics2D.OverlapCircleAll(this.transform.position, this.reach, this.items);
				if (Extensions.get_length(array) > 0)
				{
					this.Holding = (Item)array[0].gameObject.transform.root.GetComponent("Item");
					this.Holding.transform.root.parent = this.Grip.transform;
					this.Holding.transform.localPosition = Vector3.zero;
					this.Holding.transform.rotation = this.transform.rotation;
					this.Holding.PickUp(this);
				}
			}
			else
			{
				this.Grip.transform.DetachChildren();
				this.Holding.Drop();
				this.Holding.rigid.velocity = new Vector2((float)((!this.player.flipX) ? 15 : -15), (float)10);
				if (this.player.Inputs.up.state == key_state.Hold)
				{
					this.Holding.rigid.velocity = this.Holding.rigid.velocity + new Vector2((float)((!this.player.flipX) ? -15 : 15), (float)35);
				}
				if (this.player.Inputs.right.state == key_state.Hold)
				{
					this.Holding.rigid.velocity = this.Holding.rigid.velocity + new Vector2((float)35, (float)10);
				}
				if (this.player.Inputs.left.state == key_state.Hold)
				{
					this.Holding.rigid.velocity = this.Holding.rigid.velocity + new Vector2((float)-35, (float)10);
				}
				if (this.player.Inputs.down.state == key_state.Hold)
				{
					this.Holding.rigid.velocity = default(Vector2);
				}
				this.Holding.rigid.angularVelocity = (float)UnityEngine.Random.Range(-360, 360);
				this.Holding.transform.position = this.transform.position;
				this.Holding = null;
			}
		}
	}

	public override void Main()
	{
	}
}
