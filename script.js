"use strict";

// ============================================================
//  SKY EVENTS — 12 AI TOOLS
//  Pure JavaScript — works by double-clicking index.html
//  No API, no server, no fetch needed
// ============================================================

// ── Sky Events Data ──────────────────────────────────────────
var EVENTS = [
  {
    name: "College Fest 2026",
    date: "March 15, 2026",
    venue: "YMCA Grounds, Chennai",
    tags: [
      "music",
      "dance",
      "lights",
      "students",
      "performance",
      "college",
      "fun",
      "fest",
      "band",
    ],
  },
  {
    name: "Acoustic Night",
    date: "April 10, 2026",
    venue: "Ampa Skywalk Rooftop, Chennai",
    tags: [
      "acoustic",
      "music",
      "chill",
      "rooftop",
      "night",
      "guitar",
      "unplugged",
      "soulful",
      "calm",
    ],
  },
  {
    name: "Open Mic & Art Fest",
    date: "May 22, 2026",
    venue: "Thiruvanmiyur Beach Lawn, Chennai",
    tags: [
      "art",
      "poetry",
      "openmic",
      "creativity",
      "painting",
      "talent",
      "beach",
      "expression",
      "writing",
    ],
  },
  {
    name: "Summer Music Fiesta",
    date: "June 18, 2026",
    venue: "Phoenix Marketcity Event Arena, Chennai",
    tags: [
      "dj",
      "electro",
      "summer",
      "dance",
      "hype",
      "beats",
      "energy",
      "night",
      "party",
    ],
  },
];

// ── Show output immediately ──────────────────────────────────
function showOutput(id, text) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.style.display = "block";
  el.classList.add("show");
}

// ── Button state ─────────────────────────────────────────────
function btnOn(btn) {
  btn.disabled = true;
  btn.textContent = "⏳ Generating...";
}
function btnOff(btn, label) {
  btn.disabled = false;
  btn.textContent = label;
}

// ── Fake delay using setTimeout (works in file:// protocol) ──
function wait(ms, fn) {
  setTimeout(fn, ms);
}

// ============================================================
//  TOOL 1 — EVENT RECOMMENDER
// ============================================================
window.runRecommender = function () {
  var btn = event.target;
  var val = document.getElementById("rec-input").value.trim().toLowerCase();
  if (!val) {
    alert("Please type your interests first!");
    return;
  }
  btnOn(btn);
  wait(800, function () {
    var scores = EVENTS.map(function (ev) {
      var sc = 0;
      ev.tags.forEach(function (t) {
        if (val.indexOf(t) !== -1) sc += 3;
      });
      if (val.indexOf(ev.name.toLowerCase()) !== -1) sc += 5;
      return { ev: ev, sc: sc };
    });
    scores.sort(function (a, b) {
      return b.sc - a.sc;
    });
    var top = scores[0].ev;
    var sec = scores[1].ev;
    var out =
      "🎯 TOP PICK FOR YOU:\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
      "✦ " +
      top.name +
      "\n" +
      "📅 " +
      top.date +
      "\n" +
      "📍 " +
      top.venue +
      "\n" +
      "💰 Registration: ₹1800\n\n" +
      'Why this suits you:\nBased on your interest in "' +
      val.slice(0, 35) +
      '...", ' +
      top.name +
      " matches your vibe perfectly with " +
      top.tags.slice(0, 3).join(", ") +
      " energy!\n\n" +
      "🥈 ALSO CONSIDER:\n" +
      "✦ " +
      sec.name +
      "\n" +
      "📅 " +
      sec.date +
      "\n" +
      "📍 " +
      sec.venue +
      "\n\n" +
      "Both are ₹1800 — scroll up and click Register Now! 🎉";
    showOutput("rec-output", out);
    btnOff(btn, "Suggest Event");
  });
};

// ============================================================
//  TOOL 2 — DESCRIPTION WRITER
// ============================================================
window.runDescWriter = function () {
  var btn = event.target;
  var val = document.getElementById("desc-input").value.trim();
  if (!val) {
    alert("Please enter an event name or type!");
    return;
  }
  btnOn(btn);
  wait(900, function () {
    var templates = [
      "Get ready to experience " +
        val +
        " like never before! This is not just an event — it's a movement. Feel the energy, lose yourself in the moment, and create memories that last a lifetime. Featuring electrifying performances, stunning visuals, and an atmosphere that will leave you breathless. Don't miss it!",
      val +
        " is where magic meets reality. Brought to you by Sky Events, this one-of-a-kind experience blends incredible talent with an unforgettable atmosphere. Whether you're here for the music, the art, or the people — you'll leave with stories to tell. See you there! ✨",
      "Sky Events presents " +
        val +
        " — a night that defines what it means to truly celebrate. From the first beat to the last light, every moment is crafted for YOU. Gather your squad, bring the energy, and let's make history together in Chennai! 🔥",
    ];
    var pick = templates[Math.floor(Math.random() * templates.length)];
    var tag = val
      .replace(/\s+/g, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 15);
    var out =
      "✍️ EVENT DESCRIPTION:\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
      pick +
      "\n\n" +
      "📱 SHORT VERSION (for stories/tweets):\n" +
      '"' +
      val +
      ' by Sky Events — because ordinary nights are overrated. See you there! 🎶🔥"\n\n' +
      "#SkyEvents #Chennai #" +
      tag +
      " #EventLife";
    showOutput("desc-output", out);
    btnOff(btn, "Generate Description");
  });
};

