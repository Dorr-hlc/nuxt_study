(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-186050405-1', 'auto');
ga('require', 'displayfeatures');
ga('set', 'contentGroup1', 'Bryce');
var postFunctionElement = document.getElementById('post_function');
if(postFunctionElement) {
  var dimensionValue = postFunctionElement.value;
  ga('set', 'dimension8', dimensionValue);
}
ga('send', 'pageview');