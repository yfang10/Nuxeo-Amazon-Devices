import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import"@nuxeo/nuxeo-elements/nuxeo-document.js";import{NotifyBehavior}from"@nuxeo/nuxeo-elements/nuxeo-notify-behavior.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import"./nuxeo-3d-viewer.js";Polymer({_template:html`
    <style>
      :host {
        display: block;
      }

      nuxeo-3d-viewer {
        width: 100%;
        height: 40vh;
      }

      .title {
        color: #213f7d;
        font-size: 1.64rem;
      }

      .flex {
        font-size: 12px;
        margin: auto;
      }
    </style>

    <nuxeo-document id="doc" doc-id="[[document.uid]]"></nuxeo-document>

    <template is="dom-if" if="{{document.properties.file:content}}">
      <template is="dom-if" if="{{_hasItems(document.properties.threed:transmissionFormats)}}">
        <nuxeo-3d-viewer id="threedViewer" src="[[document.properties.threed:transmissionFormats.0.content.data]]">
        </nuxeo-3d-viewer>
      </template>
      <template is="dom-if" if="{{!_hasItems(document.properties.threed:transmissionFormats)}}">
        <p>[[i18n('threeDViewLayout.transmissionFormats.notAvailable')]]</p>
      </template>
    </template>
    <template is="dom-if" if="{{!document.properties.file:content}}">
      <nuxeo-dropzone value="{{document.properties.file:content}}"></nuxeo-dropzone>
    </template>
    <div class="horizontal layout center">
      <template is="dom-if" if="[[document.properties.file:content]]">
        <p class="title">
          <a href="[[document.properties.file:content.data]]">[[document.title]]</a>
        </p>
        <div class="horizontal flex end-justified layout">
          <nuxeo-delete-blob-button document="{{document}}" xpath="file:content"></nuxeo-delete-blob-button>
        </div>
      </template>
      <template is="dom-if" if="[[!document.properties.file:content]]">
        <p class="title">
          <span>[[document.title]]</span>
        </p>
      </template>
    </div>
  `,is:"nuxeo-3d-preview",properties:{document:{type:Object,notify:!0}},behaviors:[NotifyBehavior,I18nBehavior],created(){this._createMethodObserver("_valueChanged(document.properties.file:content)",!0)},_valueChanged(e){if(!e||e.data)return;const t={};t["file:content"]=this.document.properties["file:content"],this.$.doc.data={"entity-type":"document",repository:this.document.repository,uid:this.document.uid,properties:t},this.$.doc.put().then((e=>{this.document=e,this.notify({message:this.i18n(this.uploadedMessage)}),this.fire("document-updated")}))},_hasItems:e=>e.length>0});