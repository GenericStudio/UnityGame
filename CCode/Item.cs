using System;
using UnityEngine;

[Serializable]
public class Item : MonoBehaviour
{
	public bool MarkedForDeath;

	public HandScript Holder;

	public HandScript WatchedBy;

	public Rigidbody2D rigid;

	public Collider2D coll;

	public bool solid_with_speed;

	public SpriteRenderer _sprite;
    private bool righted;

    public  void Start()
	{
		this.rigid = (Rigidbody2D)this.GetComponent("Rigidbody2D");
		this.coll = (Collider2D)this.GetComponent("Collider2D");
		this._sprite = (SpriteRenderer)this.gameObject.transform.Find("Sprite").GetComponent("SpriteRenderer");
	}

	public  void PickUp(HandScript holder)
	{
		
			this.Holder = holder;
			this.rigid.isKinematic = true;
			int i = 0;
			Collider2D[] componentsInChildren = this.transform.GetComponentsInChildren<Collider2D>();
			int length = componentsInChildren.Length;
			while (i < length)
			{
				componentsInChildren[i].enabled = false;
				i++;
			}
			int num = -1;
			Vector3 localScale = this.transform.localScale;
			float num2 = localScale.x = (float)num;
			Vector3 vector = this.transform.localScale = localScale;
	}

	public  void Drop()
	{
        transform.parent = null;
        if (this.Holder != null)
        {
            this.rigid.isKinematic = false;
            int i = 0;
            Collider2D[] componentsInChildren = this.transform.GetComponentsInChildren<Collider2D>();
            int length = componentsInChildren.Length;
            while (i < length)
            {
                componentsInChildren[i].enabled = true;
                i++;
            }
            this.Holder = null;
        }
		if(MarkedForDeath){
			Destroy(gameObject,1);
		}
        righted = false;
	}




    public  void Update()
	{
        if (!righted)
        {
            if (Holder == null)
            {
                if (Mathf.Abs(rigid.velocity.x) < 1)
                {

                }
            }
        }
	}

	public  void Main()
	{
	}
}