// ============================================================
//  TOOL 3 — BUDGET PLANNER
// ============================================================
window.runBudgetPlanner = function () {
  var btn = event.target;
  var amount = parseFloat(document.getElementById("budget-input").value);
  var type = document.getElementById("budget-event").value.trim() || "event";
  if (!amount || amount <= 0) {
    alert("Please enter a valid budget!");
    return;
  }
  btnOn(btn);
  wait(800, function () {
    var cats = [
      { name: "🎤 Venue & Stage Setup", pct: 0.3 },
      { name: "🔊 Sound & Lighting", pct: 0.2 },
      { name: "📣 Marketing & Promotion", pct: 0.15 },
      { name: "🍕 Food & Refreshments", pct: 0.12 },
      { name: "🎨 Decoration & Design", pct: 0.08 },
      { name: "🛡️  Security", pct: 0.07 },
      { name: "📷 Photography/Videography", pct: 0.05 },
      { name: "🔧 Contingency Fund", pct: 0.03 },
    ];
    var lines = cats.map(function (c) {
      var val = Math.round(amount * c.pct);
      var bar = "";
      for (var i = 0; i < Math.round(c.pct * 20); i++) bar += "█";
      return (
        c.name +
        "\n  " +
        bar +
        " ₹" +
        val.toLocaleString("en-IN") +
        " (" +
        Math.round(c.pct * 100) +
        "%)"
      );
    });
    var out =
      "💰 BUDGET PLAN: " +
      type.toUpperCase() +
      "\n" +
      "Total: ₹" +
      amount.toLocaleString("en-IN") +
      "\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
      lines.join("\n\n") +
      "\n\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
      "💡 TIP: Always keep 3% contingency.\nFor a " +
      type +
      ", prioritize Sound & Lighting — it makes or breaks the experience!";
    showOutput("budget-output", out);
    btnOff(btn, "Plan Budget");
  });
};

// ============================================================
//  TOOL 4 — GUEST OPTIMIZER
// ============================================================
window.runGuestOptimizer = function () {
  var btn = event.target;
  var count = parseInt(document.getElementById("guest-count").value);
  var venue = document.getElementById("guest-venue").value.trim() || "venue";
  if (!count || count <= 0) {
    alert("Please enter expected guest count!");
    return;
  }
  btnOn(btn);
  wait(800, function () {
    var checkpoints = Math.max(2, Math.ceil(count / 80));
    var volunteers = Math.max(4, Math.ceil(count / 50));
    var buffer = Math.round(count * 0.08);
    var slots = Math.ceil(count / 60);
    var out =
      "👥 GUEST LIST REPORT\n" +
      "Guests: " +
      count +
      " | Venue: " +
      venue +
      "\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
      "📋 RSVP STRATEGY:\n" +
      "  • Send invites at least 2 weeks before\n" +
      "  • Use Google Forms for registration\n" +
      "  • Confirm attendance 48 hrs before event\n" +
      "  • Add " +
      buffer +
      " buffer slots for walk-ins\n\n" +
      "🚪 CHECK-IN SETUP:\n" +
      "  • Set up " +
      checkpoints +
      " entry checkpoint(s)\n" +
      "  • Assign " +
      volunteers +
      " volunteers\n" +
      "  • Split arrivals into " +
      slots +
      " time batches (20 min each)\n" +
      "  • Use QR-based entry for faster scanning\n\n" +
      "📊 CROWD MANAGEMENT:\n" +
      "  • Mark clear entry/exit zones\n" +
      "  • Keep 1.5 sq.m per person minimum\n" +
      (count > 300
        ? "  • Deploy security at stage & all exits\n"
        : "  • 2 volunteers at main gate is sufficient\n") +
      "  • Set up a help desk for queries\n\n" +
      "⚡ QUICK WINS:\n" +
      "  • WhatsApp group for last-minute updates\n" +
      "  • Printed seating chart for faster settling\n" +
      "  • Dedicated VIP/early-bird lane";
    showOutput("guest-output", out);
    btnOff(btn, "Optimize");
  });
};

// ============================================================
//  TOOL 5 — SCHEDULE GENERATOR
// ============================================================
window.runScheduleGen = function () {
  var btn = event.target;
  var name = document.getElementById("sched-event").value.trim();
  var hours = parseFloat(document.getElementById("sched-hours").value);
  if (!name || !hours || hours <= 0) {
    alert("Please fill event name and duration!");
    return;
  }
  btnOn(btn);
  wait(900, function () {
    function fmt(totalMins) {
      var base = 17 * 60;
      var t = base + totalMins;
      var h = Math.floor(t / 60) % 24;
      var m = t % 60;
      var ampm = h >= 12 ? "PM" : "AM";
      var hh = h > 12 ? h - 12 : h === 0 ? 12 : h;
      return (
        (hh < 10 ? "0" + hh : hh) + ":" + (m < 10 ? "0" + m : m) + " " + ampm
      );
    }
    var totalMins = hours * 60;
    var cursor = 0;
    function slot(label, dur) {
      var t = fmt(cursor);
      cursor += Math.round(dur);
      return t + "  →  " + label;
    }
    var hasBreak = hours >= 3;
    var lines = [
      slot("🔧 Venue Setup & Sound Check", totalMins * 0.12),
      slot("📋 Registration & Guest Arrival", totalMins * 0.1),
      slot("🎤 Opening & Welcome Address", 10),
      slot("🎶 Main Programme — Part 1", totalMins * 0.3),
    ];
    if (hasBreak) lines.push(slot("☕ Break & Refreshments", 15));
    lines = lines.concat([
      slot("🔥 Main Programme — Part 2", totalMins * 0.28),
      slot("🏆 Awards / Special Moments", 15),
      slot("🎊 Closing & Vote of Thanks", totalMins * 0.08),
      slot("📸 Group Photos & Networking", 20),
    ]);
    var out =
      "📅 SCHEDULE: " +
      name.toUpperCase() +
      "\n" +
      "Duration: " +
      hours +
      " hr(s) | Start: 05:00 PM\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
      lines.join("\n") +
      "\n\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
      "💡 TIP: Share with your team 24 hrs before.\nAssign a dedicated timekeeper to stay on track!";
    showOutput("sched-output", out);
    btnOff(btn, "Generate Schedule");
  });
};

