using UnityEngine;
using System.Collections;

public class SlowFall : MonoBehaviour
{

    public int max_fuel;
    public int fuel;
    public float force;
    public Equipment Equipment;

    public PlayerMovement player;
    // Use this for initialization
    void Start()
    {
        if (Equipment == null) Equipment = (Equipment)GetComponent("Equipment");

    }

    // Update is called once per frame
    void Update()
    {
        if (Equipment.equiped)
        {
            if (!Equipment.Item.Holder.player.isTouchingFloor)
            {
                if (Equipment.Item.Holder.player.Inputs.jump.state == key_state.Down) fuel--;
                if(Equipment.Item.Holder.player.Inputs.jump.state == key_state.Hold && fuel!=max_fuel)
                    Equipment.Item.Holder.player.slow_fall = true;
            }else
            {
                fuel = max_fuel;
            }

           
        }
    }
}
