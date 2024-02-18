import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";Polymer({_template:html`
    <style include="iron-flex iron-flex-alignment iron-flex-factors nuxeo-styles">
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

      paper-button {
        line-height: normal;
      }

      .platform {
        background-color: #50c3f0;
        border-radius: 3px;
        color: #fff;
        font-size: 0.9em;
        letter-spacing: 0.04em;
        line-height: 130%;
        margin: 0 0.2em 0.2em 0;
        padding: 0.06em 0.3em;
        vertical-align: baseline;
        white-space: nowrap;
      }
    </style>

    <nuxeo-connection platform-version="{{_tp}}"></nuxeo-connection>

    <div class="table">
      <div class="header">
        <div class="cell flex">[[i18n('driveDesktopPackages.platform')]]</div>
        <div class="cell flex-3">[[i18n('driveDesktopPackages.install')]]</div>
      </div>
      <template is="dom-repeat" items="[[packages]]" as="pkg">
        <div class="row">
          <div class="cell flex"><span class="platform">[[pkg.platform]]</span></div>
          <div class="cell flex-3">
            <a href$="[[pkg.url]]" tabindex="-1" target="_blank">
              <paper-button noink>
                [[pkg.name]]
              </paper-button>
            </a>
          </div>
        </div>
      </template>
    </div>
  `,is:"nuxeo-drive-desktop-packages",properties:{packages:{type:Array,computed:"_computeUrls(_tp)"},_tp:String},behaviors:[I18nBehavior],_computeUrls(e){if(!e)return;const o=[],r="nuxeo-drive",a="https://community.nuxeo.com/static/drive-updates";let l=`${r}-x86_64.AppImage`;return o.push({name:l,platform:"Linux",url:`${a}/${l}`}),l=`${r}.dmg`,o.push({name:l,platform:"macOS",url:`${a}/${l}`}),l=`${r}.exe`,o.push({name:l,platform:"Windows",url:`${a}/${l}`}),o}});