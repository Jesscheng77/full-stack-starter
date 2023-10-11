import assert from 'assert';
import _ from 'lodash';
import path from 'path';
import { v4 as uuid } from 'uuid';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.Boba', () => {
  beforeEach(async () => {
    await helper.loadFixtures([]);
  });

  it('creates a new Boba record', async () => {
    assert.deepStrictEqual(await models.Boba.count(), 0);
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
    assert.deepStrictEqual(await models.Boba.count(), 1);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.Restaurants, 'Purple Kow');
  });
});
