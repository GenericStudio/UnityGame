﻿using System;
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
	}




    public  void Update()
	{
	}

	public  void Main()
	{
	}
}
