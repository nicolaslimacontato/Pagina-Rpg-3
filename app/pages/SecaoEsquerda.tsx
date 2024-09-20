import React from 'react';
import '../styles/boxshadows.css';

type TestesDeResistencia = Record<string, boolean>;
type Aptidoes = Record<string, boolean>;

type Atributos = {
  forca: number;
  destreza: number;
  constituicao: number;
  inteligencia: number;
  sabedoria: number;
  carisma: number;
};

type Props = {
  atributos: Atributos;
  testesDeResistencia: TestesDeResistencia;
  aptidoes: Aptidoes;
  alternarTesteDeResistencia: (atributo: keyof TestesDeResistencia) => void;
  alternarAptidao: (aptidao: keyof Aptidoes) => void;
  bonusDeProficiencia: number;
  alternarInspiracao: () => void;
  inspiracao: boolean;
};

// Função de cálculo do modificador movida para fora do componente para evitar recriação
const calcularModificador = (valor: number): number => Math.floor((valor - 10) / 2);

const SecaoEsquerda: React.FC<Props> = ({
  atributos,
  testesDeResistencia,
  aptidoes,
  alternarTesteDeResistencia,
  alternarAptidao,
  bonusDeProficiencia,
  alternarInspiracao,
  inspiracao,
}) => {
  // Mapeamento de aptidões para os atributos correspondentes
  const mapaDeAptidoesParaAtributos: Record<string, keyof Atributos> = {
    acrobacia: 'destreza',
    manejoDeAnimais: 'sabedoria',
    arcanismo: 'inteligencia',
    atletismo: 'forca',
    engano: 'carisma',
    historia: 'inteligencia',
    intuicao: 'sabedoria',
    intimidacao: 'carisma',
    investigacao: 'inteligencia',
    medicina: 'sabedoria',
    natureza: 'inteligencia',
    percepcao: 'sabedoria',
    atuacao: 'carisma',
    persuasao: 'carisma',
    religiao: 'inteligencia',
    prestidigitacao: 'destreza',
    furtividade: 'destreza',
    sobrevivencia: 'sabedoria',
  };

  // Cálculo do modificador da aptidão
  const obterModificadorDeAptidao = (aptidao: keyof Aptidoes): number => {
    const atributo = mapaDeAptidoesParaAtributos[aptidao] || 'destreza';
    const modificadorBase = calcularModificador(atributos[atributo]);
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
        <div
          className="p-3 rounded-lg flex items-center justify-evenly bg-gray-100 dark:bg-[#353535] border-2 border-black custom-box-shadow"
          aria-label="Bônus de Proficiência"
          title="Bônus de Proficiência"
        >
          <div className="flex flex-col justify-center items-center">
            <div className="bg-white dark:bg-[#2a2a2a] rounded-full w-12 h-12 flex items-center justify-center border-2 border-gray-300">
              <span className="text-xl font-bold">{bonusDeProficiencia}</span>
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">Bônus de Proficiência</span>
          </div>
        </div>
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

      {/* Testes de Resistência */}
      <div className="p-4 rounded-lg flex flex-col bg-gray-100 dark:bg-[#353535] border-2 border-black custom-box-shadow">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">TESTES DE RESISTÊNCIA</span>
        <div className="flex flex-col mt-2 space-y-2">
          {Object.keys(atributos).map((atributo) => {
            const modificador = obterModificadorDeTesteDeResistencia(atributo as keyof Atributos);
            return (
              <div className="flex items-center" key={atributo}>
                <div className="w-10 h-10 bg-white dark:bg-[#2a2a2a] border-2 border-gray-300 rounded-full flex justify-center items-center mr-2">
                  <span className="text-lg font-bold">{modificador >= 0 ? `+${modificador}` : modificador}</span>
                </div>
                <input
                  type="checkbox"
                  id={`res_${atributo}`}
                  checked={testesDeResistencia[atributo as keyof TestesDeResistencia]}
                  onChange={() => alternarTesteDeResistencia(atributo as keyof TestesDeResistencia)}
                  className="mr-2"
                  aria-label={`Alternar teste de resistência para ${atributo}`}
                />
                <label htmlFor={`res_${atributo}`} className="text-sm text-gray-700 dark:text-gray-300">
                  {atributo.charAt(0).toUpperCase() + atributo.slice(1)}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Aptidões */}
      <div className="p-4 rounded-lg flex flex-col bg-gray-100 dark:bg-[#353535] border-2 border-black custom-box-shadow">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">APTIDÕES</span>
        <div className="flex flex-col mt-2 space-y-2">
          {Object.keys(aptidoes).map((aptidao) => {
            const modificador = obterModificadorDeAptidao(aptidao as keyof Aptidoes);
            return (
              <div className="flex items-center" key={aptidao}>
                <div className="w-10 h-10 bg-white dark:bg-[#2a2a2a] border-2 border-gray-300 rounded-full flex justify-center items-center mr-2">
                  <span className="text-lg font-bold">{modificador >= 0 ? `+${modificador}` : modificador}</span>
                </div>
                <input
                  type="checkbox"
                  id={`aptidao_${aptidao}`}
                  checked={aptidoes[aptidao as keyof Aptidoes]}
                  onChange={() => alternarAptidao(aptidao as keyof Aptidoes)}
                  className="mr-2"
                  aria-label={`Alternar proficiência de aptidão para ${aptidao}`}
                />
                <label htmlFor={`aptidao_${aptidao}`} className="text-sm text-gray-700 dark:text-gray-300">
                  {aptidao.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SecaoEsquerda;
