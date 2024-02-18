import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";Polymer({_template:html`
    <style>
      :host {
        display: block;
      }

      .title {
        color: #213f7d;
        font-size: 1.64rem;
      }

      .flex {
        font-size: 12px;
        margin: auto;
      }

      .format {
        display: inline-block;
        width: 100%;
      }

      .format-name {
        float: left;
        width: 25%;
      }

      .format-info {
        float: left;
        height: 100%;
        width: 65%;
      }

      .format-polygons {
        height: 50%;
        display: flex;
      }

      .format-textures {
        height: 50%;
        display: flex;
      }

      .format-buttons {
        float: left;
        width: 8%;
        display: flex;
      }

      .format-info-element {
        float: left;
      }
    </style>

    <p class="title">[[i18n('threeDViewLayout.transmissionFormats.heading')]]</p>
    <template is="dom-if" if="{{_hasItems(document.properties.threed:transmissionFormats)}}">
      <div class="transmission-formats">
        <template is="dom-repeat" items="[[document.properties.threed:transmissionFormats]]" as="format">
          <div class="format">
            <div class="format-name">
              <label class="layout flex-2">[[format.name]]</label>
            </div>
            <div class="format-info">
              <div class="format-polygons item">
                <iron-icon class="format-info-element" icon="image:details"></iron-icon>
                <span class="layout flex format-info-element">[[_getPolyInfo(format)]]</span>
                <template class="format-info-element" is="dom-if" if="{{format.info.geometry_lod_success}}">
                  <iron-icon icon="icons:done"></iron-icon>
                </template>
                <template class="format-info-element" is="dom-if" if="{{!format.info.geometry_lod_success}}">
                  <iron-icon icon="icons:warning"></iron-icon>
                </template>
                <span class="layout flex format-info-element"
                  >[[_getPolyNumber(format)]] [[i18n('threeDViewLayout.unit.polygons')]]</span
                >
              </div>
              <div class="format-textures item">
                <template is="dom-if" if="{{_hasTextures(format)}}">
                  <iron-icon class="format-info-element" icon="image:image"></iron-icon>
                  <span class="layout flex format-info-element">[[_getTexInfo(format)]]</span>
                  <template class="format-info-element" is="dom-if" if="{{format.info.texture_lod_success}}">
                    <iron-icon icon="icons:done"></iron-icon>
                  </template>
                  <template class="format-info-element" is="dom-if" if="{{!format.info.texture_lod_success}}">
                    <iron-icon icon="icons:warning"></iron-icon>
                  </template>
                  <span class="layout flex format-info-element">[[_getTexSize(format)]]</span>
                </template>
              </div>
            </div>
            <div class="format-buttons">
              <div>
                <paper-icon-button
                  icon="icons:visibility"
                  on-tap="_loadFormat"
                  noink
                  aria-labelledby="previewTooltip"
                ></paper-icon-button>
                <paper-tooltip id="previewTooltip"
                  >[[i18n('threeDViewLayout.transmissionFormats.preview')]]</paper-tooltip
                >
              </div>
              <div>
                <paper-icon-button
                  icon="icons:file-download"
                  on-tap="_downloadFormat"
                  noink
                  aria-labelledby="downloadTooltip"
                ></paper-icon-button>
                <paper-tooltip id="downloadTooltip"
                  >[[i18n('threeDViewLayout.transmissionFormats.download')]]</paper-tooltip
                >
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
    <template is="dom-if" if="{{!_hasItems(document.properties.threed:transmissionFormats)}}">
      <p>[[i18n('threeDViewLayout.transmissionFormats.notAvailable')]]</p>
    </template>
  `,is:"nuxeo-3d-transmission-formats",properties:{document:{type:Object,notify:!0}},behaviors:[I18nBehavior],_hasItems:e=>e.length>0,_formatAsReadable(e,o,t){if((e=Number(e))<o)return`${e} ${t}`;const i=parseInt(Math.log(e)/Math.log(o),0),a=String("kMGTPE".charAt(i-1));return`${Math.round(e/o**i*10)/10} ${a}${t}`},_getPolyInfo(e){const o=null==e.percPoly?"":`${e.percPoly} %`,t=null==e.maxPoly?"":`< ${this._formatAsReadable(e.maxPoly,1e3,"")}`;return null!=e.percPoly&&null!=e.maxPoly?`${o} | ${t}`:o+t},_getPolyNumber(e){return this._formatAsReadable(e.info.polygons,1e3,"")},_hasTextures:e=>e.info.textures_size>0,_getTexInfo(e){const o=null==e.percTex?"":`${e.percTex} %`,t=null==e.maxTex?"":`< ${e.maxTex}`;return null!=e.percTex&&null!=e.maxTex?`${o} | ${t}`:o+t},_getTexSize(e){return this._hasTextures(e)?this._formatAsReadable(e.info.textures_size,1024,"B"):null},_loadFormat(e){this.fire("3d-viewer-content-change",{content:e.model.format.content.data})},_downloadFormat(e){window.location.href=e.model.format.content.data}});