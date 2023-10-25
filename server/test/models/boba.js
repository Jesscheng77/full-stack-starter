import assert from 'assert';
import _ from 'lodash';
import path from 'path';
import { v4 as uuid } from 'uuid';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.Boba', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['bobas']);
  });

  it('creates a new Boba record', async () => {
    assert.deepStrictEqual(await models.Boba.count(), 3);
    const record = await models.Boba.create({
      Restaurants: 'Purple Kow',
      Address: '3620 Balboa St, San Francisco, CA 94121',
      Number: '(415) 387-9009',
      Rating: 5,
      Hours: 'Mon-Fri',
      Image: 'pic',
      Feedback: 'hi',
      City: 'San Francisco',
    });
    assert.deepStrictEqual(await models.Boba.count(), 4);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.Restaurants, 'Purple Kow');
  });

  it('finds a Boba record by its id', async () => {
    const record = await models.Boba.findByPk(10000);
    assert.notDeepStrictEqual(record, null);
    assert.deepStrictEqual(record.Restaurants, 'Purple Kow 10001');
  });

  it('finds multiple Boba records', async () => {
    const records = await models.Boba.findAll({
        order: [['Restaurants', 'ASC']]
    });
    assert.deepStrictEqual(records.length, 3);
    assert.deepStrictEqual(records[0].Restaurants, 'Purple Kow 10001');
  });

  it('deletes a Boba record', async () => {
    assert.deepStrictEqual(await models.Boba.count(), 3);
    const record = await models.Boba.findByPk(10000);
    await record.destroy();
    assert.deepStrictEqual(await models.Boba.count(), 2);
  });
});
