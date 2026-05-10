const EDITIONS = {
    trouble_brewing: {
        name: "Trouble Brewing",
        roles: {
            townsfolk: [
                { id: "washerwoman", name: "Lavandera", ability: "Conoces 1 Aldeano y quién podría serlo.", nightOrder: 0, firstNight: 32 },
                { id: "librarian", name: "Bibliotecaria", ability: "Conoces 1 Forastero y quién podría serlo.", nightOrder: 0, firstNight: 33 },
                { id: "investigator", name: "Investigador", ability: "Conoces 1 Secuaz y quién podría serlo.", nightOrder: 0, firstNight: 34 },
                { id: "chef", name: "Chef", ability: "Sabes cuántos pares de jugadores malvados están sentados juntos.", nightOrder: 0, firstNight: 35 },
                { id: "empath", name: "Empático", ability: "Cada noche sabes cuántos de tus vecinos vivos son malvados.", nightOrder: 36, firstNight: 36 },
                { id: "fortune_teller", name: "Adivina", ability: "Cada noche eliges 2 jugadores. Sabes si alguno es el Demonio.", nightOrder: 37, firstNight: 37 },
                { id: "undertaker", name: "Sepulturero", ability: "Cada noche sabes qué rol fue ejecutado hoy.", nightOrder: 38, firstNight: 0 },
                { id: "monk", name: "Monje", ability: "Cada noche eliges 1 jugador (no tú). Está protegido del Demonio.", nightOrder: 12, firstNight: 0 },
                { id: "ravenkeeper", name: "Guardacuervos", ability: "Si mueres de noche, eliges 1 jugador y sabes su rol.", nightOrder: 39, firstNight: 0 },
                { id: "virgin", name: "Virgen", ability: "La primera vez que un Aldeano te nomine, es ejecutado inmediatamente.", nightOrder: 0, firstNight: 0 },
                { id: "slayer", name: "Cazador", ability: "Una vez por partida, durante el día, elige 1 jugador. Si es el Demonio, muere.", nightOrder: 0, firstNight: 0 },
                { id: "soldier", name: "Soldado", ability: "No puedes morir por el Demonio.", nightOrder: 0, firstNight: 0 },
                { id: "mayor", name: "Alcalde", ability: "Si nadie es ejecutado, podrías ganar. Si mueres de noche, otro jugador podría morir en tu lugar.", nightOrder: 0, firstNight: 0 }
            ],
            outsider: [
                { id: "butler", name: "Mayordomo", ability: "Cada noche eliges 1 jugador. Solo puedes votar si ese jugador vota.", nightOrder: 39, firstNight: 39 },
                { id: "drunk", name: "Borracho", ability: "Crees que eres un Aldeano, pero no lo eres. Tu habilidad no funciona.", nightOrder: 0, firstNight: 0 },
                { id: "recluse", name: "Ermitaño", ability: "Puedes registrarte como malvado.", nightOrder: 0, firstNight: 0 },
                { id: "saint", name: "Santo", ability: "Si eres ejecutado, el equipo del Bien pierde.", nightOrder: 0, firstNight: 0 }
            ],
            minion: [
                { id: "poisoner", name: "Envenenador", ability: "Cada noche eliges 1 jugador. Su habilidad no funciona esta noche y el día siguiente.", nightOrder: 7, firstNight: 7 },
                { id: "spy", name: "Espía", ability: "Cada noche ves el Grimorio. Puedes registrarte como bueno.", nightOrder: 48, firstNight: 48 },
                { id: "baron", name: "Barón", ability: "Hay 2 Forasteros extra en la partida.", nightOrder: 0, firstNight: 0 },
                { id: "scarlet_woman", name: "Mujer Escarlata", ability: "Si el Demonio muere con 5+ jugadores vivos, te conviertes en el Demonio.", nightOrder: 0, firstNight: 0 }
            ],
            demon: [
                { id: "imp", name: "Diablillo", ability: "Cada noche* mata 1 jugador. Si te matas, un Secuaz se convierte en Diablillo.", nightOrder: 22, firstNight: 0 }
            ]
        }
    },
    bad_moon_rising: {
        name: "Bad Moon Rising",
        roles: {
            townsfolk: [
                { id: "grandmother", name: "Abuela", ability: "Conoces 1 jugador bueno. Si el Demonio lo mata, mueres también.", nightOrder: 0, firstNight: 39 },
                { id: "sailor", name: "Marinero", ability: "Cada noche eliges 1 jugador vivo. Uno de vosotros estará borracho hasta el anochecer. No puedes morir.", nightOrder: 5, firstNight: 5 },
                { id: "chambermaid", name: "Camarera", ability: "Cada noche eliges 2 jugadores vivos. Sabes cuántos se despiertan esta noche.", nightOrder: 48, firstNight: 48 },
                { id: "exorcist", name: "Exorcista", ability: "Cada noche* eliges 1 jugador. Si eliges al Demonio, su habilidad no funciona esta noche.", nightOrder: 10, firstNight: 0 },
                { id: "innkeeper", name: "Posadero", ability: "Cada noche* eliges 2 jugadores. Están protegidos. Uno está borracho.", nightOrder: 9, firstNight: 0 },
                { id: "gambler", name: "Apostador", ability: "Cada noche* adivinas el rol de 1 jugador. Si fallas, mueres.", nightOrder: 3, firstNight: 0 },
                { id: "gossip", name: "Cotilla", ability: "Cada día haces una afirmación pública. Si es verdadera, un jugador muere esa noche.", nightOrder: 35, firstNight: 0 },
                { id: "courtier", name: "Cortesano", ability: "Una vez por partida, eliges 1 jugador. Su habilidad no funciona durante 3 noches y días.", nightOrder: 6, firstNight: 6 },
                { id: "professor", name: "Profesor", ability: "Una vez por partida, de noche* eliges 1 jugador muerto. Si era bueno, resucita.", nightOrder: 42, firstNight: 0 },
                { id: "minstrel", name: "Juglar", ability: "Si un Secuaz es ejecutado, todos los demás están borrachos hasta el anochecer siguiente.", nightOrder: 0, firstNight: 0 },
                { id: "tea_lady", name: "Dama del Té", ability: "Si tus 2 vecinos vivos están vivos y son buenos, no pueden morir.", nightOrder: 0, firstNight: 0 },
                { id: "pacifist", name: "Pacifista", ability: "Los jugadores ejecutados podrían no morir.", nightOrder: 0, firstNight: 0 },
                { id: "fool", name: "Bufón", ability: "La primera vez que mueras, no mueres.", nightOrder: 0, firstNight: 0 }
            ],
            outsider: [
                { id: "tinker", name: "Hojalatero", ability: "Podrías morir en cualquier momento.", nightOrder: 44, firstNight: 0 },
                { id: "moonchild", name: "Niño de la Luna", ability: "Cuando mueras, eliges 1 jugador vivo. Si es bueno, muere.", nightOrder: 43, firstNight: 0 },
                { id: "goon", name: "Matón", ability: "Cada noche, el 1er jugador que te elija está borracho hasta el anochecer. Registras como malvado.", nightOrder: 0, firstNight: 0 },
                { id: "lunatic", name: "Lunático", ability: "Crees que eres el Demonio, pero no lo eres. El Demonio sabe quién eres.", nightOrder: 20, firstNight: 20 }
            ],
            minion: [
                { id: "godfather", name: "Padrino", ability: "Si nadie fue ejecutado, eliges 1 jugador. Muere. Forasteros muertos registran como malvados.", nightOrder: 30, firstNight: 0 },
                { id: "devil_advocate", name: "Abogado del Diablo", ability: "Cada noche eliges 1 jugador vivo. Si es ejecutado mañana, no muere.", nightOrder: 2, firstNight: 2 },
                { id: "assassin", name: "Asesino", ability: "Una vez por partida, de noche* eliges 1 jugador. Muere incluso si está protegido.", nightOrder: 28, firstNight: 0 },
                { id: "mastermind", name: "Cerebro", ability: "Si el Demonio muere por ejecución, juega una noche más. Si nadie muere esa noche, el Bien gana.", nightOrder: 0, firstNight: 0 }
            ],
            demon: [
                { id: "zombuul", name: "Zombuul", ability: "Cada noche* si nadie murió hoy, mata 1 jugador. La 1ª vez que mueras, no mueres (registras como muerto).", nightOrder: 25, firstNight: 0 },
                { id: "pukka", name: "Pukka", ability: "Cada noche eliges 1 jugador. Está envenenado. El jugador envenenado previamente muere.", nightOrder: 24, firstNight: 24 },
                { id: "shabaloth", name: "Shabaloth", ability: "Cada noche* mata 2 jugadores. Un jugador muerto podría resucitar.", nightOrder: 23, firstNight: 0 },
                { id: "po", name: "Po", ability: "Cada noche* puedes elegir 1 jugador, muere. Si elegiste nadie la noche anterior, mata 3.", nightOrder: 21, firstNight: 0 }
            ]
        }
    },
    sects_and_violets: {
        name: "Sects & Violets",
        roles: {
            townsfolk: [
                { id: "clockmaker", name: "Relojero", ability: "Sabes cuántos asientos hay entre el Demonio y su Secuaz más cercano.", nightOrder: 0, firstNight: 31 },
                { id: "dreamer", name: "Soñador", ability: "Cada noche eliges 1 jugador. Sabes 1 rol bueno y 1 malvado, uno de ellos es correcto.", nightOrder: 37, firstNight: 37 },
                { id: "snake_charmer", name: "Encantador de Serpientes", ability: "Cada noche eliges 1 jugador. Si es el Demonio, intercambias roles. Estás envenenado.", nightOrder: 8, firstNight: 8 },
                { id: "mathematician", name: "Matemático", ability: "Cada noche sabes cuántas habilidades funcionaron mal desde el amanecer.", nightOrder: 49, firstNight: 49 },
                { id: "flowergirl", name: "Florista", ability: "Cada noche* sabes si el Demonio votó hoy.", nightOrder: 40, firstNight: 0 },
                { id: "town_crier", name: "Pregonero", ability: "Cada noche* sabes si un Secuaz nominó hoy.", nightOrder: 41, firstNight: 0 },
                { id: "oracle", name: "Oráculo", ability: "Cada noche* sabes cuántos jugadores muertos son malvados.", nightOrder: 44, firstNight: 0 },
                { id: "savant", name: "Sabio", ability: "Cada día puedes visitar al Narrador para obtener 2 afirmaciones, una verdadera y una falsa.", nightOrder: 0, firstNight: 0 },
                { id: "seamstress", name: "Costurera", ability: "Una vez por partida, de noche, eliges 2 jugadores. Sabes si son del mismo equipo.", nightOrder: 38, firstNight: 38 },
                { id: "philosopher", name: "Filósofo", ability: "Una vez por partida, de noche, eliges 1 rol bueno. Ganas esa habilidad.", nightOrder: 1, firstNight: 1 },
                { id: "artist", name: "Artista", ability: "Una vez por partida, durante el día, haces una pregunta de sí/no al Narrador.", nightOrder: 0, firstNight: 0 },
                { id: "juggler", name: "Malabarista", ability: "Tu 1er día, adivina públicamente hasta 5 pares jugador/rol. Esa noche sabes cuántos acertaste.", nightOrder: 46, firstNight: 0 },
                { id: "sage", name: "Sabio", ability: "Si el Demonio te mata, eliges 2 jugadores. Uno de ellos es el Demonio.", nightOrder: 0, firstNight: 0 }
            ],
            outsider: [
                { id: "mutant", name: "Mutante", ability: "Si eres 'ejecutado' al revelar que eres Forastero, podrías morir. No puedes revelarte.", nightOrder: 0, firstNight: 0 },
                { id: "sweetheart", name: "Amor", ability: "Cuando mueras, 1 jugador estará borracho desde el anochecer hasta el anochecer.", nightOrder: 0, firstNight: 0 },
                { id: "barber", name: "Barbero", ability: "Si mueres, el Demonio puede intercambiar 2 roles (no Demonio) esa noche.", nightOrder: 0, firstNight: 0 },
                { id: "klutz", name: "Torpe", ability: "Cuando mueras, debes elegir 1 jugador vivo. Si es malvado, el equipo del Bien pierde.", nightOrder: 0, firstNight: 0 }
            ],
            minion: [
                { id: "evil_twin", name: "Gemelo Malvado", ability: "Tu y un jugador bueno sois 'gemelos'. Si el bueno es ejecutado, el Mal podría ganar.", nightOrder: 0, firstNight: 22 },
                { id: "witch", name: "Bruja", ability: "Cada noche eliges 1 jugador. Si ese jugador nomina mañana, muere inmediatamente.", nightOrder: 4, firstNight: 4 },
                { id: "cerenovus", name: "Cerenovus", ability: "Cada noche eliges 1 jugador y 1 rol bueno. Deben fingir ser ese rol o son ejecutados.", nightOrder: 11, firstNight: 11 },
                { id: "pit_hag", name: "Bruja del Pozo", ability: "Cada noche* eliges 1 jugador y 1 rol. Se convierten en ese rol (podrían ganar o no).", nightOrder: 13, firstNight: 0 }
            ],
            demon: [
                { id: "fang_gu", name: "Fang Gu", ability: "Cada noche* eliges 1 jugador. Muere. La 1ª vez que elijas un Forastero, intercambias y mueres.", nightOrder: 26, firstNight: 0 },
                { id: "vigormortis", name: "Vigormortis", ability: "Cada noche* mata 1 jugador. Los Secuaces mantienen su habilidad muertos. Si matas un Secuaz, un Aldeano vecino está envenenado.", nightOrder: 27, firstNight: 0 },
                { id: "no_dashii", name: "No Dashii", ability: "Cada noche* mata 1 jugador. Los 2 Aldeanos más cercanos están envenenados.", nightOrder: 29, firstNight: 0 },
                { id: "vortox", name: "Vortox", ability: "Cada noche* mata 1 jugador. La información de los Aldeanos es falsa (incluso si mueres).", nightOrder: 22, firstNight: 0 }
            ]
        }
    },
    custom: {
        name: "Personalizada",
        roles: {
            townsfolk: [],
            outsider: [],
            minion: [],
            demon: []
        }
    }
};

