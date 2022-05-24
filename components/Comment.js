import Image from 'next/image'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiEdit, FiTrash, FiGitMerge } from 'react-icons/fi'
import Tippy from '@tippyjs/react'
import useTimeAgo from '../hooks/useTimeAgo'
import { useState } from 'react'

const image = 'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074'

export default function Comment ({ recipeId, comment }) {
  let exception = false
  let creatorEmail; let content; let parentId; let createdAt
  if (!(recipeId && comment)) { exception = true } else {
    creatorEmail = comment.creatorEmail
    content = comment.content
    parentId = comment.parentId
    createdAt = comment.createdAt
  }
  const timeago = useTimeAgo(exception ? 'Created at...' : createdAt)
  const [text, setLetters] = useState(exception ? '' : content)
  const [newReply, setReply] = useState(false)

  const write = (e) => {
    setLetters(e.target.value)
  }

  const handlePublish = async (e) => {
    e.preventDefault()
    const body = {
      recipeId: recipeId,
      comment: {
        creatorEmail: creatorEmail,
        content: text
      }
    }
    if (parentId) { body.comment.parentId = parentId }
    await fetch('http://localhost:4000/api/user/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    const body = {
      recipeId: recipeId,
      comment: {
        _id: '00000000000',
        creatorEmail: 'xxxxxx@domain.ext',
        content: text
      }
    }
    if (parentId) { body.comment.parentId = parentId }
    await fetch('http://localhost:4000/api/user/comments', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const body = {
      recipeId: recipeId,
      comment: {
        _id: '00000000000',
        creatorEmail: 'xxxxxx@domain.ext',
        content: text
      }
    }
    await fetch('http://localhost:4000/api/user/comments', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
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
              <span className='text-base font-medium'>{'Username'}</span>
              <span className='text-xs font-medium'>{timeago}</span>
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
                    onClick={(e) => handlePublish(e)}
                  >
                    <AiOutlineHeart className='text-2xl text-green-500'/>
                  </button>
                </Tippy>
                <Tippy
                  arrow={false}
                  content={ <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none'>
                      edit
                    </span>}
                >
                  <button
                    type="button"
                    onClick={(e) => handleEdit(e)}
                  >
                    <FiEdit className='text-xl text-blue-500'/>
                  </button>
                </Tippy>
                <Tippy
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
                </Tippy>
              </>
              <Tippy
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
              </Tippy>
            </div>
          </div>
          <div className='pl-8 h-full pb-3'>
              <textarea
                id='comment'
                name='comment'
                onChange={(e) => write(e)}
                placeholder='Write here your ideas...'
                defaultValue={text}
                className='mt-3 px-2 py-1.5 w-full border border-black border-opacity-40 rounded-md h-full resize-none'
              />
          </div>
        </form>
        {/* REPLY */}
        {/* END REPLY */}
      </div>
  )
}
