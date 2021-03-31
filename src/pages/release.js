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
      .then((value) => setRelease(value));
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
        {release &&
          release.length > 0 &&
          release.map((value) => (
            <section>
              <Link to={value.html_url}>
                <h1>{value.name}</h1>
              </Link>
            </section>
          ))}
      </main>
    </Layout>
  );
}
