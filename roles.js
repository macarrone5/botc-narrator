const EDITIONS = {
    trouble_brewing: {
        name: "Trouble Brewing",
        roles: {
            townsfolk: [
                { id: "washerwoman", name: "Lavandera", icon: "🧺", ability: "Empiezas sabiendo que 1 de 2 jugadores es un Aldeano en particular.", abilityFull: "Al inicio de la partida, el Narrador te señala 2 jugadores y te dice que uno de ellos es un Aldeano específico (por ejemplo, 'Uno de estos dos es el Chef'). Esto te da información fiable la primera noche para empezar a deducir.", nightOrder: 0, firstNight: 32 },
                { id: "librarian", name: "Bibliotecaria", icon: "📚", ability: "Empiezas sabiendo que 1 de 2 jugadores es un Forastero en particular, o que no hay Forasteros en juego.", abilityFull: "La primera noche, el Narrador te muestra 2 jugadores y te dice que uno de ellos es un Forastero concreto. Si no hay Forasteros en la partida, te lo dirá. Esto te ayuda a verificar claims de Forastero.", nightOrder: 0, firstNight: 33 },
                { id: "investigator", name: "Investigador", icon: "🔍", ability: "Empiezas sabiendo que 1 de 2 jugadores es un Secuaz en particular.", abilityFull: "La primera noche, el Narrador te indica 2 jugadores y te dice que uno de ellos es un Secuaz concreto. Esto te permite sospechar de uno de los dos y contrastar con la información del pueblo.", nightOrder: 0, firstNight: 34 },
                { id: "chef", name: "Chef", icon: "👨‍🍳", ability: "Empiezas sabiendo cuántos pares de jugadores malvados están sentados uno al lado del otro.", abilityFull: "La primera noche, recibes un número que indica cuántas parejas de jugadores malvados adyacentes hay. Si es 0, ningún malvado está sentado junto a otro malvado. Si es 1, hay exactamente un par de malvados que son vecinos.", nightOrder: 0, firstNight: 35 },
                { id: "empath", name: "Empático", icon: "💗", ability: "Cada noche, sabes cuántos de tus 2 vecinos vivos son malvados.", abilityFull: "Cada noche (incluida la primera), el Narrador te dice cuántos de tus vecinos vivos más cercanos (uno a cada lado) son malvados: 0, 1 o 2. Si un vecino muere, cuentas al siguiente vivo más cercano.", nightOrder: 36, firstNight: 36 },
                { id: "fortune_teller", name: "Adivina", icon: "🔮", ability: "Cada noche, eliges 2 jugadores: sabes si alguno de ellos es el Demonio. Hay un jugador bueno que registra como Demonio para ti.", abilityFull: "Cada noche eliges 2 jugadores y el Narrador te dice 'Sí' o 'No' según si uno de ellos es el Demonio. PERO hay un jugador bueno (tu 'falso positivo') que siempre registra como Demonio para ti, haciéndote dudar.", nightOrder: 37, firstNight: 37 },
                { id: "undertaker", name: "Sepulturero", icon: "⚰️", ability: "Cada noche*, sabes qué rol fue ejecutado hoy.", abilityFull: "A partir de la segunda noche, si alguien fue ejecutado durante el día anterior, el Narrador te dice qué rol tenía ese jugador. Si nadie fue ejecutado, no recibes información. El asterisco (*) significa que no actúas la primera noche.", nightOrder: 38, firstNight: 0 },
                { id: "monk", name: "Monje", icon: "🙏", ability: "Cada noche*, eliges 1 jugador (no a ti mismo): está protegido del Demonio esta noche.", abilityFull: "A partir de la segunda noche, eliges a un jugador para protegerlo. Si el Demonio intenta matar a ese jugador esta noche, no muere. No puedes protegerte a ti mismo. La protección solo dura una noche.", nightOrder: 12, firstNight: 0 },
                { id: "ravenkeeper", name: "Guardacuervos", icon: "🐦‍⬛", ability: "Si mueres de noche, te despiertas y eliges 1 jugador: sabes su rol.", abilityFull: "Si mueres durante la noche (por el Demonio u otra causa), te despiertas inmediatamente, eliges un jugador cualquiera y el Narrador te dice su rol verdadero. Es tu última acción antes de morir.", nightOrder: 39, firstNight: 0 },
                { id: "virgin", name: "Virgen", icon: "🕊️", ability: "La primera vez que un Aldeano te nomine, ese jugador es ejecutado inmediatamente.", abilityFull: "Si un jugador que es Aldeano te nomina (la primera vez que te nominan), ese nominador es ejecutado inmediatamente en tu lugar. Si te nomina un Forastero, Secuaz o Demonio, no pasa nada. Solo funciona una vez.", nightOrder: 0, firstNight: 0 },
                { id: "slayer", name: "Cazador", icon: "🏹", ability: "Una vez por partida, durante el día, puedes elegir públicamente a 1 jugador: si es el Demonio, muere.", abilityFull: "Una única vez durante toda la partida, durante el día, puedes señalar a un jugador y declarar que usas tu poder de Cazador. Si ese jugador es el Demonio, muere inmediatamente y el Bien gana. Si no es el Demonio, no pasa nada.", nightOrder: 0, firstNight: 0 },
                { id: "soldier", name: "Soldado", icon: "🛡️", ability: "No puedes morir por el ataque del Demonio.", abilityFull: "Eres inmune al ataque nocturno del Demonio. Si el Demonio te elige como objetivo por la noche, no mueres y nadie muere en tu lugar (la noche simplemente pasa sin muertes por el Demonio).", nightOrder: 0, firstNight: 0 },
                { id: "mayor", name: "Alcalde", icon: "🎩", ability: "Si nadie es ejecutado, podrías ganar. Si mueres de noche, otro jugador podría morir en tu lugar.", abilityFull: "Tienes dos ventajas: 1) Si quedan 3 jugadores vivos y nadie es ejecutado ese día, el Bien gana. 2) Si el Demonio te ataca de noche, el Narrador puede redirigir la muerte a otro jugador (tu 'escudo humano').", nightOrder: 0, firstNight: 0 }
            ],
            outsider: [
                { id: "butler", name: "Mayordomo", icon: "🫖", ability: "Cada noche, eliges 1 jugador (no a ti mismo): mañana solo podrás votar si ese jugador también vota.", abilityFull: "Cada noche eliges a tu 'amo'. Al día siguiente, solo puedes levantar la mano en una votación si tu amo también la levanta. Si tu amo no vota, tú tampoco puedes. Esto limita tu poder de voto.", nightOrder: 39, firstNight: 39 },
                { id: "drunk", name: "Borracho", icon: "🍺", ability: "No sabes que eres el Borracho. Crees que eres un Aldeano, pero tu habilidad no funciona.", abilityFull: "Piensas que eres un Aldeano (por ejemplo, el Empático o el Chef), pero en realidad eres el Borracho y tu habilidad no funciona. Toda la información que recibes del Narrador puede ser incorrecta. No sabes que eres el Borracho.", nightOrder: 0, firstNight: 0 },
                { id: "recluse", name: "Ermitaño", icon: "🏚️", ability: "Puedes registrarte como malvado, como Secuaz o incluso como Demonio, aunque eres bueno.", abilityFull: "Eres bueno, pero tus registros pueden ser malvados. El Investigador podría verte como Secuaz, la Adivina podría obtener 'Sí' contigo, etc. El Narrador decide cuándo te registras como malvado. Esto puede confundir al pueblo.", nightOrder: 0, firstNight: 0 },
                { id: "saint", name: "Santo", icon: "😇", ability: "Si eres ejecutado, tu equipo pierde.", abilityFull: "Si el pueblo te ejecuta (por votación durante el día), el equipo del Bien pierde inmediatamente, sin importar si el Demonio sigue vivo. Protegerte es crucial para el Bien. Solo pierdes si te ejecutan, no si mueres de noche.", nightOrder: 0, firstNight: 0 }
            ],
            minion: [
                { id: "poisoner", name: "Envenenador", icon: "☠️", ability: "Cada noche, eliges 1 jugador: su habilidad no funciona esta noche ni mañana durante el día.", abilityFull: "Cada noche eliges a un jugador para envenenar. Ese jugador está 'envenenado' hasta el anochecer siguiente: su habilidad no funciona y cualquier información que reciba del Narrador puede ser falsa. El jugador no sabe que está envenenado.", nightOrder: 7, firstNight: 7 },
                { id: "spy", name: "Espía", icon: "🕵️", ability: "Cada noche, ves el Grimorio del Narrador. Puedes registrarte como bueno y como Aldeano.", abilityFull: "Cada noche puedes ver el Grimorio completo del Narrador (todos los roles, estados, etc.). Además, cuando habilidades detectan tu alineamiento, puedes registrarte como bueno o como un Aldeano específico, engañando al pueblo.", nightOrder: 48, firstNight: 48 },
                { id: "baron", name: "Barón", icon: "👑", ability: "Hay 2 Forasteros extra en la partida (reemplazando a 2 Aldeanos).", abilityFull: "Tu mera presencia en la partida hace que haya 2 Forasteros adicionales, sustituyendo a 2 Aldeanos. Esto debilita al equipo del Bien al tener menos habilidades útiles. No tienes habilidad activa por la noche.", nightOrder: 0, firstNight: 0 },
                { id: "scarlet_woman", name: "Mujer Escarlata", icon: "💃", ability: "Si el Demonio muere con 5 o más jugadores vivos y tú estás viva, te conviertes en el nuevo Demonio.", abilityFull: "Si hay 5+ jugadores vivos cuando el Demonio muere (por ejecución o habilidad), tú te conviertes en el nuevo Demonio del mismo tipo. El juego continúa. Si hay menos de 5 jugadores, el Bien gana normalmente al matar al Demonio.", nightOrder: 0, firstNight: 0 }
            ],
            demon: [
                { id: "imp", name: "Diablillo", icon: "😈", ability: "Cada noche*, mata 1 jugador. Si te matas a ti mismo, un Secuaz se convierte en el nuevo Diablillo.", abilityFull: "Cada noche (excepto la primera) eliges a un jugador para matar. Si te eliges a ti mismo ('starpass'), mueres pero un Secuaz vivo se convierte en el nuevo Diablillo, haciendo más difícil para el Bien encontrar al Demonio.", nightOrder: 22, firstNight: 0 }
            ]
        }
    },
    bad_moon_rising: {
        name: "Bad Moon Rising",
        roles: {
            townsfolk: [
                { id: "grandmother", name: "Abuela", icon: "👵", ability: "Empiezas sabiendo 1 jugador bueno. Si el Demonio lo mata, tú también mueres.", abilityFull: "La primera noche sabes quién es tu 'nieto' (un jugador bueno). Si el Demonio mata a tu nieto directamente, tú también mueres esa misma noche. Tu nieto no sabe que es tu nieto.", nightOrder: 0, firstNight: 39 },
                { id: "sailor", name: "Marinero", icon: "⚓", ability: "Cada noche, eliges 1 jugador vivo: uno de los dos estará borracho hasta el anochecer. No puedes morir.", abilityFull: "Cada noche eliges a alguien (o a ti mismo la primera noche). El Narrador decide quién de los dos está borracho hasta el anochecer. Mientras tu habilidad funcione, no puedes morir por ningún medio.", nightOrder: 5, firstNight: 5 },
                { id: "chambermaid", name: "Camarera", icon: "🛏️", ability: "Cada noche, eliges 2 jugadores (no a ti misma): sabes cuántos de ellos se despertaron esta noche por su habilidad.", abilityFull: "Cada noche eliges 2 jugadores y el Narrador te dice cuántos de ellos (0, 1 o 2) se despiertan esta noche debido a su propia habilidad. No cuenta si se despiertan por otras razones.", nightOrder: 48, firstNight: 48 },
                { id: "exorcist", name: "Exorcista", icon: "✝️", ability: "Cada noche*, eliges 1 jugador (no a ti mismo): si eliges al Demonio, su habilidad no funciona esta noche.", abilityFull: "A partir de la segunda noche, eliges un jugador. Si resulta ser el Demonio, su habilidad de matar no funciona esta noche (nadie muere por su ataque). El Demonio sabe que ha sido exorcizado.", nightOrder: 10, firstNight: 0 },
                { id: "innkeeper", name: "Posadero", icon: "🍻", ability: "Cada noche*, eliges 2 jugadores: están protegidos del Demonio esta noche. Uno de ellos estará borracho.", abilityFull: "Desde la segunda noche, proteges a 2 jugadores del ataque del Demonio. Sin embargo, uno de ellos (a elección del Narrador) está borracho hasta el anochecer, así que su habilidad puede fallar.", nightOrder: 9, firstNight: 0 },
                { id: "gambler", name: "Apostador", icon: "🎲", ability: "Cada noche*, adivinas públicamente el rol de 1 jugador. Si te equivocas, mueres.", abilityFull: "Cada noche desde la segunda, señalas a un jugador y le dices al Narrador qué rol crees que tiene. Si aciertas, nada pasa. Si te equivocas, mueres inmediatamente esa noche.", nightOrder: 3, firstNight: 0 },
                { id: "gossip", name: "Cotilla", icon: "🗣️", ability: "Cada día, haces una afirmación pública. Si resulta ser verdadera, un jugador muere esa noche.", abilityFull: "Durante cada día, haces una declaración pública (ej: 'El Demonio está sentado junto a María'). Si tu afirmación resulta ser verdadera, el Narrador mata a un jugador esa noche como consecuencia.", nightOrder: 35, firstNight: 0 },
                { id: "courtier", name: "Cortesano", icon: "🎭", ability: "Una vez por partida, de noche, eliges 1 jugador: su habilidad no funciona durante 3 noches y 3 días.", abilityFull: "Una sola vez en toda la partida, de noche, eliges a un jugador. Su habilidad queda desactivada durante 3 ciclos completos de noche/día. No sabes qué rol tiene el jugador elegido.", nightOrder: 6, firstNight: 6 },
                { id: "professor", name: "Profesor", icon: "🎓", ability: "Una vez por partida, de noche*, eliges 1 jugador muerto: si era bueno, resucita.", abilityFull: "Una sola vez (desde la segunda noche), puedes intentar resucitar a un jugador muerto. Si ese jugador era bueno, vuelve a la vida. Si era malvado, nada ocurre y has gastado tu habilidad.", nightOrder: 42, firstNight: 0 },
                { id: "minstrel", name: "Juglar", icon: "🎵", ability: "Si un Secuaz es ejecutado, todos los demás jugadores están borrachos mañana hasta el anochecer.", abilityFull: "Cuando un Secuaz es ejecutado (muere por votación del pueblo), al día siguiente TODOS los demás jugadores están borrachos: sus habilidades no funcionan y su información puede ser falsa.", nightOrder: 0, firstNight: 0 },
                { id: "tea_lady", name: "Dama del Té", icon: "🍵", ability: "Si tus 2 vecinos vivos son buenos, no pueden morir.", abilityFull: "Si ambos vecinos vivos más cercanos (uno a cada lado) son jugadores buenos, están completamente protegidos de la muerte (ni el Demonio ni la ejecución pueden matarlos). Si uno es malvado, la protección no aplica.", nightOrder: 0, firstNight: 0 },
                { id: "pacifist", name: "Pacifista", icon: "☮️", ability: "Los jugadores ejecutados podrían no morir.", abilityFull: "Cuando alguien es ejecutado, el Narrador puede decidir que ese jugador no muere (aunque la ejecución sí ocurre). El Narrador usa esta habilidad con moderación para proteger a jugadores buenos.", nightOrder: 0, firstNight: 0 },
                { id: "fool", name: "Bufón", icon: "🃏", ability: "La primera vez que debas morir, no mueres.", abilityFull: "La primera vez que morirías (por cualquier causa: Demonio, ejecución, habilidad), no mueres. Esta protección se usa una sola vez y luego desaparece. No sabes cuándo se ha usado.", nightOrder: 0, firstNight: 0 }
            ],
            outsider: [
                { id: "tinker", name: "Hojalatero", icon: "🔧", ability: "Podrías morir en cualquier momento.", abilityFull: "En cualquier momento (de día o de noche), el Narrador puede decidir matarte. No hay lógica predecible: simplemente puedes morir sin razón aparente. Esto crea confusión sobre las causas de muerte.", nightOrder: 44, firstNight: 0 },
                { id: "moonchild", name: "Niño de la Luna", icon: "🌙", ability: "Cuando mueras, eliges 1 jugador vivo. Si es bueno, también muere.", abilityFull: "Cuando mueres (por cualquier causa), eliges a un jugador vivo. Si ese jugador es bueno, muere también. Si es malvado, nada ocurre. Esto puede causar muertes adicionales perjudiciales para el Bien.", nightOrder: 43, firstNight: 0 },
                { id: "goon", name: "Matón", icon: "💪", ability: "Cada noche, el primer jugador que te elija como objetivo queda borracho hasta el anochecer. Te registras como malvado.", abilityFull: "Si alguien usa su habilidad eligiéndote de noche (el primero que lo haga), queda borracho hasta el anochecer. Además, siempre te registras como malvado para habilidades de detección.", nightOrder: 0, firstNight: 0 },
                { id: "lunatic", name: "Lunático", icon: "🤪", ability: "Crees que eres el Demonio, pero no lo eres. El Demonio sabe quién eres.", abilityFull: "Piensas que eres el Demonio y actúas como tal cada noche (eliges 'víctimas'), pero nada de lo que haces tiene efecto real. El Demonio verdadero sabe que existes y puede imitar tus elecciones o no.", nightOrder: 20, firstNight: 20 }
            ],
            minion: [
                { id: "godfather", name: "Padrino", icon: "🤵", ability: "Si nadie murió hoy por ejecución, eliges 1 jugador esta noche: muere. Los Forasteros muertos te registran como malvados.", abilityFull: "Si nadie fue ejecutado durante el día, esta noche eliges un jugador para matar (además de la muerte del Demonio). Los Forasteros muertos registran como malvados para habilidades de información.", nightOrder: 30, firstNight: 0 },
                { id: "devil_advocate", name: "Abogado del Diablo", icon: "⚖️", ability: "Cada noche, eliges 1 jugador vivo: si es ejecutado mañana, no muere.", abilityFull: "Cada noche eliges a un jugador para proteger de la ejecución. Si ese jugador es votado para ser ejecutado al día siguiente, la ejecución ocurre pero NO muere. La protección dura solo un día.", nightOrder: 2, firstNight: 2 },
                { id: "assassin", name: "Asesino", icon: "🗡️", ability: "Una vez por partida, de noche*, eliges 1 jugador: muere, incluso si está protegido.", abilityFull: "Una sola vez durante la partida (desde la segunda noche), eliges a un jugador que muere incondicionalmente. Ninguna protección (Monje, Marinero, etc.) puede evitar esta muerte.", nightOrder: 28, firstNight: 0 },
                { id: "mastermind", name: "Cerebro", icon: "🧠", ability: "Si el Demonio muere por ejecución (no de otra forma), el juego continúa. Si nadie muere la noche siguiente, el Bien gana.", abilityFull: "Si el Demonio es ejecutado por el pueblo, el juego NO termina inmediatamente. Se juega una noche más. Si nadie muere esa noche adicional, el Bien gana. Si alguien muere, el Mal gana.", nightOrder: 0, firstNight: 0 }
            ],
            demon: [
                { id: "zombuul", name: "Zombuul", icon: "🧟", ability: "Cada noche*, si nadie murió hoy, mata 1 jugador. La primera vez que mueras, no mueres (pero registras como muerto).", abilityFull: "Solo matas de noche si nadie murió durante el día. La primera vez que deberías morir, no mueres realmente: pareces muerto (fuera del juego) pero sigues siendo el Demonio en secreto. La segunda muerte sí es real.", nightOrder: 25, firstNight: 0 },
                { id: "pukka", name: "Pukka", icon: "🐍", ability: "Cada noche, eliges 1 jugador: está envenenado. El jugador que envenenaste la noche anterior muere ahora.", abilityFull: "Cada noche eliges a alguien para envenenar. Esa persona está envenenada (su habilidad falla). El jugador que envenenaste la noche ANTERIOR muere ahora. Hay un retraso de una noche en las muertes.", nightOrder: 24, firstNight: 24 },
                { id: "shabaloth", name: "Shabaloth", icon: "👹", ability: "Cada noche*, mata hasta 2 jugadores. Un jugador muerto recientemente podría resucitar.", abilityFull: "Desde la segunda noche, eliges 2 jugadores para matar. Además, el Narrador puede resucitar a un jugador que el Shabaloth mató anteriormente. Esto crea caos con múltiples muertes y posibles resurrecciones.", nightOrder: 23, firstNight: 0 },
                { id: "po", name: "Po", icon: "👺", ability: "Cada noche*, puedes elegir 1 jugador para matar. Si la noche anterior no elegiste a nadie, esta noche mata a 3 jugadores.", abilityFull: "Puedes elegir no matar una noche (pasar). Si lo haces, la noche siguiente DEBES matar a 3 jugadores en vez de 1. Esto crea una noche de calma seguida de una masacre triple.", nightOrder: 21, firstNight: 0 }
            ]
        }
    },
    sects_and_violets: {
        name: "Sects & Violets",
        roles: {
            townsfolk: [
                { id: "clockmaker", name: "Relojero", icon: "🕐", ability: "Empiezas sabiendo cuántos asientos de distancia hay entre el Demonio y su Secuaz más cercano.", abilityFull: "La primera noche, el Narrador te da un número que indica los puestos de separación entre el Demonio y el Secuaz más cercano a él (contando en la dirección más corta). Esto te ayuda a triangular posiciones.", nightOrder: 0, firstNight: 31 },
                { id: "dreamer", name: "Soñador", icon: "💭", ability: "Cada noche, eliges 1 jugador: sabes 1 rol bueno y 1 rol malvado; uno de ellos es su rol verdadero.", abilityFull: "Cada noche eliges a alguien y el Narrador te da 2 roles: uno bueno y uno malvado. Uno de los dos es el rol real del jugador elegido. Debes deducir cuál es el correcto.", nightOrder: 37, firstNight: 37 },
                { id: "snake_charmer", name: "Encantador de Serpientes", icon: "🐍", ability: "Cada noche, eliges 1 jugador: si es el Demonio, intercambiáis roles y estás envenenado.", abilityFull: "Cada noche señalas a un jugador. Si es el Demonio, os intercambiáis los roles: tú te conviertes en el Demonio (malvado) y él se convierte en el Encantador (bueno), pero tú estás permanentemente envenenado. Si no es el Demonio, no pasa nada.", nightOrder: 8, firstNight: 8 },
                { id: "mathematician", name: "Matemático", icon: "🔢", ability: "Cada noche, sabes cuántas habilidades de jugadores han funcionado incorrectamente desde el último amanecer, por causa de otra habilidad.", abilityFull: "Cada noche recibes un número que indica cuántas habilidades han sido afectadas (por veneno, borrachera, etc.) desde el amanecer. Si es 0, todo funciona correctamente. Si es 2, dos habilidades han dado información incorrecta.", nightOrder: 49, firstNight: 49 },
                { id: "flowergirl", name: "Florista", icon: "🌸", ability: "Cada noche*, sabes si el Demonio votó durante el día de hoy.", abilityFull: "Desde la segunda noche, el Narrador te dice si el Demonio levantó la mano para votar en alguna nominación durante el día anterior (Sí/No). No te dice en qué votación, solo si votó al menos una vez.", nightOrder: 40, firstNight: 0 },
                { id: "town_crier", name: "Pregonero", icon: "📢", ability: "Cada noche*, sabes si algún Secuaz nominó hoy.", abilityFull: "Desde la segunda noche, el Narrador te indica si algún Secuaz hizo una nominación durante el día anterior (Sí/No). No te dice cuál Secuaz ni a quién nominó.", nightOrder: 41, firstNight: 0 },
                { id: "oracle", name: "Oráculo", icon: "👁️", ability: "Cada noche*, sabes cuántos jugadores muertos son malvados.", abilityFull: "Desde la segunda noche, recibes el número exacto de jugadores muertos que pertenecen al equipo del Mal. Esto te ayuda a evaluar si los muertos son mayormente buenos o hay malvados entre ellos.", nightOrder: 44, firstNight: 0 },
                { id: "savant", name: "Erudito", icon: "📖", ability: "Cada día, puedes visitar al Narrador para recibir 2 afirmaciones: una es verdadera y la otra es falsa.", abilityFull: "Durante cada día puedes acercarte al Narrador y él te dará 2 hechos sobre la partida. Uno es completamente verdadero y el otro completamente falso. Debes deducir cuál es cuál.", nightOrder: 0, firstNight: 0 },
                { id: "seamstress", name: "Costurera", icon: "🧵", ability: "Una vez por partida, de noche, eliges 2 jugadores (no a ti misma): sabes si son del mismo equipo.", abilityFull: "Una sola vez en la partida, de noche, eliges 2 jugadores y el Narrador te dice si pertenecen al mismo equipo (ambos buenos o ambos malvados) o a equipos diferentes.", nightOrder: 38, firstNight: 38 },
                { id: "philosopher", name: "Filósofo", icon: "🤔", ability: "Una vez por partida, de noche, eliges 1 rol bueno: ganas esa habilidad. Si ese rol está en juego, ese jugador está borracho.", abilityFull: "Una vez en la partida, de noche, eliges un rol bueno (Aldeano o Forastero). Obtienes la habilidad de ese rol por el resto de la partida. Si otro jugador ya tiene ese rol, ese jugador queda borracho permanentemente.", nightOrder: 1, firstNight: 1 },
                { id: "artist", name: "Artista", icon: "🎨", ability: "Una vez por partida, durante el día, puedes hacer al Narrador una pregunta de Sí o No.", abilityFull: "Una única vez en la partida, durante el día, puedes hacer una pregunta al Narrador que se responda con 'Sí' o 'No'. La respuesta será verdadera. Elige tu pregunta sabiamente.", nightOrder: 0, firstNight: 0 },
                { id: "juggler", name: "Malabarista", icon: "🤹", ability: "En tu primer día, puedes adivinar públicamente hasta 5 combinaciones jugador/rol. Esa noche sabes cuántas acertaste.", abilityFull: "Durante tu primer día vivo, haces hasta 5 adivinanzas públicas (ej: 'María es el Chef, Pedro es el Espía...'). Esa noche, el Narrador te dice cuántas de tus adivinanzas fueron correctas (un número del 0 al 5).", nightOrder: 46, firstNight: 0 },
                { id: "sage", name: "Sabio", icon: "🦉", ability: "Si el Demonio te mata, eliges 2 jugadores: sabes que uno de ellos es el Demonio.", abilityFull: "Si mueres por el ataque nocturno del Demonio, te despiertas y eliges 2 jugadores. El Narrador confirma que uno de ellos es el Demonio. Si mueres por otra causa (ejecución, habilidad), esta habilidad no se activa.", nightOrder: 0, firstNight: 0 }
            ],
            outsider: [
                { id: "mutant", name: "Mutante", icon: "🧬", ability: "Si eres 'ejecutado' por decir que eres Forastero, podrías morir. Intenta no revelar lo que eres.", abilityFull: "Si los demás jugadores descubren o sospechan fuertemente que eres un Forastero y te ejecutan por ello, podrías morir. Tu objetivo es ocultar que eres un Forastero para no ser un blanco fácil.", nightOrder: 0, firstNight: 0 },
                { id: "sweetheart", name: "Enamorado", icon: "💕", ability: "Cuando mueras, 1 jugador estará borracho desde el anochecer hasta el anochecer siguiente.", abilityFull: "Cuando mueres (por cualquier causa), el Narrador elige a un jugador que queda borracho durante todo un ciclo (noche + día + noche). Su habilidad no funciona y su información puede ser falsa durante ese tiempo.", nightOrder: 0, firstNight: 0 },
                { id: "barber", name: "Barbero", icon: "💈", ability: "Si mueres, el Demonio puede elegir 2 jugadores (no él mismo) para intercambiar sus roles esta noche.", abilityFull: "Cuando mueres, el Demonio tiene la opción de intercambiar los roles de 2 jugadores vivos (no puede incluirse a sí mismo). Los jugadores afectados pueden o no saber que su rol ha cambiado.", nightOrder: 0, firstNight: 0 },
                { id: "klutz", name: "Torpe", icon: "🤕", ability: "Cuando mueras, debes elegir 1 jugador vivo públicamente. Si es malvado, tu equipo pierde.", abilityFull: "Cuando mueres (por cualquier causa), debes señalar públicamente a un jugador vivo. Si ese jugador es malvado, el Bien pierde inmediatamente. Debes elegir a alguien que estés seguro de que es bueno.", nightOrder: 0, firstNight: 0 }
            ],
            minion: [
                { id: "evil_twin", name: "Gemelo Malvado", icon: "👯", ability: "Tú y un jugador bueno os conocéis mutuamente. Si el jugador bueno es ejecutado, el Mal podría ganar.", abilityFull: "Al inicio de la partida, se te empareja con un jugador bueno. Ambos sabéis que sois 'gemelos' y conocéis el rol del otro. Si el pueblo ejecuta al gemelo bueno, el Mal gana. El pueblo debe descubrir cuál gemelo es el malvado.", nightOrder: 0, firstNight: 22 },
                { id: "witch", name: "Bruja", icon: "🧙‍♀️", ability: "Cada noche, eliges 1 jugador: si ese jugador nomina mañana, muere inmediatamente (una vez al día).", abilityFull: "Cada noche eliges a un jugador para 'maldecir'. Si ese jugador nomina a cualquier persona al día siguiente, muere inmediatamente al hacer la nominación. El jugador no sabe que está maldecido hasta que nomina.", nightOrder: 4, firstNight: 4 },
                { id: "cerenovus", name: "Cerenovus", icon: "🎪", ability: "Cada noche, eliges 1 jugador y 1 rol bueno: deben fingir ser ese rol mañana o serán ejecutados.", abilityFull: "Cada noche eliges a un jugador y un rol bueno. Ese jugador está 'loco': al día siguiente debe fingir convincentemente ser ese rol. Si el Narrador considera que no fingió bien, puede ser ejecutado inmediatamente.", nightOrder: 11, firstNight: 11 },
                { id: "pit_hag", name: "Bruja del Pozo", icon: "🕳️", ability: "Cada noche*, eliges 1 jugador y 1 rol: ese jugador se convierte en ese rol (si es un Forastero, podrían ganar/perder diferente).", abilityFull: "Desde la segunda noche, puedes cambiar el rol de cualquier jugador a cualquier otro rol. El jugador se convierte completamente en ese nuevo rol (habilidad, equipo si procede, condición de victoria).", nightOrder: 13, firstNight: 0 }
            ],
            demon: [
                { id: "fang_gu", name: "Fang Gu", icon: "🦇", ability: "Cada noche*, eliges 1 jugador: muere. La primera vez que elijas un Forastero, ese Forastero se convierte en el Fang Gu y tú mueres.", abilityFull: "Matas cada noche desde la segunda. La primera vez que tu víctima sea un Forastero, no muere: en su lugar, se convierte en el nuevo Fang Gu (malvado) y tú mueres. Esto solo ocurre una vez.", nightOrder: 26, firstNight: 0 },
                { id: "vigormortis", name: "Vigormortis", icon: "💀", ability: "Cada noche*, mata 1 jugador. Los Secuaces muertos mantienen su habilidad. Si matas un Secuaz, un Aldeano vecino al Secuaz es envenenado.", abilityFull: "Matas cada noche desde la segunda. Tus Secuaces siguen usando su habilidad aunque estén muertos. Si matas a uno de tus propios Secuaces, un Aldeano vecino al Secuaz muerto queda envenenado permanentemente.", nightOrder: 27, firstNight: 0 },
                { id: "no_dashii", name: "No Dashii", icon: "🐙", ability: "Cada noche*, mata 1 jugador. Los 2 Aldeanos más cercanos a ti (uno a cada lado) están envenenados permanentemente.", abilityFull: "Matas cada noche desde la segunda. Tu presencia envenena permanentemente a los 2 Aldeanos vivos más cercanos a tu asiento (uno a cada lado). Su información siempre será incorrecta.", nightOrder: 29, firstNight: 0 },
                { id: "vortox", name: "Vortox", icon: "🌀", ability: "Cada noche*, mata 1 jugador. Toda la información de Aldeanos es falsa, incluso si el Vortox muere.", abilityFull: "Matas cada noche desde la segunda. Mientras exista un Vortox (vivo o muerto ese día), TODA información que reciban los Aldeanos del Narrador es obligatoriamente FALSA. Esto incluye Empáticos, Adivinas, etc.", nightOrder: 22, firstNight: 0 }
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
    "minion_info",
    "demon_info",
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
