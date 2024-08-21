import Image from "next/image";
import styles from "./page.module.css";
import ClassesGrid from './pages/ClassesGrid';
import Ficha from './pages/Ficha';

export default function Home() {
  return (
    <div className="App">
      <ClassesGrid />
      <Ficha />
    </div>
  );
}
