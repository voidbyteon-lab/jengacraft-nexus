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
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Pulse effect for rings
      if (ringRef1.current && ringRef2.current && ringRef3.current) {
        const pulse1 = Math.sin(time * 2) * 0.3 + 0.7;
        const pulse2 = Math.sin(time * 2 + Math.PI / 3) * 0.3 + 0.7;
        const pulse3 = Math.sin(time * 2 + (Math.PI * 2) / 3) * 0.3 + 0.7;
        
        (ringRef1.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse1;
        (ringRef2.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse2;
        (ringRef3.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse3;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main platform base - dark metallic */}
      <Box args={[5, 0.3, 5]} position={[0, -0.65, 0]}>
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.2}
          metalness={0.9}
        />
      </Box>

      {/* Inner platform - slightly elevated */}
      <Box args={[4.5, 0.2, 4.5]} position={[0, -0.4, 0]}>
        <meshStandardMaterial
          color="#0f0f1e"
          roughness={0.3}
          metalness={0.8}
          emissive="#ff1744"
          emissiveIntensity={0.2}
        />
      </Box>

      {/* Red glowing ring 1 - outer */}
      <mesh ref={ringRef1} position={[0, -0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.0, 64]} />
        <meshStandardMaterial
          color="#ff1744"
          emissive="#ff1744"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Red glowing ring 2 - middle */}
      <mesh ref={ringRef2} position={[0, -0.27, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.5, 64]} />
        <meshStandardMaterial
          color="#ff4569"
          emissive="#ff4569"
          emissiveIntensity={0.9}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Red glowing ring 3 - inner */}
      <mesh ref={ringRef3} position={[0, -0.26, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.0, 64]} />
        <meshStandardMaterial
          color="#ff6b8a"
          emissive="#ff6b8a"
          emissiveIntensity={1.0}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cyan edge lights - 8 positions around the base */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <Box key={i} args={[0.15, 0.4, 0.15]} position={[x, -0.5, z]}>
            <meshStandardMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={1.5}
              metalness={0.9}
              roughness={0.1}
            />
          </Box>
        );
      })}

      {/* Point lights for atmosphere */}
      <pointLight position={[0, -0.3, 0]} intensity={2} color="#ff1744" distance={6} />
      <pointLight position={[2, -0.5, 0]} intensity={1} color="#00e5ff" distance={4} />
      <pointLight position={[-2, -0.5, 0]} intensity={1} color="#00e5ff" distance={4} />
      <pointLight position={[0, -0.5, 2]} intensity={1} color="#00e5ff" distance={4} />
      <pointLight position={[0, -0.5, -2]} intensity={1} color="#00e5ff" distance={4} />
    </group>
  );
};

const Tower = () => {
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);

  // Minecraft block colors matching the reference image
  const blockColors = [
    "#7cb342", // Grass block - green
    "#8b5a3c", // Wood/Oak - brown
    "#9e9e9e", // Stone - gray
    "#d32f2f", // TNT/Redstone - red
    "#00e5ff", // Diamond - cyan
    "#ffd54f", // Glowstone - yellow/gold
    "#5d4037", // Dark wood
    "#4caf50", // Bright grass
  ];

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
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-10, 10, -5]} intensity={0.6} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#7cb342" />
        <pointLight position={[10, -10, 5]} intensity={0.8} color="#00e5ff" />
        
        <RedstoneBase />
        <Tower />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={6}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
        />
        
        {/* Fog for atmosphere */}
        <fog attach="fog" args={['#0a0a1a', 10, 25]} />
      </Canvas>
    </div>
  );
};
