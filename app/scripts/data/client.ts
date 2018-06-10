import {
  DeliveryClient, DeliveryClientConfig
} from 'kentico-cloud-delivery-typescript-sdk';
import { typeResolvers } from '../models/typeResolvers';

/**
 * Create new instance of Delivery Client
 */
export const deliveryClient = new DeliveryClient(
  new DeliveryClientConfig(
    'f408ff21-bb77-0017-334f-f1ea95739f2a',
    typeResolvers,
    {
      enablePreviewMode: true,
      previewApiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjZGZmODQxMzcxMmE0MzFlOTcwYmM4ZGQ5Mjc3OWJjMiIsImlhdCI6IjE1Mjg2NDkyOTQiLCJleHAiOiIxODc0MjQ5Mjk0IiwicHJvamVjdF9pZCI6ImY0MDhmZjIxYmI3NzAwMTczMzRmZjFlYTk1NzM5ZjJhIiwidmVyIjoiMS4wLjAiLCJhdWQiOiJwcmV2aWV3LmRlbGl2ZXIua2VudGljb2Nsb3VkLmNvbSJ9.C_BUG9Z0difu4y3qOYxwqQzW8tpitZRFz32osU7NcTc',
    })
);
