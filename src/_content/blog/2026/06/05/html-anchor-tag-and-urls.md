# Anchors Away! The HTML anchor tag and URLs

**June 5, 2026**

**tl;dr**
Its news to me that URLs can be absolute or relative and thats pretty cool.

---
## Setting the Scene

I'm playing around with 11ty by using it for my current website. I was wondering how routing would work so before I looked at the docs, I created a blog index page and a post-1 page as well.

```
src
  |- index.hbs // home page
  '- blog
      |- index.hbs // blog landing page
      '- post-1.hbs // blog post 1
```

I figured I would try to just use the anchor tag and see what happens. So I put the ff in each file.

```
// index.hbs
...
<a href="/blog">Blog</a>
...
```

```
// blog/index.hbs
...
<a href="/">Home</a>
<a href="/blog/post-1">Post 1</a>
...
```

```
// blog/post-1.hbs
...
<a href="/">Home</a>
<a href="/blog">Back to Blog</a>
...
```

And tada! It worked! I had no idea why it worked though. I've been using [Ember.js](https://emberjs.com/) for so long and I realized that I didn't know *why* it worked. Usually I put the  whole url, scheme, sub-domain, domain and the route if any, etc. So I wasn't sure how just "/" was defaulting to the current domain. I also know that you can put emails and phone numbers in the href attribute of the anchor tag.
## So what now?

I needed to know more! It's fine when stuff just works, but not knowing why eats me up. It also bothers me because if someone asks, I don't want to be the guy who goes "that's just the way it is.". So I wen't to MDN and started reading the [anchor tag documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a).

On first look, the [href section](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#href) doesn't have any obvious text that says something like "You can just put a / and the browser will know to go to the root of your domain.".

```
href

The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs — they can use any URL scheme supported by browsers:

- Telephone numbers with `tel:` URLs
- Email addresses with `mailto:` URLs
- SMS text messages with `sms:` URLs
- Executable code with [`javascript:` URLs](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/javascript)
- While web browsers may not support other URL schemes, websites can with [`registerProtocolHandler()`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/registerProtocolHandler)

Moreover other URL features can locate specific parts of the resource, including:

- Sections of a page with document fragments
- Specific text portions with [text fragments](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments)
- Pieces of media files with media fragments
```

 So obviously, there is jargon here that I'm not understanding, but there are some clues. The first line says
 
 > The URL that the hyperlink points to.
 
 Huh, maybe I don't understand what a URL actually is. So I look that up. MDN to the rescue! I look it up on MDN and find a [page](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL) explaining what a URL is. It's got the usual stuff, like the anatomy of a URL

| Part       | Info                                                                                                                        |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| Scheme     | Usually `http` or `https`                                                                                                   |
| Authority  | This is usually the domain name, like www.reggietheroman.com or an IP address. Sometimes it is followed by the port number. |
| Path       | The path/route to the file on the server                                                                                    |
| Parameters | Always starts with a ? after the path. Looks something like `?key1=value1&key2=value2`                                      |
| Anchor     | Link to a specific section of the page, usually headers and look like this `#SomewhereInTheDocument`.                       |

Ok, I know most of that off the top of my head. Is `/` alone a valid URL then? It turns out, that the example above, which is what i'm most used to seeing and using, is what we call an **absolute URL**.
## Relative URLs

Now that we know that there are apparently different kinds of URLs, what other kinds are there? For now, the only other one that we care about are **relative URLs**. Because that is the category that the URL `/` falls in to.

The MDN doc explains the difference between absolute and relative URL strings [here](#SomewhereInTheDocument). But basically, it boils down to the ff:

- We use absolute URLs in our browser URL bar because the browser has *no context* and we need to give it all the information it needs to get to the right page.
- On pages (documents), the browser has access to the current URL.
- The browser can use the current URL as context.
- The browser knows that if the URL starts with `/` only, it should look in the root of the server

And there it is.

## The Point

Using links to navigate between pages was not at all difficult to do with 11ty. Not because 11ty as a static site generator thought of amazing ways to handle it, but because the people who designed the [URL standard](https://url.spec.whatwg.org/#absolute-url-string) already dealt with it. I always used to thing routing using frameworks like Ember.js or [Next.js](https://nextjs.org/) was some magic that the framework designers figured out. Now i'm going to have to take a deeper look into how they handle it because apparently, the anchor tag and URLs have us covered.
