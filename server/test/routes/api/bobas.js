import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import models from '../../../models/index.js';

describe('/api/bobas', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['bobas']);
    testSession = session(app);
  });

  it('creates a new Item', async () => {
    const response = await testSession.post('/api/bobas')
    .send({ Restaurants: 'Create Name', Address: 'Create Text' })
    .expect(StatusCodes.CREATED);

  const record = await models.Boba.findByPk(response.body.id);
  assert.deepStrictEqual(record.Restaurants, 'Create Name');
  assert.deepStrictEqual(record.Address, 'Create Text');
  });

  it('updates an existing Boba', async () => {
    await testSession.patch(`/api/bobas/10001`)
    .send({
      Restaurants: 'Updated Name',
      Address: 'Updated Text'
    })
    .expect(StatusCodes.OK);
    const record = await models.Boba.findByPk(10001);
    assert.deepStrictEqual(record.Restaurants, 'Updated Name');
    assert.deepStrictEqual(record.Address, 'Updated Text');
  });

  it('deletes an existing Boba', async () => {
    await testSession.delete('/api/bobas/10001')
    .expect(StatusCodes.OK);

    const record = await models.Boba.findByPk(10001);
    assert.deepStrictEqual(record, null);
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