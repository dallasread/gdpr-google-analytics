<h1>Need to make Google Analytics GDPR-Compliant?</h1>

<pre>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.<strong>gdpr-</strong>google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXXXX-1', 'auto');
ga('send', 'pageview');</pre>

<p>Done!</p>

<h2>Does it work with other tracking services (eg. GTM, Mixpanel, Segment)?</h2>

<p>
    Yes &mdash; with only a little re-jigging! Insert the following snippet <em>prior</em> to your other tracking snippets. Add the URL of each service as a <code>dependency</code>.
    <em>To ensure the trackers don't load by themselves, you'll want to remove any <code>X.src=XXXX;</code> code in your original tracking snippets.</em> That's it!
</p>

<pre>&lt;script&gt;
    (function(g,d,p,r){g[p]=g[p]||function(a,b,c){
    g[d]=g[d]||{};g[d][a]=g[d][a]||[];g[d][a].push([b,c]);};
    })(window,'GDPRGoogleAnalytics','gdpr');

    <strong>gdpr('dependency', 'https://www.googletagmanager.com/gtm.js?id=XXXXXXXX');</strong>
&lt;/script&gt;
&lt;script src="https://www.gdpr-google-analytics.com/analytics.js"&gt;&lt;/script&gt;</pre>

<p>Need to change something?</p>

<pre>gdpr('vars', 'buttonColor', 'red');
gdpr('vars', 'buttonText', '&amp;check; Accept!');
gdpr('vars', 'content', 'By clicking "Accept All Cookies"...');
gdpr('vars', 'policyURL', 'http://example.com/');
gdpr('vars', 'policyText', 'See Our Privacy Policy');</pre>

<p>Need to know when the terms have been accepted?</p>

<pre>gdpr('on', 'accept', function() {
    alert('Terms have just been accepted!');
});</pre>

<p>Any CSS can be overridden in the <code>.gdpr-google-analytics-notice</code> element.</p>

<p>The full size of this library is ~4.66 kb.</p>

<p>Any questions? Look at this page's source.</p>
