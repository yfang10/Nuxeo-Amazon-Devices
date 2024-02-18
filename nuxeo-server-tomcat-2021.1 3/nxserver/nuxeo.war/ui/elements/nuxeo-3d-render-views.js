import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";Polymer({_template:html`
    <style>
      :host {
        display: block;
      }

      .title {
        color: #213f7d;
        font-size: 1.64rem;
      }

      .render-views {
        @apply --layout-horizontal;
        @apply --layout-wrap;
      }

      .render-views > .item {
        @apply --layout-vertical;
        @apply --layout-center;
      }

      .render-views > .item label {
        color: #999;
      }

      .render-views > .item img {
        width: 200px;
      }
    </style>

    <p class="title">[[i18n('threeDViewLayout.renderViews.heading')]]</p>
    <template is="dom-if" if="{{_hasItems(document.properties.threed:renderViews)}}">
      <div class="render-views">
        <template is="dom-repeat" items="[[document.properties.threed:renderViews]]" as="renderView">
          <div class="item">
            <img src="[[renderView.thumbnail.data]]" on-tap="_setCoords" alt$="[[document.title]]" />
            <div>
              <label class="layout flex-2" id="label">[[renderView.title]]</label>
              <paper-icon-button
                icon="icons:file-download"
                on-tap="_downloadView"
                noink
                aria-labelledby="label"
              ></paper-icon-button>
              <paper-tooltip>[[i18n('threeDViewLayout.renderViews.download')]]</paper-tooltip>
            </div>
          </div>
        </template>
      </div>
    </template>
    <template is="dom-if" if="{{!_hasItems(document.properties.threed:renderViews)}}">
      <p>[[i18n('threeDViewLayout.renderViews.notAvailable')]]</p>
    </template>
  `,is:"nuxeo-3d-render-views",properties:{document:{type:Object,notify:!0}},behaviors:[I18nBehavior],_hasItems:e=>e.length>0,_setCoords(e){this.fire("3d-viewer-coords-change",{azimuth:e.model.renderView.azimuth,zenith:e.model.renderView.zenith})},_downloadView(e){window.location.href=e.model.renderView.content.data}});