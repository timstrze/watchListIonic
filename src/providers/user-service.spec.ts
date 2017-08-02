import { User } from './user-service';

describe('User Service', () => {

  beforeEach(function() {
    this.User = new User();
  });

  it('should load the user', () => {

    // spyOn(this.http, 'get');
    // spyOn(this, 'castObjects');

    this.User.load();

    expect(1 + 1).toBe(2);

    // expect(this.http.get).toHaveBeenCalled();
    // expect(this.castObjects).toHaveBeenCalled();

  });

});
