import React, { useState } from 'react';
import { classesData, CharacterClass } from '@/app/data/classesData'; // Ajuste o caminho conforme necessário
import '../styles/rightsection.css';

interface SecaoDireitaProps {
    className: string; // Nome da classe
    nivel: number; // Nível do personagem
}

const SecaoDireita: React.FC<SecaoDireitaProps> = ({ className, nivel }) => {
    const [openHabilidades, setOpenHabilidades] = useState<{ [key: string]: boolean }>({});

    const toggleHabilidade = (nomeHabilidade: string) => {
        setOpenHabilidades(prevState => ({
            ...prevState,
            [nomeHabilidade]: !prevState[nomeHabilidade]
        }));
    };

    const classeSelecionada: CharacterClass | undefined = classesData.find(classe => classe.nome === className);

    if (!classeSelecionada) {
        return <div className='characteristic-box h-max'><h2>Classe não selecionada.</h2></div>;
    }

    const habilidadesFiltradas = classeSelecionada.habilidades.filter(habilidade => habilidade.nivel <= nivel);

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

            <div className="characteristic-box mt-6">
                <span className="text-lg font-semibold text-gray-700 dark:text-white text-center flex justify-center mb-2">Habilidades</span>

                {habilidadesFiltradas.map((habilidade, index) => (
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
