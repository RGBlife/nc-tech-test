import { app } from './server'

const PORT = 7001

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}…`)
})
