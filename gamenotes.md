# Sectors
 * Sector has resources
 * Sector has challenges
 * Sector has items
 * Sector has Neighbors

# Items
  * Quest Items -- Unique items required for completing challenges. Cannot be sold.
  * Resource Items -- Generic items that can be sold or used for crafting
  * Passive Items -- Items that grant benefits to a player w/o having to be USEd
  * Knowledge Items -- Passwords, secret info, etc.

# Recipes
  * Input Items => Output Items

# Actions
  * GO (NW, NE, E, S, W) - Moves Sectors
  * CRAFT - Creates items from knows recipes
  * USE - Use an item (optionally on a TARGET)
  * SEARCH - Discover items in a sector (or a TARGET)
  * MINE - Acquire resources in a sector
  * SHOP/BUY - Acquire items from a vendor in a sector
  * LOOK - Re-describes the current sector
  * TAKE - get an item

# Challenges
  * Need an item
  * Need a skill
  * Need a stat
  * Change state of another sector
  * Perform actions in order
  * Puzzle

# Rewards
  * Receive item
  * Receive credits
  * Change state of sector
  * Receive recipe
  * Learn skill
  * Level up stat

# Player
  * Inventory
  * Recipes
  * Stats? (Actions / Sector, Str, Char)
  * Health?
  * Credits <$$>
  * Skills/Abilities

# Virus
  * Enters a Sector at a specific time
  * Grows in Sector every x time
  * After y time after max growth, spreads to a neighbor sector
  * Spread Path: Can start at any sector, but follows this path: 1 5 6 4 2 8 3 11 9 12 7 10 1 5 6...

# Time
  * Moving sectors costs Time
  * Some resources accumulate over time
  * Virus spreads over time

# The Quest
  * Ultimate goal is to stop virus
    * Either by constructing UPLINK to new node
    * or by developing Antivirus
  * To complete quest, have to learn recipes, craft items, discover special items
