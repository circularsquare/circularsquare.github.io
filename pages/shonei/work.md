---
layout: page
title: work
permalink: /shonei/work/
---

[mice](/shonei/mice/) can have a job. the jobs in the game include 

- hauler 
- logger
- farmer 
- digger 
- miner 
- woodworker 
- cook
- clothier 
- [scientist](/shonei/research/) 
- scribe 
- mender
- merchant

most recipes in the game are restricted to mice of a certain job. for instance, only miners can work at quarries. but to facilitate the smooth running of the settlement, mice assigned as non-haulers can still help with hauling if they have nothing to do for their assigned job.

#### how mice choose between work tasks 

a mouse first considers distance and player set priority. this narrows down the range of work tasks, and among them they choose based on task score.

- distance
    - a work task that is far (> ~32 tiles) from both the mouse and the mouse's work anchor (by default, the mouse's home) will not be considered. this range can be seen in the mouse's info panel. 
- player set priority 
    - at most work sites, players can set one of four priority levels. mice will only consider the highest available priority tasks that their job can help with, and choose within this band.
- for crafting jobs, abundance of inputs and outputs, relative to player set item targets
    - the settlement has a target amount set for each item in the game, usually defaulting to 100 tails. mice will choose recipes that bring us closer to the targeted amounts. the amount of item we have divided by the target for that item is the *abundance* of the item. 
    - a recipe's score is the geometric average of the inputs abundances divided by the geometric average of the output abundances.
    - for instance, a woodworker is choosing between crafting stone tools and crafting planks. 
        - we currently have 
            - 100 wood / 100 target 
            - 50 planks / 100 target 
            - 50 stone / 100 target 
            - 1 tools / 100 target  
        - the relevant recipes are 
            - 1 wood -> 1 planks 
            - 1 planks + 1 stone -> 1 stone tools.
        - the planks recipe scores at (100 wood / 100 target) / (50 planks / 100 target) = 2.0
        - the tools recipe scores as ((50 planks / 100 target) * (50 stone / 100 target))^0.5 / (1 tools / 100 target) = 50.0
        - so the mouse goes to make tools, because we are very short on tools, and not particularly short on the inputs. 
- for extraction jobs (miner/digger), there are no recipes to choose from
    -  all work stations have the same fixed score
- for haulers, there are also no recipes to choose from
    - score depends on proximity of items to be hauled, and what type of haul it is (from floor to storage, from storage to storage consolidation, etc.)