export const common = {
  quote:
    "Si tienes a un 10x engineer como parte de tus primeros ingenieros, incrementas las posibilidades de éxito de tu startup significativamente.",
  qAuthor: "Shekhar Kirani",
  title: "¿Eres un 10x Engineer?",
  button: "Iniciar Test",
  robot: "Sólo debemos asegurarnos 🤖",
  origin: [
    "El origen del 10x Engineers Test is ",
    "este hilo de Shekhar Kirani en twitter",
    " que fue fuertemente rechazado por la comunidad. Si no sabes de que estamos hablando, echa un vistazo."
  ],
  createdBy: "Creado por",
  contribute: "Contribuye en",
  changeLang: "Change to english 🇬🇧",
  changeLangLink: "https://10xengineers.netlify.com"
};

export function resultText(lvl) {
  let r = 0;
  switch (lvl) {
    case 10:
      r = `¡Eres un ${lvl}x Engineer! 🤑 ¡Apple ya viene por ti!`;
    case 0:
      r = "No estoy seguro de que seas un ingeniero, créeme... esfuerzate 😒";
    default:
      r = `¡Eres un ${lvl}x Engineer! 🤔 y eso no es suficiente.`;
  }
  return r;
}

export function shareText(lvl) {
  let r = 0;
  switch (lvl) {
    case 10:
      r = `Soy un ${lvl}x Engineer! 🤑 Apple, ahí voy! Haz el test aquí ->`;
    case 0:
      r =
        "Creo que mi vida necesita algunos cambios. 🤐 Quizás esto no es lo mío. Haz el test aquí ->";
    default:
      r = `Soy un ${lvl}x Engineer! Que pena 🙄. Haz el test aquí ->`;
  }
  return r;
}