// ============================================================
//  TOOL 6 — TAGLINE GENERATOR
// ============================================================
window.runTaglineGen = function () {
  var btn = event.target;
  var theme = document.getElementById("tag-input").value.trim();
  if (!theme) {
    alert("Please enter a theme or keyword!");
    return;
  }
  btnOn(btn);
  wait(700, function () {
    var t = theme.toLowerCase();
    var sets = {
      music: [
        "Where Every Beat Tells a Story 🎵",
        "Feel the Frequency, Live the Night 🔊",
        "One Stage. Infinite Memories. 🌟",
        "The Music Never Stops Here 🎶",
        "Turn It Up — Sky Has No Limit ⬆️",
      ],
      night: [
        "Where the Night Comes Alive 🌙",
        "Stars Above. Vibes Below. ✨",
        "Midnight Never Felt This Good 🌠",
        "Darkness Was Never This Beautiful 🖤",
        "The Night That Owns You 👑",
      ],
      art: [
        "Where Imagination Has No Walls 🎨",
        "Create. Celebrate. Captivate. ✏️",
        "Art Is Not What You See — It's What You Feel 💫",
        "Your Canvas. Our Stage. 🖼️",
        "Colour the World Tonight 🌈",
      ],
      dance: [
        "Move Like Nobody's Watching 💃",
        "Every Step a Story 👟",
        "Dance Until the World Disappears 🌀",
        "Feel the Beat. Own the Floor. 🕺",
        "Born to Move. Made for Tonight. 🔥",
      ],
      sky: [
        "Reach for the Sky — We'll Meet You There 🚀",
        "Sky Has No Limits — Neither Do We 🌤️",
        "Under One Sky, One Vibe 🌅",
        "Where Dreams Touch the Skyline 🏙️",
        "The Sky Is Just the Beginning ✈️",
      ],
      college: [
        "Your Campus. Our Stage. 🏫",
        "Where Students Become Legends 🎓",
        "Because College Only Happens Once 📚",
        "Study Hard. Party Harder. 🎉",
        "The Fest That Defines Your Year 🏆",
      ],
      summer: [
        "Sun, Music & Good Vibes ☀️",
        "Hottest Night of the Summer 🔥",
        "Summer Was Made for This 🌊",
        "Sweat, Dance, Repeat 💦",
        "Where Summer Meets Sound 🎵",
      ],
      default: [
        "One Event. A Million Memories. 💚",
        "Sky Events — Where Magic Happens ✨",
        "Experience the Extraordinary 🌟",
        "Beyond the Ordinary. Welcome to Sky. 🚀",
        "This Is Your Moment — Own It 👑",
      ],
    };
    var chosen = sets.default;
    var keys = Object.keys(sets);
    for (var i = 0; i < keys.length; i++) {
      if (t.indexOf(keys[i]) !== -1) {
        chosen = sets[keys[i]];
        break;
      }
    }
    // shuffle
    chosen = chosen.slice().sort(function () {
      return Math.random() - 0.5;
    });
    var out =
      '💡 5 TAGLINES FOR "' +
      theme.toUpperCase() +
      '"\n' +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
      "1️⃣  " +
      chosen[0] +
      "\n\n" +
      "2️⃣  " +
      chosen[1] +
      "\n\n" +
      "3️⃣  " +
      chosen[2] +
      "\n\n" +
      "4️⃣  " +
      chosen[3] +
      "\n\n" +
      "5️⃣  " +
      chosen[4] +
      "\n\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
      "💡 Use on banners, posters & social media for max impact!";
    showOutput("tag-output", out);
    btnOff(btn, "Create Taglines");
  });
};

