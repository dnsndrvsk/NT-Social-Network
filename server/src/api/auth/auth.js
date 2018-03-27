import _ from 'lodash'
import mongoose from 'mongoose'
import { AsyncRouter } from 'express-async-router'
import Auth from './Auth'


export default (ctx) => {
  if (!_.has(ctx, 'resourses.Auth.signup')) throw '!resourses.Auth.signup'
  if (!_.has(ctx, 'resourses.Auth.verify')) throw '!resourses.Auth.verify'
  if (!_.has(ctx, 'resourses.Auth.verification')) throw '!resourses.Auth.verification'
  if (!_.has(ctx, 'resourses.Auth.login')) throw '!resourses.Auth.login'
  if (!_.has(ctx, 'resourses.Auth.validate')) throw '!resourses.Auth.validate'
  if (!_.has(ctx, 'resourses.Auth.logout')) throw '!resourses.Auth.logout'
  const api = AsyncRouter()

  api.all('/validate', ctx.resourses.Auth.validate)
  api.post('/signup', ctx.resourses.Auth.signup)
  api.all('/verify', ctx.resourses.Auth.verify)
  api.get('/verification', ctx.resourses.Auth.verification)
  api.post('/login', ctx.resourses.Auth.login)
  api.post('/logout', ctx.resourses.Auth.logout)

  return api
}
