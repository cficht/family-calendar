import React from 'react';
import Link from 'next/link';

export default function EnterButton() {
  return <Link href="/calendar"><a><button type="button">Enter</button></a></Link>;
}