// ============================================================
//  TOOL 7 — FEEDBACK ANALYZER
// ============================================================
window.runFeedbackAnalyzer = function () {
  var btn = event.target;
  var text = document.getElementById("feedback-input").value.trim();
  if (!text || text.length < 8) {
    alert("Please paste some feedback to analyze!");
    return;
  }
  btnOn(btn);
  wait(1000, function () {
    var lower = text.toLowerCase();
    var posW = [
      "great",
      "amazing",
      "awesome",
      "loved",
      "excellent",
      "perfect",
      "fantastic",
      "enjoyed",
      "wonderful",
      "good",
      "nice",
      "best",
      "superb",
      "outstanding",
      "brilliant",
      "fun",
      "beautiful",
      "smooth",
      "clear",
      "helpful",
    ];
    var negW = [
      "bad",
      "poor",
      "terrible",
      "worst",
      "awful",
      "boring",
      "crowded",
      "late",
      "delay",
      "issue",
      "problem",
      "noise",
      "dirty",
      "expensive",
      "disappointing",
      "not good",
      "slow",
      "confusing",
      "hot",
      "uncomfortable",
    ];
    var pos = 0,
      neg = 0;
    posW.forEach(function (w) {
      var r = new RegExp(w, "gi");
      var m = lower.match(r);
      if (m) pos += m.length;
    });
    negW.forEach(function (w) {
      var r = new RegExp(w, "gi");
      var m = lower.match(r);
      if (m) neg += m.length;
    });
    var total = pos + neg || 1;
    var ratio = pos / total;
    var sentiment =
      ratio >= 0.65
        ? "🟢 POSITIVE"
        : ratio >= 0.4
          ? "🟡 MIXED"
          : "🔴 NEEDS WORK";
    var score = Math.min(10, Math.max(1, Math.round(ratio * 10)));
    var stars = "";
    for (var i = 0; i < score; i++) stars += "⭐";
    for (var j = score; j < 10; j++) stars += "☆";

    var strengths = [];
    var issues = [];
    if (lower.indexOf("sound") !== -1 && lower.indexOf("bad") === -1)
      strengths.push("Sound quality was well received");
    if (lower.indexOf("light") !== -1 && lower.indexOf("bad") === -1)
      strengths.push("Lighting setup impressed the crowd");
    if (lower.indexOf("perform") !== -1 || lower.indexOf("artist") !== -1)
      strengths.push("Performances were highly appreciated");
    if (lower.indexOf("crowd") !== -1 && lower.indexOf("bad") === -1)
      strengths.push("Great crowd energy & atmosphere");
    if (lower.indexOf("organiz") !== -1 || lower.indexOf("smooth") !== -1)
      strengths.push("Well-organized event flow");
    if (strengths.length === 0)
      strengths.push("Attendees appreciated the overall experience");

    if (lower.indexOf("crowd") !== -1 || lower.indexOf("queue") !== -1)
      issues.push("Crowd/queue management needs improvement");
    if (lower.indexOf("food") !== -1 || lower.indexOf("stall") !== -1)
      issues.push("Food stall capacity & variety can improve");
    if (lower.indexOf("late") !== -1 || lower.indexOf("delay") !== -1)
      issues.push("Timing & punctuality should be tightened");
    if (lower.indexOf("sound") !== -1 && lower.indexOf("bad") !== -1)
      issues.push("Sound system needs optimization");
    if (issues.length === 0)
      issues.push("No major issues detected — great job!");

    var out =
      "📊 FEEDBACK ANALYSIS REPORT\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
      "Sentiment:  " +
      sentiment +
      "\n" +
      "Score:      " +
      stars +
      " " +
      score +
      "/10\n" +
      "Positive mentions: " +
      pos +
      " | Negative: " +
      neg +
      "\n\n" +
      "✅ TOP STRENGTHS:\n" +
      strengths
        .slice(0, 3)
        .map(function (s, i) {
          return "  " + (i + 1) + ". " + s;
        })
        .join("\n") +
      "\n\n" +
      "⚠️  AREAS TO IMPROVE:\n" +
      issues
        .slice(0, 3)
        .map(function (s, i) {
          return "  " + (i + 1) + ". " + s;
        })
        .join("\n") +
      "\n\n" +
      "🎯 KEY ACTION:\n" +
      '  Focus on "' +
      issues[0] +
      '" to push your score from ' +
      score +
      "/10 to " +
      Math.min(10, score + 2) +
      "/10 next event.\n\n" +
      "💬 VERDICT: " +
      (score >= 7
        ? "Excellent event! Keep the same energy 🚀"
        : score >= 5
          ? "Good event with clear room to grow 📈"
          : "Address key issues before the next event ⚠️");
    showOutput("feedback-output", out);
    btnOff(btn, "Analyze Feedback");
  });
};

// ============================================================
//  TOOL 8 — EMAIL COMPOSER
// ============================================================
window.runEmailComposer = function () {
  var btn = event.target;
  var evName = document.getElementById("email-event").value.trim();
  var audience =
    document.getElementById("email-audience").value.trim() || "our community";
  if (!evName) {
    alert("Please enter an event name!");
    return;
  }
  btnOn(btn);
  wait(900, function () {
    var match = null;
    for (var i = 0; i < EVENTS.length; i++) {
      if (EVENTS[i].name.toLowerCase().indexOf(evName.toLowerCase()) !== -1) {
        match = EVENTS[i];
        break;
      }
    }
    var date = match ? match.date : "coming soon";
    var venue = match ? match.venue : "Chennai";
    var out =
      "📧 INVITATION EMAIL\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
      "Subject: 🎉 You're Invited to " +
      evName +
      "!\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
      "Dear " +
      audience +
      ",\n\n" +
      "We are thrilled to invite you to " +
      evName +
      ",\nan extraordinary event by Sky Events!\n\n" +
      "📅 Date   : " +
      date +
      "\n" +
      "📍 Venue  : " +
      venue +
      "\n" +
      "💰 Fee    : ₹1800 per person\n\n" +
      "This is going to be one of Chennai's most\nelectrifying events of the year — incredible\nperformances, stunning visuals, and an\natmosphere you will never forget.\n\n" +
      "🎟️ REGISTER NOW before slots fill up!\n" +
      "Fee: ₹1800 only | Limited seats available\n\n" +
      "See you there!\n\n" +
      "Warm regards,\n" +
      "Sky Events Team\n" +
      "📧 sunilmc197@gmail.com\n" +
      "📸 @_stxr._.sunil_\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
    showOutput("email-output", out);
    btnOff(btn, "Compose Email");
  });
};

