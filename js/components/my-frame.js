export class MyFrame extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      if (this.shadowRoot) {
        // Add event listener to the shadow root
        this.shadowRoot.querySelector(".album_order").addEventListener("click", () => {
          const frame = document.querySelector("my-frame");
          frame.setAttribute("uri", albumItem.data.uri);
        });
      }
    }
  
    static get observedAttributes() {
      return ["uri"];
    }
  
    attributeChangedCallback(name, oldVal, newVal) {
      let [, , id] = newVal.split(":");
      this.id = id;
      this.shadowRoot.innerHTML = `
              <iframe class="spotify-iframe" width="454" height="690" src="https://open.spotify.com/embed/album/${this.id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          `;
    }
  }
  
  customElements.define("my-frame", MyFrame);