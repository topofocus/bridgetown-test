---
layout: page
title: Articles
exclude_from_search: true
paginate:
  collection: posts
---

{% assign posts = paginator.resources %}
{% render "bulmatown/collection", collection: posts, metadata: site.metadata %}

{% render "bulmatown/pagination", paginator: paginator %}