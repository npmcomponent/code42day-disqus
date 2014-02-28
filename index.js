var load = require('code42day-load');
var dataset = require('code42day-dataset');

function setParam(key, value) {
  if (value) {
    if (key === 'developer') {
       value = parseInt(value, 10);
    }
    window['disqus_' + key] = value;
  }
}

function forEachParam(fn) {
  var params = [
    'shortname',
    'identifier',
    'title',
    'url',
    'developer'
  ];

  params.forEach(fn);
}


function loadDisqus(script) {
  if (!window.disqus_shortname) {
    // at the minimum shortname needs to be defined
    console.err('"shortname" parameter missing');
    return;
  }

  load('//' + window.disqus_shortname + '.disqus.com/' + script);
}

function embed(opts) {
  var el = document.getElementById('disqus_thread'), ds;
  if (!el) {
    // nothing to do - no #disqus_thread element
    return;
  }
  ds = dataset(el);
  // set params from dataset unless already set
  forEachParam(function(param) {
    if (!opts || !opts[param]) {
      setParam(param, ds.get(param));
    }
  });
  loadDisqus('embed.js');
}

function count() {
  var el = document.querySelector('a[href$="#disqus_thread"]');

  if (!el) {
    return;
  }
  loadDisqus('count.js');
}

function disqus(opts) {
  // copy disqus vars to global namespace
  if (opts) {
    forEachParam(function(param) {
      setParam(param, opts[param]);
    });
  }
  embed(opts);
  count();
}

module.exports = disqus;
