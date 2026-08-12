---
layout: page
title: mice
permalink: /shonei/mice/
---

mice are the main inhabitants of [shonei](/shonei/). 

![asd](/assets/shonei/mouse.png)

#### activities 

mice can participate in [work](/shonei/work/), leisure, eating, and eeping.

a mouse decides what to do by considering the urgency of each candidate task. 

- eating urgency scales with hunger, with the highest possible urgency of any task. 
- sleep urgency scales with tiredness, and also with the time of day, peaking shortly after midnight. 
- leisure: there are several leisure activities, which fulfill different desires. the urgency of leisure is dependent on time of day, reaching its height in the evening. the urgency of each available activity depends on how unsatisfied the desire is. 
- work: there are many work activities. to choose between them, a mouse will consider 
    - distance
        - a work task that is far (> ~32 tiles) from both the mouse and the mouse's work anchor (by default, the mouse's home) will not be considered. this range can be seen in the mouse's info panel. 
    - player set priority 
        - at most work sites, players can set one of four priority levels. mice will only consider the highest available priority tasks that their job can help with, and choose within this band.
    - abundance of inputs and outputs, relative to player set item targets
        - the settlement has a target amount set for each item in the game, usually defaulting to 100 tails. mice will choose recipes that bring us closer to the targeted amounts. the amount of item we have divided by the target for that item is the *abundance* of the item. 
        - a recipe's score is the geometric average of the inputs abundances divided by the geometric average of the output abundances.
        - see [work](/shonei/work/) for details
- there are several other minor activities that slot into this urgency system, like equipping, idling, and dropping (when inventory is getting full).

#### food 

mice get hungry. under normal conditions, whenever a mouse starts to get hungry, they will seek out a food that they are craving and grab enough of it to keep them satisfied for about half a day, eating some immediately and holding on to leftovers. 

if food is very scarce in the settlement, mice will eat only what they need to stay above the threshold at which they get penalties to work efficiency. mice will also spend more time sleeping, so as to not get hungry as fast.

some foods satisfy desires. for instance, tofu satisfies a "soy" desire, and will be sought out quickly by mice who haven't had soy recently. other foods like acorns are not calorie dense and do not satisfy a specific desire, and will be eaten mostly as a last resort. 

#### desires 

satisfying desires raises mouse happiness, which allows you to have more mice. 

mice have many desires. they include 
- stored food 
- light
- nature 
- temperature 
- food 
    - wheat 
    - soy 
    - fruit 
- leisure 
    - social 
    - fireplace 
    - reading

#### life cycle 

mice can have children, if there is 
- enough housing 
- enough food stored (more days required in winter)
- high enough average happiness

children work half as fast and carry half as much as adults. they became adults at 6 months old.

#### skills 

mice receive experience for working. at higher skill levels, mice work slightly faster. 

for instance, experience in the woodworking skill is granted for the time spent cutting wood into planks. a more skilled woodworker will be faster at all woodworking recipes. 

for the hauling skill, experience is granted for hauling heavy loads. more skilled haulers receive less of a movement slowdown when carrying heavy loads.