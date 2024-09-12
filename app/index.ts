import { classesData } from './data/classesData';
import { Classe } from './interfaces';

function gerarClasses(): Classe[] {
    return classesData;  // retorna o array de classes
}

const classesGeradas = gerarClasses();
console.log(JSON.stringify(classesGeradas, null, 2));
