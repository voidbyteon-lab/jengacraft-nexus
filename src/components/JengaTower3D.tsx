import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import * as THREE from "three";

interface BlockProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  onPointerOver: () => void;
  onPointerOut: () => void;
  isHovered: boolean;
}

const JengaBlock = ({ position, rotation, color, onPointerOver, onPointerOut, isHovered }: BlockProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && isHovered) {
      meshRef.current.position.z = position[2] + Math.sin(Date.now() * 0.003) * 0.05;
    } else if (meshRef.current) {
      meshRef.current.position.z = position[2];
    }
  });

  return (
    <Box
      ref={meshRef}
      args={[0.9, 0.3, 2.7]}
      position={position}
      rotation={rotation}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <meshStandardMaterial
        color={color}
        roughness={0.7}
        metalness={0.1}
        emissive={isHovered ? color : "#000000"}
        emissiveIntensity={isHovered ? 0.2 : 0}
      />
    </Box>
  );
};

const RedstoneBase = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
      const mesh = groupRef.current.children[0] as THREE.Mesh;
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={groupRef}>
      <Box args={[4, 0.5, 4]} position={[0, -0.5, 0]}>
        <meshStandardMaterial
          color="#2a0a0a"
          roughness={0.3}
          metalness={0.7}
          emissive="#d32f2f"
          emissiveIntensity={0.7}
        />
      </Box>
      <pointLight position={[0, -0.5, 0]} intensity={1.5} color="#d32f2f" distance={8} />
    </group>
  );
};

const Tower = () => {
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);

  const blockColors = ["#8b5a3c", "#757575", "#7cb342", "#d32f2f", "#5d4037"];

  const blocks: Array<{ position: [number, number, number]; rotation: [number, number, number] }> = [];

  // Create tower structure - 18 layers
  for (let layer = 0; layer < 18; layer++) {
    const y = layer * 0.3;
    const isRotated = layer % 2 === 0;

    for (let i = 0; i < 3; i++) {
      if (isRotated) {
        blocks.push({
          position: [0, y, -0.9 + i * 0.9],
          rotation: [0, Math.PI / 2, 0],
        });
      } else {
        blocks.push({
          position: [-0.9 + i * 0.9, y, 0],
          rotation: [0, 0, 0],
        });
      }
    }
  }

  return (
    <group>
      {blocks.map((block, index) => (
        <JengaBlock
          key={index}
          position={block.position}
          rotation={block.rotation}
          color={blockColors[index % blockColors.length]}
          onPointerOver={() => setHoveredBlock(index)}
          onPointerOut={() => setHoveredBlock(null)}
          isHovered={hoveredBlock === index}
        />
      ))}
    </group>
  );
};

export const JengaTower3D = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [8, 4, 8], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7cb342" />
        
        <RedstoneBase />
        <Tower />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={6}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};
