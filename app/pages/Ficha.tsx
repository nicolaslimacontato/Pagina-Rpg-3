import React from 'react';

const Ficha = () => {
    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Ficha de Personagem</h1>

                {/* Nome do Personagem, Classe, Raça */}
                <div className="flex w-full space-x-4 mb-4">
                    <div className="w-1/3 flex flex-col">
                        <label htmlFor="nome" className="font-semibold text-gray-700">Nome do Personagem</label>
                        <input type="text" id="nome" className="border-gray-400 border rounded px-3 py-2" />
                    </div>
                    <div className="w-1/3 flex flex-col">
                        <label htmlFor="classe" className="font-semibold text-gray-700">Classe</label>
                        <input type="text" id="classe" className="border-gray-400 border rounded px-3 py-2" />
                    </div>
                    <div className="w-1/3 flex flex-col">
                        <label htmlFor="raca" className="font-semibold text-gray-700">Raça</label>
                        <input type="text" id="raca" className="border-gray-400 border rounded px-3 py-2" />
                    </div>
                </div>

                {/* Atributos */}
                <div className="grid grid-cols-3 gap-4 mb-4 w-full max-w-4xl">
                    {["Força", "Destreza", "Constituição", "Inteligência", "Sabedoria", "Carisma"].map((attr, index) => (
                        <div key={index} className="flex flex-col items-center bg-gray-100 p-4 rounded">
                            <label className="font-semibold text-gray-700">{attr}</label>
                            <input type="number" className="border-gray-400 border rounded w-16 text-center mt-2" />
                        </div>
                    ))}
                </div>


                {/* Bônus de Proficiência e Classe de Armadura */}
                <div className="flex w-full space-x-4 mb-4">
                    <div className="w-1/2 flex flex-col">
                        <label htmlFor="bonus-proficiencia" className="font-semibold text-gray-700">Bônus de Proficiência</label>
                        <input type="number" id="bonus-proficiencia" className="border-gray-400 border rounded px-3 py-2" />
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <label htmlFor="classe-armadura" className="font-semibold text-gray-700">Classe de Armadura</label>
                        <input type="number" id="classe-armadura" className="border-gray-400 border rounded px-3 py-2" />
                    </div>
                </div>

                {/* Iniciativa e Deslocamento */}
                <div className="flex w-full space-x-4 mb-4">
                    <div className="w-1/2 flex flex-col">
                        <label htmlFor="iniciativa" className="font-semibold text-gray-700">Iniciativa</label>
                        <input type="number" id="iniciativa" className="border-gray-400 border rounded px-3 py-2" />
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <label htmlFor="deslocamento" className="font-semibold text-gray-700">Deslocamento</label>
                        <input type="number" id="deslocamento" className="border-gray-400 border rounded px-3 py-2" />
                    </div>
                </div>

                {/* Pontos de Vida */}
                <div className="flex w-full space-x-4 mb-4">
                    <div className="w-1/3 flex flex-col">
                        <label htmlFor="pv-totais" className="font-semibold text-gray-700">PV Totais</label>
                        <input type="number" id="pv-totais" className="border-gray-400 border rounded px-3 py-2" />
                    </div>
                    <div className="w-1/3 flex flex-col">
                        <label htmlFor="pontos-vida-atuais" className="font-semibold text-gray-700">Pontos de Vida Atuais</label>
                        <input type="number" id="pontos-vida-atuais" className="border-gray-400 border rounded px-3 py-2" />
                    </div>
                    <div className="w-1/3 flex flex-col">
                        <label htmlFor="pontos-vida-temporarios" className="font-semibold text-gray-700">Pontos de Vida Temporários</label>
                        <input type="number" id="pontos-vida-temporarios" className="border-gray-400 border rounded px-3 py-2" />
                    </div>
                </div>

                {/* Espaço para Equipamentos */}
                <div className="flex flex-col w-full max-w-4xl mb-4">
                    <label htmlFor="equipamentos" className="font-semibold text-gray-700">Equipamentos</label>
                    <textarea id="equipamentos" className="border-gray-400 border rounded px-3 py-2" rows={4}></textarea>
                </div>

                {/* Outras seções como Perícias, Idiomas, etc. */}
                <div className="flex flex-col w-full max-w-4xl bg-gray-100 p-4 rounded mb-4">
                    <label htmlFor="pericias" className="font-semibold text-gray-700">Perícias</label>
                    {/* Adicione aqui as listas de perícias */}
                </div>

            </div>
        </div>

    );
};

export default Ficha;
