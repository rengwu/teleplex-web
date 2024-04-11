'use client';

import { useState } from 'react';

export function Test() {
  const [value, setValue] = useState('TestValue');
  return <div>{value}</div>;
}