// Standard distribution of roles based on player count
const ROLE_DISTRIBUTION = {
    5:  { townsfolk: 3, outsider: 0, minion: 1, demon: 1 },
    6:  { townsfolk: 3, outsider: 1, minion: 1, demon: 1 },
    7:  { townsfolk: 5, outsider: 0, minion: 1, demon: 1 },
    8:  { townsfolk: 5, outsider: 1, minion: 1, demon: 1 },
    9:  { townsfolk: 5, outsider: 2, minion: 1, demon: 1 },
    10: { townsfolk: 7, outsider: 0, minion: 2, demon: 1 },
    11: { townsfolk: 7, outsider: 1, minion: 2, demon: 1 },
    12: { townsfolk: 7, outsider: 2, minion: 2, demon: 1 },
    13: { townsfolk: 9, outsider: 0, minion: 3, demon: 1 },
    14: { townsfolk: 9, outsider: 1, minion: 3, demon: 1 },
    15: { townsfolk: 9, outsider: 2, minion: 3, demon: 1 },
    16: { townsfolk: 10, outsider: 2, minion: 3, demon: 1 },
    17: { townsfolk: 11, outsider: 2, minion: 3, demon: 1 },
    18: { townsfolk: 12, outsider: 2, minion: 3, demon: 1 },
    19: { townsfolk: 13, outsider: 2, minion: 3, demon: 1 },
    20: { townsfolk: 13, outsider: 2, minion: 4, demon: 1 },
    21: { townsfolk: 14, outsider: 2, minion: 4, demon: 1 },
    22: { townsfolk: 15, outsider: 2, minion: 4, demon: 1 },
    23: { townsfolk: 15, outsider: 2, minion: 4, demon: 2 },
    24: { townsfolk: 16, outsider: 2, minion: 4, demon: 2 },
    25: { townsfolk: 16, outsider: 3, minion: 4, demon: 2 }
};

