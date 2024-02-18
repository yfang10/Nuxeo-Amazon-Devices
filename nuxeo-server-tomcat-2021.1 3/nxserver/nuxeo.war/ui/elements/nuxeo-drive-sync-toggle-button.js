import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import{FiltersBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-filters-behavior.js";let roots;Polymer({_template:html`
    <style include="nuxeo-action-button-styles">
      ::slotted(iron-icon:hover) {
        fill: var(--nuxeo-link-hover-color);
      }

      :host([synchronized]) ::slotted(iron-icon) {
        fill: var(--icon-toggle-pressed-color, --nuxeo-action-color-activated);
      }
    </style>

    <nuxeo-operation auto op="NuxeoDrive.GetRoots" on-response="_handleRoots"></nuxeo-operation>
    <nuxeo-operation id="op" op="NuxeoDrive.SetSynchronization" input="[[document.uid]]"></nuxeo-operation>

    <template is="dom-if" if="[[_isAvailable(document, synchronizationRoot)]]">
      <div class="action" on-tap="toggle">
        <paper-icon-button id="syncBut" icon="[[_icon(synchronized)]]" aria-labelledby="label"></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
        <nuxeo-tooltip>[[_label]]</nuxeo-tooltip>
      </div>
    </template>
  `,is:"nuxeo-drive-sync-toggle-button",behaviors:[I18nBehavior,FiltersBehavior],properties:{document:{type:Object,observer:"_update"},synchronized:{type:Boolean,notify:!0,reflectToAttribute:!0},synchronizationRoot:String,showLabel:{type:Boolean,reflectToAttribute:!0,value:!1},_label:{type:String,computed:"_computeLabel(synchronized, i18n)"}},toggle(){const o=!this.synchronized;return this.$.op.params={enable:!this.synchronized},this.$.op.execute().then((()=>{const e=roots.indexOf(this.document.uid);o&&-1===e?roots.push(this.document.uid):o||-1===e||roots.splice(e,1),this.synchronized=o}))},_isAvailable(){if(!this.document)return!1;if(this.isVersion(this.document))return!1;const o=-1!==["Domain","SectionRoot","TemplateRoot","WorkspaceRoot","Forum","Collections"].indexOf(this.document.type),e=(this.hasFacet(this.document,"Collection")||this.hasFacet(this.document,"Folderish"))&&!this.isTrashed(this.document);return!o&&e&&!this.synchronizationRoot},_computeLabel(o){return o?this.i18n("driveSyncToggleButton.unsync","Unsynchronize"):this.i18n("driveSyncToggleButton.sync","Synchronize")},_icon:o=>o?"notification:sync-disabled":"notification:sync",_update(){if(!this.document||!roots)return;this.synchronized=-1!==roots.indexOf(this.document.uid);const o=this.document.contextParameters.breadcrumb.entries;for(let e=o.length-1;e>=0;e--)if(-1!==roots.indexOf(o[e].parentRef))return void(this.synchronizationRoot=o[e].parentRef);this.synchronizationRoot=null},_handleRoots(o){roots=o.detail.response.entries.map((o=>o.uid)),this._update()}});