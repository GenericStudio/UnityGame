using UnityEngine;
using System.Collections;

public class Jetpack : MonoBehaviour
{

    public int max_fuel;
    public int fuel;
    public float force;
    public Equipment Equipment;
    private AudioSource audio;
    public PlayerMovement player;
    // Use this for initialization
    void Start()
    {
        if (Equipment == null) Equipment = (Equipment)GetComponent("Equipment");
        audio = GetComponent<AudioSource>();
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
                            if (!audio.isPlaying) audio.Play();

                            fuel--;
                            Equipment.Item.Holder.player.applyGlobalForce(new Vector2(0,  (Equipment.Item.Holder.player.rigid.velocity.y<0) ?force*2:force));
                        }
                        else
                        {
                            if (audio.isPlaying) audio.Stop();
                        }

                    }
                    else
                    {
                        if (audio.isPlaying) audio.Stop();
                    }
                }
                else
                {
                    if (audio.isPlaying) audio.Stop();
                }
            }
            else
            {
                fuel = max_fuel;
            }

        }
       
    }
}
