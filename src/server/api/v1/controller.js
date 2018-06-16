import { User } from '../../models';

class Controller {
  async currentUser(request) {
    if (request.state['sid-babeli'] && request.server.app.cache.get(request.state['sid-babeli'].sid)) {
      const session = await request.server.app.cache.get(request.state['sid-babeli'].sid);
      return User.findById(session.userId);
    }
    return null;
  }
}

export default Controller;
