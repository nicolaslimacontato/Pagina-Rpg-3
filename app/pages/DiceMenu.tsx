import { useState, useRef } from 'react';

const DiceMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState<number | null>(null);
    const [maxSides, setMaxSides] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const rollDice = (sides: number) => {
        const rolledResult = Math.floor(Math.random() * sides) + 1;
        setResult(rolledResult);
        setMaxSides(sides);
        if (audioRef.current) {
            audioRef.current.play(); // Toca o som ao rolar o dado
        }
    };

    return (
        <div className="fixed bottom-4 right-0 mr-20 md:mr-20 z-50">
            <div className="relative">
                {/* Botão de Dado */}
                <button
                    onClick={toggleMenu}
                    className="bg-violet-500 hover:bg-violet-700 w-max text-white p-4 rounded-full shadow-lg focus:outline-none z-10 relative"
                >
                    🎲
                </button>

                {/* Menu de Dados */}
                {isOpen && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-4 bg-white dark:bg-[#353535] rounded-lg shadow-lg p-6 pt-10 w-max text-center">
                        {result !== null && (
                            <div
                                className={`absolute bottom-full left-1/2 transform -translate-x-1/2 rounded-full -mb-8 shadow-2xl p-4 w-12 h-12 flex items-center justify-center text-lg font-bold ${
                                    result === maxSides ? 'bg-green-500 text-white' : 
                                    result === 1 ? 'bg-red-500 text-white' : 
                                    'bg-violet-500 hover:bg-violet-700 text-white'
                                }`}
                            >
                                {result}
                            </div>
                        )}
                        <div className="flex items-center flex-col gap-2">
                            {[4, 6, 8, 10, 12, 20, 100].map((sides) => (
                                <button
                                    key={sides}
                                    onClick={() => rollDice(sides)}
                                    className="bg-gray-200 dark:bg-[#424242] p-2 rounded hover:bg-gray-300 w-max"
                                >
                                    d{sides}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Elemento de áudio */}
                <audio ref={audioRef} src="/dice.mp3" />
            </div>
        </div>
    );
};

export default DiceMenu;
