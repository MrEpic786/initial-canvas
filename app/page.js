'use client';
import { Suspense } from 'react';
import Three from './Three';
import { Canvas } from '@react-three/fiber';

export default function Home() {
  return (
    <main className="h-screen w-full">
      <Suspense fallback={<>Loading...</>}>
        <Canvas>
          <Three />
        </Canvas>
      </Suspense>
    </main>
  );
}
