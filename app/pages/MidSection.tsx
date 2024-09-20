import React, { useState } from 'react';
import '../styles/boxshadows.css';

interface Item {
    item: string;
    quantidade: number;
    peso: number;
}

interface MidSectionProps {
    dexModifier: number;
    movement: number;
    maxHp: number;
    initialHp: number;
    currentHp: number;
    tempHp: number;
    successes: boolean[];
    failures: boolean[];
    inventory: Item[];
    toggleSuccess: (index: number) => void;
    toggleFail: (index: number) => void;
    onMovementChange: (value: number) => void;
    onAddItem: (newItem: Item) => void;
    onMaxHpChange: (value: number) => void;
    onCurrentHpChange: (value: number) => void;
    onTempHpChange: (value: number) => void;
    armorClass: number;
    initiative: number;
}

const MidSection: React.FC<MidSectionProps> = ({
    currentHp,
    onCurrentHpChange,
    maxHp,
    tempHp,
    successes,
    failures,
    inventory,
    toggleSuccess,
    toggleFail,
    onMovementChange,
    movement,
    onAddItem,
    onMaxHpChange,
    onTempHpChange,
    armorClass,
    initiative
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHealing, setIsHealing] = useState(true); // true = cura, false = dano
    const [hpChangeAmount, setHpChangeAmount] = useState(0);

    const openModal = (isHealingAction: boolean) => {
        setIsHealing(isHealingAction);
        setHpChangeAmount(0); // Reseta o valor ao abrir o modal
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleHpChange = () => {
        if (isHealing) {
            onCurrentHpChange(currentHp + hpChangeAmount); // Adiciona a cura
        } else {
            onCurrentHpChange(currentHp - hpChangeAmount); // Subtrai o dano
        }
        closeModal(); // Fecha o modal após aplicar a mudança
    };

    const handleAddItem = () => {
        const newItem = { item: 'Nova Arma', quantidade: 1, peso: 5 }; // Exemplo de novo item
        onAddItem(newItem);
    };

    const handleResetHp = () => {
        onCurrentHpChange(maxHp); // Define o HP atual como o máximo
    };

    const handleResetSuccessesFailures = () => {
        const resetSuccesses = successes.map(() => false);
        const resetFailures = failures.map(() => false);
        resetSuccesses.forEach((_, index) => toggleSuccess(index));
        resetFailures.forEach((_, index) => toggleFail(index));
    };

    // Verifica se o jogador está salvo ou morreu
    const isSaved = successes.filter(Boolean).length >= 3;
    const isDead = failures.filter(Boolean).length >= 3;

    return (
        <div className="h-max p-4 gap-2 rounded-lg space-y-3 bg-gray-100 dark:bg-[#353535] border-2 border-black custom-box-shadow">
            {/* Classe de Armadura, Iniciativa, Deslocamento */}
            <div className="flex justify-evenly items-center gap-3">
                {/* Classe de Armadura */}
                <div className="bg-white dark:bg-[#2a2a2a] p-2 rounded-lg text-center border-2 w-max h-max flex flex-col border-gray-300">
                    <span className="text-lg font-bold">{armorClass}</span> {/* CA */}
                    <span className="text-xs text-gray-500 dark:text-white font-bold">Classe de Armadura</span>
                </div>

                {/* Iniciativa */}
                <div className="bg-white dark:bg-[#2a2a2a] p-2 rounded-lg text-center border-2 w-max h-max flex flex-col border-gray-300">
                    <span className="text-lg font-bold">{initiative}</span> {/* Iniciativa */}
                    <span className="text-xs text-gray-500 dark:text-white font-bold">Iniciativa</span>
                </div>

                {/* Deslocamento */}
                <div className="bg-white dark:bg-[#2a2a2a] p-2 rounded-lg text-center border-2 w-max h-max flex flex-col border-gray-300">
                    <input
                        type="number"
                        className="w-12 dark:bg-[#2a2a2a] text-center p-1 font-bold ml-5 rounded"
                        value={movement}
                        onChange={(e) => onMovementChange(parseInt(e.target.value, 10))}
                    />
                    <span className="text-xs text-gray-500 dark:text-white font-bold">Deslocamento</span>
                </div>
            </div>

            {/* Pontos de Vida */}
            <div className="bg-white dark:bg-[#2a2a2a] p-4 rounded-lg border-2 border-gray-300">
                <div className="flex flex-col gap-2">
                    <div className="text-center">
                        <span className="text-xs text-gray-500 dark:text-white font-bold">Vida Máxima</span>
                        <div className="mt-1">
                            <div className="p-2">
                                HP Máximo: {maxHp}
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <span className="text-xs text-gray-500 dark:text-white font-bold">Pontos de Vida</span>
                        <div className="mt-1">
                            {/* Exibindo o HP Atual */}
                            <div className={`p-2 ${currentHp < 0 ? 'text-red-500' : 'text-black dark:text-white'}`}>
                                HP Atual: {currentHp}
                            </div>

                            {/* Botões de Cura, Resetar e Dano */}
                            <div className="flex justify-center items-center space-x-4">
                                <button
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                    onClick={() => openModal(true)}
                                >
                                    Cura
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={handleResetHp}
                                >
                                    Resetar
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => openModal(false)}
                                >
                                    Dano
                                </button>
                            </div>

                            {/* Modal para Entrada de Cura ou Dano */}
                            {isModalOpen && (
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                                    <div className="bg-white dark:bg-[#353535] flex flex-col items-center p-6 rounded-lg shadow-lg">
                                        <h2 className="text-lg font-bold mb-4">
                                            {isHealing ? 'Aplicar Cura' : 'Aplicar Dano'}
                                        </h2>
                                        <div className="flex space-x-4 items-center">
                                            {/* Botão de Decremento */}
                                            <button
                                                className="bg-gray-300 dark:bg-[#262626] px-3 py-1 rounded"
                                                onClick={() => setHpChangeAmount(prev => Math.max(prev - 1, 0))}
                                            >
                                                -1
                                            </button>

                                            {/* Input para Valor */}
                                            <input
                                                type="number"
                                                value={hpChangeAmount}
                                                onChange={(e) => setHpChangeAmount(Math.max(0, Number(e.target.value)))}
                                                className="w-16 text-center dark:bg-[#353535] border-2 border-gray-300 rounded"
                                            />

                                            {/* Botão de Incremento */}
                                            <button
                                                className="bg-gray-300 dark:bg-[#262626] px-3 py-1 rounded"
                                                onClick={() => setHpChangeAmount(prev => prev + 1)}
                                            >
                                                +1
                                            </button>
                                        </div>

                                        <div className="flex space-x-4 mt-4">
                                            {/* Botão Confirmar */}
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                                onClick={handleHpChange}
                                            >
                                                Confirmar
                                            </button>

                                            {/* Botão Cancelar */}
                                            <button
                                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                                onClick={closeModal}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-center">
                        <span className="text-xs text-gray-500 dark:text-white font-bold">Pontos de Vida Temporários</span>
                        <div className="mt-1">
                            <div className="p-2">
                                HP Temporário: {tempHp}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Teste de Resistência contra a Morte */}
            <div className="bg-white dark:bg-[#2a2a2a] p-4 rounded-lg border-2 border-gray-300">
                <div className="text-center">
                    <div className="text-xs text-gray-500 dark:text-white font-bold">Teste de Resistência</div>
                    <div className="mt-2 space-y-4">
                        <div className="text-xl text-green-600 font-bold">Sucessos</div>
                        <div className="flex space-x-2 justify-center">
                            {successes.map((success, index) => (
                                <button
                                    key={index}
                                    className={`w-6 h-6 rounded-full border-2 font-bold ${
                                        success ? 'bg-green-500' : 'bg-gray-200'
                                    }`}
                                    onClick={() => toggleSuccess(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mt-2 space-y-4">
                        <div className="text-xl text-red-600 font-bold">Falhas</div>
                        <div className="flex space-x-2 justify-center">
                            {failures.map((failure, index) => (
                                <button
                                    key={index}
                                    className={`w-6 h-6 rounded-full border-2 font-bold ${
                                        failure ? 'bg-red-500' : 'bg-gray-200'
                                    }`}
                                    onClick={() => toggleFail(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {isSaved && <div className="mt-2 text-center text-green-600 font-bold">Você foi salvo!</div>}
                {isDead && <div className="mt-2 text-center text-red-600 font-bold">Você morreu!</div>}
                <div className="mt-4 text-center">
                    <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={handleResetSuccessesFailures}
                    >
                        Resetar
                    </button>
                </div>
            </div>

           {/* Inventário */}
           <div className="bg-white dark:bg-[#2a2a2a] p-4 rounded-lg border-2 border-gray-300">
                <div className="text-center mb-2">
                    <span className="text-xs text-gray-500 dark:text-white font-bold">Inventário</span>
                </div>
                <ul className="space-y-2">
                    {inventory.map((item, index) => (
                        <li key={index} className="flex justify-between items-center border-b border-gray-300 pb-2">
                            <div className="flex flex-col">
                                <span className="font-bold">{item.item}</span>
                                <span className="text-sm text-gray-500 dark:text-white">Quantidade: {item.quantidade}</span>
                                <span className="text-sm text-gray-500 dark:text-white">Peso: {item.peso}kg</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Botão Adicionar Item */}
            <div className="text-center mt-2">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={handleAddItem}
                >
                    Adicionar Item
                </button>
            </div>
        </div>
    );
};



export default MidSection;
