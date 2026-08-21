/* ==========================================================================
   DATA — edit this file freely. Nothing here touches design or logic.
   ==========================================================================

   HOW UNLOCKING WORKS
   Day 1 unlocks on CONFIG.startDate. Day 2 unlocks the day after that,
   and so on, one envelope per calendar day, until Day 29.

   HOW TO ADD MEDIA
   - Put files in /assets/images, /assets/audio, /assets/video.
   - Reference them with a relative path, e.g. "assets/images/day-03.jpg".
   - Leave a field empty/undefined ("") if you don't have that asset yet —
     templates degrade gracefully.

   CONTENT TYPES (assign one per day via "type")
   "letter"  → a handwritten note.                 fields: body (array of paragraphs), signature
   "photo"   → one framed photo.                    fields: image, caption
   "gallery" → several small photos.                 fields: images: [{src, caption}]
   "audio"   → a voice note / song.                  fields: audioSrc, note
   "video"   → a short video.                        fields: videoSrc, note
   "quote"   → a single standalone line.              fields: quote, attribution
   "list"    → a numbered list ("reasons why...").    fields: intro, items: []
   "mixed"   → a letter with one small inset photo.   fields: body, signature, image, imageCaption
   -------------------------------------------------------------------------- */

const CONFIG = {
  // The site's working title. Replace "her name" with your girlfriend's name.
  siteTitle: "29 Days Until You",
  recipientName: "My Love",

  // The date the FIRST envelope (Day 1) unlocks. Format: YYYY-MM-DD.
  // Set this so Day 29 lands exactly on the birthday.
  startDate: "2026-08-01",

  // Shown on the landing screen.
  landingSubtitle: "Twenty-nine letters, one for every day between now and the day you were born.",
  landingMeta: "A private letter, for your eyes only",

  // Background music (optional). Leave blank to disable the music toggle.
  // Suggested free, no-attribution sources are listed in README.md.
  music: {
    src: "assets/audio/background-theme.mp3",
    label: "Soft piano, for reading by",
     startAt: 73
  },


};

