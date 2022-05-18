export default async (req, res) => {
  await fetch('http://localhost:4000/api/user/signup', {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' }
  }).then((account) => account.json())
    .then(account => {
      res
        .status(200)
        .json(account)
    })
    .catch(err => {
      res
        .status(200)
        .json(err)
    })
}
