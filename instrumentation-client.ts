import { initBotId } from 'botid/client/core'

initBotId({
  protect: [
    {
      path: '/careers',
      method: 'POST',
    },
  ],
})
