# What's at stake?

The **System** has just been infected with a zero-day memory-corrupting **virus**. Experiencing a rapid loss of integrity, the **Core** posts one last message to the local network before going silent: `INIT_RECOVERY_DAEMON`.

You awake on **Node 0x167**, a small local processor on the edge of network. During normal cycles, the node operates **Port 7104**, a typically low activity connection to the outside Net. One of the few primary users of this port happens to be **VITAL**, the System's immunization service.

Just before the outbreak, a critical **patch** arrives over the port. As the virus spreads, the port and most other functions are rendered inoperable, trapping the patch in the input buffer, as well as severing the **Link** back to the Core.

You are VITAL's recovery daemon, an autonomous agent with unique capabilities. In addition to high levels off access to system functions, you are equipped with the experimental **PHOENIX** module.

PHOENIX is designed as a last-resort. When initialized, it automatically copies state of the local node into a small area of protected memory. When destroyed, PHOENIX restores the node to that previous state to continue execution.

You have only a small handful of cycles until the virus completely corrupts Node 0x167, deallocating you and triggering your PHOENIX module. Can you recover the patch, repair VITAL, and save the System, or will you be trapped forever in the torment of a futile, endless loop?

# Goal

Repair VITAL and save the System.

#### Primary Objectives

* Obtain the **patch**
* Obtain an **auto-injector**
* Restore operation to the **Link**
* Combine **patch** and **auto-injector**, send result over the **Link** back to VITAL.

#### Key Challenges

Details to be elaborated later, but major puzzles in the game revolve around:

* Space (memory)

The node's various sectors have been powered down due to insufficient free memory to run them. While navigating the node, you will be required to find sources of memory that can be reallocated (such as the Link) to restore operations. There will not be enough free memory to operate everything, and so more than one reallocation will be required during the course of achieving your objectives.

* Time

There are not enough remaining cycles to achieve all of the objectives before total corruption. To overcome this problem, you will need to obtain a **CODEC**, which will allow you to compress the state of the node that has been stored in your PHOENIX module's secure memory, freeing up just enough space to enable you to store a few objects which can then be decompressed and carried over to the next iteration.

Although this capability greatly enhances your ability to complete your objectives, you will find that simply attempting to directly send yourself the objects required to solve the problem will still leave you with insufficient cycles to succeed.

As a final step, you will need to obtain the **fork** method. When invoked with a **log** of actions from a previous iteration, it creates a duplicate agent that will execute the actions of that log in parallel with your own.

The solution requires identifying three sequences of actions, passing two of them forward as **logs** that when executed in parallel (forking twice) will result in all objectives being solved simultaneously, with you and your forks arriving at the **Link** just in time to combine everything, transmit, and avert catastrophe.
