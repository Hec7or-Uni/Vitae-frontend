import { SitemapStream, streamToPromise } from 'sitemap'

export default async (req, res) => {
  const allowedMethods = ['GET']
  const { method } = req
  if (!allowedMethods.includes(method)) {
    res.setHeader('Allow', allowedMethods)
    res.status(501).end(`Method ${method} Not Allowed`)
    return
  }

  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000
    })

    // List of urls
    const urls = [
      '',
      'faq',
      'privacypolicy',
      'tos',
      'home',
      'about',
      'discover',
      'storage',
      'planning',
      'settings',
      'admin'
    ]

    // Create each URL row
    urls.forEach((url) => {
      smStream.write({
        url: `/${url}`,
        changefreq: 'daily',
        priority: 0.9
      })
    })

    // End sitemap stream
    smStream.end()

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString()

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml'
    })

    // Display output to user
    res.end(sitemapOutput)
  } catch (e) {
    res.send(JSON.stringify(e))
  }
}
