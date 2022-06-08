---
layout: home
exclude_from_search: true
---

Dies ist die neue {{ hieronymus  }} Seite

Die Seite ist im Aufbau!
----
{: .my-6}

# {% t recent_articles %}
{: .mb-5 .title .has-text-centered}

{% assign posts = collections.posts.resources | slice: 0, 6 %}
{% render "bulmatown/collection", collection: posts, metadata: site.metadata %}

{% if collections.posts.resources.size > 6 %}
  <a href="/posts/" class="button is-primary is-outlined is-small"><span>Previous Articles</span> <span class="icon"><i class="fa fa-arrow-right"></i></span></a>
  {: .mt-6 .has-text-centered}
{% endif %}
