import React, { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";
var test = "https://api.github.com/repos/batleforc/UnlabeledProject/releases";
export default function Release() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const [release, setRelease] = useState({});
  useEffect(() => {
    axios
      .get(test)
      .then((value) => value.data)
      .then((value) => {
        setRelease(value);
        console.log(value);
      });
  }, []);
  return (
    <Layout
      title={`${siteConfig.title}/Release`}
      description="Release du projet Unlabeled Project"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Release</h1>
          <p className="hero__subtitle">Prêt a sauter le pas ?</p>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {release &&
                release.length > 0 &&
                release.map((value) => (
                  <div
                    key={value.name}
                    className={clsx("col col--4", styles.feature)}
                  >
                    <Link to={value.html_url}>
                      <h3>{value.name}</h3>
                    </Link>
                    <p>by {value.author.login}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
