'use strict'

//item data
const items = [
  {
    itemListName:
      'IBIS Titanium Racing Road Bike USA SEBASTOPOL 56cm Made in California',
    description:
      'Ibis TI Bike, highly collectible, Superb titanium tube set, superb ride, 56CM top tube, semi sloping geo. 52cm seat tube. FYI, I am keeping the saddle, wheel set and pedals for my other bike.Questions welcomed.',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Closed',
    deliveryOption: 'Pickup_Only',
    userId: 1,
  },
  {
    itemListName: 'Stove and pan',
    description:
      'Another family member left this 15 years ago and does not want it back. I don’t have matching lid to go with the pan. Please email me with a possible pickup time.',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 1,
  },
  {
    itemListName: 'Queen bed frame and duvet',
    description:
      " A queen metal bedframe. Also duvet + cover + pillow. No mattress. The duvet has only been lightly used and are only several months old / the duvet cover just needs a regular wash in the laundry. I would have kept them but I needed to move fast and wasn't able to take them with me.",
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 3,
  },
  {
    itemListName: 'Gucci Gold Sandals',
    description:
      'Gold Sandals in good condition. It comes with the box and a dust bag. Worn once. Size 38.',
    itemType: 'Offer',
    itemCondition: 'Gently_Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 2,
  },
  {
    itemListName: 'Gucci Boots',
    description:
      'ISO of Gucci Boots since I gave away my pair of Gucci sandals. Size 38.',
    itemType: 'Seeking',
    itemCondition: 'Gently_Used',
    status: 'Open',
    deliveryOption: 'No_Contact_Pickup',
    userId: 2,
  },
  {
    itemListName: 'FREE 87 REGAL AFT CABIN-NEEDS MOTOR',
    description:
      '87 REGAL 23 FT. NEEDS MOTOR. FULL V CABIN PLUS AFT CABIN! SLEEPS 6!! ,FRIDGE SINK,STOVE,FULL HEAD WITH TANK! JUST BOTTOM PAINTED 5 YR PAINT! Never got around to putting in an engine and was just going to donate to make room for my other boat. hard to work with the charitable org. during this pandemic so I figured I give it a shot to sell for same as donation. If you Know way around boats could pick up a deal. Boat is in water and would have to pick it up at nearby ramp.Very LOCAL Water delivery also possible. Thanks.',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Will_Deliver',
    userId: 4,
  },
  {
    itemListName: 'Bike',
    description: 'ISO of Bike',
    itemType: 'Seeking',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'No_Contact_Pickup',
    userId: 1,
  },
  {
    itemListName: 'Bike Helmet',
    description: 'ISO - Bike Helmet',
    itemType: 'Seeking',
    itemCondition: 'New',
    status: 'Open',
    deliveryOption: 'No_Contact_Pickup',
    userId: 1,
  },
  {
    itemListName: 'A puppy',
    description: 'ISO of cute puppy - prefer a pug',
    itemType: 'Seeking',
    itemCondition: 'New',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 4,
  },
  {
    itemListName: 'Baby swing ',
    description: 'Battery operated Eddie Bauer baby swing. Works.',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 5,
  },
  {
    itemListName: "Baldwin 5'1 BG Piano",
    description:
      "Hi everyone, how are you all doing today?.. Hope your day started well...Am giving out a Baldwin 5'1 Baby Grand Piano out for free to a very passionate lover who will take good card of this beautiful baby... If interested, please do drop me a phone number so i can contact you. Thanks.",
    itemType: 'Offer',
    itemCondition: 'Gently_Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 5,
  },
  {
    itemListName: 'Free tile',
    description:
      'Around 100 tiles, 3 types- s/m/l\nMaybe enough for a backsplash, but not a floor. Good for extras or spot repairs.\nVERY heavy.',
    itemType: 'Offer',
    itemCondition: 'New',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 6,
  },
  {
    itemListName: 'Brown microfiber chair',
    description:
      'Light brown microfiber chair\nChrome legs\nNo tears or holes\nA bit dirty but can probably be cleaned up\nI can help load into your vehicle\n38" wide, 38" deep, 31" tall\nPlease call or text, show contact info\nYes it is available and no I won\'t send a code to prove that I\'m real',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 7,
  },
  {
    itemListName: 'World War II and Aviation History magazines',
    description:
      'Three World War II and two Aviation History magazines (monthly subscription, so there will be others in the future if interested) * Sorry but won\'t "hold" * first here (State/Ontario Streets) is welcome to them.',
    itemType: 'Offer',
    itemCondition: 'Gently_Used',
    status: 'Open',
    deliveryOption: 'Will_Deliver',
    userId: 8,
  },
  {
    itemListName: "35'' SANYO TV",
    description:
      'GOOD FOR VIDEO GAMES IN BASEMENT,HAVE REMOTE.TUBE TV ,VERY HEAVY',
    itemType: 'Offer',
    itemCondition: 'New',
    status: 'Open',
    deliveryOption: 'Will_Deliver',
    userId: 9,
  },
  {
    itemListName: 'Bifold Closet Door',
    description:
      '2 Closet doors. We swapped them for sliding doors.\n\nSize 35 width x 75 height each.\n\nSome damage but overall still in good shape.',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Will_Deliver',
    userId: 6,
  },
  {
    itemListName: 'Free ikea ektorp black sofa ',
    description:
      'Perfectly good couch in good condition, includes purple cover as well. Cat friendly home. Must pick up from 3rd floor in east Lakeview',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'No_Contact_Pickup',
    userId: 6,
  },
  {
    itemListName: "7' custom sofa",
    description: "Couch 7' in great shape,\ncome get it!",
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 5,
  },
  {
    itemListName: '8 saucers & 2 small glass pitchers',
    description: '8 SAUCERS & 2 SMALL GLASS PITCHERS IF ANYONE CAN USE.',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 4,
  },
  {
    itemListName: 'Free Pine Armoire',
    description:
      'Decent armoire in the alley behind 1100 N. Dearborn Street, Chicago, IL 60622.',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'No_Contact_Pickup',
    userId: 3,
  },
  {
    itemListName: 'Free Wooden Picture window ',
    description:
      'FREE\nhave 2 large Wooden picture windows must be able to carry out Weight about 300 lbs.\n\nThe larger windows are\nsize 76”Width x62 length',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'No_Contact_Pickup',
    userId: 8,
  },
  {
    itemListName: 'China cabinet',
    description:
      'China cabinet. has glass shelves and display light. As-is (see pics)\n\n81"Tall x 55"W x 16"D.\n**Item is built as ONE piece. and needs to be transported as such.\nPick up only.',
    itemType: 'Offer',
    itemCondition: 'Gently_Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 7,
  },
  {
    itemListName: 'T8 Energy Efficient fluorescent light bulbs',
    description:
      'We have over 500 4’ T8 Energy Efficient fluorescent light bulbs that all work. A good portion are even brand new. These are 5000K color and sell for over $2 a bulb. Free to anyone who needs them and can pickup. Email me your phone number and I will call you. If this post is up they are available',
    itemType: 'Offer',
    itemCondition: 'New',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 7,
  },
  {
    itemListName: 'Free bales of hay',
    description:
      'Free bales of hay, pick up anytime. Under the elevated tracks at 940 w Wolfram.',
    itemType: 'Offer',
    itemCondition: 'New',
    status: 'Open',
    deliveryOption: 'No_Contact_Pickup',
    userId: 9,
  },
  {
    itemListName:
      'Free kitchen cabinets and bathroom vanity/ sliding door/ mirror',
    description:
      'Free. Old but in very good condition. 2 kitchens to pick from or take both. Working stove and fridge set included with it and only if you take it all. Need gone on Saturday. Will help uninstall and load them to your truck. Serious inquiries only and unless you have truck/ van and the means to come, pls don’t waste my time. Text only',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 1,
  },
  {
    itemListName: 'Moving Boxes - Free - Pickup in Round Lake Beach',
    description:
      'Free Moving Boxes\nAvailable while they last\nmore boxes each week\n\nUnfortunately we are to busy to take calls.\nPlease stop by for boxes, there are times they\nmay not be available. Sorry for any inconvenience this\nmay cause. Just trying to keep boxes out of the landfill.\n\nMonday - Friday 9a - 2p',
    itemType: 'Offer',
    itemCondition: 'Gently_Used',
    status: 'Open',
    deliveryOption: 'No_Contact_Pickup',
    userId: 2,
  },
  {
    itemListName: 'Free woodchip dumpsite',
    description:
      "Any tree removal companies that need a place to dump there wood chips, our place is great for dump truck or semi's. Anyone who has wood chips, you could dump at our site for free.\n\nNo trunks. Just woodchips.\n\nIf you have any questions or need location address, email me.",
    itemType: 'Offer',
    itemCondition: 'New',
    status: 'Open',
    deliveryOption: 'No_Contact_Pickup',
    userId: 5,
  },
  {
    itemListName: 'Sofa Bed',
    description:
      "Lightly used sofa bed for free. We are downsizing.\nLived its life in TV room in a home that doesn't watch much TV\nHeavy, will need a truck and two strong people\nIt is in our garage.\nemail us to arrange pick up",
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 8,
  },
  {
    itemListName: 'print\nFree Rolling Pins',
    description:
      'Disposing of warehouse inventory for embossed rolling pins. Must pick up from warehouse. Different designs.',
    itemType: 'Offer',
    itemCondition: 'New',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 8,
  },
  {
    itemListName: 'Free Three year old tree',
    description:
      'The landscapers are coming tomorrow I need this tree gone today I do not know what kind of tree it is it’s 6 inches in diameter you would have to dig it up again it Has to be gone today go to 2255 W. Monroe before you dig it up text me show contact info\nmy name is Lynn maybe you can Google the house to see what kind of tree it is',
    itemType: 'Offer',
    itemCondition: 'New',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 7,
  },
  {
    itemListName: 'Sling for Rotator Cuff Surgery Large',
    description:
      "Sling for Rotator Cuff Surgery Large Size.\nIt has velcro on straps and you can adjust it.\nVery clean, lightly used.\nHely & Weber Shoulder Sling\nemail me, I'll leave it to our apartment lobby for you to pick up.",
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 6,
  },
  {
    itemListName: 'plywood free',
    description:
      '2 sheets and half come and oick up on alley behind 7464 n sheridan',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 9,
  },
  {
    itemListName:
      'Giving away 16 free worn out tires. Can be used for garden, gardening or project',
    description: 'please call!',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 2,
  },
  {
    itemListName: 'fancy champagne boxes',
    description: 'two fancy champagne boxes',
    itemType: 'Offer',
    itemCondition: 'Gently_Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 3,
  },
  {
    itemListName: 'misc stone, ceramic & porcelain tiles',
    description:
      'WYSIWYG (for those under 35, WhatYouSeeIsWhatYouGet)\n\nvarious sizes and materials that you can make something creative out of',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 6,
  },
  {
    itemListName: 'Large Heavy Safe-Cabinet',
    description:
      'Large, 975 pound safe-cabinet by The Safe-Cabinet Company, Marietta, Ohio.\n65 tall by 29.5 wide by 28.25 deep.',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 3,
  },
]
module.exports = items
