export const classesData = [
  {
    nome: "Guerreiro",
    dadoDeVida: "d10",
    vidaInicial: 10,
    vidaPorLevel: "1d10 + modificador de Constituição",
    proficiencias: {
      armaduras: ["Leves", "Médias", "Pesadas"],
      armas: ["Simples", "Marciais"],
      ferramentas: [],
      testesDeResistencia: ["Força", "Constituição"],
      pericias: ["Atletismo", "Intimidação"]
    },
    equipamento: [
      ["Espada Longa", "Escudo"],
      ["Armadura de Couro"],
      ["Pacote de Aventureiro"]
    ],
    habilidades: [
      { nome: "Ataque Extra", descricao: "Pode atacar duas vezes por turno", nivel: 5 }
    ],
    subclasses: [
      {
        nome: "Campeão",
        descricao: "Especialista em combate físico",
        habilidades: [
          { nome: "Golpe Brutal", descricao: "Aumenta a chance de causar dano crítico", nivel: 3 }
        ]
      }
    ]
  },
  {
    nome: "Bardo",
    dadoDeVida: "d8",
    vidaInicial: 8,
    vidaPorLevel: "1d8",
    proficiencias: {
      armaduras: ["Leves"],
      armas: ["Simples", "Bestas de Mão"],
      ferramentas: ["Instrumentos Musicais"],
      testesDeResistencia: ["Destreza", "Carisma"],
      pericias: ["Performance", "Persuasão"]
    },
    equipamento: [["Rapieira", "Lira"], ["Pacote de Diplomata"]],
    habilidades: [
      {
        nome: "Inspiração de Bardo",
        descricao: "Concede bônus aos aliados.",
        nivel: 1
      }
    ],
    subclasses: [
      {
        nome: "Colégio do Valor",
        descricao: "Especializado em combate e apoio.",
        habilidades: [
          {
            nome: "Combatente Inspirado",
            descricao: "Adiciona bônus de combate.",
            nivel: 3
          }
        ]
      }
    ]
  }
];
