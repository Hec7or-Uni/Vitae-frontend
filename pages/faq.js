import Question from '../components/Question'
import Layout from '../components/Layout/NoSession'

export default function FAQ () {
  return (
    <div className="container px-16 py-8 min-h-screen -mt-16 mx-auto">
      <div className="mx-auto flex flex-wrap items-center justify-center w-1/2 pb-10 mt-24">
        <h2 className="px-2 py-2 font-bold text-2xl capitalize mb-8">
          frequently asked questions
        </h2>
        <Question
          title={'What is Vitop?'}
          content={
            <p>
              BIdeas is a platform where people from all over the world can come
              together to create and develop their projects. In short, we are a
              platform that puts people in contact with each other.
            </p>
          }
        />
        <Question
          title={'Why Vitop?'}
          content={
            <p>
              Ideas arises from the need of one of our colleagues who once
              wanted to develop an idea and in the process saw how difficult it
              was to find people as passionate as him to develop it from 0,
              that&apos;s why BIdeas tries to attract different profiles of
              people to facilitate the problem that we once had and make it
              easier for users.
            </p>
          }
        />
        <Question
          title={'How can I save a recipe?'}
          content={
            <>
              <ol>1 Log in to your account.</ol>
              <ol>2 Navigate to /my-team.</ol>
              <ol>3 Click on create team.</ol>
              <ol>4 Fill in the requested information.</ol>
              <ol>5 Save the changes.</ol>
            </>
          }
        />
        <Question
          title={'How can I create a menu?'}
          content={
            <p>
              Finding the ideal project is often one of the hardest tasks, some
              people may think that points are everything, but, if you really
              want to find a team to be comfortable in, we recommend you to look
              at the people involved in each team and google them. You can tell
              a lot about a person just by what they post on their social
              networks.
            </p>
          }
        />
        <Question
          title={'Can I link other accounts with the vitop account?'}
          content={
            <p>
              Finding the ideal project is often one of the hardest tasks, some
              people may think that points are everything, but, if you really
              want to find a team to be comfortable in, we recommend you to look
              at the people involved in each team and google them. You can tell
              a lot about a person just by what they post on their social
              networks.
            </p>
          }
        />
        <Question
          title={'I forgot my password'}
          content={
            <p>
              Finding the ideal project is often one of the hardest tasks, some
              people may think that points are everything, but, if you really
              want to find a team to be comfortable in, we recommend you to look
              at the people involved in each team and google them. You can tell
              a lot about a person just by what they post on their social
              networks.
            </p>
          }
        />
        <Question
          title={'Want some new functionality?'}
          content={
            <p>
              Finding the ideal project is often one of the hardest tasks, some
              people may think that points are everything, but, if you really
              want to find a team to be comfortable in, we recommend you to look
              at the people involved in each team and google them. You can tell
              a lot about a person just by what they post on their social
              networks.
            </p>
          }
        />
        <Question
          title={'How to report a bug?'}
          content={
            <p>
              Finding the ideal project is often one of the hardest tasks, some
              people may think that points are everything, but, if you really
              want to find a team to be comfortable in, we recommend you to look
              at the people involved in each team and google them. You can tell
              a lot about a person just by what they post on their social
              networks.
            </p>
          }
        />
      </div>
    </div>
  )
}

FAQ.getLayout = function getLayout (page) {
  return <Layout>{page}</Layout>
}
