const personifyConfig = {
  pages: {
    Demo: {
      type: "Content",
      name: "Demo Page",
      getContentName() { return window.location.pathname; },
      isPage: false,
      track: true,
    },
  },
  api: "",
  sendStubResponse: true,
  debug: true,
};

export { personifyConfig };
