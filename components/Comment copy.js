import Image from 'next/image'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiEdit, FiTrash, FiGitMerge } from 'react-icons/fi'
import Tippy from '@tippyjs/react'
import useTimeAgo from '../hooks/useTimeAgo'
import { useState } from 'react'

const image = 'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074'

export default function Comment ({ _id, recipeId, email, creatorEmail, message, creationDate, profileImg, isReply, className, except }) {
  const [comment, setComment] = useState('')
  const [newReply, setReply] = useState(false)
  const timeago = useTimeAgo(creationDate)
  console.log(creationDate)

  const write = (e) => {
    setComment(e.target.value)
  }

  const handlePublish = async (e) => {
    e.preventDefault()
    if (newReply) {
      handleReply()
      return
    }
    const data = {
      id: recipeId,
      comment: {
        content: comment,
        creatorEmail: email
      }
    }
    await fetch('http://localhost:4000/api/user/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    const data = {
      id: recipeId,
      comment: {
        _id: _id,
        content: comment,
        creatorEmail: email
      }
    }
    await fetch('http://localhost:4000/api/user/comments', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const data = {
      _id: _id

    }
    await fetch('http://localhost:4000/api/user/comments', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }

  const handleReply = async () => {
    const data = {
      parentId: _id,
      comment: {
        content: comment,
        creatorEmail: email
      }
    }
    await fetch('http://localhost:4000/api/user/comment-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }

  return (
    <div className={`flex justify-start items-center flex-col gap-2 ${className}`}>
        <form
          method='POST'
          className="flex flex-col gap-3 h-56 bg-white shadow-lg rounded-xl px-5 py-4 divide-y divide-gray-700"
        >
          <div className='flex items-center gap-5 relative'>
            <a href='#' className='h-10 w-10 block relative'>
              <Image
                src={profileImg || image}
                alt='Picture of the author'
                layout='fill'
                className='mx-auto object-cover rounded-full '
              />
            </a>
            <div className='flex flex-col gap-0 w-96'>
              <span className='text-base font-medium'>{email || 'Username'}</span>
              <span className='text-xs font-medium'>{!except ? timeago : 'Created at...'}</span>
            </div>
            <div className='flex items-center gap-2.5 absolute right-0 mr-1'>
            {email === creatorEmail &&
            <>
              {!isReply &&
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
              { !except &&
              <>
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
              </>}
              </>}
            </>
            }
            {!isReply && !except && <>
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
            </>}
            </div>
          </div>
          <div className='pl-8 h-full pb-3'>
              <textarea
                id='comment'
                name='comment'
                onChange={(e) => write(e)}
                defaultValue={message}
                placeholder='Write here your ideas...'
                className='mt-3 px-2 py-1.5 w-full border border-black border-opacity-40 rounded-md h-full resize-none'
                disabled={email !== creatorEmail}
              />
          </div>
        </form>
        {newReply && <form
          method='POST'
          className="flex flex-col gap-3 h-56 bg-white shadow-lg rounded-xl px-5 py-4 divide-y divide-gray-700"
        >
          <div className='flex items-center gap-5 relative'>
            <a href='#' className='h-10 w-10 block relative'>
              <Image
                src={profileImg || image}
                alt='Picture of the author'
                layout='fill'
                className='mx-auto object-cover rounded-full '
              />
            </a>
            <div className='flex flex-col gap-0 w-96'>
              <span className='text-base font-medium'>{email || 'Username'}</span>
              <span className='text-xs font-medium'>{timeago}</span>
            </div>
            <div className='flex items-center gap-2.5 absolute right-0 mr-1'>
            {newReply || email === creatorEmail ||
            <>
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
            }
            </div>
          </div>
          <div className='pl-8 h-full pb-3'>
              <textarea
                id='comment'
                name='comment'
                onChange={(e) => write(e)}
                placeholder='Write here your ideas...'
                className='mt-3 px-2 py-1.5 w-full border border-black border-opacity-40 rounded-md h-full resize-none'
                disabled={email !== creatorEmail}
                required
              />
          </div>
        </form>}
      </div>
  )
}
