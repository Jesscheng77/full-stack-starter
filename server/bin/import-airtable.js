#!/usr/bin/env node

import fetch from 'node-fetch';
import models from '../models/index.js';

const token = 'patKqXPaSWJJgckAx.4cc2daa28db95ba77db5932c2528bb277aebea8b18426b3e1a23513cb521a1d9';
const url = 'https://api.airtable.com/v0/appjNeZQnrvy9hYsq/Restaurants?view=Grid%20view';
fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
})
  .then((response) => response.json())
  .then(async (data) => {
    //   console.log(data);
    for (const record of data.records) {
      models.Boba.create({
        Restaurants: record.fields.Restaurants,
        Address: record.fields.Address,
        Number: record.fields.Number,
        Rating: record.fields.Rating,
        Hours: record.fields.Hours,
        Image: record.fields.Image,
        Feedback: record.fields.Feedback,
        City: record.fields.city,
      });
    }
  });
