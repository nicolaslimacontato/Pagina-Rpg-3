// Tipo para os modificadores raciais
import { Idiomas } from './enums'; // Ajuste para importar os seus enums corretos


export type RacialModifiers = {
    for?: number;
    des?: number;
    con?: number;
    int?: number;
    sab?: number;
    car?: number;
  };
  
  // Tipo para resistências
  export type Resistances = {
    tipo: string;
    descricao: string;
  };
  
  // Tipo para uma raça de personagem
  export type raca = {
    nome: string;
    modificadores: RacialModifiers;
    habilidades: {
      nome: string;
      descricao: string;
      nivel?: number; // Algumas habilidades podem ser desbloqueadas conforme o nível
    }[];
    resistencias?: Resistances[];
    idiomas: Idiomas[];
    velocidade: number; // Em metros ou pés, conforme o sistema
  };
  
  // Dados das raças
  export const racasData: raca[] = [
    {
      nome: "Humano",
      modificadores: {
        for: 1,
        des: 1,
        con: 1,
        int: 1,
        sab: 1,
        car: 1,
      },
      habilidades: [
        {
          nome: "Versatilidade Humana",
          descricao: "Os humanos recebem +1 em todos os atributos.",
        },
      ],
      resistencias: [],
      idiomas: [Idiomas.Comum],
      velocidade: 9, // Velocidade típica de um humano (em metros)
    },
    {
      nome: "Elfo",
      modificadores: {
        des: 2,
      },
      habilidades: [
        {
          nome: "Visão no Escuro",
          descricao: "Pode enxergar no escuro até 18 metros.",
        },
        {
          nome: "Sentidos Aguçados",
          descricao: "Proficiência em Percepção.",
        },
        {
          nome: "Ancestral Feérico",
          descricao: "Vantagem em testes de resistência contra ser encantado, e magias não podem colocar o elfo para dormir.",
        },
        {
          nome: "Transe",
          descricao: "Elfos não precisam dormir. Em vez disso, meditam profundamente por 4 horas.",
        },
      ],
      resistencias: [],
      idiomas: [Idiomas.Comum, Idiomas.Elfico],
      velocidade: 9,
    },
    {
      nome: "Anão",
      modificadores: {
        con: 2,
      },
      habilidades: [
        {
          nome: "Visão no Escuro",
          descricao: "Pode enxergar no escuro até 18 metros.",
        },
        {
          nome: "Resiliência Anã",
          descricao: "Vantagem em testes de resistência contra venenos, e resistência a dano de veneno.",
        },
        {
          nome: "Treinamento em Combate Anão",
          descricao: "Proficiência com machados e martelos de guerra.",
        },
      ],
      resistencias: [
        {
          tipo: "Veneno",
          descricao: "Resistência a dano de veneno.",
        },
      ],
      idiomas: [Idiomas.Comum, Idiomas.Anao],
      velocidade: 7.5, // Anões são um pouco mais lentos que outras raças
    },
    {
      nome: "Meio-Orc",
      modificadores: {
        for: 2,
        con: 1,
      },
      habilidades: [
        {
          nome: "Ameaçador",
          descricao: "Proficiência em Intimidação.",
        },
        {
          nome: "Fúria Selvagem",
          descricao: "Quando seus pontos de vida caem para 0, pode voltar a 1 ponto de vida uma vez por descanso longo.",
        },
        {
          nome: "Ataque Selvagem",
          descricao: "Ao rolar um dano crítico, pode rolar um dado de dano adicional.",
        },
      ],
      resistencias: [],
      idiomas: [Idiomas.Comum, Idiomas.Orc],
      velocidade: 9,
    },
    {
      nome: "Halfling",
      modificadores: {
        des: 2,
      },
      habilidades: [
        {
          nome: "Sortudo",
          descricao: "Quando rola um 1 em um ataque, teste de habilidade ou teste de resistência, pode rolar de novo.",
        },
        {
          nome: "Corajoso",
          descricao: "Vantagem em testes de resistência contra ser amedrontado.",
        },
        {
          nome: "Agilidade Halfling",
          descricao: "Pode se mover através do espaço de qualquer criatura que seja maior do que você.",
        },
      ],
      resistencias: [],
      idiomas: [Idiomas.Comum, Idiomas.Halfling],
      velocidade: 7.5,
    },
  ];
  