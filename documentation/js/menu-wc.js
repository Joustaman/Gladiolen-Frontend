'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">gladiolen-frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-874576f9a63673080584e1ae9578d0a8"' : 'data-target="#xs-components-links-module-AdminModule-874576f9a63673080584e1ae9578d0a8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-874576f9a63673080584e1ae9578d0a8"' :
                                            'id="xs-components-links-module-AdminModule-874576f9a63673080584e1ae9578d0a8"' }>
                                            <li class="link">
                                                <a href="components/AdminHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateGebruikerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateGebruikerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateVerenigingAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateVerenigingAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailGebruikerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailGebruikerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditGebruikerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditGebruikerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditVerenigingAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditVerenigingAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageEvenementenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageEvenementenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageGebruikersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageGebruikersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageVerenigingenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageVerenigingenComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-3cd506352dd84d8ca4f9e0343f1745e8"' : 'data-target="#xs-components-links-module-AppModule-3cd506352dd84d8ca4f9e0343f1745e8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-3cd506352dd84d8ca4f9e0343f1745e8"' :
                                            'id="xs-components-links-module-AppModule-3cd506352dd84d8ca4f9e0343f1745e8"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateLidComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateLidComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateVerenigingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateVerenigingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailVerenigingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailVerenigingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditVerenigingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditVerenigingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KeuzemenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KeuzemenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LedenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LedenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpinnerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MymaterialModule.html" data-type="entity-link">MymaterialModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link">AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VerenigingService.html" data-type="entity-link">VerenigingService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});