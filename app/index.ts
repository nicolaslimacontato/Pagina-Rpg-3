import { classesData } from './data/classesData';
import { racasData } from './data/racasData'; // Correto: 'racasData'
import { AntecedentesData } from './data/antecedentesData'; // Correto: 'AntecedentesData'
import { Classe, Raca, Antecedentes } from './interfaces'; // Importar corretamente as interfaces

// Função para gerar classes
function gerarClasses(): Classe[] {
  return classesData;
}

// Função para gerar raças
function gerarRacas(): Raca[] {  // Tipo de retorno correto: 'Raca[]'
  return racasData;
}

// Função para gerar antecedentes
function gerarAntecedentes(): Antecedentes[] {  // Tipo de retorno correto: 'Antecedentes[]'
  return AntecedentesData;
}

// Gerar os dados
const classesGeradas = gerarClasses();
const racasGeradas = gerarRacas();
const antecedentesGerados = gerarAntecedentes();  // Agora também gera os antecedentes
