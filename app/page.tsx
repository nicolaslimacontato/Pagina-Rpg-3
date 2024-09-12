"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import ClassesGrid from './pages/ClassesGrid';
import CharacterForm from './pages/CharacterForm';
import { classesData } from './data/classesData';

export default function Home() {
  const [jsonData, setJsonData] = useState(classesData);
  return (
    <div className="App">
      <ClassesGrid />
      <CharacterForm/>
    </div>
  );
}
