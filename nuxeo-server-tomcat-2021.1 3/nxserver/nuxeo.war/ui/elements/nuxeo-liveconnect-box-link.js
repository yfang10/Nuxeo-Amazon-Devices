import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import"./nuxeo-liveconnect-box-provider.js";Polymer({_template:html`
    <style include="nuxeo-styles">
      :host {
        display: inline-block;
        @apply --layout-horizontal;
        @apply --nuxeo-liveconnect-link-layout;
      }

      iron-icon {
        --iron-icon-height: 16px;
        --iron-icon-width: 32px;
        margin-right: 4px;
        @apply --nuxeo-liveconnect-icon-layout;
      }

      a {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-center-justified;
        @apply --nuxeo-liveconnect-anchor-layout;
      }

      a,
      a:active,
      a:visited,
      a:focus {
        color: var(--nuxeo-secondary-color, #0066ff);
        text-decoration: underline;
      }
    </style>

    <nuxeo-liveconnect-box-provider
      id="provider"
      is-available="{{isProviderAvailable}}"
    ></nuxeo-liveconnect-box-provider>
    <template is="dom-if" if="[[isProviderAvailable]]">
      <a href="javascript:undefined" on-tap="_openPicker">
        <iron-icon src="[[importPath]]images/box.png"></iron-icon>
        [[i18n('liveconnectImportActions.box', 'Box')]]
      </a>
    </template>
  `,is:"nuxeo-liveconnect-box-link",behaviors:[I18nBehavior],ready(){this.$.provider.updateProviderInfo()},_openPicker(){this.$.provider.openPicker()}});