import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { getPost } from '../lib/mdxUtils'

export default function Memoria ({ source, frontMatter }) {
  return (
      <div className="flex-1 flex flex-col divide-y  h-full absolute right-0 bg-white z-50 overflow-auto opacity-100">
        <div className="flex  items-center justify-between h-16 w-full p-6">
          <h1 className="text-2xl font-sans font-bold">Documentation</h1>
        </div>
        <article className="prose mx-auto text-justify z-50 p-6 overflow-auto">
          <MDXRemote {...source} />
        </article>
      </div>
  )
}

export const getStaticProps = async () => {
  const { content, data } = getPost('memoria')
  const mdxSource = await serialize(content, { scope: data })

  return {
    props: {
      source: mdxSource,
      frontMatter: data
    }
  }
}
