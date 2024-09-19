import React, { useState } from 'react';
import { classesData, CharacterClass } from '@/app/data/classesData'; // Ajuste o caminho conforme necessário
import '../styles/rightsection.css';

interface RightSectionProps {
    className: string;
    level: number;
}

const RightSection: React.FC<RightSectionProps> = ({ className, level }) => {
    const [openHabilidades, setOpenHabilidades] = useState<{ [key: string]: boolean }>({});

    const toggleHabilidade = (nomeHabilidade: string) => {
        setOpenHabilidades(prevState => ({
            ...prevState,
            [nomeHabilidade]: !prevState[nomeHabilidade]
        }));
    };

    const classeSelecionada: CharacterClass | undefined = classesData.find(classe => classe.nome === className);

    if (!classeSelecionada) {
        return <div>Classe não encontrada.</div>;
    }

    const habilidadesFiltradas = classeSelecionada.habilidades.filter(habilidade => habilidade.nivel <= level);

    return (
        <div className="right-section">
            <div className="characteristic-box">
                {/* Características */}
                <div className="p-5 rounded-lg bg-gray-100 border-2 border-black" style={{ boxShadow: "0 0 0 4px white, 0 0 0 7px black" }}>
                    <span className="text-lg font-semibold text-gray-700 text-center flex justify-center">Características</span>

                    {/* Traços de Personalidade */}
                    <div className="mt-4 bg-white p-4 rounded-lg border-2 border-gray-300 w-full">
                        <textarea
                            className="w-full bg-transparent text-center text-gray-700 resize-none border-none outline-none"
                            rows={3}
                            defaultValue="I see omens in every event and action. The gods try to speak to us, we just need to listen. Nothing can shake my optimistic attitude."
                        />
                        <span className="text-xs font-semibold text-gray-500 mt-2 flex justify-center">TRAÇOS DE PERSONALIDADE</span>
                    </div>

                    {/* Ideais */}
                    <div className="mt-4 bg-white p-4 rounded-lg border-2 border-gray-300 w-full">
                        <textarea
                            className="w-full bg-transparent text-center text-gray-700 resize-none border-none outline-none"
                            rows={3}
                            defaultValue="Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)"
                        />
                        <span className="text-xs font-semibold text-gray-500 mt-2 flex justify-center">IDEAIS</span>
                    </div>

                    {/* Vínculos */}
                    <div className="mt-4 bg-white p-4 rounded-lg border-2 border-gray-300 w-full">
                        <textarea
                            className="w-full bg-transparent text-center text-gray-700 resize-none border-none outline-none"
                            rows={2}
                            defaultValue="I will do anything to protect the temple where I served."
                        />
                        <span className="text-xs font-semibold text-gray-500 flex justify-center mt-2">VÍNCULOS</span>
                    </div>

                    {/* Defeitos */}
                    <div className="mt-4 bg-white p-4 rounded-lg border-2 border-gray-300 w-full">
                        <textarea
                            className="w-full bg-transparent text-center text-gray-700 resize-none border-none outline-none"
                            rows={2}
                            defaultValue="My piety sometimes leads me to blindly trust those that profess faith in my god."
                        />
                        <span className="text-xs font-semibold text-gray-500 flex justify-center mt-2">DEFEITOS</span>
                    </div>
                </div>
            </div>

            <div className="characteristic-box mt-5">
                <span className="text-lg font-semibold text-gray-700 text-center flex justify-center">Habilidades</span>

                {habilidadesFiltradas.map((habilidade, index) => (
                    <div key={index} className="ability-box">
                        <div 
                            className="ability-header"
                            onClick={() => toggleHabilidade(habilidade.nome)}
                        >
                            <span className="ability-name">{habilidade.nome}</span>
                            <span className={`ability-toggle ${openHabilidades[habilidade.nome] ? 'open' : ''}`}>
                                &#x25BC;
                            </span>
                        </div>
                        <div className={`ability-description ${openHabilidades[habilidade.nome] ? 'open' : ''}`}>
                            <p>{habilidade.descricao}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RightSection;
