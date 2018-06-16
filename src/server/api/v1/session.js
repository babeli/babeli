import uuid from 'uuid/v4';
import Boom from 'boom';
import Joi from 'joi';

import Controller from './controller';
import { User } from '../../models';

class SessionController extends Controller {
  constructor() {
    super();
    this.show = this.show.bind(this);
  }

  async create(request) {
    const { payload } = request;

    try {
      const user = await User.authenticate(payload.email, payload.password);
      const sid = uuid();
      await request.server.app.cache.set(sid, { userId: user.id }, 0);
      request.cookieAuth.set({ sid });
      return user.toSessionJson();
    } catch (error) {
      if (error.name === 'AuthenticationFailed') {
        throw Boom.unauthorized('wrong email or password');
      }
      throw Boom.boomify(error);
    }
  }

  async show(request) {
    return (await this.currentUser(request)).toSessionJson();
  }

  destroy(request) {
    request.server.app.cache.drop(request.state['sid-babeli'].sid);
    request.cookieAuth.clear();
    return null;
  }
}

const controller = new SessionController();

export default [
  {
    method: 'GET',
    path: '/api/v1/session',
    options: {
      handler: controller.show,
    },
  },
  {
    method: 'POST',
    path: '/api/v1/session',
    options: {
      auth: false,
      handler: controller.create,
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/v1/session',
    options: {
      handler: controller.destroy,
      response: {
        emptyStatusCode: 204,
      },
    },
  },
];
