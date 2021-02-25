import { configureStore} from '@reduxjs/toolkit'
import Token from './Token'
import Bot from './Bot'

export default configureStore({
  reducer: {
    Token,
    Bot
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools:true
})