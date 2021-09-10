import "./style.css";
export function render() {
  document.querySelector("#app").innerHTML = `
    <h1>Hello Vite!</h1>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  `;
}
render();

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    newModule.render();
  });
}
