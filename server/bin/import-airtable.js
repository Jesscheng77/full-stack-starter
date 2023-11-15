#!/usr/bin/env node

import path from 'path';
import { unlink, writeFile } from 'fs/promises';
import models from '../models/index.js';
import s3 from '../lib/s3.js';

const token = 'patKqXPaSWJJgckAx.4cc2daa28db95ba77db5932c2528bb277aebea8b18426b3e1a23513cb521a1d9';
const url = 'https://api.airtable.com/v0/appjNeZQnrvy9hYsq/Restaurants?view=Grid%20view';
fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
})
  .then((response) => response.json())
  .then(async (data) => {
    //   console.log(data);
    for (const record of data.records) {
      let Attachments;
      if (record.fields.images.length > 0) {
        const attachment = record.fields.images[0];
        const { filename, url } = attachment;
        const filePath = path.resolve(filename);
        try {
          const response = await fetch(url);
          const arrayBuffer = await response.arrayBuffer();
          await writeFile(filePath, Buffer.from(arrayBuffer));
          const key = path.join('uploads', filename);
          await s3.putObject(key, filePath);
          Attachments = filename;
        } catch (err) {
          console.log(err);
        } finally {
          await unlink(filePath);
        }
      }
      
      await models.Boba.create({
        Restaurants: record.fields.Name,
        Address: record.fields.Address,
        Number: record.fields.Number,
        Rating: record.fields.Rating,
        Hours: record.fields.Hours,
        Image: Attachments,
        Feedback: record.fields.Feedback,
        City: record.fields.city,
      });
    }
  });
