import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a1a, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0x7c3aed, 2, 50);
    purpleLight.position.set(-10, 10, 10);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2, 50);
    cyanLight.position.set(10, -10, 10);
    scene.add(cyanLight);

    // Group for mouse parallax
    const parallaxGroup = new THREE.Group();
    scene.add(parallaxGroup);

    // Particles (800+ tiny white/blue)
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 850;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 60;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particleGeometry, particleMaterial);
    parallaxGroup.add(particlesMesh);

    // Orbiting rings
    const ringGeometry = new THREE.TorusGeometry(8, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.3 });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 2;
    parallaxGroup.add(ring1);
    
    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring2.rotation.y = Math.PI / 2;
    parallaxGroup.add(ring2);

    // Floating placeholder tool meshes (Low poly basic shapes)
    const items = new THREE.Group();
    for (let i = 0; i < 15; i++) {
        const isChip = Math.random() > 0.5;
        const geo = isChip 
            ? new THREE.BoxGeometry(1, 0.2, 1) 
            : new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
        const mat = new THREE.MeshStandardMaterial({ 
            color: isChip ? 0x222222 : 0x444444, 
            roughness: 0.7, 
            metalness: 0.8 
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20 - 5
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        
        mesh.userData = {
            rotSpeedX: (Math.random() - 0.5) * 0.02,
            rotSpeedY: (Math.random() - 0.5) * 0.02,
            floatSpeed: (Math.random()) * 0.01 + 0.005,
            floatOffset: Math.random() * Math.PI * 2
        };
        items.add(mesh);
    }
    parallaxGroup.add(items);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onDocumentMouseMove = (event: MouseEvent) => {
      // Normalize between -1 and 1
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', onDocumentMouseMove);

    // Resize Handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Animation Loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      // Pause if tab is hidden
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      time += 0.01;

      // Parallax effect (Max ~8 degrees or 0.14 radians)
      targetX = mouseX * 0.14;
      targetY = mouseY * 0.14;
      
      parallaxGroup.rotation.y += 0.05 * (targetX - parallaxGroup.rotation.y);
      parallaxGroup.rotation.x += 0.05 * (targetY - parallaxGroup.rotation.x);

      // Particle upward drifting
      const positions = particlesMesh.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.02; // drift up
        if (positions[i] > 30) {
          positions[i] = -30;
        }
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;

      // Orbiting rings
      ring1.rotation.y += 0.002;
      ring2.rotation.x += 0.002;

      // Pulsing Lights
      purpleLight.intensity = 1.5 + Math.sin(time * 2) * 0.5;
      cyanLight.intensity = 1.5 + Math.cos(time * 2) * 0.5;

      // Floating items
      items.children.forEach((child) => {
          child.rotation.x += child.userData.rotSpeedX;
          child.rotation.y += child.userData.rotSpeedY;
          child.position.y += Math.sin(time * 2 + child.userData.floatOffset) * child.userData.floatSpeed;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#0a0a1a' }}
    />
  );
}
