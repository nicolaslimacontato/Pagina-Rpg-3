import { Pericias, Ferramentas, Idiomas } from './enums'; // Importar os Enums


export type CharacterAntecedentes = {
  nome: string;
  proficiencias: {
    pericias: Pericias[];
    ferramentas: Ferramentas[];
    idiomas: Idiomas[];
  };
  equipamentos: string[];
  caracteristicas: {
    nome: string;
    descricao: string;
  }[];
  peculiaridades: string[];
};
  // Dados dos antecedentes
  export const AntecedentesData: CharacterAntecedentes[] = [
    {
      nome: "Criminoso",
      proficiencias: {
        pericias: [Pericias.Furtividade, Pericias.Enganacao],
        ferramentas: [Ferramentas.FerramentasDeLadrao],
        idiomas: []
      },
      equipamentos: [
        "Um pé de cabra",
        "Um conjunto de roupas escuras e comuns com capuz",
        "Um cinturão contendo 15 peças de ouro"
      ],
      caracteristicas: [
        {
          nome: "Contato Criminoso",
          descricao: "Você tem um contato confiável dentro da rede criminosa que pode fornecer informações."
        }
      ],
      peculiaridades: [
        "Nunca confio completamente em ninguém além de mim.",
        "A primeira coisa que faço em um novo lugar é descobrir onde o crime acontece."
      ]
    },
    // Outros antecedentes...
];
