import {
  DeliveryClient, DeliveryClientConfig
} from 'kentico-cloud-delivery-typescript-sdk';
import { typeResolvers } from '../models/typeResolvers';

/**
 * Create new instance of Delivery Client
 */
export const deliveryClient = new DeliveryClient(
  new DeliveryClientConfig(
    '9fd1dc6b-ffef-4e9c-9ec9-878d6db2f94e',
    typeResolvers,
    {
      enablePreviewMode: true,
      previewApiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwYjM3MjIwZmQyZmU0YzE2YjY1NjNmYmVkYzJkMDkxMiIsImlhdCI6IjE1MTk0ODEzMjQiLCJleHAiOiIxODY1MDgxMzI0IiwicHJvamVjdF9pZCI6IjlmZDFkYzZiZmZlZjRlOWM5ZWM5ODc4ZDZkYjJmOTRlIiwidmVyIjoiMS4wLjAiLCJhdWQiOiJwcmV2aWV3LmRlbGl2ZXIua2VudGljb2Nsb3VkLmNvbSJ9.d5qzRqrOSSMPv71x-_8ebRH3G4darpKcidb5AaHoHmg',
    })
);