// ============================================================
//  TOOL 9 — VENUE ADVISOR
// ============================================================
window.runVenueAdvisor = function () {
  var btn = event.target;
  var guests = parseInt(document.getElementById("venue-guests").value);
  var evType = document.getElementById("venue-type").value.trim() || "event";
  if (!guests || guests <= 0) {
    alert("Please enter number of guests!");
    return;
  }
  btnOn(btn);
  wait(800, function () {
    var venues = [];
    if (guests <= 100) {
      venues = [
        "🏢 Rooftop Cafés (e.g. Ampa Skywalk)\n   Intimate, stylish, great for acoustic/open-mic",
        "🎭 Studio Spaces & Art Galleries\n   Perfect for creative fests & exhibitions",
        "🌿 Garden Lawns (e.g. ECR resorts)\n   Open-air, flexible, budget-friendly",
      ];
    } else if (guests <= 300) {
      venues = [
        "🏛️ Community Halls / Convention Centres\n   Fully equipped, AC, parking available",
        "🌊 Beach Lawns (Thiruvanmiyur, Besant Nagar)\n   Natural backdrop, open-air energy",
        "🏢 Hotel Banquet Halls (GRT, Radisson)\n   Premium with catering support",
      ];
    } else if (guests <= 700) {
      venues = [
        "⚽ Sports Grounds (YMCA, Nehru Stadium)\n   Large capacity, open layout",
        "🛍️ Mall Arenas (Phoenix Marketcity)\n   High footfall, great visibility",
        "🏛️ Jawaharlal Nehru Indoor Stadium\n   Professional stage, excellent acoustics",
      ];
    } else {
      venues = [
        "🏟️ Jawaharlal Nehru Stadium, Chennai\n   50,000+ capacity, world-class facilities",
        "🎡 Chennai Trade Centre\n   Massive halls with full logistics support",
        "🌳 Marina Beach Grounds\n   Iconic outdoor space for mega-festivals",
      ];
    }
    var out =
      "🏟️ VENUE RECOMMENDATIONS\n" +
      "Guests: " +
      guests +
      " | Event: " +
      evType +
      "\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
      "TOP 3 VENUES IN CHENNAI:\n\n" +
      "1. " +
      venues[0] +
      "\n\n" +
      "2. " +
      venues[1] +
      "\n\n" +
      "3. " +
      venues[2] +
      "\n\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
      "📋 BEFORE BOOKING:\n" +
      "  ✓ Confirm parking (1 spot per 4 guests)\n" +
      "  ✓ Check sound system availability\n" +
      "  ✓ Verify police NOC requirements\n" +
      "  ✓ Ask about catering restrictions\n" +
      "  ✓ Book at least 3–4 weeks in advance\n\n" +
      "💡 Sky Events tip: Always visit in person first!";
    showOutput("venue-output", out);
    btnOff(btn, "Advise Venue");
  });
};

// ============================================================
//  TOOL 10 — SOCIAL MEDIA CAPTIONS
// ============================================================
window.runSocialCaption = function () {
  var btn = event.target;
  var evName = document.getElementById("social-event").value.trim();
  var vibe = document.getElementById("social-vibe").value.trim() || "exciting";
  if (!evName) {
    alert("Please enter an event name!");
    return;
  }
  btnOn(btn);
  wait(700, function () {
    var tag = evName.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");
    var vibeT = vibe.toLowerCase();
    var emoji =
      vibeT.indexOf("chill") !== -1
        ? "🌙✨"
        : vibeT.indexOf("hype") !== -1
          ? "🔥💥"
          : vibeT.indexOf("ele") !== -1
            ? "💎🌟"
            : "⚡🎶";
    var out =
      "📱 SOCIAL MEDIA CAPTIONS\n" +
      "Event: " +
      evName +
      " | Vibe: " +
      vibe +
      "\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
      "🐦 TWITTER / X:\n" +
      '"' +
      evName +
      " is happening and you literally cannot miss it " +
      emoji +
      ' Tickets at ₹1800 — link in bio! #SkyEvents #Chennai"\n\n' +
      "📸 INSTAGRAM CAPTION:\n" +
      "Some nights you just KNOW are going to be unforgettable " +
      emoji +
      "\n\n" +
      evName +
      " is almost here and the energy is already through the roof 🔥\n\n" +
      "Incredible performances. Incredible people. One night only.\n\n" +
      "Grab your spot before it's gone — ₹1800 only!\n" +
      "👉 DM us or check link in bio\n\n" +
      "#" +
      tag +
      " #SkyEvents #ChennaiEvents #EventLife #" +
      vibe.replace(/\s+/g, "") +
      "Vibes #LiveMusic #Chennai2026\n\n" +
      "🎬 REEL CAPTION:\n" +
      "POV: You said yes to " +
      evName +
      " " +
      emoji +
      "\n" +
      "This is your sign — REGISTER NOW! 🔗 in bio\n" +
      "#SkyEvents #Chennai #" +
      tag +
      "\n\n" +
      "🟢 WHATSAPP STATUS:\n" +
      emoji +
      " " +
      evName +
      " by Sky Events!\n" +
      "₹1800 only | Register now — don't miss this! 🎉";
    showOutput("social-output", out);
    btnOff(btn, "Generate Captions");
  });
};

