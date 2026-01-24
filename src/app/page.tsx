import { Github } from "@/icons/github";
import { LinkedIn } from "@/icons/linkedin";
import { Mail } from "@/icons/mail";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Ian D. Guzman</h1>
      <main className={styles.main}>
        <p>
          A dedicated father and experienced software professional, Ian balances
          the responsibilities of parenthood with a passion for technology.
          Trained as an industrial engineer, he discovered a strong interest in
          programming and further developed his expertise by earning a degree in
          computer science.
        </p>
        <p>
          With four years of experience as a full-stack developer, including a
          specialization in mobile application development using React Native,
          he brings a thoughtful and disciplined approach to building
          high-quality software. Known for his problem-solving skills and
          positive attitude, Ian approaches both technical challenges and life’s
          demands with focus, adaptability, and a sense of balance.
        </p>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://github.com/ianbrdeguzman"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/ianbrdeguzman"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn />
          LinkedIn
        </a>
        <a
          href="mailto:ianbrdeguzman@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail />
          Mail
        </a>
      </footer>
    </div>
  );
}
