import React from 'react';
import '../styles/boxshadows.css';
import { Pericias, Ferramentas, Idiomas } from '../data/enums'; // Importar os Enums

type TestesDeResistencia = Record<string, boolean>;
type Aptidoes = Record<Pericias, boolean>; // Ajuste para usar Pericias como chave

type Atributos = {
  forca: number;
  destreza: number;
  constituicao: number;
  inteligencia: number;
  sabedoria: number;
  carisma: number;
};

type Proficiencias = {
  idiomas: Record<string, boolean>;
  ferramentas: Record<string, boolean>;
};

type Personagem = {
  atributos: Atributos;
  aptidoes: Aptidoes;
  testesDeResistencia: TestesDeResistencia;
  proficiencias: Proficiencias; // Novo campo
};

type Props = {
  atributos: Atributos;
  testesDeResistencia: TestesDeResistencia;
  aptidoes: Aptidoes;
  proficiencias: Proficiencias;
  alternarTesteDeResistencia: (atributo: keyof TestesDeResistencia) => void;
  alternarAptidao: (aptidao: Pericias) => void;
  bonusDeProficiencia: number;
  alternarInspiracao: () => void;
  inspiracao: boolean;

};

// Função de cálculo do modificador movida para fora do componente para evitar recriação
const calcularModificador = (valor: number): number => {
  if (isNaN(valor)) return 0;
  return Math.floor((valor - 10) / 2);
};

// Função para verificar se é um valor válido do enum Pericias
const isPericia = (valor: any): valor is Pericias => {
  return Object.values(Pericias).includes(valor);
};


const SecaoEsquerda: React.FC<Props> = ({
  atributos,
  testesDeResistencia,
  aptidoes,
  proficiencias,
  alternarTesteDeResistencia,
  alternarAptidao,
  bonusDeProficiencia,
  alternarInspiracao,
  inspiracao,
}) => {
  // Mapeamento de aptidões para os atributos correspondentes
  const mapaDeAptidoesParaAtributos: Record<Pericias, keyof Atributos> = {
    [Pericias.Acrobacia]: 'destreza',
    [Pericias.Arcanismo]: 'inteligencia',
    [Pericias.Atletismo]: 'forca',
    [Pericias.Atuacao]: 'carisma',
    [Pericias.Enganacao]: 'carisma',
    [Pericias.Historia]: 'inteligencia',
    [Pericias.Intimidacao]: 'carisma',
    [Pericias.Intuicao]: 'sabedoria',
    [Pericias.Investigacao]: 'inteligencia',
    [Pericias.Medicina]: 'sabedoria',
    [Pericias.Natureza]: 'inteligencia',
    [Pericias.Percepcao]: 'sabedoria',
    [Pericias.Persuasao]: 'carisma',
    [Pericias.Prestidigitacao]: 'destreza',
    [Pericias.Religiao]: 'inteligencia',
    [Pericias.Sobrevivencia]: 'sabedoria',
    [Pericias.Furtividade]: 'destreza',
    [Pericias.AdestrarAnimais]: 'sabedoria',
  };

  // Cálculo do modificador da aptidão
  const obterModificadorDeAptidao = (aptidao: Pericias): number => {
    const atributo = mapaDeAptidoesParaAtributos[aptidao];
    const modificadorBase = calcularModificador(atributos[atributo] || 0);
    return aptidoes[aptidao] ? modificadorBase + bonusDeProficiencia : modificadorBase;
  };

  // Cálculo do modificador de teste de resistência
  const obterModificadorDeTesteDeResistencia = (atributo: keyof Atributos): number => {
    const modificadorBase = calcularModificador(atributos[atributo]);
    return testesDeResistencia[atributo] ? modificadorBase + bonusDeProficiencia : modificadorBase;
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Bônus de Proficiência e Inspiração */}
      <div className="flex gap-8 justify-center items-center mx-auto w-max">
        {/* Bônus de Proficiência */}
        <div className="p-3 rounded-lg flex items-center justify-evenly bg-gray-100 dark:bg-[#353535] border-2 border-black custom-box-shadow">
          <div className="flex flex-col justify-center items-center">
            <div className="bg-white dark:bg-[#2a2a2a] rounded-full w-12 h-12 flex items-center justify-center border-2 border-gray-300">
              <span className="text-xl font-bold">{bonusDeProficiencia}</span>
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">Bônus de Proficiência</span>
          </div>
        </div>

        {/* Inspiração */}
        <div
          className={`p-3 rounded-lg flex items-center justify-evenly bg-gray-100 dark:bg-[#353535] border-2 border-black cursor-pointer custom-box-shadow ${inspiracao ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          onClick={alternarInspiracao}
          aria-label="Inspiração"
          title="Inspiração"
        >
          <div className="flex flex-col justify-center items-center">
            <div className="bg-white dark:bg-[#2a2a2a] rounded-full w-12 h-12 flex items-center justify-center border-2 border-gray-300">
              <span className="text-xl font-bold">
                {inspiracao ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-black dark:fill-white">
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                ) : (
                  "-"
                )}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">Inspiração</span>
          </div>
        </div>
      </div>

      {/* Aptidões */}
      <div className="p-4 rounded-lg flex flex-col bg-gray-100 dark:bg-[#353535] border-2 border-black custom-box-shadow">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">APTIDÕES</span>
        <div className="flex flex-col mt-2 space-y-2">
          {Object.keys(Pericias)
            .filter(key => isNaN(Number(key))) // Filtra somente as chaves que são strings (não numéricas)
            .map((aptidao) => {
              const modificador = obterModificadorDeAptidao(Pericias[aptidao as keyof typeof Pericias]);
              return (
                <div className="flex items-center" key={aptidao}>
                  <div className="w-10 h-10 bg-white dark:bg-[#2a2a2a] border-2 border-gray-300 rounded-full flex justify-center items-center mr-2">
                    <span className="text-lg font-bold">{modificador >= 0 ? `+${modificador}` : modificador}</span>
                  </div>
                  <input
                    type="checkbox"
                    id={`aptidao_${aptidao}`}
                    checked={aptidoes[Pericias[aptidao as keyof typeof Pericias]]}
                    onChange={() => alternarAptidao(Pericias[aptidao as keyof typeof Pericias])}
                    className="mr-2"
                    aria-label={`Alternar proficiência de aptidão para ${aptidao}`}
                  />
                  <label htmlFor={`aptidao_${aptidao}`} className="text-sm text-gray-700 dark:text-gray-300">
                    {String(aptidao).replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
              );
            })}
        </div>
      </div>
      {/* Proficiencias */}
      <div className="p-4 rounded-lg flex flex-col bg-gray-100 dark:bg-[#353535] border-2 border-black custom-box-shadow">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">PROFICIÊNCIAS</span>
        <div className="flex flex-col mt-2 space-y-2">
          {/* Idiomas */}
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Idiomas:</span>
            <ul className="ml-4">
              {Object.entries(proficiencias.idiomas).map(([idioma, proficiente]) => (
                proficiente ? (
                  <li key={idioma} className="text-gray-700 dark:text-gray-300">
                    {idioma}
                  </li>
                ) : null
              ))}
            </ul>
          </div>

          {/* Ferramentas */}
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Ferramentas:</span>
            <ul className="ml-4">
              {Object.entries(proficiencias.ferramentas).map(([ferramenta, proficiente]) => (
                proficiente ? (
                  <li key={ferramenta} className="text-gray-700 dark:text-gray-300">
                    {ferramenta}
                  </li>
                ) : null
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecaoEsquerda;