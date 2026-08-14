import Head from "next/head";
import styles from "../src/styles/styles.module.scss";
import ImageSplit from "../src/components/ImageSplit";
import Sidebar from "../src/components/Sidebar";
import ImageHistogram from "../src/components/Histogram";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fejas hantele (attēlu apstrāde)</title>
      </Head>

      <main className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <ImageSplit />
          <ImageHistogram />
        </div>
      </main>
    </div>
  );
}
