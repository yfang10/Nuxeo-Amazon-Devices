import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import"./nuxeo-liveconnect-google-drive-provider.js";Polymer({_template:html`
    <style include="nuxeo-styles">
      :host {
        display: inline-block;
        @apply --layout-horizontal;
        @apply --nuxeo-liveconnect-link-layout;
      }

      iron-icon {
        --iron-icon-height: 16px;
        --iron-icon-width: 16px;
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

    <nuxeo-liveconnect-google-drive-provider
      id="provider"
      is-available="{{isProviderAvailable}}"
    ></nuxeo-liveconnect-google-drive-provider>
    <template is="dom-if" if="[[isProviderAvailable]]">
      <a href="javascript:undefined" on-tap="_openPicker">
        <iron-icon src="[[importPath]]images/google_drive.png"></iron-icon>
        [[i18n('liveconnectImportActions.googledrive', 'Google Drive')]]
      </a>
    </template>
  `,is:"nuxeo-liveconnect-google-drive-link",behaviors:[I18nBehavior],ready(){this.$.provider.updateProviderInfo()},_openPicker(){this.$.provider.openPicker()}});