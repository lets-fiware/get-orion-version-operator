/*
 * get-orion-version
 * https://github.com/lets-fiware/get-orion-version-operator
 *
 * Copyright (c) 2019 Kazuhito Suda
 * Licensed under the MIT license.
 */

(function () {

    "use strict";

    var getOrionVersion = function getOrionVersion() {

        var ngsiServer = MashupPlatform.prefs.get('ngsi_server').trim();
        if (ngsiServer.substr(-1, 1) != '/') {
            ngsiServer += '/';
        }

        var request_headers = {};

        if (MashupPlatform.prefs.get('use_user_fiware_token')) {
            request_headers['FIWARE-OAuth-Token'] = 'true';
            request_headers['FIWARE-OAuth-Header-Name'] = 'Authorization';
        }

        if (MashupPlatform.prefs.get('use_owner_credentials')) {
            request_headers['FIWARE-OAuth-Source'] = 'workspaceowner';
        }


        var url = new URL('version', ngsiServer);

        MashupPlatform.http.makeRequest(url, {
            method: "GET",
            requestHeaders: request_headers,
            onSuccess: function (response) {
                if (response.status !== 200) {
                    throw new Error('Unexpected response from FIWARE Orion');
                }
                if (MashupPlatform.operator.outputs.output.connected) {
                    MashupPlatform.wiring.pushEvent("output", response.response);
                }
            },
            onFailure: function (response) {
                throw new Error('Unexpected response from FIWARE Orion');
            },
            onException: function (reason) {
                MashupPlatform.operator.log(reason);
            }
        });
    }

    MashupPlatform.prefs.registerCallback(function (new_preferences) {
        getOrionVersion();

    }.bind(this));

    getOrionVersion();

})();
