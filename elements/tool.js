import {css, html, LitElement} from '../web_modules/lit-element.js';

class Tool extends LitElement {
    static get properties() {
        return {
            tool: {type: Object}
        };
    }

    static get styles() {
        return css`
            :host {
                display: inline-block;
                box-sizing: border-box;
                width: 25px;
                height: 25px;
                border: 1px solid var(--button-text);
                border-top: 1px solid var(--highlight-text);
                border-left: 1px solid var(--highlight-text);
                background-color: var(--button-face);
                image-rendering: pixelated;
            }
            
            div {
                box-sizing: border-box;
                height: 100%;
                border: 1px solid var(--canvas);
                border-top: 1px solid var(--button-face);
                border-left: 1px solid var(--button-face);
                background-position: 2px 2px;
                background-repeat: no-repeat;
            }
            
            :host(.active) {
                border: 1px solid var(--highlight-text);
                border-top: 1px solid var(--button-text);
                border-left: 1px solid var(--button-text);
                background: var(--selected-background);
            }
            
            /* TODO: REMOVE */
            :host(:not(.active)) {
                filter: saturate(0%);
                pointer-events: none;
            }
            
            :host(.active) div {
                border: 1px solid var(--button-face);
                border-top: 1px solid var(--canvas);
                border-left: 1px solid var(--canvas);
                background-position: 3px 3px;
            }
        `;
    }

    render() {
        return html`
            <div style="background-image: url('${this.tool.image}')"></div>
        `;
    }
}
customElements.define('paint-tool', Tool);