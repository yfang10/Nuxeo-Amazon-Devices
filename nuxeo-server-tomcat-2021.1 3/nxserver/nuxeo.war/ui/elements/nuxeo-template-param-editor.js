import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{dom}from"@polymer/polymer/lib/legacy/polymer.dom.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import{FormatBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-format-behavior.js";const serializer=new XMLSerializer,parser=new DOMParser;Polymer({_template:html`
    <style include="nuxeo-styles">
      :host {
        display: inline-block;
      }

      .container {
        padding: 1em 1.5em 2em 1.5em;
      }

      .buttons {
        @apply --buttons-bar;
        @apply --layout-horizontal;
        @apply --layout-end-justified;
      }

      #form {
        margin: 0;
        padding: 0;
      }

      #submitButton {
        display: none;
      }

      #editParamDialog paper-checkbox {
        margin-left: 8px;
      }

      /*
       * Not using mixin --paper-icon-button-disabled because: https://github.com/Polymer/polymer/issues/3205
       */
      paper-icon-button[disabled] {
        visibility: hidden;
      }

      .signature + .signature {
        margin-top: 6px;
        padding-top: 6px;
      }

      div[name='edit'] .signature + .signature,
      .signatureFooter {
        border-top: 1px solid var(--nuxeo-border);
      }

      .signature label {
        font-weight: bold;
      }

      .heading {
        font-size: 16px;
        color: var(--nuxeo-text-default);
        margin-top: 16px;
      }

      .deleted {
        color: var(--disabled-text-color);
      }

      .edited {
        font-weight: 900;
      }

      .horizontal-layout {
        @apply --layout-center;
        @apply --layout-horizontal;
        @apply --layout-flex;
      }

      .start-justified {
        @apply --layout-start-justified;
      }

      .justified {
        @apply --layout-justified;
      }

      .end-justified {
        @apply --layout-end-justified;
      }

      .vertical {
        @apply --layout-vertical;
      }

      .flex {
        @apply --layout-flex;
      }
    </style>

    <iron-pages selected="[[mode]]" attr-for-selected="name" class="vertical flex">
      <div name="view">
        <div class="horizontal-layout signature justified" hidden$="[[!_hasParams(params)]]">
          <div class="horizontal-layout start-justified">
            <label>[[i18n('templateRenderingPage.parameters.name')]]</label>
          </div>
          <div class="horizontal-layout start-justified">
            <label>[[i18n('templateRenderingPage.parameters.type')]]</label>
          </div>
          <div class="horizontal-layout start-justified">
            <label>[[i18n('templateRenderingPage.parameters.value')]]</label>
          </div>
        </div>
        <template is="dom-repeat" items="[[_getParams(params)]]" as="param">
          <div class="horizontal-layout signature justified">
            <div class="horizontal-layout start-justified">
              <span>[[_getParamAttribute(param, 'name', params)]]</span>
            </div>
            <div class="horizontal-layout start-justified">
              <span>[[_getParamTypeTranslated(param, params)]]</span>
            </div>
            <div class="horizontal-layout start-justified">
              <span>[[_getParamValueWithLoop(param, params)]]</span>
            </div>
          </div>
        </template>
      </div>
      <div name="edit">
        <div class="horizontal-layout signature start-justified">
          <div class="horizontal-layout start-justified">
            <label>[[i18n('templateRenderingPage.parameters.name')]]</label>
          </div>
          <div class="horizontal-layout start-justified">
            <label>[[i18n('templateRenderingPage.parameters.type')]]</label>
          </div>
          <div class="horizontal-layout start-justified">
            <label>[[i18n('templateRenderingPage.parameters.value')]]</label>
          </div>
          <div class="horizontal-layout start-justified"></div>
        </div>
        <template is="dom-repeat" items="[[_getParams(params)]]" as="param">
          <div class$="horizontal-layout signature justified [[_formatSignature(param, params)]]">
            <div class="horizontal-layout start-justified">
              <span>[[_getParamAttribute(param, 'name', params)]]</span>
            </div>
            <div class="horizontal-layout start-justified">
              <span>[[_getParamTypeTranslated(param, params)]]</span>
            </div>
            <div class="horizontal-layout start-justified">
              <span>[[_getParamValueWithLoop(param, params)]]</span>
            </div>
            <div class="horizontal-layout end-justified">
              <paper-icon-button
                id="[[_computeBtnId(param, 'edit')]]"
                icon="icons:create"
                on-tap="_editParam"
                disabled="[[!_canEdit(param, params)]]"
                aria-labelledby="editTooltip"
              ></paper-icon-button>
              <paper-tooltip for="[[_computeBtnId(param, 'edit')]]" id="editTooltip"
                >[[i18n('templateRenderingPage.parameters.edit.tooltip')]]</paper-tooltip
              >
              <div hidden$="[[!allowDelete]]">
                <paper-icon-button
                  id="[[_computeBtnId(param, 'remove')]]"
                  icon="icons:delete"
                  on-tap="_deleteParam"
                  disabled="[[!_canEdit(param, params)]]"
                  aria-labelledby="removeTooltip"
                ></paper-icon-button>
                <paper-tooltip for="[[_computeBtnId(param, 'remove')]]" id="removeTooltip"
                  >[[i18n('templateRenderingPage.parameters.remove.tooltip')]]</paper-tooltip
                >
              </div>
            </div>
          </div>
        </template>
        <div class="horizontal-layout end-justified signatureFooter" hidden$="[[!allowCreate]]">
          <paper-icon-button
            id="addParamBtn"
            icon="icons:add-circle"
            on-tap="_addParam"
            aria-labelledby="addParametersTooltip"
          ></paper-icon-button>
          <paper-tooltip for="addParamBtn" id="addParametersTooltip"
            >[[i18n('templateRenderingPage.parameters.add.tooltip')]]</paper-tooltip
          >
        </div>
      </div>
    </iron-pages>

    <nuxeo-dialog id="editParamDialog" modal>
      <iron-form id="form" on-iron-form-submit="_submitSaveParam">
        <form class="vertical flex">
          <div class="container vertical">
            <span class="heading">[[i18n('templateRenderingPage.editParamDialog.heading')]]</span>
            <paper-input
              label="[[i18n('templateRenderingPage.editParamDialog.paramName.label')]]"
              pattern="[[_computeParamNamePattern(param, params)]]"
              error-message="[[i18n('templateRenderingPage.editParamDialog.paramName.error')]]"
              value="{{selectedParamProperties.name}}"
              auto-validate
              always-float-label
              required
            ></paper-input>

            <paper-dropdown-menu label="[[i18n('templateRenderingPage.parameters.type')]]" always-float-label>
              <paper-listbox
                slot="dropdown-content"
                selected="{{selectedParamProperties.type}}"
                attr-for-selected="name"
              >
                <template is="dom-repeat" items="[[paramTypes]]">
                  <paper-item name="[[item]]">[[_getParamTypeLabel(item)]]</paper-item>
                </template>
              </paper-listbox>
            </paper-dropdown-menu>

            <template is="dom-if" if="[[_isSelectedParamType('String', selectedParamProperties.type)]]">
              <paper-textarea
                label="[[i18n('templateRenderingPage.parameters.value')]]"
                value="{{selectedParamProperties.value}}"
                always-float-label
              ></paper-textarea>
            </template>
            <template is="dom-if" if="[[_isSelectedParamType('Boolean', selectedParamProperties.type)]]">
              <div class="horizontal-layout">
                <label>[[i18n('templateRenderingPage.parameters.value')]]</label>
                <paper-checkbox checked="{{selectedParamProperties.value}}"></paper-checkbox>
              </div>
            </template>
            <template is="dom-if" if="[[_isSelectedParamType('Date', selectedParamProperties.type)]]">
              <div class="horizontal-layout">
                <nuxeo-date-picker
                  label="[[i18n('templateRenderingPage.parameters.value')]]"
                  value="{{selectedParamProperties.value}}"
                >
                </nuxeo-date-picker>
              </div>
            </template>
            <template is="dom-if" if="[[_isSelectedParamType('source', selectedParamProperties.type)]]">
              <div class="vertical">
                <paper-input
                  label="[[i18n('templateRenderingPage.parameters.xpath')]]"
                  value="{{selectedParamProperties.value}}"
                  always-float-label
                ></paper-input>
                <div class="horizontal-layout">
                  <label>[[i18n('templateRenderingPage.parameters.autoloop')]]</label>
                  <paper-checkbox checked="{{selectedParamProperties.loop}}"></paper-checkbox>
                </div>
              </div>
            </template>
            <template is="dom-if" if="[[_isSelectedParamType('picture', selectedParamProperties.type)]]">
              <div class="vertical">
                <paper-input
                  label="[[i18n('templateRenderingPage.parameters.xpath')]]"
                  value="{{selectedParamProperties.value}}"
                  always-float-label
                ></paper-input>
                <div class="horizontal-layout">
                  <label>[[i18n('templateRenderingPage.parameters.autoloop')]]</label>
                  <paper-checkbox checked="{{selectedParamProperties.loop}}"></paper-checkbox>
                </div>
              </div>
            </template>
            <template is="dom-if" if="[[_isSelectedParamType('content', selectedParamProperties.type)]]">
              <paper-dropdown-menu label="[[i18n('templateRenderingPage.parameters.source')]]" always-float-label>
                <paper-listbox
                  slot="dropdown-content"
                  selected="{{selectedParamProperties.contentType}}"
                  attr-for-selected="name"
                >
                  <template is="dom-repeat" items="[[contentTypes]]">
                    <paper-item name="[[item]]">[[_getContentTypeLabel(item)]]</paper-item>
                  </template>
                </paper-listbox>
              </paper-dropdown-menu>
              <template is="dom-if" if="[[_isSelectedContentTypeXPath(selectedParamProperties.contentType)]]">
                <paper-input
                  label="[[i18n('templateRenderingPage.paramType.content.xpath')]]"
                  value="{{selectedParamProperties.value}}"
                  always-float-label
                ></paper-input>
              </template>
            </template>
          </div>
          <div class="buttons">
            <div class="flex start-justified">
              <paper-button noink dialog-dismiss on-tap="_cancel" class="secondary"
                >[[i18n('command.cancel')]]</paper-button
              >
            </div>
            <paper-button noink class="primary" on-tap="_save" disabled$="[[!_isValid(collection)]]">
              [[i18n('command.save')]]
            </paper-button>
          </div>
        </form>
      </iron-form>
    </nuxeo-dialog>
  `,is:"nuxeo-template-param-editor",behaviors:[I18nBehavior,FormatBehavior],properties:{templateData:{type:String,observer:"_readTemplateParams"},mode:{type:String,value:"view"},params:Object,param:Object,paramTypes:{type:Array,value:["String","Boolean","Date","source","picture","content"]},contentTypes:{type:Array,value:["htmlPreview","blobContent","xpath"]},selectedParamProperties:{type:Object,value:{name:"",type:"",loop:"",value:"",contentType:""}},allowDelete:{type:Boolean,value:!1},allowCreate:{type:Boolean,value:!1}},generateTemplateData(){return serializer.serializeToString(this.params.node)},reset(){this._readTemplateParams()},commitChanges(){this._getParams().forEach((e=>{const a=this._getParamAttribute(e,"change");a&&("deleted"===a&&this.params.querySelector("templateParams").removeChild(e),this._removeParamAttribute(e,"change"))}))},_templateDataChanged(){this._readTemplateParams()},_getParamTypeLabel(e){return this.i18n(`templateRenderingPage.paramType.${e}`)},_getContentTypeLabel(e){return this.i18n(`templateRenderingPage.paramType.content.${e}`)},_readTemplateParams(){this.set("params",dom(parser.parseFromString(this.templateData?this.templateData:'<nxdt:templateParams xmlns:nxdt="http://www.nuxeo.org/DocumentTemplate"/>',"text/xml")))},_getParams(){return this.params?this.params.querySelectorAll("templateParams field"):[]},_hasParams(){return this._getParams().length>0},_getParamAttribute:(e,a)=>e?e.getAttribute(a):"",_setParamAttribute(e,a,t){e.setAttribute(a,t)},_removeParamAttribute(e,a){e.removeAttribute(a)},_checkParamAttribute(e,a,t){return this._getParamAttribute(e,a)===t},_getParamValue(e){switch(this._getParamAttribute(e,"type")){case"source":case"picture":case"content":return this._getParamAttribute(e,"source");default:return this._getParamAttribute(e,"value")}},_setParamValue(e,a){switch(this._getParamAttribute(e,"type")){case"source":case"picture":case"content":this._setParamAttribute(e,"source",a);break;default:this._setParamAttribute(e,"value",a)}},_getParamTypeTranslated(e){return this._getParamTypeLabel(this._getParamAttribute(e,"type"))},_getParamValueWithLoop(e){const a=this._getParamAttribute(e,"autoloop");return this._getParamValue(e)+(a?` (${this.i18n("templateRenderingPage.parameters.autoloop")})`:"")},_refreshParams(){const{params:e}=this;this.set("params",null),this.set("params",e)},_deleteParam(e){this._setParamAttribute(e.model.param,"change","deleted"),this._refreshParams()},_loadEditParamDialog(e){this.set("param",e),this.set("selectedParamProperties.name",this._getParamAttribute(this.param,"name")),this.set("selectedParamProperties.type",this._getParamAttribute(this.param,"type"));const a=this._getParamAttribute(this.param,"autoloop");this.set("selectedParamProperties.loop",!(!a||"false"===a));let t=this._getParamValue(this.param);"Date"===this.selectedParamProperties.type?t=this.formatDate(t,"yyyy-MM-ddTHH:mm:ss"):"Boolean"===this.selectedParamProperties.type&&(t=!(!t||"false"===t)),"content"===this.selectedParamProperties.type?"htmlPreview"!==t&&"blobContent"!==t?this.set("selectedParamProperties.contentType","xpath"):(this.set("selectedParamProperties.contentType",t),t=""):this.set("selectedParamProperties.contentType","htmlPreview"),this.set("selectedParamProperties.value",t)},_editParam(e){this._loadEditParamDialog(e.model.param),this.$.editParamDialog.toggle()},_addParam(){this.new=!0,this.param=document.createElementNS("http://www.nuxeo.org/DocumentTemplate","nxdt:field"),this._setParamAttribute(this.param,"name",""),this._setParamAttribute(this.param,"type","String"),this._setParamAttribute(this.param,"value",""),this._loadEditParamDialog(this.param),this.$.editParamDialog.toggle()},_save(){this.$.form.submit()},_cancel(){this.new=!1},_submitSaveParam(){this._setParamAttribute(this.param,"name",this.selectedParamProperties.name),this._setParamAttribute(this.param,"type",this.selectedParamProperties.type),"source"!==this.selectedParamProperties.type&&"picture"!==this.selectedParamProperties.type||!0!==this.selectedParamProperties.loop?this._removeParamAttribute(this.param,"autoloop"):this._setParamAttribute(this.param,"autoloop",this.selectedParamProperties.loop),"Date"===this.selectedParamProperties.type?this._setParamValue(this.param,this.formatDate(this.selectedParamProperties.value,"yyyy-MM-dd HH:mm:ss.SSS")):"content"===this.selectedParamProperties.type&&"xpath"!==this.selectedParamProperties.contentType?this._setParamValue(this.param,this.selectedParamProperties.contentType):this._setParamValue(this.param,this.selectedParamProperties.value),this.new&&(this.params.querySelector("templateParams").appendChild(this.param),this.new=!1),this._setParamAttribute(this.param,"change","edited"),this._refreshParams(),this.$.editParamDialog.toggle()},_computeBtnId:(e,a)=>`${a}_btn_${e.attributes.item("name").value}`,_computeParamNamePattern(){const e=this._getParams();return e&&e.length>0&&Array.from(this._getParams()).filter((e=>this._getParamAttribute(e,"name")!==this._getParamAttribute(this.param,"name"))).length>0?`^((?!(${Array.from(this._getParams()).filter((e=>this._getParamAttribute(e,"name")!==this._getParamAttribute(this.param,"name"))).map((e=>`^${this._getParamAttribute(e,"name")}$`)).join("|")})).)*$`:".*"},_isSelectedParamType(e){return this.selectedParamProperties.type===e},_isSelectedContentTypeXPath:e=>"htmlPreview"!==e&&"blobContent"!==e,_formatSignature(e){return this._getParamAttribute(e,"change")||""},_canEdit(e){return"deleted"!==this._getParamAttribute(e,"change")}});