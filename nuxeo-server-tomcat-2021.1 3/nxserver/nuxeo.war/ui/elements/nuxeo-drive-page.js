import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import"./nuxeo-authentication-tokens-management.js";import"./nuxeo-drive-sync-roots-management.js";import"./nuxeo-drive-desktop-packages.js";Polymer({_template:html`
    <style include="nuxeo-styles"></style>
    <nuxeo-page>
      <div class="header">[[i18n('drivePage.heading')]]</div>
      <div class="content">
        <nuxeo-card heading="[[i18n('drivePage.packages')]]">
          <nuxeo-drive-desktop-packages></nuxeo-drive-desktop-packages>
        </nuxeo-card>
        <nuxeo-card heading="[[i18n('drivePage.roots')]]">
          <nuxeo-drive-sync-roots-management></nuxeo-drive-sync-roots-management>
        </nuxeo-card>
        <nuxeo-card heading="[[i18n('drivePage.tokens')]]">
          <nuxeo-authentication-tokens-management application="Nuxeo Drive"></nuxeo-authentication-tokens-management>
        </nuxeo-card>
      </div>
    </nuxeo-page>
  `,is:"nuxeo-drive-page",behaviors:[I18nBehavior]});