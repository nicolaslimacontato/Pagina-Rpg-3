import React, { useState } from 'react';
import { classesData, CharacterClass } from '@/app/data/classesData'; // Ajuste o caminho conforme necessário
import { racasData, raca } from '../data/racasData'; // Importar dados das raças
import '../styles/rightsection.css';

interface SecaoDireitaProps {
    className: string; // Nome da classe
    nivel: number; // Nível do personagem
    racaName: string; // Nome da raça
    subclasseName: string; // Nome da subclasse
}

const SecaoDireita: React.FC<SecaoDireitaProps> = ({ className, nivel, racaName, subclasseName }) => {
    const [openHabilidades, setOpenHabilidades] = useState<{ [key: string]: boolean }>({});

    const toggleHabilidade = (nomeHabilidade: string) => {
        setOpenHabilidades(prevState => ({
            ...prevState,
            [nomeHabilidade]: !prevState[nomeHabilidade]
        }));
    };

    // Encontrar a classe selecionada
    const classeSelecionada: CharacterClass | undefined = classesData.find(classe => classe.nome === className);
    const subclasseSelecionada = classeSelecionada?.subclasses.find(subclasse => subclasse.nome === subclasseName); // Verifica se a subclasse existe
    const racaSelecionada: raca | undefined = racasData.find(raca => raca.nome === racaName);

    if (!classeSelecionada || !racaSelecionada || !subclasseSelecionada) {
        return <div className='characteristic-box h-max font-bold text-xl'><h2>Selecione as informações a cima para ver suas habilidades e antecedentes</h2></div>;
    }

    const habilidadesFiltradasClasse = classeSelecionada.habilidades.filter(habilidade => habilidade.nivel <= nivel);
    const habilidadesSubclasse = subclasseSelecionada.habilidades.filter(habilidade => habilidade.nivel <= nivel);
    
    const habilidadesCombinadas = [
        ...habilidadesFiltradasClasse.map(habilidade => ({
            ...habilidade,
            tipo: 'Classe',
        })),
        ...habilidadesSubclasse.map(habilidade => ({
            ...habilidade,
            tipo: 'Subclasse',
        }))
    ];

    const habilidadesRaca = racaSelecionada.habilidades;

    return (
        <div className="right-section">
            <div className="characteristic-box -mt-4">
                {/* Características */}
                <div className="p-5 rounded-lg bg-gray-100 dark:bg-[#353535]">
                    <span className="text-lg font-semibold text-gray-700 dark:text-white text-center flex justify-center">Características</span>

                    {/* Traços de Personalidade */}
                    <div className="mt-4 bg-white dark:bg-[#2a2a2a] p-4 rounded-lg border-2 border-gray-300 w-full">
                        <textarea
                            className="w-full bg-transparent text-center text-gray-700 dark:text-white resize-none border-none outline-none"
                            rows={3}
                            defaultValue="Vejo presságios em cada evento e ação. Os deuses tentam falar conosco, só precisamos ouvir. Nada pode abalar minha atitude otimista."
                        />
                        <span className="text-xs text-gray-500 dark:text-white font-bold mt-2 flex justify-center">TRAÇOS DE PERSONALIDADE</span>
                    </div>

                    {/* Ideais */}
                    <div className="mt-4 bg-white dark:bg-[#2a2a2a] p-4 rounded-lg border-2 border-gray-300 w-full">
                        <textarea
                            className="w-full bg-transparent text-center text-gray-700 dark:text-white resize-none border-none outline-none"
                            rows={3}
                            defaultValue="Mudança. Precisamos ajudar a trazer as mudanças que os deuses estão constantemente fazendo no mundo. (Caótico)"
                        />
                        <span className="text-xs text-gray-500 dark:text-white font-bold mt-2 flex justify-center">IDEAIS</span>
                    </div>

                    {/* Vínculos */}
                    <div className="mt-4 bg-white dark:bg-[#2a2a2a] p-4 rounded-lg border-2 border-gray-300 w-full">
                        <textarea
                            className="w-full bg-transparent text-center text-gray-700 dark:text-white resize-none border-none outline-none"
                            rows={2}
                            defaultValue="Farei qualquer coisa para proteger o templo onde servi."
                        />
                        <span className="text-xs dark:text-white font-bold text-gray-500 flex justify-center mt-2">VÍNCULOS</span>
                    </div>

                    {/* Defeitos */}
                    <div className="mt-4 bg-white dark:bg-[#2a2a2a] p-4 rounded-lg border-2 border-gray-300 w-full">
                        <textarea
                            className="w-full bg-transparent text-center text-gray-700 dark:text-white resize-none border-none outline-none"
                            rows={2}
                            defaultValue="Minha piedade às vezes me leva a confiar cegamente em quem professa fé em meu deus."
                        />
                        <span className="text-xs dark:text-white font-bold text-gray-500 flex justify-center mt-2">DEFEITOS</span>
                    </div>
                </div>
            </div>

            {/* Habilidades da Classe */}
            <div className="characteristic-box mt-6">
                <span className="text-lg font-semibold text-gray-700 dark:text-white text-center flex justify-center mb-2">Habilidades da Classe</span>
                {habilidadesCombinadas.map((habilidade, index) => (
                    <div key={index} className="ability-box dark:text-white">
                        <div className="ability-header" onClick={() => toggleHabilidade(habilidade.nome)}>
                            <span className="ability-name">{habilidade.nome} <br/> <span className='text-xs text-[#be161d]'>Origem: {habilidade.tipo}</span></span>
                            <span className={`ability-toggle ${openHabilidades[habilidade.nome] ? 'open' : ''}`}>&#x25BC;</span>
                        </div>
                        <div className={`ability-description ${openHabilidades[habilidade.nome] ? 'open' : ''}`}>
                            <p>{habilidade.descricao}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Habilidades da Raça */}
            <div className="characteristic-box mt-6">
                <span className="text-lg font-semibold text-gray-700 dark:text-white text-center flex justify-center mb-2">Habilidades da Raça</span>
                {habilidadesRaca.map((habilidade, index) => (
                    <div key={index} className="ability-box dark:text-white">
                        <div 
                            className="ability-header"
                            onClick={() => toggleHabilidade(habilidade.nome)}
                        >
                            <span className="ability-name dark:text-white">{habilidade.nome}</span>
                            <span className={`ability-toggle dark:text-white ${openHabilidades[habilidade.nome] ? 'open' : ''}`}>
                                &#x25BC;
                            </span>
                        </div>
                        <div className={`ability-description dark:text-white ${openHabilidades[habilidade.nome] ? 'open' : ''}`}>
                            <p>{habilidade.descricao}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SecaoDireita;
