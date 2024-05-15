export default class MyFrame extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      setTimeout(() => {
        this.shadowRoot.querySelector("iframe").addEventListener("load", () => {
          const uri = this.getAttribute("uri");
          if (uri) {
            this.shadowRoot.querySelector("iframe").src = `https://open.spotify.com/embed/album/${uri}`;
          }
        });
      }, 0);
    }
  }
  
  customElements.define("my-frame", MyFrame);