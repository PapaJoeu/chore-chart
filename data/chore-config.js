window.CHORE_CONFIG = {
  "legend": {"D": "Daily", "S": "Weekly", "SWF": "Sun/Wed/Fri", "M": "Monthly"},
  "defaults": {"weeklyDay": "Sunday", "swfDays": ["Sunday", "Wednesday", "Friday"], "monthlyDay": "Sunday"},
  "chores": [
    {"category": "Priority", "name": "Dishes to Kitchen", "rate": "D"},
    {"category": "Priority", "name": "Clothes to Hampers", "rate": "D"},
    {"category": "Priority", "name": "Put Food Away", "rate": "D"},
    {"category": "Priority", "name": "Hang Up Backs", "rate": "D"},

    {"category": "Bedroom", "name": "Make Bed", "rate": "D"},
    {"category": "Bedroom", "name": "Change Sheets", "rate": "S", "days": ["Sunday"]},

    {"category": "Laundry", "name": "Move Clean Laundry", "rate": "D"},
    {"category": "Laundry", "name": "Start New Load", "rate": "D"},
    {"category": "Laundry", "name": "Fold Laundry", "rate": "D"},
    {"category": "Laundry", "name": "Wash Sheets", "rate": "S", "days": ["Sunday"]},

    {"category": "Kitchen", "name": "Tidy Snack Station", "rate": "D"},
    {"category": "Kitchen", "name": "Get New Mugs", "rate": "D"},
    {"category": "Kitchen", "name": "Empty Fridge", "rate": "M"},
    {"category": "Kitchen", "name": "Refill Britta", "rate": "SWF"},
    {"category": "Kitchen", "name": "Replenish Drinks", "rate": "SWF"},
    {"category": "Kitchen", "name": "Update Grocery List", "rate": "SWF"},

    {"category": "Bathroom", "name": "Clear off Counters", "rate": "D"},
    {"category": "Bathroom", "name": "Toilet Bowl", "rate": "S"},
    {"category": "Bathroom", "name": "Toss Out Old Bottles", "rate": "S"},

    {"category": "Trash", "name": "Bathroom Trash", "rate": "SWF"},
    {"category": "Trash", "name": "Bedroom Trash", "rate": "D"},
    {"category": "Trash", "name": "Living Room Trash", "rate": "D"},
    {"category": "Trash", "name": "Take Trash To Curb", "rate": "M"},

    {"category": "Chata", "name": "Empty Litterbox", "rate": "S"},
    {"category": "Chata", "name": "Check Food", "rate": "SWF"},
    {"category": "Chata", "name": "Check Water", "rate": "SWF"},
    {"category": "Chata", "name": "Trim Claws", "rate": "S"},
    {"category": "Chata", "name": "Change Filter", "rate": "M"},

    {"category": "Plants", "name": "Water Small Plants", "rate": "S"},
    {"category": "Plants", "name": "Fill Humidifier", "rate": "D"},

    {"category": "Floors", "name": "Sweep", "rate": "D"},
    {"category": "Floors", "name": "Mop", "rate": "S"},

    {"category": "Office", "name": "Declutter Desks", "rate": "D"},
    {"category": "Office", "name": "Review Calendar", "rate": "D"},
    {"category": "Office", "name": "Review To Do", "rate": "D"}
  ]
};
