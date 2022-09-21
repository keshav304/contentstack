/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import getConfig from 'next/config';
import { PersonifyXP } from '../personify/sdk';
import { personifyConfig } from '../personify/config';

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

export default function DynamicContent({ props }) {
  async function fetchContent(uid, content_type) {
    console.log("FETCH");
    const api = `https://cdn.contentstack.io/v3/content_types/${content_type}/entries/${uid}?environment=${envConfig.CONTENTSTACK_ENVIRONMENT}`;
    const response = await fetch(api, {
      headers: {
        api_key: envConfig.CONTENTSTACK_API_KEY
          ? envConfig.CONTENTSTACK_API_KEY
          : envConfig.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
        access_token: envConfig.CONTENTSTACK_DELIVERY_TOKEN,
      },
    });
    const json = await response.json();
    return json;
  }

  useEffect(() => {
    fetchContent(props.dynamic_content[0].uid, props.dynamic_content[0]._content_type_uid);
  });


 return (
    <div>
    </div>
  );
}
