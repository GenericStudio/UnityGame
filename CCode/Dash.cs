using UnityEngine;
using System.Collections;

public class Dash : MonoBehaviour
{

    public int max_fuel;
    public int fuel;
    public float force;
    public bool airborn;
    public bool pressing_dash;
    public bool already_dashed;
    public bool dashing;
    public Equipment Equipment;
    private float dash_dir;


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
            pressing_dash = Equipment.Item.Holder.player.Inputs.bark.state == key_state.Down || Equipment.Item.Holder.player.Inputs.bark.state == key_state.Hold;
            if ((pressing_dash || fuel!=max_fuel) && !(fuel == max_fuel && !Equipment.Item.Holder.player.isTouchingFloor)) 
            {
                if (fuel == max_fuel) dash_dir = Equipment.Item.Holder.player.transform.localScale.x;

                if (fuel > 0)
                {
                    fuel--;
                    if (Equipment.Item.Holder.player.Inputs.jump.state == key_state.Down)
                    {
                        Equipment.Item.Holder.player.can_jump = true;
                        Equipment.Item.Holder.player.jump_triggered = true;
                        if(!Equipment.Item.Holder.player.isTouchingFloor) fuel=0;
                        Debug.Log("Dash Jumping");
                    }
                    float x_force = 0;
                    float y_force = 0;




                    Equipment.Item.Holder.player.ground_speed = (int)(Equipment.Item.Holder.player.currSpeed.x - Equipment.Item.Holder.player.staticFrame.x);
                    int ground_speed_magnitude = Mathf.Abs(Equipment.Item.Holder.player.ground_speed);
                    var speedMax = Equipment.Item.Holder.player.runSpeed + Mathf.Abs(Equipment.Item.Holder.player.staticFrame.x);
                    x_force = ((speedMax - ground_speed_magnitude) + force) * dash_dir;
                    Equipment.Item.Holder.player.applyGlobalForce(new Vector2(x_force, y_force));
                    if (Equipment.Item.Holder.player.isOnLeftWall || Equipment.Item.Holder.player.isOnRightWall && !Equipment.Item.Holder.player.isTouchingFloor) fuel = 0;
                }
            }

            if (!pressing_dash && Equipment.Item.Holder.player.isTouchingFloor)
            {
                fuel = max_fuel;
            }
        }
    }
}