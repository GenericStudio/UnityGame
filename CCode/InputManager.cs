using System;
using UnityEngine;


[Serializable]
public enum key_state
{
	None,
	Down,
	Up,
	Hold
}

[Serializable]
public class input
{
	public string[] keys;

	public key_state state;

	public string[] axis;

	public int direction;

	public input(string[] keys, key_state state, string[] axis, int direction)
	{
	 this.keys = keys;
    this.state = state;
    this.axis = axis;
    this.direction = direction;
	}

	public input(string[] keys, key_state state)
	{
	 this.keys = keys;
    this.state = state;
    this.axis = null;
	}

}

[Serializable]
public class InputManager : MonoBehaviour
{
	public input up;

	public input down;

	public input left;

	public input right;

	public input jump;

	public input fire;

	public input grab;

	public input fall;

	public input bark;

	private input[] inputs;


	public  void Start()
	{
		this.inputs = new input[]
		{
			this.up,
			this.down,
			this.left,
			this.right,
			this.jump,
			this.fire,
			this.grab,
			this.fall,
			this.bark
		};
	}

	public  void Update()
	{
		for (int i = 0; i < inputs.Length; i++)
		{
			bool flag = false;
			int num = 0;
			int j = 0;
			string[] axis = this.inputs[i].axis;
			int length = axis.Length;
			while (j < length)
			{
				if (Mathf.Clamp(Input.GetAxis(axis[j]) * (float)1000, (float)-1, (float)1) == (float)this.inputs[i].direction)
				{
					flag = true;
				}
				j++;
			}
			int k = 0;
			string[] keys = this.inputs[i].keys;
			int length2 = keys.Length;
			while (k < length2)
			{
				if (Input.GetKeyDown(keys[k]) || Input.GetKey(keys[k]))
				{
					flag = true;
				}
				k++;
			}
			if (flag)
			{
			//	MonoBehaviour.print(string.Concat(this.inputs[i].keys));
			}
			if (flag && this.inputs[i].state == key_state.None)
			{
				this.inputs[i].state = key_state.Down;
			}
			else if (flag && (this.inputs[i].state == key_state.Down || this.inputs[i].state == key_state.Hold))
			{
				this.inputs[i].state = key_state.Hold;
			}
			else if (!flag && (this.inputs[i].state == key_state.Hold || this.inputs[i].state == key_state.Down))
			{
				this.inputs[i].state = key_state.Up;
			}
			else
			{
				this.inputs[i].state = key_state.None;
			}
		}
		int length3 = Enum.GetNames(typeof(KeyCode)).Length;
		for (int l = 0; l < length3; l++)
		{
			if (Input.GetKey((KeyCode)l))
			{
			}
		}
		for (int i = 0; i < 20; i++)
		{
			if (Input.GetKeyDown("joystick 1 button " + i))
			{
			}
		}
	}

	public  void Main()
	{
	}
}

