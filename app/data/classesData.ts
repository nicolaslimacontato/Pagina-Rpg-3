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
      { nome: "Ataque Extra", descricao: `<p>Pode atacar duas vezes por turno</p>`, nivel: 5 }
    ],
    subclasses: [
      {
        nome: "Campeão",
        descricao: "Especialista em combate físico",
        habilidades: [
          { nome: "Golpe Brutal", descricao: `<p>Aumenta a chance de causar dano crítico</p>`, nivel: 3 }
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
        descricao: `<p>Concede bônus aos aliados.</p>`,
        nivel: 1
      },
      {
        nome: "Magia de Bardo",
        descricao: `<p>Conhece magias e pode usá-las.</p>`,
        nivel: 2
      },
      {
        nome: "Fontes de Magia",
        descricao: `<p>Ganha um novo recurso para magia.</p>`,
        nivel: 3
      },
      {
        nome: "Canção de Descanso",
        descricao: `<p>Permite que aliados recuperem pontos de vida durante um descanso curto.</p>`,
        nivel: 5
      },
      {
        nome: "Habilidade de Bardo Aprimorada",
        descricao: `<p>Permite usar habilidades adicionais.</p>`,
        nivel: 10
      },
      {
        nome: "Magia Avançada",
        descricao: `<p>Aumenta a eficácia das magias.</p>`,
        nivel: 15
      },
      {
        nome: "Inspiração de Bardo Superior",
        descricao: `<p>Melhora o bônus concedido aos aliados.</p>`,
        nivel: 18
      }
    ],
    subclasses: [
      {
        nome: "Colégio do Valor",
        descricao: `<p>Especializado em combate e apoio.</p>`,
        habilidades: [
          {
            nome: "Combatente Inspirado",
            descricao:`<p>Adiciona bônus de combate.</p>`,
            nivel: 3
          },
          {
            nome: "Aura de Valor",
            descricao:`<p>Cria uma aura que protege aliados.</p>`,
            nivel: 7
          },
          {
            nome: "Inspiração de Heroísmo",
            descricao:`<p>Aumenta a capacidade de combate dos aliados.</p>`,
            nivel: 10
          },
          {
            nome: "Mestre do Valor",
            descricao:`<p>Aumenta a eficácia das habilidades de combate.</p>`,
            nivel: 15
          }
        ]
      },
      {
        nome: "Colégio da Glamour",
        descricao:`<p>Foca em encantamentos e ilusões.</p>`,
        habilidades: [
          {
            nome: "Magia de Glamour",
            descricao:`<p>Concede habilidades de encantamento.</p>`,
            nivel: 3
          },
          {
            nome: "Presença de Glamour",
            descricao:`<p>Aumenta a presença social e a influência.</p>`,
            nivel: 6
          },
          {
            nome: "Encantamento Superior",
            descricao:`<p>Melhora a eficácia das magias de encantamento.</p>`,
            nivel: 10
          },
          {
            nome: "Ilusão Majestosa",
            descricao:`<p>Cria ilusões poderosas e impressionantes.</p>`,
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
        descricao:`<p>Concede bônus aos aliados.</p>`,
        nivel: 1
      }
    ],
    subclasses: [
      {
        nome: "Colégio do Valor",
        descricao:`<p>Especializado em combate e apoio.</p>`,
        habilidades: [
          {
            nome: "Combatente Inspirado",
            descricao:`<p>Adiciona bônus de combate.</p>`,
            nivel: 3
          }
        ]
      }
    ]
  },
];
