"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface StereonetProps {
  measurements: {
    strike: number;
    dip: number;
    type?: string;
  }[];
}

export function Stereonet({ measurements }: StereonetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous render if it exists
    containerRef.current.innerHTML = "";

    // Scene setup with lighter background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const width = containerRef.current.offsetWidth || 400;
    const height = containerRef.current.offsetHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Sphere with enhanced material
    const radius = 1.5;
    const sphereGeometry = new THREE.SphereGeometry(radius, 64, 64);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xf8f9fa,
      shininess: 60,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Grid Lines with improved visibility
    const gridGroup = new THREE.Group();
    const gridMaterial = new THREE.LineBasicMaterial({ 
      color: 0x666666,
      transparent: true,
      opacity: 0.3
    });

    // Latitude lines
    for (let i = 10; i < 90; i += 10) {
      const angle = (i * Math.PI) / 180;
      const circleRadius = radius * Math.sin(angle);
      const gridGeometry = new THREE.BufferGeometry();
      const points = [];
      for (let j = 0; j <= 360; j += 1) {
        const theta = (j * Math.PI) / 180;
        points.push(
          new THREE.Vector3(
            circleRadius * Math.cos(theta),
            0,
            circleRadius * Math.sin(theta)
          )
        );
      }
      gridGeometry.setFromPoints(points);
      const gridLine = new THREE.LineLoop(gridGeometry, gridMaterial);
      gridLine.rotation.x = Math.PI / 2;
      gridGroup.add(gridLine);
    }

    // Longitude lines
    for (let i = 0; i < 360; i += 10) {
      const lineGeometry = new THREE.BufferGeometry();
      const points = [];
      for (let j = -90; j <= 90; j += 5) {
        const phi = (j * Math.PI) / 180;
        const theta = (i * Math.PI) / 180;
        points.push(
          new THREE.Vector3(
            radius * Math.cos(phi) * Math.cos(theta),
            radius * Math.cos(phi) * Math.sin(theta),
            radius * Math.sin(phi)
          )
        );
      }
      lineGeometry.setFromPoints(points);
      const line = new THREE.Line(lineGeometry, gridMaterial);
      gridGroup.add(line);
    }

    scene.add(gridGroup);

    // Enhanced Cardinal Directions with better visibility
    const directions = [
      { label: "N", angle: 0, color: "#ff4444", isMain: true },
      { label: "NE", angle: 45, color: "#666666", isMain: false },
      { label: "E", angle: 90, color: "#000000", isMain: true },
      { label: "SE", angle: 135, color: "#666666", isMain: false },
      { label: "S", angle: 180, color: "#000000", isMain: true },
      { label: "SW", angle: 225, color: "#666666", isMain: false },
      { label: "W", angle: 270, color: "#000000", isMain: true },
      { label: "NW", angle: 315, color: "#666666", isMain: false }
    ];

    const createTextSprite = (text: string, color: string, isLarge: boolean = false) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      canvas.width = 256;
      canvas.height = 128;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Text with outline for better visibility
      context.font = `bold ${isLarge ? 48 : 36}px Arial`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      
      // Draw text outline
      context.strokeStyle = "#ffffff";
      context.lineWidth = 4;
      context.strokeText(text, canvas.width / 2, canvas.height / 2);
      
      // Draw text
      context.fillStyle = color;
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true,
        sizeAttenuation: false
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(0.15, 0.075, 1);
      if (isLarge) {
        sprite.scale.multiplyScalar(1.2);
      }
      return sprite;
    };

    // Add direction labels with improved positioning
    directions.forEach(({ label, angle, color, isMain }) => {
      const theta = (angle * Math.PI) / 180;
      const positionRadius = radius * 1.2;
      const x = positionRadius * Math.sin(theta);
      const y = positionRadius * Math.cos(theta);
      const z = 0;

      const sprite = createTextSprite(label, color, isMain);
      sprite.position.set(x, y, z);
      scene.add(sprite);

      // Add degree markers for main directions
      if (isMain) {
        const degreeSprite = createTextSprite(`${angle}°`, "#000000", true);
        const degreeRadius = radius * 1.35;
        degreeSprite.position.set(
          degreeRadius * Math.sin(theta),
          degreeRadius * Math.cos(theta),
          0
        );
        scene.add(degreeSprite);
      }
    });

    // Enhanced measurement points
    measurements.forEach(({ strike, dip }) => {
      const theta = ((90 - strike) * Math.PI) / 180;
      const phi = (dip * Math.PI) / 180;

      // Calculate position on sphere
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Create point with glow effect
      const pointGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const pointMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.5,
      });
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.set(x, y, z);
      scene.add(point);

      // Add measurement label with outline
      const labelSprite = createTextSprite(`${strike}°/${dip}°`, "#000000");
      labelSprite.position.set(x * 1.1, y * 1.1, z * 1.1);
      scene.add(labelSprite);
    });

    // Enhanced controls
    const controls = new (require("three/examples/jsm/controls/OrbitControls").OrbitControls)(
      camera,
      renderer.domElement
    );
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 3;
    controls.maxDistance = 10;

    // Animation Loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.offsetWidth;
      const newHeight = containerRef.current.offsetHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
    };
  }, [measurements]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "500px", 
        height: "500px", 
        cursor: "grab",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }} 
    />
  );
}