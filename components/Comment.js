import Image from 'next/image'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiEdit, FiTrash, FiGitMerge, FiX } from 'react-icons/fi'
import Tippy from '@tippyjs/react'
import useTimeAgo from '../hooks/useTimeAgo'
import { useState } from 'react'

const image = 'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074'

export default function Comment ({ recipeId, comment, user, token, child }) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
  const exception = comment === undefined
  let creatorEmail; let content; let parentId; let createdAt
  if (!exception) {
    creatorEmail = comment.creatorEmail || user
    content = comment.content
    parentId = comment._id
    createdAt = comment.createdAt
  }
  if (child) {
    console.log(comment)
  }

  const timeago = useTimeAgo(exception ? 'Created at...' : createdAt)
  const [text, setLetters] = useState(exception ? '' : content)
  const [newReply, setReply] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    if (editMode) {
      handleEdit()
    } else if (exception) {
      handlePublish()
    }
  }

  const handlePublish = async () => {
    const body = {
      recipeId: recipeId,
      comment: {
        creatorEmail: user,
        content: text
      }
    }
    await fetch('http://localhost:4000/api/user/comments', {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
  }

  const handlePublishRep = async (e) => {
    e.preventDefault()
    const body = {
      parentId,
      comment: {
        creatorEmail: user,
        content: text
      }
    }
    await fetch('http://localhost:4000/api/user/comment-reply', {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
  }

  const handleEdit = async () => {
    const body = {
      recipeId: recipeId,
      comment: {
        _id: comment._id,
        creatorEmail: creatorEmail,
        content: text
      }
    }

    if (parentId) { body.comment.parentId = parentId }
    // await fetch('http://localhost:4000/api/user/comments', {
    //   method: 'PUT',
    //   headers,
    //   body: JSON.stringify(body)
    // })
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    const body = {
      recipeId: recipeId,
      comment: {
        _id: comment._id,
        creatorEmail: creatorEmail,
        content: text
      }
    }
    if (parentId) { body.comment.parentId = parentId }
    console.log(body)
    await fetch('http://localhost:4000/api/user/comments', {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body)
    })
  }

  return (
    <div className='flex justify-start items-center flex-col gap-2'>
        <form
          method='POST'
          className="flex flex-col gap-3 h-56 bg-white shadow-lg rounded-xl px-5 py-4 divide-y divide-gray-700"
        >
          <div className='flex items-center gap-5 relative'>
            <a href='#' className='h-10 w-10 block relative'>
              <Image
                src={image}
                alt='Picture of the author'
                layout='fill'
                className='mx-auto object-cover rounded-full '
              />
            </a>
            <div className='flex flex-col gap-0 w-96'>
              <span className='text-base font-medium'>{exception ? user : creatorEmail}</span>
              <span className='text-xs font-medium'>{timeago}</span>
            </div>
            <div className='flex items-center gap-2.5 absolute right-0 mr-1'>
              <>
                {(exception || user === creatorEmail) && <Tippy
                  arrow={false}
                  content={ <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none'>
                      publish
                    </span>}
                >
                  <button
                    type="submit"
                    onClick={(e) => handleClick(e)}
                    disabled={!(editMode || exception)}
                  >
                    <AiOutlineHeart className='text-2xl text-green-500'/>
                  </button>
                </Tippy>}
                {(!exception && user === creatorEmail) && <Tippy
                  arrow={false}
                  content={ <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none'>
                      edit
                    </span>}
                >
                  <button
                    type="button"
                    onClick={(e) => setEditMode(!editMode)}
                  >
                    <FiEdit className={`text-xl text-blue-500 ${editMode ? 'text-opacity-60' : ''}`}/>
                  </button>
                </Tippy>}
                {(!exception && user === creatorEmail) && <Tippy
                  arrow={false}
                  content={ <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none'>
                      delete
                    </span>}
                >
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e)}
                  >
                    <FiTrash className='text-xl text-red-500'/>
                  </button>
                </Tippy>}
              </>
              {!exception && !child && <Tippy
                arrow={false}
                content={ <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none'>
                    reply
                  </span>}
              >
                <button
                  type="button"
                  onClick={(e) => setReply(!newReply)}
                >
                  <FiGitMerge className='text-xl text-black ml-5'/>
                </button>
              </Tippy>}
            </div>
          </div>
          <div className='pl-8 h-full pb-3'>
              <textarea
                id='comment'
                name='comment'
                onChange={(e) => setLetters(e.target.value)}
                placeholder='Write here your ideas...'
                defaultValue={content}
                className='mt-3 px-2 py-1.5 w-full border border-black border-opacity-40 rounded-md h-full resize-none'
                disabled={!editMode && !exception}
              />
          </div>
        </form>
        {/* REPLY */}
        {newReply && <form
          method='POST'
          className="flex flex-col gap-3 h-56 bg-white shadow-lg rounded-xl px-5 py-4 divide-y divide-gray-700"
        >
          <div className='flex items-center gap-5 relative'>
            <a href='#' className='h-10 w-10 block relative'>
              <Image
                src={image}
                alt='Picture of the author'
                layout='fill'
                className='mx-auto object-cover rounded-full '
              />
            </a>
            <div className='flex flex-col gap-0 w-96'>
              <span className='text-base font-medium'>{user}</span>
              <span className='text-xs font-medium'>Created at...</span>
            </div>
            <div className='flex items-center gap-2.5 absolute right-0 mr-1'>
              <>
                <Tippy
                  arrow={false}
                  content={ <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none'>
                      publish
                    </span>}
                >
                  <button
                    type="submit"
                    onClick={(e) => handlePublishRep(e)}
                  >
                    <AiOutlineHeart className='text-2xl text-green-500'/>
                  </button>
                </Tippy>
                {!exception && <Tippy
                  arrow={false}
                  content={ <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none'>
                      close
                    </span>}
                >
                  <button
                    type="button"
                    onClick={(e) => setReply(!newReply)}
                  >
                    <FiX className='text-xl text-black'/>
                  </button>
                </Tippy>}

              </>
            </div>
          </div>
          <div className='pl-8 h-full pb-3'>
              <textarea
                id='comment'
                name='comment'
                onChange={(e) => setLetters(e.target.value)}
                placeholder='Write here your ideas...'
                className='mt-3 px-2 py-1.5 w-full border border-black border-opacity-40 rounded-md h-full resize-none'
              />
          </div>
        </form>}
        {/* END REPLY */}
      </div>
  )
}