// ============================================================
//  TOOL 11 — RISK ASSESSMENT
// ============================================================
window.runRiskAssessment = function () {
  var btn = event.target;
  var evName = document.getElementById("risk-event").value.trim();
  var guests = parseInt(document.getElementById("risk-guests").value);
  if (!evName || !guests || guests <= 0) {
    alert("Please fill both fields!");
    return;
  }
  btnOn(btn);
  wait(1000, function () {
    var risks = [
      {
        r: "🌧️ Sudden Rain / Bad Weather",
        lv: "HIGH",
        f: "Book indoor backup venue or arrange waterproof tents",
      },
      {
        r: "🔊 Sound System Failure",
        lv: "MEDIUM",
        f: "Keep backup speakers + test all equipment 3 hrs before",
      },
      {
        r: "🚑 Medical Emergency",
        lv: "HIGH",
        f:
          "Station " +
          (guests > 300 ? "2" : "1") +
          " first-aid team(s) + note nearest hospital",
      },
      {
        r: "👮 Crowd Disorder",
        lv: guests > 500 ? "HIGH" : "LOW",
        f: "Clear entry/exit signs, dedicated security, avoid bottlenecks",
      },
      {
        r: "⚡ Power Outage",
        lv: "MEDIUM",
        f: "Arrange generator backup + test 2 hrs before event",
      },
      {
        r: "🙅 Low Attendance / No-shows",
        lv: "MEDIUM",
        f: "Send reminders 48 hrs & 2 hrs before; confirm RSVPs",
      },
      {
        r: "🎤 Performer Cancellation",
        lv: "MEDIUM",
        f: "Have backup performer or MC ready; get written commitment",
      },
      {
        r: "🔒 Security & Theft",
        lv: "LOW",
        f: "Bag check at entry; 1 security per 100 guests",
      },
    ];
    var em = { HIGH: "🔴", MEDIUM: "🟡", LOW: "🟢" };
    var lines = risks.map(function (r) {
      return em[r.lv] + " " + r.r + " [" + r.lv + "]\n   Fix: " + r.f;
    });
    var out =
      "🛡️ RISK ASSESSMENT REPORT\n" +
      "Event: " +
      evName +
      " | Guests: " +
      guests +
      "\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
      lines.join("\n\n") +
      "\n\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
      "📋 PRE-EVENT SAFETY CHECKLIST:\n" +
      "  ☐ Police NOC obtained\n" +
      "  ☐ First aid kit on-site\n" +
      "  ☐ Emergency contacts distributed\n" +
      "  ☐ Fire exits clearly marked\n" +
      "  ☐ Backup power tested\n" +
      "  ☐ Volunteer briefing done 1 hr before\n\n" +
      (guests > 500
        ? "⚠️  LARGE EVENT: Deploy a dedicated safety coordinator!"
        : "✅ Standard event — follow checklist and you're set!");
    showOutput("risk-output", out);
    btnOff(btn, "Assess Risks");
  });
};