// Night order for first night (special setup info)
const FIRST_NIGHT_ORDER = [
    "minion_info",   // Minions learn who each other are and who the Demon is
    "demon_info",    // Demon learns who the Minions are
    "poisoner",
    "witch",
    "sailor",
    "courtier",
    "philosopher",
    "snake_charmer",
    "exorcist",
    "innkeeper",
    "devil_advocate",
    "cerenovus",
    "monk",
    "lunatic",
    "pukka",
    "imp",
    "zombuul",
    "washerwoman",
    "librarian",
    "investigator",
    "chef",
    "empath",
    "fortune_teller",
    "grandmother",
    "clockmaker",
    "evil_twin",
    "dreamer",
    "seamstress",
    "snake_charmer",
    "mathematician",
    "chambermaid",
    "butler",
    "spy"
];

// Night order for other nights
const OTHER_NIGHT_ORDER = [
    "poisoner",
    "witch",
    "philosopher",
    "sailor",
    "courtier",
    "snake_charmer",
    "gambler",
    "exorcist",
    "innkeeper",
    "monk",
    "cerenovus",
    "devil_advocate",
    "pit_hag",
    "lunatic",
    "po",
    "imp",
    "shabaloth",
    "pukka",
    "zombuul",
    "fang_gu",
    "vigormortis",
    "no_dashii",
    "vortox",
    "assassin",
    "godfather",
    "gossip",
    "empath",
    "fortune_teller",
    "dreamer",
    "seamstress",
    "undertaker",
    "ravenkeeper",
    "flowergirl",
    "town_crier",
    "oracle",
    "moonchild",
    "tinker",
    "mathematician",
    "juggler",
    "chambermaid",
    "butler",
    "spy"
];
