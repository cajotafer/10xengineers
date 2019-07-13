export const landing = {
  title: "Are you a 10x Engineer?",
  button: "Start Quiz"
};

export const questions = [
  {
    q: "Do you love meetings?",
    r: [
      {
        value: 1,
        text:
          "Meetings are necessary to build a healthy startup and develop the team communication."
      },
      {
        value: 3,
        text:
          "I think it is a waste of time and obvious things are being discussed."
      },
      {
        value: 3,
        text:
          'I only attend "Staff meetings" called by the manager to discuss features and status.'
      }
    ]
  },
  {
    q: "How about timing in the office? are you responsible with that?",
    r: [
      {
        value: 3,
        text:
          "My timing is highly irregular, I am a late-night coder and come late to the office."
      },
      {
        value: 2,
        text: "My timing is sometimes irregular but I always try to be on time."
      },
      {
        value: 1,
        text:
          "My timing is highly regular, even I like to code late-night, I know my responsabilities."
      }
    ]
  },
  {
    q: "Do you like team working?",
    r: [
      {
        value: 3,
        text:
          "I prefer to work when very few folks are around. I am not visible in all-hands meetings."
      },
      {
        value: 1,
        text:
          "I prefer to work in a quiet envioment. To share opinions and discoveries is important."
      },
      {
        value: 1,
        text:
          "I focus on my work (maybe listening music) and I like to share my opinions and discoveries."
      }
    ]
  },
  {
    q: "Preferred style",
    r: [
      {
        value: 2,
        text:
          "My laptop screen background is normally a landscape, I often change defaults."
      },
      {
        value: 3,
        text:
          "My laptop screen background color is black, I always change defaults."
      },
      {
        value: 1,
        text:
          "My don't remember my laptop screen background, surely is the default."
      }
    ]
  },
  {
    q: "Does your keyboard have worn keys?",
    r: [
      {
        value: 2,
        text: "Yes, keys such as a, s, d and w."
      },
      {
        value: 2,
        text: "Yes, keys such as q, w, e and r."
      },
      {
        value: 3,
        text: "Yes, keys such as i, f and x."
      },
      {
        value: 3,
        text: "No, I code in my phone."
      },
      {
        value: 3,
        text: "No, I buy a new laptop every year."
      }
    ]
  },
  {
    q: "Do you know your code?",
    r: [
      {
        value: 1,
        text:
          "I understand the code and is easy for me to find something but I don't know every line."
      },
      {
        value: 3,
        text:
          "I know every line of code that has gone into production so I fix bugs in hours vs days."
      },
      {
        value: 2,
        text:
          "I know every line of code that has gone into sandbox so I don't fix bugs in production."
      },
      {
        value: 1,
        text: "I am not a robot.",
        robot: true
      }
    ]
  },
  {
    q: "Are you a full-stack engineer?",
    r: [
      {
        value: 3,
        text:
          "Yes, code is code, I don't care whether it is front-end, back-end, API, database, serverless, etc. and I rarely do UI work."
      },
      {
        value: 2,
        text:
          "Yes, I can handle front-end and back-end. I am specialized in certain technologies."
      },
      {
        value: 1,
        text:
          "No, I can code anything but I also do UI work... wait, but front-end and UI are related, isn't it?."
      }
    ]
  },
  {
    q:
      'Can you convert "thought" into "code" in your mind and write it in an iterative fashion?',
    r: [
      {
        value: 3,
        text: "Yes, I always do this."
      },
      {
        value: 2,
        text: "Yes, if that thought is easy to code."
      },
      {
        value: 1,
        text: "No."
      }
    ]
  },
  {
    q:
      "Given a product feature, you can write that entire feature in one or two sittings of 4 to 6 hours with a caffeinated drink without distraction.",
    r: [
      {
        value: 2,
        text: "I don't like caffeinated drinks dude."
      },
      {
        value: 3,
        text: "Of course, I am doing this test before the second sitting."
      },
      {
        value: 3,
        text: "Let's make it a 3 hours sitting."
      },
      {
        value: 1,
        text: "Obviously that depends of the product feature complexity."
      }
    ]
  },
  {
    q: "Do you look at help documentation of classes or methods?",
    r: [
      {
        value: 1,
        text:
          "Even I have great knowledge, sometimes I need some help, it's normal."
      },
      {
        value: 3,
        text:
          "I know it in memory and can recall from memory. I write code at the same ease as writing English. No breaks, no pauce, just type."
      },
      {
        value: 2,
        text: "I told you I am not a robot.",
        robot: true
      }
    ]
  },
  {
    q:
      "I am learning new frameworks, languages ahead of everyone in the company. I gobble up, setup, experiment before anyone is getting started.",
    r: [
      {
        value: 1,
        text: "Only on weekends, if I have the time."
      },
      {
        value: 2,
        text: "I am working, not vacationing."
      },
      {
        value: 3,
        text: "This is my life story."
      }
    ]
  },
  {
    q: "Do you like to teach others and share your experience?",
    r: [
      {
        value: 3,
        text:
          "It takes too long to teach or discuss with others, I would rather do it myself."
      },
      {
        value: 1,
        text:
          "Of course! to share knowledge is necessary to have a better team so a better product."
      }
    ]
  },
  {
    q:
      "Do you write quality code and know exactly how the code has to evolve, and have a mental model of overall code structure?",
    r: [
      {
        value: 3,
        text: "Yes."
      },
      {
        value: 2,
        text:
          'Sometimes I can\'t do some things and I have to find a "hack" temporarily.'
      },
      {
        value: 1,
        text: "Not at all, to make sure I define standards and document."
      }
    ]
  },
  {
    q: "Do you write documentation?",
    r: [
      {
        value: 3,
        text:
          "I write at most one design document, and the rest is in the code."
      },
      {
        value: 2,
        text: "My code is self-documented."
      },
      {
        value: 2,
        text:
          "Of course, everything needs the proper documentation to better maintenance."
      }
    ]
  },
  {
    q:
      "Is your life miserable with the process, meetings, training, and other non-value-added activities in your job?",
    r: [
      {
        value: 3,
        text: "Yes, I'm considering looking for another job."
      },
      {
        value: 2,
        text: "Even I don't like that, my life is not miserable."
      },
      {
        value: 1,
        text:
          "No, all of that is part of the job and have some important non-technical values."
      }
    ]
  }
];