// ============================================================
//  TOOL 12 — AI CHATBOT
// ============================================================
var chatKB = [
  {
    k: ["hi", "hello", "hey", "hii", "helo", "sup", "yo", "hai"],
    r: "👋 Hey! Welcome to Sky Events AI!\n\nAsk me about:\n• Upcoming events & dates\n• Registration & fees\n• Venues & locations\n• Payment methods\n• Contact details\n\nHow can I help you? 🎉",
  },
  {
    k: ["event", "events", "upcoming", "what event", "show event", "list"],
    r: "🎉 SKY EVENTS — UPCOMING SHOWS:\n\n1. College Fest 2026\n   📅 Mar 15 | 📍 YMCA Grounds\n\n2. Acoustic Night\n   📅 Apr 10 | 📍 Ampa Skywalk Rooftop\n\n3. Open Mic & Art Fest\n   📅 May 22 | 📍 Thiruvanmiyur Beach\n\n4. Summer Music Fiesta\n   📅 Jun 18 | 📍 Phoenix Marketcity\n\nAll events: ₹1800 🎫 Which one interests you?",
  },
  {
    k: [
      "fee",
      "fees",
      "cost",
      "price",
      "how much",
      "charge",
      "1800",
      "register fee",
      "registration fee",
    ],
    r: "💰 All Sky Events = ₹1800 per person.\n\nPayment options:\n• 💳 Debit/Credit Card\n• 📱 UPI (any app)\n• 📷 QR Code Scan\n\nClick 'Register Now' on any event card to book! ✅",
  },
  {
    k: ["college", "fest", "college fest", "ymca"],
    r: "🎓 COLLEGE FEST 2026\n━━━━━━━━━━━━━━━\n📅 March 15, 2026\n📍 YMCA Grounds, Chennai\n💰 ₹1800\n\nVibrant evening with music, lights & student performances. Perfect for college students! 🌟",
  },
  {
    k: ["acoustic", "rooftop", "ampa", "unplugged", "guitar"],
    r: "🎸 ACOUSTIC NIGHT\n━━━━━━━━━━━━━━━\n📅 April 10, 2026\n📍 Ampa Skywalk Rooftop, Chennai\n💰 ₹1800\n\nUnplugged melodies & soulful vibes under the stars. A night to remember! 🌙",
  },
  {
    k: ["open mic", "art", "poetry", "beach", "thiruvanmiyur", "painting"],
    r: "🎨 OPEN MIC & ART FEST\n━━━━━━━━━━━━━━━━━━\n📅 May 22, 2026\n📍 Thiruvanmiyur Beach Lawn\n💰 ₹1800\n\nPlatform for music, poetry & art lovers. Showcase your talent! 🌊",
  },
  {
    k: ["summer", "fiesta", "dj", "phoenix", "marketcity", "dance"],
    r: "🔥 SUMMER MUSIC FIESTA\n━━━━━━━━━━━━━━━━━━━━\n📅 June 18, 2026\n📍 Phoenix Marketcity Event Arena\n💰 ₹1800\n\nElectrifying DJ nights & summer vibes. Get ready to dance! 💃",
  },
  {
    k: [
      "register",
      "registration",
      "book",
      "sign up",
      "how to",
      "ticket",
      "join",
    ],
    r: "🎟️ HOW TO REGISTER:\n\n1️⃣  Scroll up to 'Upcoming Events'\n2️⃣  Click 'Register Now' on your event\n3️⃣  Fill your Name, Email, Phone\n4️⃣  Pay ₹1800 via Card / UPI / QR\n5️⃣  Done! You'll see a confirmation ✅\n\nNeed help? DM @_stxr._.sunil_ 📩",
  },
  {
    k: [
      "contact",
      "email",
      "instagram",
      "reach",
      "touch",
      "call",
      "message",
      "dm",
    ],
    r: "📞 CONTACT SKY EVENTS:\n━━━━━━━━━━━━━━━━━━\n📧 sunilmc197@gmail.com\n📸 Instagram: @_stxr._.sunil_\n\nDM us on Instagram for quick replies!\nWe respond within 24 hours 🙏",
  },
  {
    k: ["venue", "location", "where", "place", "address", "held"],
    r: "📍 OUR VENUES (all in Chennai):\n\n🏟️ YMCA Grounds — College Fest\n🏢 Ampa Skywalk Rooftop — Acoustic Night\n🌊 Thiruvanmiyur Beach — Open Mic\n🛍️ Phoenix Marketcity — Summer Fiesta\n\nAll venues are easily accessible by metro, bus & cab! 🗺️",
  },
  {
    k: ["payment", "pay", "upi", "card", "qr", "scan", "online"],
    r: "💳 PAYMENT OPTIONS:\n\n• 💳 Card — Debit or Credit card\n• 📱 UPI — Any UPI app works\n• 📷 QR — Scan & pay ₹1800\n\nUPI ID: 9346462785@pthdfc\n\nAll payments are secure & instant! ✅",
  },
  {
    k: ["refund", "cancel", "cancellation", "money back"],
    r: "ℹ️ For refund or cancellation:\n\n📧 Email: sunilmc197@gmail.com\n📸 DM: @_stxr._.sunil_\n\nWe'll respond within 24 hours and sort it out for you! 🙏",
  },
  {
    k: ["who", "sky events", "about", "sunil", "team", "started", "founded"],
    r: "✨ ABOUT SKY EVENTS:\n\nSky Events is a student-run event management initiative founded by Sunil M C in Chennai 🌟\n\nWe create unforgettable experiences — concerts, fests, open mics — with passion and heart.\n\nFollow us: @_stxr._.sunil_ 📸",
  },
  {
    k: [
      "thank",
      "thanks",
      "great",
      "awesome",
      "nice",
      "helpful",
      "good bot",
      "love it",
    ],
    r: "😊 Glad I could help!\n\nSky Events is all about making YOUR experience amazing. Hope to see you at our next event! 🎉✨",
  },
  {
    k: ["bye", "goodbye", "see you", "later", "ok bye", "cya"],
    r: "👋 See you soon at a Sky Event!\n\nStay tuned for more updates.\nFollow us @_stxr._.sunil_ 🙌🎶",
  },
];

function getBotReply(msg) {
  var lower = msg.toLowerCase().trim();
  for (var i = 0; i < chatKB.length; i++) {
    var kb = chatKB[i];
    for (var j = 0; j < kb.k.length; j++) {
      if (lower.indexOf(kb.k[j]) !== -1) return kb.r;
    }
  }
  if (lower.indexOf("?") !== -1) {
    return "🤔 Good question! For specific queries:\n📧 sunilmc197@gmail.com\n📸 @_stxr._.sunil_\n\nOr try asking about: events, fees, venues, registration, or payment! 😊";
  }
  return "👀 Hmm, I didn't quite catch that!\n\nTry asking about:\n• 'What events are coming up?'\n• 'How much is the registration fee?'\n• 'How do I register?'\n• 'Where is the venue?'\n\nOr contact us at sunilmc197@gmail.com 🎉";
}

window.sendChat = function () {
  var input = document.getElementById("chat-input");
  var chatWindow = document.getElementById("chat-window");
  var message = input.value.trim();
  if (!message) return;

  // User bubble
  var userDiv = document.createElement("div");
  userDiv.className = "chat-msg user-msg";
  userDiv.textContent = message;
  chatWindow.appendChild(userDiv);
  input.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Typing bubble
  var typingDiv = document.createElement("div");
  typingDiv.className = "chat-msg bot-msg";
  typingDiv.textContent = "⏳ Typing...";
  chatWindow.appendChild(typingDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  wait(600 + Math.random() * 400, function () {
    typingDiv.textContent = getBotReply(message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });
};

// ============================================================
//  REGISTRATION MODAL
// ============================================================
var modal = document.getElementById("modal");
var form = document.getElementById("registrationForm");
var eventInput = document.getElementById("eventInput");
var successMsg = document.querySelector(".success-msg");
var closeBtn = document.querySelector(".close");

document.querySelectorAll(".register-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    form.style.display = "block";
    successMsg.style.display = "none";
    successMsg.classList.remove("show");
    form.reset();
    eventInput.value = btn.dataset.event;
    ["cardFields", "upiField", "qrField"].forEach(function (id) {
      document.getElementById(id).style.display = "none";
    });
    modal.classList.add("show");
  });
});
closeBtn.addEventListener("click", function () {
  modal.classList.remove("show");
});
window.addEventListener("click", function (e) {
  if (e.target === modal) modal.classList.remove("show");
});

