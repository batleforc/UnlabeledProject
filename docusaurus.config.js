/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "UnlabeledDoc",
  tagline: "Une documentation sans titre, pour un projet sans Titre",
  url: "https://batleforc.github.io",
  baseUrl: "/UnlabeledProject/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "batleforc", // Usually your GitHub org/user name.
  projectName: "UnlabeledProject", // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
    },
    navbar: {
      title: "UnlabeledProject",
      logo: {
        alt: "toolbox",
        src: "img/toolbox.png",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        { to: "blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/batleforc/UnlabeledProject",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "docs/",
            },
            {
              label: "Kanban",
              href: "https://github.com/batleforc/UnlabeledProject/projects/1",
            },
            {
              label: "Miro",
              href: "https://miro.com/app/board/o9J_lM04aYE=/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "WebSite",
              href: "https://maxleriche.tech",
            },
            {
              label: "GitHub",
              href: "https://github.com/batleforc/UnlabeledProject",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} UnlabeledProject, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/batleforc/UnlabeledProject/edit/doc/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/batleforc/UnlabeledProject/edit/doc/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
