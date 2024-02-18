import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import moment from"@nuxeo/moment";Polymer({_template:html`
    <style include="iron-flex iron-flex-alignment iron-flex-factors">
      :host {
        display: block;
      }

      .table {
        font-family: var(--nuxeo-app-font);
        line-height: 3.5;
      }

      .row {
        border-bottom: 1px solid var(--nuxeo-border);
        @apply --layout-horizontal;
      }

      .row:hover {
        background-color: var(--nuxeo-container-hover);
      }

      .header {
        background-color: var(--nuxeo-table-header-background);
        color: var(--nuxeo-table-header-titles);
        font-weight: 400;
        height: 56px;
        display: flex;
        flex-direction: row;
      }

      .cell {
        padding: 0 24px 0 24px;
        min-height: 46px;
        overflow: hidden;
      }

      paper-icon-button:hover ::slotted(iron-icon) {
        color: var(--nuxeo-action-hover, #00adff);
      }

      .actions {
        width: 50px;
      }

      .emptyResult {
        color: var(--nuxeo-text-light, #939caa);
        display: block;
        font-weight: 300;
        padding: 1.5em 0.7em;
        text-align: center;
        font-size: 1.1em;
      }
    </style>

    <nuxeo-resource
      auto
      id="tokens"
      path="/token"
      params="[[_params(application)]]"
      on-response="_handleTokens"
    ></nuxeo-resource>

    <nuxeo-resource id="token" path="/token"></nuxeo-resource>

    <template is="dom-if" if="[[_empty(tokens)]]">
      <div class="table-row">
        <div class="emptyResult">
          [[i18n('authenticationTokensManagement.empty')]]
        </div>
      </div>
    </template>

    <template is="dom-if" if="[[!_empty(tokens)]]">
      <div class="table">
        <div class="header">
          <div class="flex-2">[[i18n('authenticationTokensManagement.token')]]</div>
          <div class="flex-1">[[i18n('authenticationTokensManagement.application')]]</div>
          <div class="flex">[[i18n('authenticationTokensManagement.deviceId')]]</div>
          <div class="flex">[[i18n('authenticationTokensManagement.deviceDescription')]]</div>
          <div class="flex">[[i18n('authenticationTokensManagement.permission')]]</div>
          <div class="flex">[[i18n('authenticationTokensManagement.creationDate')]]</div>
          <div class="actions"></div>
        </div>
        <template is="dom-repeat" items="[[tokens]]" as="token">
          <div class="row">
            <div class="flex-2">[[token.id]]</div>
            <div class="flex-1">[[token.application]]</div>
            <div class="flex">[[token.deviceId]]</div>
            <div class="flex">[[token.deviceDescription]]</div>
            <div class="flex">[[token.permission]]</div>
            <div class="flex"><nuxeo-date datetime="[[token.creationDate]]"></nuxeo-date></div>
            <div class="actions">
              <paper-icon-button
                icon="icons:clear"
                title="[[i18n('authenticationTokensManagement.revoke')]]"
                on-tap="_revoke"
              >
              </paper-icon-button>
            </div>
          </div>
        </template>
      </div>
    </template>

    <paper-toast id="toast">[[i18n('authenticationTokensManagement.revoked')]]</paper-toast>
  `,is:"nuxeo-authentication-tokens-management",properties:{application:String,tokens:{type:Array,value:[]}},behaviors:[I18nBehavior],_params:e=>({application:e}),_handleTokens(e){this.tokens=e.detail.response.entries},_revoke(e){this.$.token.path=`/token/${e.model.token.id}`,this.$.token.remove().then(this.refresh.bind(this)).then((()=>{this.$.toast.open()}))},refresh(){return this.$.tokens.execute(this)},_empty:e=>!e.length,_formatDate:e=>moment(e).format("MMMM D, YYYY")});