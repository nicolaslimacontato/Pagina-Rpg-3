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
          descricao: `<p><p> Os humanos recebem +1 em todos os atributos.</p>` ,
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
          descricao: `<p>Pode enxergar no escuro até 18 metros.</p>`,
        },
        {
          nome: "Sentidos Aguçados",
          descricao: `<p>Proficiência em Percepção.</p>`,
        },
        {
          nome: "Ancestral Feérico",
          descricao: `<p>Vantagem em testes de resistência contra ser encantado, e magias não podem colocar o elfo para dormir.</p>`,
        },
        {
          nome: "Transe",
          descricao: `<p>Elfos não precisam dormir. Em vez disso, meditam profundamente por 4 horas.</p>`,
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
          descricao: `<p>Pode enxergar no escuro até 18 metros.</p>`,
        },
        {
          nome: "Resiliência Anã",
          descricao: `<p>Vantagem em testes de resistência contra venenos, e resistência a dano de veneno.</p>`,
        },
        {
          nome: "Treinamento em Combate Anão",
          descricao: `<p>Proficiência com machados e martelos de guerra.</p>`,
        },
      ],
      resistencias: [
        {
          tipo: "Veneno",
          descricao: `<p>Resistência a dano de veneno.</p>`,
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
          descricao: `<p>Proficiência em Intimidação.</p>`,
        },
        {
          nome: "Fúria Selvagem",
          descricao: `<p>Quando seus pontos de vida caem para 0, pode voltar a 1 ponto de vida uma vez por descanso longo.</p>`,
        },
        {
          nome: "Ataque Selvagem",
          descricao: `<p>Ao rolar um dano crítico, pode rolar um dado de dano adicional.</p>`,
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
          descricao: `<p>Quando rola um 1 em um ataque, teste de habilidade ou teste de resistência, pode rolar de novo.</p>`,
        },
        {
          nome: "Corajoso",
          descricao: `<p>Vantagem em testes de resistência contra ser amedrontado.</p>`,
        },
        {
          nome: "Agilidade Halfling",
          descricao: `<p>Pode se mover através do espaço de qualquer criatura que seja maior do que você.</p>`,
        },
      ],
      resistencias: [],
      idiomas: [Idiomas.Comum, Idiomas.Halfling],
      velocidade: 7.5,
    },
  ];
  