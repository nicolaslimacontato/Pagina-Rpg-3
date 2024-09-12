export interface Classe {
    nome: string;
    dadoDeVida: string;
    vidaInicial: number;
    vidaPorLevel: string;
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
  }
  