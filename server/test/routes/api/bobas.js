import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';

describe('/api/bobas', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['bobas']);
    testSession = session(app);
  });

  it('fetch all bobas from the Bobas table', async () => {
    const response = await testSession.get('/api/bobas').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.length, 3);
  });

  it('fetch one Boba record from the table', async () => {
    const response = await testSession.get('/api/bobas/10000').expect(StatusCodes.OK);
    console.log(response.body);
    assert.deepStrictEqual(response.body?.Restaurants, 'Purple Kow 10001');
  });
});