export const questions = [
  {
    q: "¿Qué piensas de las reuniones?",
    r: [
      {
        value: 1,
        text:
          "Las reuniones son necesarias para construir una startup saludable y desarrollar la comunicación."
      },
      {
        value: 3,
        text: "Pienso que son una pérdida de tiempo, se discuten cosas obvias."
      },
      {
        value: 3,
        text:
          'Solo asisto a "Reuniones de personal" convocadas por el gerente para discutir características y estado de producto.'
      }
    ]
  },
  {
    q: "¿Qué tal tus tiempos en la oficina? ¿Eres responsable con eso?",
    r: [
      {
        value: 3,
        text:
          "Mis tiempos son muy irregulares, me gusta programar hasta tarde así que llego tarde a la oficina."
      },
      {
        value: 2,
        text:
          "Mis tiempos a veces son irregulares pero siempre trato de estar a tiempo."
      },
      {
        value: 1,
        text:
          "Mis tiempos son muy regulares, aún cuando programo hasta tarde, conozco mis responsabilidades."
      }
    ]
  },
  {
    q: "¿Cuál de estas opciones te describe mejor?",
    r: [
      {
        value: 3,
        text:
          "Prefiero trabajar cuando hay pocas personas al rededor. No soy visible en reuniones de muchas manos."
      },
      {
        value: 1,
        text:
          "Prefiero trabajar en un ambiente tranquilo. Compartir mis opiniones es importante."
      },
      {
        value: 1,
        text:
          "Me enfoco en mi trabajo (quizás con música) y me gusta compartir opiniones y descubrimientos."
      }
    ]
  },
  {
    q: "Estilo preferido",
    r: [
      {
        value: 2,
        text:
          "El fondo de pantalla de mi laptop normalmente es un paisaje, suelo cambiar los valores por defecto."
      },
      {
        value: 3,
        text:
          "El fondo de pantalla de mi laptop es negro y siempre cambio los valores por defecto."
      },
      {
        value: 1,
        text:
          "No recuerdo el fondo de pantalla de mi laptop, seguramente es el por defecto."
      }
    ]
  },
  {
    q: "¿Tu teclado tiene teclas desgastadas?",
    r: [
      {
        value: 2,
        text: "Si, las teclas a, s, d y w."
      },
      {
        value: 2,
        text: "Si, las teclas q, w, e y r."
      },
      {
        value: 3,
        text: "Si, las teclas i, f y x."
      },
      {
        value: 3,
        text: "No."
      },
      {
        value: 3,
        text: "No, cada año compro una laptop nueva."
      }
    ]
  },
  {
    q: "¿Recuerdas lo que programas?",
    r: [
      {
        value: 1,
        text:
          "Entiendo el código y para mí es fácil encontrar lo que sea pero no conozco cada línea."
      },
      {
        value: 3,
        text:
          "Conozco cada línea de código que está en producción, así que soluciono errores en horas en lugar de días."
      },
      {
        value: 2,
        text:
          "Conozco cada línea de código que está en el entorno de pruebas y así no hay conflictos en producción."
      },
      {
        value: 1,
        text: "No soy un robot.",
        robot: true
      }
    ]
  },
  {
    q: "¿Eres un ingeniero full-stack?",
    r: [
      {
        value: 3,
        text:
          "Si, código es código, no importa si es front-end, back-end, API, base de datos, serverless, etc. Rara vez hago trabajo de UI."
      },
      {
        value: 2,
        text: "Si, además me especializo en ciertas tecnologías."
      },
      {
        value: 1,
        text:
          "No, puedo programar lo que sea pero también hago trabajo de UI... espera, pero front-end y UI están relacionados, ¿o no?"
      },
      {
        value: 1,
        text: "No."
      }
    ]
  },
  {
    q:
      '¿Puedes convertir "pensamientos" a "código" en tu mente y escribirlos de manera iterativa?',
    r: [
      {
        value: 3,
        text: "Si, es lo que siempre hago."
      },
      {
        value: 2,
        text: "Si, si lo que pienso es fácil."
      },
      {
        value: 1,
        text: "No."
      }
    ]
  },
  {
    q:
      "Dado un requerimiento de producto, ¿puedes desarrollarlo en una o dos sesiones de 4 a 6 horas con un café y sin distracciones?",
    r: [
      {
        value: 2,
        text: "Pero ni me gusta el café."
      },
      {
        value: 3,
        text:
          "Por supuesto, estoy haciendo este test justo antes de la segunda sesión."
      },
      {
        value: 3,
        text: "Hagamos que sea una sesión de 3 horas."
      },
      {
        value: 1,
        text: "Obviamente depende de la complejidad del requerimiento."
      }
    ]
  },
  {
    q: "¿Buscas ayuda en la documentación de clases o métodos?",
    r: [
      {
        value: 1,
        text:
          "Si, a pesar de mi conocimiento a veces necesito ayuda, es normal."
      },
      {
        value: 2,
        text: "splice() o slice()?"
      },
      {
        value: 3,
        text:
          "Los sé de memoria. Escribo código tan fácil como escribo español, sin descansos, sin pausa, sólo escribo."
      },
      {
        value: 2,
        text: "¡Te dije que no soy un robot!",
        robot: true
      }
    ]
  },
  {
    q:
      "¿Estás aprendiendo nuevos frameworks, lenguajes primero que cualquiera en la compañía?, ¿Lo lees, configuras y experimentas antes que otros?",
    r: [
      {
        value: 1,
        text: "Sólo los fines de semana si tengo tiempo."
      },
      {
        value: 2,
        text: "Estoy trabajando, no de vacaciones."
      },
      {
        value: 3,
        text: "Eso describe exactamente mi vida."
      }
    ]
  },
  {
    q: "¿Te gusta enseñar a otros y compartir tu experiencia?",
    r: [
      {
        value: 3,
        text:
          "Toma mucho tiempo enseñar o discutir con otros, mejor lo haría yo mismo."
      },
      {
        value: 1,
        text:
          "¡Claro! compartir conocimiento es necesario para que el equipo mejore y el producto final."
      }
    ]
  },
  {
    q:
      "¿Escribes código de calidad, sabes exactamente como debe evolucionar y tienes un modelo mental de toda la estructura general?",
    r: [
      {
        value: 3,
        text: "Si."
      },
      {
        value: 2,
        text:
          "Algunas veces no puedo hacer algo y me veo obligado a usar un truco temporalmente."
      },
      {
        value: 1,
        text: "No del todo, me encargo de definir estándares y documentar."
      }
    ]
  },
  {
    q:
      "¿Cuál de estas opciones define mejor la forma en la que preparas documentación?",
    r: [
      {
        value: 3,
        text:
          "Escribo como máximo un documento de diseño, el resto está en el código."
      },
      {
        value: 2,
        text: "Mi código está auto-documentado."
      },
      {
        value: 2,
        text:
          "Todo necesita una documentación adecuada para un mejor mantenimiento."
      }
    ]
  },
  {
    q:
      "¿Tu vida es miserable con los procesos, reuniones, entrenamientos y otras actividades sin valor añadido en tu trabajo?",
    r: [
      {
        value: 3,
        text: "Si, estoy considerando buscar otro trabajo."
      },
      {
        value: 2,
        text: "Aunque no me gusta, mi vida no es miserable."
      },
      {
        value: 1,
        text:
          "No, todo eso es parte del trabajo y tiene un importante valor no técnico."
      }
    ]
  }
];
