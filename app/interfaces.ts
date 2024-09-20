export type Modifiers = {
  for: number;
  des: number;
  con: number;
  int: number;
  sab: number;
  car: number;
};

export interface Classe {
  nome: string;
  dadoDeVida: string;
  vidaInicial: (modConstituicao: number) => number;
  vidaPorLevel: (modificador: number) => number;
  ca?: (modifiers: Modifiers) => number;
  proficiencias: {
    armaduras: string[];
    armas: string[];
    ferramentas: string[];
    testesDeResistencia: string[];
    pericias: string[];
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
  
