/* globals MockMP */

(function () {

    "use strict";

    describe("GetOrionVersion", function () {

        beforeAll(function () {
            window.MashupPlatform = new MockMP({
                type: 'operator',
                prefs: {
                    "ngsi_server": "http://orion.lab.fiware.org:1026/",
                    "use_user_fiware_token": true,
                    "use_owner_credentials": true
                },
                outputs: ['output']
            });
        });

        beforeEach(function () {
            MashupPlatform.reset();
            MashupPlatform.operator.outputs.output.connect({simulate: () => {}});
        });

        it("getOrionVersion url with slash", function () {
            MashupPlatform.prefs.set("ngsi_server", "http://orion.lab.fiware.org:1026/");
            MashupPlatform.http.addAnswer('GET', 'http://orion.lab.fiware.org:1026/version', 200,
                {'status':200, 'response':
                    {
                        "orion": {
                            "version": "2.2.0",
                            "uptime": "0 d, 1 h, 2 m, 37 s",
                            "git_hash": "5a46a70de9e0b809cce1a1b7295027eea0aa757f",
                            "compile_time": "Mon Feb 25 15:15:27 UTC 2019",
                            "compiled_by": "root",
                            "compiled_in": "37fdc92c3e97",
                            "release_date": "Mon Feb 25 15:15:27 UTC 2019",
                            "doc": "https://fiware-orion.rtfd.io/en/2.2.0/"
                        }
                    }
                }
            );

            getOrionVersion();

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', {
                "orion": {
                    "version": "2.2.0",
                    "uptime": "0 d, 1 h, 2 m, 37 s",
                    "git_hash": "5a46a70de9e0b809cce1a1b7295027eea0aa757f",
                    "compile_time": "Mon Feb 25 15:15:27 UTC 2019",
                    "compiled_by": "root",
                    "compiled_in": "37fdc92c3e97",
                    "release_date": "Mon Feb 25 15:15:27 UTC 2019",
                    "doc": "https://fiware-orion.rtfd.io/en/2.2.0/"
                }
            });
        });

        it("getOrionVersion url without slash", function () {
            MashupPlatform.prefs.set("ngsi_server", "http://orion.lab.fiware.org:1026");
            MashupPlatform.http.addAnswer('GET', 'http://orion.lab.fiware.org:1026/version', 200,
                {'status':200, 'response':
                    {
                        "orion": {
                            "version": "2.2.0",
                            "uptime": "0 d, 1 h, 2 m, 37 s",
                            "git_hash": "5a46a70de9e0b809cce1a1b7295027eea0aa757f",
                            "compile_time": "Mon Feb 25 15:15:27 UTC 2019",
                            "compiled_by": "root",
                            "compiled_in": "37fdc92c3e97",
                            "release_date": "Mon Feb 25 15:15:27 UTC 2019",
                            "doc": "https://fiware-orion.rtfd.io/en/2.2.0/"
                        }
                    }
                }
            );

            getOrionVersion();

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', {
                "orion": {
                    "version": "2.2.0",
                    "uptime": "0 d, 1 h, 2 m, 37 s",
                    "git_hash": "5a46a70de9e0b809cce1a1b7295027eea0aa757f",
                    "compile_time": "Mon Feb 25 15:15:27 UTC 2019",
                    "compiled_by": "root",
                    "compiled_in": "37fdc92c3e97",
                    "release_date": "Mon Feb 25 15:15:27 UTC 2019",
                    "doc": "https://fiware-orion.rtfd.io/en/2.2.0/"
                }
            });
        });

        it("getOrionVersion with user fiware token", function () {
            MashupPlatform.prefs.set("ngsi_server", "http://orion.lab.fiware.org:1026/");
            MashupPlatform.prefs.set("use_user_fiware_token", true);
            MashupPlatform.http.addAnswer('GET', 'http://orion.lab.fiware.org:1026/version', 200,
                {'status':200, 'response':
                    {
                        "orion": {
                            "version": "2.2.0",
                            "uptime": "0 d, 1 h, 2 m, 37 s",
                            "git_hash": "5a46a70de9e0b809cce1a1b7295027eea0aa757f",
                            "compile_time": "Mon Feb 25 15:15:27 UTC 2019",
                            "compiled_by": "root",
                            "compiled_in": "37fdc92c3e97",
                            "release_date": "Mon Feb 25 15:15:27 UTC 2019",
                            "doc": "https://fiware-orion.rtfd.io/en/2.2.0/"
                        }
                    }
                }
            );

            getOrionVersion();

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', {
                "orion": {
                    "version": "2.2.0",
                    "uptime": "0 d, 1 h, 2 m, 37 s",
                    "git_hash": "5a46a70de9e0b809cce1a1b7295027eea0aa757f",
                    "compile_time": "Mon Feb 25 15:15:27 UTC 2019",
                    "compiled_by": "root",
                    "compiled_in": "37fdc92c3e97",
                    "release_date": "Mon Feb 25 15:15:27 UTC 2019",
                    "doc": "https://fiware-orion.rtfd.io/en/2.2.0/"
                }
            });
        });

        it("getOrionVersion without user fiware token", function () {
            MashupPlatform.prefs.set("ngsi_server", "http://orion.lab.fiware.org:1026/");
            MashupPlatform.prefs.set("use_user_fiware_token", false);
            MashupPlatform.http.addAnswer('GET', 'http://orion.lab.fiware.org:1026/version', 200,
                {'status':200, 'response':
                    {
                        "orion": {
                            "version": "2.2.0",
                            "uptime": "0 d, 1 h, 2 m, 37 s",
                            "git_hash": "5a46a70de9e0b809cce1a1b7295027eea0aa757f",
                            "compile_time": "Mon Feb 25 15:15:27 UTC 2019",
                            "compiled_by": "root",
                            "compiled_in": "37fdc92c3e97",
                            "release_date": "Mon Feb 25 15:15:27 UTC 2019",
                            "doc": "https://fiware-orion.rtfd.io/en/2.2.0/"
                        }
                    }
                }
            );

            getOrionVersion();

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', {
                "orion": {
                    "version": "2.2.0",
                    "uptime": "0 d, 1 h, 2 m, 37 s",
                    "git_hash": "5a46a70de9e0b809cce1a1b7295027eea0aa757f",
                    "compile_time": "Mon Feb 25 15:15:27 UTC 2019",
                    "compiled_by": "root",
                    "compiled_in": "37fdc92c3e97",
                    "release_date": "Mon Feb 25 15:15:27 UTC 2019",
                    "doc": "https://fiware-orion.rtfd.io/en/2.2.0/"
                }
            });
        });

        it("getOrionVersion with user owner credentials", function () {
            MashupPlatform.prefs.set("ngsi_server", "http://orion.lab.fiware.org:1026/");
            MashupPlatform.prefs.set("use_owner_credentials", true);
            MashupPlatform.http.addAnswer('GET', 'http://orion.lab.fiware.org:1026/version', 200,
                {'status':200, 'response':
                    {
                        "orion": {
                            "version": "2.2.0",
                            "uptime": "0 d, 1 h, 2 m, 37 s",
                            "git_hash": "5a46a70de9e0b809cce1a1b7295027eea0aa757f",
                            "compile_time": "Mon Feb 25 15:15:27 UTC 2019",
                            "compiled_by": "root",
                            "compiled_in": "37fdc92c3e97",
                            "release_date": "Mon Feb 25 15:15:27 UTC 2019",
                            "doc": "https://fiware-orion.rtfd.io/en/2.2.0/"
                        }
                    }
                }
            );

            getOrionVersion();

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', {
                "orion": {
                    "version": "2.2.0",
                    "uptime": "0 d, 1 h, 2 m, 37 s",
                    "git_hash": "5a46a70de9e0b809cce1a1b7295027eea0aa757f",
                    "compile_time": "Mon Feb 25 15:15:27 UTC 2019",
                    "compiled_by": "root",
                    "compiled_in": "37fdc92c3e97",
                    "release_date": "Mon Feb 25 15:15:27 UTC 2019",
                    "doc": "https://fiware-orion.rtfd.io/en/2.2.0/"
                }
            });
        });

        it("getOrionVersion without user owner credentials", function () {
            MashupPlatform.prefs.set("ngsi_server", "http://orion.lab.fiware.org:1026/");
            MashupPlatform.prefs.set("use_owner_credentials", false);
            MashupPlatform.http.addAnswer('GET', 'http://orion.lab.fiware.org:1026/version', 200,
                {'status':200, 'response':
                    {
                        "orion": {
                            "version": "2.2.0",
                            "uptime": "0 d, 1 h, 2 m, 37 s",
                            "git_hash": "5a46a70de9e0b809cce1a1b7295027eea0aa757f",
                            "compile_time": "Mon Feb 25 15:15:27 UTC 2019",
                            "compiled_by": "root",
                            "compiled_in": "37fdc92c3e97",
                            "release_date": "Mon Feb 25 15:15:27 UTC 2019",
                            "doc": "https://fiware-orion.rtfd.io/en/2.2.0/"
                        }
                    }
                }
            );

            getOrionVersion();

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', {
                "orion": {
                    "version": "2.2.0",
                    "uptime": "0 d, 1 h, 2 m, 37 s",
                    "git_hash": "5a46a70de9e0b809cce1a1b7295027eea0aa757f",
                    "compile_time": "Mon Feb 25 15:15:27 UTC 2019",
                    "compiled_by": "root",
                    "compiled_in": "37fdc92c3e97",
                    "release_date": "Mon Feb 25 15:15:27 UTC 2019",
                    "doc": "https://fiware-orion.rtfd.io/en/2.2.0/"
                }
            });
        });

        it("getOrionVersion fail", function () {
            MashupPlatform.http.addAnswer('GET', 'http://orion.lab.fiware.org:1026/version', 200,
                {
                    'request': '',
                    'response': '',
                    'responseText': '',
                    'responseXML': '',
                    'status': 204,
                    'statusText': '',
                    'transport': ''
                }
            );

            getOrionVersion();

            expect(MashupPlatform.operator.log).toHaveBeenCalledWith({ status: 204, statusText: '' });
            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', '');
        });

        it("getOrionVersion illegal url", function () {
            MashupPlatform.http.addAnswer('GET', 'http://orion.lab.fiware.org:1026/', 500,
                {
                    'request': '',
                    'response': '',
                    'responseText': '',
                    'responseXML': '',
                    'status': 500,
                    'statusText': '',
                    'transport': ''
                }
            );

            getOrionVersion();

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', {
                'request': undefined,
                'response': undefined,
                'responseText': undefined,
                'responseXML': undefined,
                'status': undefined,
                'statusText': undefined,
                'transport': undefined
            });
        });

        it("output endoint is not connected", function () {
            MashupPlatform.operator.outputs.output.disconnect();
            MashupPlatform.http.addAnswer('GET', 'http://orion.lab.fiware.org:1026/version', 200,
                {'status':200, 'response':
                    {
                        "orion": {
                            "version": "2.2.0",
                            "uptime": "0 d, 1 h, 2 m, 37 s",
                            "git_hash": "5a46a70de9e0b809cce1a1b7295027eea0aa757f",
                            "compile_time": "Mon Feb 25 15:15:27 UTC 2019",
                            "compiled_by": "root",
                            "compiled_in": "37fdc92c3e97",
                            "release_date": "Mon Feb 25 15:15:27 UTC 2019",
                            "doc": "https://fiware-orion.rtfd.io/en/2.2.0/"
                        }
                    }
                }
            );

            getOrionVersion();

            expect(MashupPlatform.wiring.pushEvent).not.toHaveBeenCalled();
        });
    });
})();
