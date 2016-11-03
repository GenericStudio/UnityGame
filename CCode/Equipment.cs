using UnityEngine;
using System.Collections;
using System.Collections.Generic;

using System;

[Serializable]
public enum EquipmentSlot
{
    Head,
    Feet,
    Back,
    Torso
}

public class Equipment : MonoBehaviour
{
    public bool equiped;
    public EquipmentSlot Slot;
    public Item Item;

    // Use this for initialization
    void Start()
    {
        if (Item == null) Item = (Item)GetComponent("Item");
    }

    // Update is called once per frame
    void Update()
    {
        if (!equiped && Item.Holder != null)
        {
            if (!Item.Holder.ActionPerformed && Item.Holder.player.Inputs.fire.state == key_state.Down)
            {
                EquipFromHand();
            }
        }
    }
    public void EquipFromHand()
    {
        Equipment curr = null;
        if (Item.transform.root.Find(Slot.ToString()).childCount > 0)
            curr = Item.transform.root.Find(Slot.ToString()).GetChild(0).GetComponent("Equipment") as Equipment;
        Item.transform.parent = Item.transform.root.Find(Slot.ToString()).transform;
        Item.transform.localPosition = Vector3.zero;
        Item.transform.rotation = this.transform.rotation;
        equiped = true;

        Item.Holder.ActionPerformed = true;
        Item.Holder.Holding = null;

        if(curr!=null)UnequipToHand(curr);


    }

    public void UnequipToHand(Equipment Equipment)
    {
        Equipment.transform.parent = null;
        Equipment.Item.Holder.Grab(Equipment.Item);
        Equipment.equiped = false;

    }
}
