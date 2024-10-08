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
          A proud dad juggling the joys of fatherhood while navigating the
          intricate world of code. An industrial engineer by training, he
          discovered his love for programming and decided to level up by
          snagging a computer science degree.
        </p>
        <p>
          With four years under his belt as a full stack developer and a knack
          for mobile magic with React Native, he’s the guy who turns caffeine
          into code and parenting into an art form. Whether he’s debugging
          software or dodging toddler tantrums, Ian tackles it all with a smile
          and maybe a dad joke or two!
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
