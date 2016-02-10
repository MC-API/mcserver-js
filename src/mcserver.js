/*!
 * mcserver-js
 *
 * JavaScript library for interaction with mc-api.net server api
 *
 * Freely distributable under the MIT license.
 * Portions of mcserver-js are inspired by or borrowed from money.js and underscore.js
 */
(function(root) {
    var mcserver = {};
    mcserver.region = 'us';
    mcserver.ping = function(ip, port, cb) {
        if(typeof port == 'function') {
            cb = port;

            if(ip.indexOf(':') >= 0) {
                port = parseInt(ip.substr(':')[1]);
                ip = ip.substr(':')[0];
            } else {
                port = 25565;
            }
        } else {// port is not a function(cb)
            if(ip.indexOf(':') >= 0) {
                port = parseInt(ip.substr(':')[1]);
                ip = ip.substr(':')[0];
            }
        }

        if(typeof cb != 'function') {
            console.error('Undefined callback function for mcserver.ping');
        }

        var request = new XMLHttpRequest();
        request.open('GET', 'https://' + this.region + '.mc-api.net/v3/server/info/' + ip + (port == 25565 ? '' : ':' + port), true);

        request.onload = function() {
            if(this.status >= 200 && this.status < 400) {
                var data = JSON.parse(this.response);
                cb(data, null);
            } else {
                cb(null, this.response);
            }
        };

        request.onerror = function(err) {
            cb(null, err.target.status);
        };

        request.send();
    };


    /* --- Module Definition --- */

    // Export the mcserver object for CommonJS. If being loaded as an AMD module, define it as such.
    // Otherwise, just add `mcs` to the global object
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = mcserver;
        }
        exports.mcserver = mcserver;
    } else if (typeof define === 'function' && define.amd) {
        // Return the library as an AMD module:
        define([], function() {
            return mcserver;
        });
    } else {
        // Use mcserver.noConflict to restore `mcserver` back to its original value before mcserver-js loaded.
        // Returns a reference to the library's `mcserver` object; e.g. `var mcs = mcserver.noConflict();`
        mcserver.noConflict = (function(previous) {
            return function() {
                // Reset the value of the root's `mcserver` variable:
                root.mcserver = previous;
                // Delete the noConflict function:
                mcserver.noConflict = undefined;
                // Return reference to the library to re-assign it:
                return mcserver;
            };
        })(root.mcserver);

        // Declare `mcserver` on the root (global/window) object:
        root['mcserver'] = mcserver;
    }
}(this));