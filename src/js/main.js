/*
 * get-orion-version
 * https://github.com/lets-fiware/get-orion-version-operator
 *
 * Copyright (c) 2019-2024 Kazuhito Suda
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
                    MashupPlatform.operator.log({'status': response.status, 'statusText': response.statusText});
                }
                pushEvent(response.response);
            },
            onFailure: function (response) {
                pushEvent(mkMsg(response));
            }
        });
    }

    var mkMsg = function (response) {
        var msg = {};

        msg.request = response.request;
        msg.response = response.response;
        msg.responseText = response.responseText;
        msg.responseXML = response.responseXML;
        msg.status = response.status;
        msg.statusText = response.statusText;
        msg.transport = response.transport;

        return msg;
    }

    var pushEvent = function pushEvent(data) {
        if (MashupPlatform.operator.outputs.output.connected) {
            MashupPlatform.wiring.pushEvent("output", data);
        }
    }

    /* TODO
     * this if is required for testing, but we have to search a cleaner way
     */
    if (window.MashupPlatform != null) {
        MashupPlatform.prefs.registerCallback(function (new_preferences) {
            getOrionVersion();
        }.bind(this));

        getOrionVersion();
    }

    /* test-code */
    window.getOrionVersion = getOrionVersion;
    /* end-test-code */

})();
