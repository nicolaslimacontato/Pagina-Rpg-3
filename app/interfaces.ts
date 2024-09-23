import { Pericias, Ferramentas, Idiomas } from './data/enums'; // Importar os Enums

export type Modifiers = {
  for: number;
  des: number;
  con: number;
  int: number;
  sab: number;
  car: number;
};

export interface Raca {
  nome: string;
  modificadores: Partial<Modifiers>;  // Modificadores raciais
  habilidades: {
    nome: string;
    descricao: string;
  }[];
  idiomas: Idiomas[];  // Idiomas que a raça fala (agora usando o enum Idiomas)
  velocidade: number;  // Velocidade base da raça
}

export interface Antecedentes {
  nome: string;
  proficiencias: {
    pericias: Pericias[];  // Agora usando o enum Pericias
    ferramentas: Ferramentas[];  // Agora usando o enum Ferramentas
    idiomas: Idiomas[];  // Agora usando o enum Idiomas
  };
  equipamentos: string[];  // Equipamentos recebidos
  caracteristicas: {
    nome: string;
    descricao: string;
  }[];
  peculiaridades: string[];  // Peculiaridades de personalidade
}

export interface Classe {
  nome: string;
  dadoDeVida: string;
  vidaInicial: (modConstituicao: number) => number;
  vidaPorLevel: (modificador: number) => number;
  ca?: (modifiers: Modifiers) => number;
  proficiencias: {
    armaduras: string[];
    armas: string[];
    ferramentas: Ferramentas[];  // Agora usando o enum Ferramentas
    testesDeResistencia: string[];
    pericias: Pericias[];  // Agora usando o enum Pericias
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
