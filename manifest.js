module.exports = {
    manifest: {
        js: {
            app: 'scripts/**/*.js',
            test: 'tests/**/*.js',
            bower: [
                // bower:js
                'bower_components/angular/angular.js',
                'bower_components/angular-cookies/angular-cookies.js',
                'bower_components/angular-sanitize/angular-sanitize.js',
                'bower_components/angular-animate/angular-animate.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js',
                'bower_components/oidc-token-manager/dist/oidc-token-manager.js',
                'bower_components/angular-permission/dist/angular-permission.js',
                'bower_components/angular-translate/angular-translate.js',
                'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                'bower_components/angular-messages/angular-messages.js',
                // endbower
            ]
        },
        css: ['styles/bootstrap.css', 'styles/app.css'],
        templates: 'templates/**/*.html'
    }
};