using UnityEngine;
using System.Collections;

public class Jetpack : MonoBehaviour
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
                if (!Equipment.Item.Holder.player.isStillJumping)
                {
                    if (Equipment.Item.Holder.player.Inputs.jump.state == key_state.Hold)
                    {
                        if (fuel > 0)
                        {
                            fuel--;
                            Equipment.Item.Holder.player.applyGlobalForce(new Vector2(0,  (Equipment.Item.Holder.player.rigid.velocity.y<0) ?force*2:force));
                        }
                    }
                }
            }
            else
            {
                fuel = max_fuel;
            }

        }
       
    }
}
