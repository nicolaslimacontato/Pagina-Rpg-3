import { Pericias, Ferramentas, Idiomas } from './enums'; // Importar os Enums


export type CharacterAntecedentes = {
  nome: string;
  proficiencias: {
    pericias: Pericias[];
    ferramentas: Ferramentas[];
    idiomas: Idiomas[];
  };
  equipamentos: string[];
  habilidades: {
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
    habilidades: [
      {
        nome: "Contato Criminoso",
        descricao: `<p> Você tem um contato confiável dentro da rede criminosa que pode fornecer informações.</p>`
      },
      {
        nome: "Especialidade Criminal",
        descricao: `
          <p>Existem muitos tipos de criminosos, e dentro de uma guilda de ladrões ou organização criminosa similar, membros individuais têm especialidades particulares. Mesmo criminosos que operam fora de tais organizações têm fortes preferências por certos tipos de crimes em detrimento de outros. Escolha o papel que você desempenhou em sua vida criminosa, ou role na tabela abaixo.</p>
          <table class="min-w-full divide-y mt-3 divide-gray-200 dark:divide-gray-900">
            <thead class="bg-gray-50 dark:bg-zinc-900">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">d8</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Especialidade</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-black divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">1</td>
                <td class="px-6 py-4 whitespace-nowrap">Chantagista</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">2</td>
                <td class="px-6 py-4 whitespace-nowrap">Assaltante</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">3</td>
                <td class="px-6 py-4 whitespace-nowrap">Executor</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">4</td>
                <td class="px-6 py-4 whitespace-nowrap">Cerca</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">5</td>
                <td class="px-6 py-4 whitespace-nowrap">Ladrão de estrada</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">6</td>
                <td class="px-6 py-4 whitespace-nowrap">Assassino de aluguel</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">7</td>
                <td class="px-6 py-4 whitespace-nowrap">Batedor de carteira</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">8</td>
                <td class="px-6 py-4 whitespace-nowrap">Contrabandista</td>
              </tr>
            </tbody>
          </table>
        `
      },
    ],
    peculiaridades: [
      "Nunca confio completamente em ninguém além de mim.",
      "A primeira coisa que faço em um novo lugar é descobrir onde o crime acontece."
    ]
  },
  // Outros antecedentes...
];
