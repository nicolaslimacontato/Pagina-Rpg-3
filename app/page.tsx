"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import ClassesGrid from './pages/ClassesGrid';
import CharacterForm from './pages/CharacterForm';
import { classesData } from './data/classesData';
import DiceMenu from "./pages/DiceMenu";

export default function Home() {
  const [jsonData, setJsonData] = useState(classesData);
  return (
    <div className="App">
      <DiceMenu/>
      <ClassesGrid />
      <CharacterForm/>
    </div>
  );
}
