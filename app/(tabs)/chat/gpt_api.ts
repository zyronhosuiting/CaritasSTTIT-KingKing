import React from 'react';
import { api } from './constants';
import axios from 'axios';
const gpt_api = (message: string) => {
  const response = 'your message are ' + message;
  return response;
};

export default gpt_api;
