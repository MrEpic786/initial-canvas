'use client';

import { degToRadians } from '@/utils/angle';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { folder, useControls } from 'leva';
import { React, useEffect, useRef } from 'react';

const Three = () => {
  const orbitControlsRef = useRef();
  const {
    autoRotate,
    enableZoom,
    enablePan,
    trackMyPointer,
    autoRotateSpeed,
    azimuthalAngleValMultiOfXInDeg,
    minPolarAngle,
    maxPolarAngle,
  } = useControls('Orbit Controls', {
    autoRotate: {
      value: true,
      hint: 'Auto rotate the camera',
    },
    trackMyMouse: folder({
      azimuthalAngleValMultiOfXInDeg: {
        value: 45,
        min: 0,
        max: 180,
        hint: 'Set Azimuthal Angle Value Multiplier of X In degree',
      },
      trackMyPointer: {
        value: false,
        hint: 'Tracks your mouse pointer',
      },
    }),
    enablePan: {
      value: false,
      hint: 'Enable us to move around by holding shift',
    },
    enableZoom: {
      value: true,
      hint: 'Enable us to zoom in and out',
    },
    autoRotateSpeed: {
      value: 0.5,
      min: 0,
      max: 10,
      hint: 'Speed of rotation',
    },
    minPolarAngle: {
      value: 0,
      min: 0,
      max: 180,
      hint: 'Set Min Polar Angle - Y axis min rotation',
    },
    maxPolarAngle: {
      value: 180,
      min: 0,
      max: 180,
      hint: 'Set Max Polar Angle - Y axis max rotation',
    },
  });

  useFrame((state) => {
    if (!!orbitControlsRef.current) {
      const { x, y } = state.pointer;
      if (trackMyPointer) {
        orbitControlsRef.current.setAzimuthalAngle(
          x * degToRadians(azimuthalAngleValMultiOfXInDeg)
        );
        orbitControlsRef.current.update();
      }
    }
  });

  useEffect(() => {
    if (!!orbitControlsRef.current) {
      console.log(orbitControlsRef.current);
    }
  }, [orbitControlsRef]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls
        ref={orbitControlsRef}
        enablePan={enablePan /* Enable us to move around by holding shift */}
        enableZoom={enableZoom /* Enable us to zoom in and out */}
        autoRotate={autoRotate /* Auto rotate the camera */}
        autoRotateSpeed={autoRotateSpeed /* Speed of rotation */}
        minPolarAngle={degToRadians(minPolarAngle)}
        maxPolarAngle={degToRadians(maxPolarAngle)}
      />
      <group>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[1, 50, 100]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh rotation={[-degToRadians(90), 0, 0]}>
          <planeGeometry args={[10, 5]} />
          <meshStandardMaterial color="#22ff22" />
        </mesh>
      </group>
      {/* Light */}
      <ambientLight args={['#fff111', 1]} />
    </>
  );
};

export default Three;