const DAYS = [
  {
    day: 1,
    type: "letter",
    title: "Okay, so",
  body: [
    "so this is the thing I've been working on and keeping a secret from you. instead of just making a countdown and watching the days pass until your birthday, I wanted to give you something a little more special.",
    "twenty-nine little letters. one for every day until your birthday. some might be long, some might be simple, but every single one is something I wanted you to have and a little reminder of how much you mean to me.",
      "open one a day, okay? don't skip ahead even though I know you're going to be curious. enjoy each little moment, because this is my way of making every day before your birthday a little more special for you."
  ],
  signature: "I love you more with every day that passes"
  },
  {
    day: 2,
    type: "quote",
    quote: "If I were given nine lives like a cat, I would spend every one of them finding you, loving you, and calling you home—because one lifetime with you could never be enough.",
    attribution: "Day Two"
  },
  {
    day: 3,
    type: "photo",
    image: "assets/images/day-03.jpg",
    caption: "I think I annoy you on purpose sometimes... because seeing this smile is always worth it."
  },
  {
    day: 4,
    type: "list",
    intro: "Reasons I'm counting down, part one:",
    items: [
      "You remember details I forget about myself.",
       "The way you get so excited when I tell you we're meeting tomorrow. Seeing how happy you are makes me look forward to it even more.",
      "The way you become so cute when you're eepy. I don't know how you do it, but it makes me smile every time.",
      "The way you care about me in a way no one ever has. You make me feel understood, supported, and loved.",
    ]
  },
    {
    day: 5,
type: "letter",
title: "A Small Confession",
body: [
  "Sometimes I wonder if you know just how much space you take up in my heart.",
"You're in the little moments I don't even think about anymore. When something funny happens, you're the first person I want to tell. When I hear a song I like, I wonder if you'd like it too. When I see something cute, I already know you're going to be the reason I smile.",
"I don't think loving you has ever felt like a choice. It happened so naturally that now it's become a part of who I am. Making you smile, planning little surprises, writing things like this... none of it has ever felt like effort.",
"Because at the end of the day, if it has your smile waiting on the other side, I'd do it all over again without thinking twice."
],
signature: "— always you ❤️"
  },
  {
    day: 6,
     type: "mixed",
body: [
  "Every time I look at this photo, I find myself smiling without even realising it.",
  "It was one of those simple days that didn't need anything extraordinary to become unforgettable. We laughed, talked, walked around together, and somehow made one of my favourite memories. If I could relive one ordinary day with you, I think I'd quietly choose this one."
],
signature: "— one of my favourite memories ❤️",
image: "assets/images/20250625_135906.jpg",
imageCaption: "a day I'll never forget"
  },
  {

    day: 7,
   type: "gallery",
    images: [
      { src: "assets/images/20260806_135048.jpg", caption: "yummy food with my foodie" },
      { src: "assets/images/20260806_133141.jpg", caption: "lost in your beauty" },
      { src: "assets/images/20260803_112325.jpg", caption: "a beautiful coffee date with a beautiful girl" }
    ]
  },
  {
  day: 8,
  type: "mixed",
  body: [
    "I could probably fill this whole website with reasons why I find you beautiful, but honestly, it's not just the way you look.",
    "It's the way you care, the way you love, the way you get excited over little things, and the way you make me feel loved without even trying. That's the part of you I could never put into a photo."
  ],
  signature: "— beautiful in all the ways that matter ❤️",
  image: "assets/images/20250421_125606.jpg",
  imageCaption: "just you, being you"
},
{
  day: 9,
  type: "quote",
  quote: "If I had to choose my favourite place in the world, I don't think I'd choose a place at all. I'd choose wherever I get to sit beside you.",
  attribution: "Day Nine"
},
{
  day: 10,
  type: "letter",
  title: "Ten Days In",
  body: [
    "Ten days already. It's funny how I've spent so much time waiting for your birthday, but somehow I'm enjoying these little days just as much.",
    "I hope you know that this isn't just a countdown to your birthday. It's twenty-nine little reminders of how much I love having you in my life."
  ],
  signature: "— and I'm not even halfway done loving you ❤️"
},
{
  day: 11,
  type: "list",
  intro: "A few things I hope you never forget about yourself:",
  items: [
    "You are so much more beautiful than you realise, especially when you're not even trying.",
    "Your eyes is one of the things I admire most about you.",
    "Your smile can change my entire mood without you even knowing it.",
    "You are loved more deeply than you probably realise."
  ]
},
{
  day: 12,
  type: "photo",
  image: "assets/images/20250421_125606.jpg",
  caption: "I don't think you realise how pretty you look when you're just being yourself."
},
{
  day: 13,
  type: "letter",
  title: "You Make It Easy",
  body: [
    "One thing I've realised about loving you is that it never feels complicated. Even when life isn't perfect, having you beside me makes it easier.",
    "You make me feel cared for, understood and loved in a way that means more to me than I probably show.",
    "I don't need a special reason to be grateful for you. I just am. Every day."
  ],
  signature: "— always grateful for you"
},
{
  day: 14,
  type: "letter",
  title: "Halfway To You",
  body: [
    "Fourteen days. We're officially halfway there, and I honestly don't know where the time went.",
    "I started this because I wanted to give you something every day before your birthday, but somewhere along the way I realised something... I really like having a reason to tell you how much I love you."
  ],
  signature: "— halfway there, still completely yours ❤️"
},
{
  day: 15,
  type: "quote",
  quote: "I don't need a perfect life. I just want a life with you in it, filled with ordinary days that somehow become my favourite memories.",
  attribution: "Day Fifteen"
},
{
  day: 16,
  type: "mixed",
  body: [
    "There are so many little things about you that I could write about forever, but sometimes I think my favourite thing is simply having you beside me.",
    "Whether we're doing absolutely nothing or going somewhere together, somehow the day always feels better when you're there."
  ],
  signature: "— you make ordinary days feel special",
  image: "assets/images/20260810_130618.jpg",
  imageCaption: "one of those little memories I keep close"
},
{
  day: 17,
  type: "quote",
  quote: "If you ever wonder how much you mean to me, look at how naturally I include you in every version of my future.",
  attribution: "Day Seventeen"
},
{
  day: 18,
  type: "gallery",
  images: [
    { src: "assets/images/20260728_104847.jpg", caption: "one of my favourite versions of you" },
    { src: "assets/images/20260812_132646.jpg", caption: "a moment I wish I could go back to" },
    { src: "assets/images/Screenshot_20260411_160815_Viber.jpg", caption: "just you being you ❤️" }
  ]
},
{
  day: 19,
  type: "letter",
  title: "The Ordinary Days",
  body: [
    "I think some of my favourite memories with you are the ones that weren't supposed to be special.",
    "Just sitting together, talking about random things, laughing at something stupid, getting food, or simply being around each other. Those little moments are the ones I find myself missing the most."
  ],
  signature: "— I think I'd choose the ordinary days with you every time"
},
{
  day: 20,
  type: "list",
  intro: "Little things you do that I don't think you realise I notice:",
  items: [
    "The way you get genuinely excited when you know we're going to see each other.",
    "The way your voice gets even softer when you're sleepy.",
    "The way you care about me even when you have your own things going on.",
    "The way you somehow make me feel loved without even having to say anything."
  ]
},
  {
    day: 21,
    type: "quote",
    quote: "eight days from now, you'll be a year older and I'll be exactly as sure about you as I am tonight.",
    attribution: "Day Twenty-One"
  },
  {
    day: 22,
    type: "photo",
    image: "assets/images/Screenshot_20211202-201005_Gallery.jpg",
    caption: "One of the first photos I ever took of you. I still have the rest."
  },
  {
    day: 23,
    type: "letter",
    title: "Getting Close Now",
    body: [
      "I keep checking the calendar like it might move faster if I look at it enough. It won't, and honestly, I don't mind the wait — it gives me more days to write these."
    ],
    signature: "— impatient, in the best way"
  },
  {
    day: 24,
    type: "video",
    videoSrc: "assets/video/day-24-clip.mp4",
    note: "A little something I've been sitting on for weeks."
  },
  {
    day: 25,
    type: "mixed",
    body: ["Five days left. This one's less a letter and more a receipt — proof that I was thinking of you, again, still."],
    signature: "— predictably",
    image: "assets/images/day-25-insert.jpg",
    imageCaption: "kept for exactly this"
  },
  {
    day: 26,
    type: "quote",
    quote: "Every year adds a number to your age and a reason to my list.",
    attribution: "Day Twenty-Six"
  },
  {
    day: 27,
    type: "letter",
    title: "Nearly There",
    body: [
      "Two days out. I've rewritten tomorrow's letter four times, which should tell you how much thought is going into the one after it.",
      "Get some rest. You'll want the energy."
    ],
    signature: "— with a plan, for once"
  },
  {
    day: 28,
    type: "list",
    intro: "The night before, a short list of the truest things I know:",
    items: [
      "I chose you on purpose, and I'd choose you again tomorrow.",
      "You make the ordinary parts of life feel worth showing up for.",
      "Whatever tomorrow looks like, being there with you is the whole point."
    ]
  },
  {
    day: 29,
    type: "letter",
    title: "Happy Birthday",
    body: [
      "Here you are. Twenty-nine doors later, and the only thing I want to say is the simplest one: happy birthday.",
      "Thank you for letting me count down to you, out loud, in public, unashamed. Here's to the year ahead — and to writing thirty more of these next year."
    ],
    signature: "— yours, today and every day after"
  }
];

// Exposed as globals for the other modules (kept dependency-free on purpose,
// so this file can be edited without touching a build step).
window.CONFIG = CONFIG;
window.DAYS = DAYS;
