import { Common\guards\jwtAuthGuard } from './common\guards\jwt-auth.guard';

describe('Common\guards\jwtAuthGuard', () => {
  it('should be defined', () => {
    expect(new Common\guards\jwtAuthGuard()).toBeDefined();
  });
});
