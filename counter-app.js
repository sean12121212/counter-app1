/**
 * Copyright 2026 
 * @license Apache-2.0
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";


export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  /**
   * Defines the custom element tag name
   */
  static get tag() {
    return "counter-app";
  }

  /**
   * Constructor sets default values
   */
  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 30;
  }

  /**
   * Reactive properties
   */
  static get properties() {
    return {
      ...super.properties,
      counter: { type: Number, reflect: true },
      min: { type: Number },
      max: { type: Number }
    };
  }

 // Logic 

  /**
   * Increases the counter by 1
   * Only runs if counter is less than max
   */
  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  /**
   * Decreases the counter by 1
   * Only runs if counter is greater than min
   */
  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  /**
   * Lifecycle method that runs after updates occur
   */
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }

    if (changedProperties.has("counter")) {
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  /**
   * imports the confetti-container
   */
  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      () => {
        setTimeout(() => {
          this.shadowRoot
            .querySelector("#confetti")
            .setAttribute("popped", "");
        }, 0);
      }
    );
  }

  /**
   * Determines which CSS class to apply based on the current counter number.
   */
  getNumberClass() {
    if (this.counter === this.min || this.counter === this.max) {
      return "boundary";
    }
    if (this.counter === 18) {
      return "eighteen";
    }
    if (this.counter === 21) {
      return "twentyone";
    }
    return "default";
  }

  
  /**
   * Styles
   * Scoped CSS
   * DDD desgign stysem 
   * Layout and spacing
   * Controls button states
   * Colors for the numbers which change if certain numbers are reached 
   */
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          text-align: center;
          padding: var(--ddd-spacing-4);
        }

        .number {
          font-size: var(--ddd-font-size-4xl);
          font-weight: var(--ddd-font-weight-bold);
          margin-bottom: var(--ddd-spacing-4);
          transition: color 0.2s ease-in-out;
        }

        .buttons {
          display: flex;
          justify-content: center;
          gap: var(--ddd-spacing-3);
        }

        button {
          font-size: var(--ddd-font-size-l);
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
          border-radius: var(--ddd-radius-md);
          border: var(--ddd-border-sm);
          background-color: var(--ddd-theme-default-beaverBlue);
          color: white;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out,
                      transform 0.1s ease-in-out;
        }

        button:hover,
        button:focus {
          background-color: var(--ddd-theme-default-nittanyNavy);
          transform: translateY(-2px);
          outline: var(--ddd-border-md);
        }

        button:disabled {
          background-color: var(--ddd-theme-default-navy40);
          cursor: not-allowed;
          opacity: 0.6;
          transform: none;
        }

        .default {
          color: var(--ddd-theme-default-keystoneYellow);
        }

        .eighteen {
          color: var(--ddd-theme-default-original87Pink);
        }

        .twentyone {
          color: var(--ddd-theme-default-futureLime);
        }

        .boundary {
          color: var(--ddd-theme-default-landgrantBrown);
        }
      `
    ];
  }

  
  /**
   * Render
   * adds the structure for confetti for wrapping the entire component
   * COntains the large number display
   * Contains the '+' and '-' buttons
   */  

  render() {
    return html`
      <confetti-container id="confetti">
        <div class="number ${this.getNumberClass()}">
          ${this.counter}
        </div>

        <div class="buttons">
          <button
            @click="${this.decrement}"
            ?disabled="${this.counter === this.min}"
          >
            -
          </button>

          <button
            @click="${this.increment}"
            ?disabled="${this.counter === this.max}"
          >
            +
          </button>
        </div>
      </confetti-container>
    `;
  }

  // HAX integration 
   
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);