var paymentMethod = document.getElementById("paymentMethod");
var UPI_ID = "9346462785@pthdfc";

paymentMethod.addEventListener("change", function () {
  document.getElementById("cardFields").style.display =
    paymentMethod.value === "Card" ? "block" : "none";
  document.getElementById("upiField").style.display =
    paymentMethod.value === "UPI" ? "block" : "none";
  document.getElementById("qrField").style.display =
    paymentMethod.value === "QR" ? "block" : "none";
  if (paymentMethod.value === "QR") {
    var qrCanvas = document.getElementById("qrCanvas");
    qrCanvas.innerHTML = "";
    new QRCode(qrCanvas, {
      text:
        "upi://pay?pa=" +
        UPI_ID +
        "&pn=Sky%20Events&tn=Event%20Registration&am=1800",
      width: 180,
      height: 180,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var evName = eventInput.value;
  var payment = paymentMethod.value;

  if (!name || !email || !phone || !payment) {
    alert("Please fill all required fields.");
    return;
  }
  if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    alert("Phone must be exactly 10 digits.");
    return;
  }
  if (payment === "Card") {
    if (
      !document.getElementById("cardNumber").value.trim() ||
      !document.getElementById("expiry").value.trim() ||
      !document.getElementById("cvv").value.trim()
    ) {
      alert("Please fill all card details.");
      return;
    }
  }
  if (payment === "UPI" && !document.getElementById("upiId").value.trim()) {
    alert("Please enter your UPI ID.");
    return;
  }
  if (payment === "QR")
    alert("Please complete the ₹1800 QR payment before clicking submit.");

  var scriptURL =
    "https://script.google.com/macros/s/AKfycbyGuVgwU8ZBvcmNiVy-E9bXIgIxtxq_NIVOtYpd3KrfXm1EAlV39ifjwfiiiBEnyBL2/exec";
  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      event: evName,
      payment: payment,
    }),
  })
    .then(function () {
      form.style.display = "none";
      successMsg.textContent =
        "✅ Thank you, " +
        name +
        '! Registered for "' +
        evName +
        '" (₹1800) via ' +
        payment +
        ". See you there! 🎉";
      successMsg.style.display = "block";
      successMsg.classList.add("show");
      launchConfetti();
    })
    .catch(function () {
      alert("Error saving. Please try again or contact sunilmc197@gmail.com");
    });
});

// ============================================================
//  CONFETTI
// ============================================================
var confettiCanvas = document.getElementById("confettiCanvas");
var ctx = confettiCanvas.getContext("2d");
var particles = [];
function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti() {
  var colors = ["#39ff14", "#0f9e0f", "#b6ffb6", "#ffffff", "#ffff00"];
  for (var i = 0; i < 160; i++) {
    particles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 150 + 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
      tiltInc: Math.random() * 0.07 + 0.05,
    });
  }
  animateConfetti();
  setTimeout(function () {
    particles.length = 0;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }, 4500);
}
function animateConfetti() {
  if (!particles.length) return;
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  particles.forEach(function (p) {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
    ctx.stroke();
    p.tilt += p.tiltInc;
    p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
    if (p.y > confettiCanvas.height) {
      p.y = -10;
      p.x = Math.random() * confettiCanvas.width;
    }
  });
  requestAnimationFrame(animateConfetti);
}

// ============================================================
//  FADE IN ON SCROLL
// ============================================================
var fadeEls = document.querySelectorAll("#about, #events, #contact");
var eventCards = document.querySelectorAll(".event");
function checkFade() {
  var trigger = window.innerHeight * 0.87;
  fadeEls.forEach(function (el) {
    if (el.getBoundingClientRect().top < trigger)
      el.classList.add("fade-in", "show");
  });
  eventCards.forEach(function (card, i) {
    if (card.getBoundingClientRect().top < trigger) {
      setTimeout(function () {
        card.classList.add("show");
      }, i * 130);
    } else {
      card.classList.remove("show");
    }
  });
}
window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);

// ============================================================
//  SMOOTH SCROLL
// ============================================================
document.querySelectorAll("nav a").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    var t = document.querySelector(link.getAttribute("href"));
    if (t) t.scrollIntoView({ behavior: "smooth" });
  });
});

// ============================================================
//  GREEN SMOKE EFFECT
// ============================================================
var smokeCanvas = document.getElementById("headerSmoke");
var sctx = smokeCanvas.getContext("2d");
var smokeP = [];
function resizeSmoke() {
  smokeCanvas.width = window.innerWidth;
  smokeCanvas.height = document.querySelector("header").offsetHeight;
}
window.addEventListener("resize", resizeSmoke);
resizeSmoke();
for (var s = 0; s < 30; s++) {
  smokeP.push({
    x: Math.random() * smokeCanvas.width,
    y: Math.random() * smokeCanvas.height,
    r: Math.random() * 60 + 20,
    alpha: Math.random() * 0.1 + 0.04,
    dx: Math.random() * 0.4 - 0.2,
    dy: Math.random() * 0.3 + 0.1,
  });
}
(function drawSmoke() {
  sctx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);
  smokeP.forEach(function (p) {
    sctx.beginPath();
    sctx.fillStyle = "rgba(57,255,20," + p.alpha + ")";
    sctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    sctx.fill();
    p.x += p.dx;
    p.y -= p.dy;
    if (p.y + p.r < 0) {
      p.y = smokeCanvas.height + p.r;
      p.x = Math.random() * smokeCanvas.width;
    }
  });
  requestAnimationFrame(drawSmoke);
})();
