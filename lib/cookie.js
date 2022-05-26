let cookieName
if (process.env.NODE_ENV === 'development') {
  cookieName = 'next-auth.session-token'
} else {
  cookieName = '__Secure-next-auth.session-token'
}

export default cookieName
