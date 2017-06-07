import { PopoverService } from "./popover.service";

const html = require("./popover.component.html");
const css = require("./popover.component.scss");

const template = document.createElement("template");
template.innerHTML = `<style>${css}</style>${html}`;

export class PopoverComponent extends HTMLElement {
    constructor(private _popoverService: PopoverService) {
        super();
    }

    static get observedAttributes () {
        return [
            "host-element-query"
        ];
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  
        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.hostElement = this.parentElement.querySelector(this.hostElementQuery) as HTMLElement;
    }

    private _setEventListeners() {

    }

    disconnectedCallback() {

    }

    public hostElementId: string;

    public hostElement: HTMLElement;

    public hostElementQuery: string;

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "host-element-query":
                this.hostElementQuery = newValue;
                break;
        }
    }
}

customElements.define(`ce-popover`,PopoverComponent);
