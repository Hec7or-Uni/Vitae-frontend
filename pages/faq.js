import Question from '../components/Question'
import Layout from '../components/Layout/NoSession'
import { serialize } from 'next-mdx-remote/serialize'
import { getPost } from '../lib/mdxUtils'
import Link from 'next/link'

export default function FAQ () {
  return (
    <div className="container py-8 min-h-screen -mt-16 mx-auto">
      <div className="mx-auto flex flex-wrap items-center justify-center w-full pb-10 mt-24 md:w-3/5 lg:w-1/2">
        <h2 className="px-2 py-2 font-bold text-2xl capitalize mb-8">
          frequently asked questions
        </h2>
        <Question
          title={'What is Vitop?'}
          content={
            <p>
              Vitop is a platform where anyone can carry out the dietary plan they want, being able to see their progress as they use the app. In addition, Vitop offers
            </p>
          }
        />
        <Question
          title={'Why Vitop?'}
          content={
            <p>
              Unlike other web applications, vitop has focused on the user by providing tools to help you achieve your goals in the simplest way. Some of these are: Statistics on your progress, recipes and menus.
            </p>
          }
        />
        <Question
          title={'How can I save a recipe?'}
          content={
            <ol>
              <li>1 Log in to your account.</li>
              <li>2 Navigate to /discover.</li>
              <li>3 Click on a recipe of your choice.</li>
              <li>4 Fill in the requested information.</li>
              <li>5 Once in the recipe screen, click on the save button located at the bottom right of the recipe banner.</li>
            </ol>
          }
        />
        <Question
          title={'How can I create a menu?'}
          content={
            <ol>
              <li>1 Log in to your account.</li>
              <li>2 Navigate to /planning.</li>
              <li>3 click on the Create or Generate button depending on your preferences..</li>
              <li>4 Fill in the requested information.</li>
              <li>5 Once finished, click on the green button that says save.</li>
            </ol>
          }
        />
        <Question
          title={'Can I link other accounts with the vitop account?'}
          content={
            <p>
              You can currently link your google account, however, we do not recommend you to do so as it is not recommended due to it being considered an unsafe practice.
            </p>
          }
        />
        <Question
          title={'I forgot my password'}
          content={
            <>
              <p>
                Don&apos;t worry, it has happened to all of us once, visit this{' '}
                <Link href='/recovery'>
                  <a className='text-blue-600 underline underline-offset-1'>
                    link
                  </a>
                </Link>
                {' '}and follow the steps:
              </p>
              <>
              <ol>1 Navigate to{' '}
                <Link href='/recovery'>
                  <a className='text-blue-600 underline underline-offset-1'>
                    /recovery
                  </a>
                </Link>
              </ol>
              <ol>2 Fill the form with your account information.</ol>
              <ol>3 Check your email</ol>
              <ol>4 Visit the link we send to you.</ol>
              <ol>5 Go to the link we have sent you, note that this link will expire in 15 minutes.</ol>
              <ol>6 save your request and enjoy again.</ol>
            </>
            </>
          }
        />
        <Question
          title={'Want some new functionality?'}
          content={
            <p>
              If you can think of any way to improve the application do not hesitate to let us know, by creating an issue in the repository of
              {' '}
              <a href='https://github.com/Hec7or-Uni/Vitae-frontend/issues' className='text-blue-500 underline underline-offset-1'>GitHub</a>{' '}
              or by mail to {' '}<a href='mailto:hi@vitop.xyz' className='text-blue-500 underline underline-offset-1'>hi@vitop.xyz</a>
            </p>
          }
        />
        <Question
          title={'How to report a bug?'}
          content={
              <>
              <p>
                To report any bugs or errors, visit the repository and there will be an issue, we will fix it as soon as possible.
              </p>
              <p>
                If we haven&apos;t answered you, you can send us an e-mail to the following address{' '}
                <a href='mailto:hi@vitop.xyz' className='text-blue-500 underline underline-offset-1'>hi@vitop.xyz</a>
              </p>
              <p>
                If you experiment any bug, please try to reload the page before
                contacting, thank you.
              </p>
            </>
          }
        />
      </div>
    </div>
  )
}

FAQ.getLayout = function getLayout (page) {
  const docs = page.props
  return <Layout docs={docs}>{page}</Layout>
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
