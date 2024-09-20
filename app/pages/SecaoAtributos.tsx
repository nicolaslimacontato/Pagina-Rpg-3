import React from 'react';
import '../styles/boxshadows.css';

type PropsSecaoAtributos = {
  atributos: { [chave: string]: number };
  ajustarAtributo: (attr: string, valor: number) => void;
};

const calcularModificador = (valor: number): number => {
  return Math.floor((valor - 10) / 2);
};

const ControleAtributo: React.FC<{
  attr: string;
  valorAtributo: number;
  modificador: number;
  aoReduzir: () => void;
  aoAumentar: () => void;
  lidarComMudancaEntrada: (novoValor: string) => void;
}> = ({ attr, valorAtributo, modificador, aoReduzir, aoAumentar, lidarComMudancaEntrada }) => (
  <div className="text-center w-full sm:w-auto flex-1">
    <span className="text-sm font-semibold text-gray-700 dark:text-white mb-1 block">
      {attr.toUpperCase()}
    </span>
    <div className="relative w-20 h-20 mx-auto flex flex-col justify-center items-center bg-white dark:bg-[#2a2a2a] rounded-full border-2 border-gray-300">
      <span className="text-xl font-bold">
        {modificador >= 0 ? `+${modificador}` : modificador}
      </span>
      <input
        type="number"
        className="ml-3 text-center bg-transparent text-lg w-full"
        value={valorAtributo}
        onChange={(e) => lidarComMudancaEntrada(e.target.value)}
        min="1"
        max="20"
      />
    </div>
    <div className="mt-2 flex justify-center gap-2">
      <button
        type="button"
        onClick={aoReduzir}
        className="px-2 py-1 bg-red-500 text-white rounded"
      >
        -
      </button>
      <button
        type="button"
        onClick={aoAumentar}
        className="px-2 py-1 bg-green-500 text-white rounded"
      >
        +
      </button>
    </div>
  </div>
);

const SecaoAtributos: React.FC<PropsSecaoAtributos> = ({ atributos = {}, ajustarAtributo }) => {
  const lidarComMudancaEntrada = (attr: string, novoValor: string) => {
    const valorAnalisado = parseInt(novoValor);
    if (!isNaN(valorAnalisado)) {
      ajustarAtributo(attr, Math.min(Math.max(valorAnalisado, 1), 20) - (atributos[attr] || 0));
    }
  };

  return (
    <div className="w-full mt-8 mx-auto container">
      <div
        className="bg-gray-100 border-2 dark:bg-[#353535] border-black dark:border-[#353535] p-4 rounded-lg custom-box-shadow">
        <div className="flex flex-wrap justify-around gap-4">
          {Object.entries(atributos || {}).map(([attr, valorAtributo]) => {
            const modificador = calcularModificador(valorAtributo);

            return (
              <ControleAtributo
                key={attr}
                attr={attr}
                valorAtributo={valorAtributo}
                modificador={modificador}
                lidarComMudancaEntrada={(novoValor) => lidarComMudancaEntrada(attr, novoValor)}
                aoReduzir={() => ajustarAtributo(attr, Math.max(valorAtributo - 1, 1) - valorAtributo)}
                aoAumentar={() => ajustarAtributo(attr, Math.min(valorAtributo + 1, 20) - valorAtributo)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SecaoAtributos;