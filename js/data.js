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
    type: "audio",
    audioSrc: "assets/audio/day-07-voice-note.mp3",
    note: "A voice note, recorded at an hour I should've been asleep."
  },
  {
    day: 8,
    type: "gallery",
    images: [
      { src: "assets/images/day-08-a.jpg", caption: "a Tuesday" },
      { src: "assets/images/day-08-b.jpg", caption: "that trip" },
      { src: "assets/images/day-08-c.jpg", caption: "your idea, obviously" }
    ]
  },
  {
    day: 9,
    type: "quote",
    quote: "Home was never a place for me until it became a person.",
    attribution: "Day Nine"
  },
  {
    day: 10,
    type: "letter",
    title: "Ten Days",
    body: [
      "Double digits. I don't have anything clever to say today — just that ten days feels both impossibly long and much too short, depending on the hour."
    ],
    signature: "— counting, badly, on purpose"
  },
  {
    day: 11,
    type: "list",
    intro: "Things you've taught me without meaning to:",
    items: [
      "Patience isn't the absence of frustration, it's choosing softness anyway.",
      "Rest is not a reward you have to earn.",
      "Saying the kind thing out loud costs nothing and changes everything."
    ]
  },
  {
    day: 12,
    type: "photo",
    image: "assets/images/day-12.jpg",
    caption: "You, mid-laugh, not posing for anyone."
  },
  {
    day: 13,
    type: "video",
    videoSrc: "assets/video/day-13-clip.mp4",
    note: "Thirty seconds I've watched more times than I'll admit."
  },
  {
    day: 14,
    type: "letter",
    title: "Halfway There",
    body: [
      "Fourteen down, fifteen to go. If this were a book, we'd be at the part where the reader stops being able to put it down.",
      "I already know how this story keeps going. I just get to keep being surprised by how good it is."
    ],
    signature: "— still turning the pages"
  },
  {
    day: 15,
    type: "quote",
    quote: "I used to think love was a feeling. You taught me it's closer to a decision, made quietly, every day.",
    attribution: "Day Fifteen"
  },
  {
    day: 16,
    type: "mixed",
    body: ["Some days the countdown is the whole plan — get through it, get closer to seeing you."],
    signature: "— patience, rewarded",
    image: "assets/images/day-16-insert.jpg",
    imageCaption: "your favorite coat, worn out"
  },
  {
    day: 17,
    type: "audio",
    audioSrc: "assets/audio/day-17-song.mp3",
    note: "The song that made me think of you before I knew why."
  },
  {
    day: 18,
    type: "gallery",
    images: [
      { src: "assets/images/day-18-a.jpg", caption: "the good light" },
      { src: "assets/images/day-18-b.jpg", caption: "unplanned, best kind" }
    ]
  },
  {
    day: 19,
    type: "letter",
    title: "An Ordinary Tuesday",
    body: [
      "Nothing remarkable happened today, which is exactly why I wanted to write it down. Some of my favorite memories of you are the unremarkable ones."
    ],
    signature: "— grateful for the boring days too"
  },
  {
    day: 20,
    type: "list",
    intro: "Small things I noticed this week:",
    items: [
      "You still save the last bite for me without being asked.",
      "You text me the second something reminds you of a memory.",
      "You never let a disagreement turn into distance."
    ]
  },
  {
    day: 21,
    type: "quote",
    quote: "Twenty-one days from now, you'll be a year older and I'll be exactly as sure about you as I am tonight.",
    attribution: "Day Twenty-One"
  },
  {
    day: 22,
    type: "photo",
    image: "assets/images/day-22.jpg",
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
