import { Idiomas, Ferramentas, Pericias } from './enums'; // Ajuste para importar os seus enums corretos

export type Modifiers = {
  for: number;
  des: number;
  con: number;
  int: number;
  sab: number;
  car: number;
};

// Tipo para uma classe de personagem
export type CharacterClass = {
  nome: string;
  dadoDeVida: string;
  vidaInicial: (modConstituicao: number) => number;
  vidaPorLevel: (modificador: number) => number;
  ca?: (modifiers: Modifiers) => number;
  proficiencias: {
    armaduras: string[];
    armas: string[];
    ferramentas: Ferramentas[];
    testesDeResistencia: string[];
    pericias: Pericias[];
  };
  equipamento: string[][];
  habilidades: {
    nome: string;
    descricao: string;
    nivel: number;
  }[];
  subclasses: {
    nome: string;
    descricao: string;
    habilidades: {
      nome: string;
      descricao: string;
      nivel: number;
    }[];
  }[];
};

// Função para calcular a vida inicial com base no dado de vida e modificador de Constituição
const calculateInitialHp = (dadoDeVida: string, modificadorConstituicao: number): number => {
  const dadoValor = parseInt(dadoDeVida.replace('d', ''), 10);
  return dadoValor + modificadorConstituicao;
};

const calculateHpPerLevel = (dadoDeVida: string, conModifier: number): number => {
  const dadoValor = parseInt(dadoDeVida.replace('d', ''), 10);
  return Math.floor(Math.random() * dadoValor) + 1 + conModifier;
};

// Dados das classes
export const classesData: CharacterClass[] = [
  {
    nome: "Guerreiro",
    dadoDeVida: "d10",
    vidaInicial: (modConstituicao: number) => calculateInitialHp("d10", modConstituicao),
    vidaPorLevel: (modConstituicao: number) => calculateHpPerLevel("d10", modConstituicao),
    ca: (modifiers: Modifiers) => 10 + modifiers.des,
    proficiencias: {
      armaduras: ["Leves", "Médias", "Pesadas"],
      armas: ["Simples", "Marciais"],
      ferramentas: [], // Usando enum Ferramentas
      testesDeResistencia: ["Força", "Constituição"],
      pericias: [Pericias.Atletismo, Pericias.Intimidacao] // Usando enum Pericias
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
    vidaInicial: (modConstituicao: number) => calculateInitialHp("d8", modConstituicao),
    vidaPorLevel: (modConstituicao: number) => calculateHpPerLevel("d8", modConstituicao),
    ca: (modifiers: Modifiers) => 10 + modifiers.des,
    proficiencias: {
      armaduras: ["Leves"],
      armas: ["Simples", "Bestas de Mão"],
      ferramentas: [Ferramentas.FerramentasDeInstrumentoFlauta],
      testesDeResistencia: ["Destreza", "Carisma"],
      pericias: [Pericias.Atuacao, Pericias.Persuasao]
    },
    equipamento: [["Rapieira", "Lira"], ["Pacote de Diplomata"]],
    habilidades: [
      {
        nome: "Inspiração de Bardo",
        descricao: "Concede bônus aos aliados.",
        nivel: 1
      },
      {
        nome: "Magia de Bardo",
        descricao: "Conhece magias e pode usá-las.",
        nivel: 2
      },
      {
        nome: "Fontes de Magia",
        descricao: "Ganha um novo recurso para magia.",
        nivel: 3
      },
      {
        nome: "Canção de Descanso",
        descricao: "Permite que aliados recuperem pontos de vida durante um descanso curto.",
        nivel: 5
      },
      {
        nome: "Habilidade de Bardo Aprimorada",
        descricao: "Permite usar habilidades adicionais.",
        nivel: 10
      },
      {
        nome: "Magia Avançada",
        descricao: "Aumenta a eficácia das magias.",
        nivel: 15
      },
      {
        nome: "Inspiração de Bardo Superior",
        descricao: "Melhora o bônus concedido aos aliados.",
        nivel: 18
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
          },
          {
            nome: "Aura de Valor",
            descricao: "Cria uma aura que protege aliados.",
            nivel: 7
          },
          {
            nome: "Inspiração de Heroísmo",
            descricao: "Aumenta a capacidade de combate dos aliados.",
            nivel: 10
          },
          {
            nome: "Mestre do Valor",
            descricao: "Aumenta a eficácia das habilidades de combate.",
            nivel: 15
          }
        ]
      },
      {
        nome: "Colégio da Glamour",
        descricao: "Foca em encantamentos e ilusões.",
        habilidades: [
          {
            nome: "Magia de Glamour",
            descricao: "Concede habilidades de encantamento.",
            nivel: 3
          },
          {
            nome: "Presença de Glamour",
            descricao: "Aumenta a presença social e a influência.",
            nivel: 6
          },
          {
            nome: "Encantamento Superior",
            descricao: "Melhora a eficácia das magias de encantamento.",
            nivel: 10
          },
          {
            nome: "Ilusão Majestosa",
            descricao: "Cria ilusões poderosas e impressionantes.",
            nivel: 15
          }
        ]
      }
    ]
  },
  {
    nome: "Lutador",
    dadoDeVida: "d12",
    vidaInicial: (modConstituicao: number) => calculateInitialHp("d12", modConstituicao),
    vidaPorLevel: (modConstituicao: number) => calculateHpPerLevel("d12", modConstituicao),
    ca: (modifiers: Modifiers) => 10 + Math.max(modifiers.des + modifiers.con),
    proficiencias: {
      armaduras: ["Leves"],
      armas: ["Simples", "Bestas de Mão"],
      ferramentas: [Ferramentas.FerramentasDeInstrumentoFlauta],
      testesDeResistencia: ["Destreza", "Carisma"],
      pericias: [Pericias.Atuacao, Pericias.Persuasao]
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
  },
];
