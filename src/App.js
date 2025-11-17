import React, { useEffect, useRef, useState } from "react";
import { X, Play, Pause, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

const NvidiaGPUShowcase = () => {
  const mountRef = useRef(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState("Normal");
  const [viewMode, setViewMode] = useState("Single");
  const sceneRef = useRef(null);

  const components = [
    {
      id: 1,
      name: "GPU Die Core",
      subtitle: "3nm Process Node",
      position: [0, 0.35, 0],
      color: "#76b900",
      icon: "⚡",
      details:
        "Revolutionary 3nm FinFET process technology delivering unprecedented transistor density and energy efficiency. Features 80 billion transistors with specialized AI compute units and advanced power management.",
      specs:
        "• 80B transistors\n• 3nm Samsung FinFET\n• 2.5 GHz boost clock\n• 50% power reduction vs 5nm\n• Advanced gate-all-around architecture",
      thermal: "52°C",
      maxTemp: "85°C",
      powerSavings: "18%",
      impact:
        "Core architecture enables 2.5x performance-per-watt improvement while maintaining thermal efficiency.",
      validation:
        "Beta tested by Microsoft Azure, Google Cloud, AWS, and Meta AI Research",
      timeline: "Alpha: Q2 2024 • Beta: Q4 2024 • Production: Q1 2025",
      cameraTarget: [0, 0.35, 0],
      cameraPosition: [0, 1, 3],
    },
    {
      id: 2,
      name: "HBM3e Memory Stacks",
      subtitle: "AI-Powered Memory Management",
      position: [1.3, 0.35, 0],
      color: "#00bfff",
      icon: "💾",
      details:
        "Next-generation HBM3e memory with integrated ML-based power gating controller. Intelligent memory subsystem predicts access patterns and dynamically powers down unused banks, achieving 900 GB/s bandwidth at 30% lower power.",
      specs:
        "• 900 GB/s bandwidth\n• 96GB total capacity (4x24GB stacks)\n• 30% power savings vs HBM3\n• AI prediction engine\n• Sub-microsecond bank switching",
      thermal: "48°C",
      maxTemp: "85°C",
      powerSavings: "12%",
      impact:
        "ML-based memory controller reduces memory subsystem power by 30% while maintaining full bandwidth for AI workloads.",
      validation:
        "Validated across transformer models (GPT, BERT), computer vision (ResNet, ViT), and recommendation systems",
      timeline:
        "Development: Q1 2024 • Integration: Q3 2024 • Production: Q1 2025",
      cameraTarget: [1.3, 0.35, 0],
      cameraPosition: [2, 1, 2],
    },
    {
      id: 3,
      name: "Integrated Vapor Chamber",
      subtitle: "Micro-Channel Liquid Cooling",
      position: [0, 0.85, 0],
      color: "#00ffff",
      icon: "❄️",
      details:
        "Advanced two-phase cooling system with 10,000 precision-etched micro-channels. Distributes heat 3x faster than traditional copper heat spreaders, maintaining 65°C junction temperature under sustained AI training loads vs 85°C in H100.",
      specs:
        "• 10,000 micro-channels\n• 65°C max junction temp\n• 500W+ heat dissipation\n• 20°C temperature reduction\n• 2-phase liquid cooling technology",
      thermal: "45°C",
      maxTemp: "75°C",
      powerSavings: "8%",
      impact:
        "69% improvement in thermal conductivity enables sustained boost clocks and extends component lifespan by 40%.",
      validation:
        "Thermal testing completed at Azure, GCP, and AWS data centers under production workloads",
      timeline: "Design: Q4 2023 • Prototyping: Q2 2024 • Production: Q1 2025",
      cameraTarget: [0, 0.85, 0],
      cameraPosition: [0, 2, 3],
    },
    {
      id: 4,
      name: "AI Power Controller",
      subtitle: "Neural Power Management",
      position: [-1.3, 0.35, -0.5],
      color: "#ff6b35",
      icon: "🧠",
      details:
        "Dedicated RISC-V ML chip running real-time power prediction models. Analyzes workload characteristics and adjusts voltage/frequency across 64 independent power domains within 1ms. Achieves 18% average power savings across diverse AI workloads.",
      specs:
        "• RISC-V core architecture\n• 18M predictions/sec\n• <5kB model overhead\n• <1ms response time\n• 64 independent power domains",
      thermal: "52°C",
      maxTemp: "85°C",
      powerSavings: "18%",
      impact:
        "Neural controller reduces average datacenter power by 18% while maintaining 99.97% uptime SLA.",
      validation:
        "Deployed in beta across 500+ Azure nodes, 300+ GCP instances, 400+ AWS servers",
      timeline:
        "ML Training: Q1 2024 • Chip Integration: Q3 2024 • Deployment: Q4 2024",
      cameraTarget: [-1.3, 0.35, -0.5],
      cameraPosition: [-2, 1, 1],
    },
    {
      id: 5,
      name: "GaN Voltage Regulator",
      subtitle: "16-Phase Power Delivery",
      position: [-1.6, 0.2, 0.6],
      color: "#9d4edd",
      icon: "⚙️",
      details:
        "Gallium Nitride (GaN) transistors replace traditional silicon MOSFETs in a 16-phase voltage regulation module. Achieves 99.2% efficiency vs 92% in conventional VRMs, reducing power delivery losses by 60W at full 700W load.",
      specs:
        "• 99.2% power efficiency\n• 16-phase digital control\n• GaN FET technology\n• 60W loss reduction\n• 1MHz switching frequency",
      thermal: "55°C",
      maxTemp: "95°C",
      powerSavings: "8.6%",
      impact:
        "Ultra-efficient power delivery reduces waste heat by 60W, lowering cooling requirements and improving overall system efficiency.",
      validation:
        "Power efficiency validated by independent labs and datacenter operators",
      timeline:
        "GaN Selection: Q3 2023 • Design: Q1 2024 • Production: Q1 2025",
      cameraTarget: [-1.6, 0.2, 0.6],
      cameraPosition: [-2.5, 0.8, 1.5],
    },
    {
      id: 6,
      name: "Tensor Core Array",
      subtitle: "Sparsity-Optimized Compute",
      position: [0.7, 0.25, 0.7],
      color: "#ffd60a",
      icon: "🔢",
      details:
        "5th-generation Tensor Cores with hardware-accelerated 2:4 structured sparsity support. Doubles effective compute throughput for AI workloads by exploiting weight sparsity in neural networks. Achieves 2000 TFLOPS for FP8 training.",
      specs:
        "• 2000 TFLOPS FP8\n• 2:4 structured sparsity\n• 512 tensor cores\n• 2x AI performance boost\n• FP8/FP16/TF32 precision",
      thermal: "58°C",
      maxTemp: "90°C",
      powerSavings: "15%",
      impact:
        "Sparsity optimization delivers 2x effective performance for modern transformer architectures while reducing power by 15%.",
      validation:
        "Validated on GPT-4 training, DALL-E 3, Claude 3, and Stable Diffusion XL workloads",
      timeline:
        "Architecture: Q2 2023 • Silicon: Q1 2024 • Validation: Q4 2024",
      cameraTarget: [0.7, 0.25, 0.7],
      cameraPosition: [1.5, 1, 2],
    },
  ];

  useEffect(() => {
    let scene,
      camera,
      renderer,
      gpu,
      gpuH100,
      hotspots = [],
      animationId,
      particles = [];
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0.3, y: 0 };
    let autoRotate = true;
    let rotationSpeed = 0.002;
    let targetCameraPosition = null;
    let targetCameraLookAt = null;
    let isZooming = false;

    const init = async () => {
      try {
        if (typeof window.THREE === "undefined") {
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
          script.async = false;

          await new Promise((resolve, reject) => {
            script.onload = () => {
              console.log("Three.js loaded successfully");
              resolve();
            };
            script.onerror = (e) => {
              console.error("Three.js failed to load", e);
              reject(new Error("Failed to load Three.js"));
            };
            document.head.appendChild(script);
          });

          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        const THREE = window.THREE;
        if (!THREE) {
          console.error("THREE is undefined after loading");
          throw new Error("Three.js failed to load");
        }
        console.log("THREE loaded:", THREE);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a1929);
        scene.fog = new THREE.Fog(0x0a1929, 15, 35);

        camera = new THREE.PerspectiveCamera(
          50,
          mountRef.current.clientWidth / mountRef.current.clientHeight,
          0.1,
          1000
        );
        camera.position.set(0, 5, 10);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(
          mountRef.current.clientWidth,
          mountRef.current.clientHeight
        );
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.3;
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(8, 12, 8);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        scene.add(mainLight);

        const fillLight = new THREE.DirectionalLight(0x76b900, 0.4);
        fillLight.position.set(-6, 6, -6);
        scene.add(fillLight);

        const rimLight = new THREE.PointLight(0x00ffff, 0.8, 20);
        rimLight.position.set(0, 10, -10);
        scene.add(rimLight);

        gpu = new THREE.Group();
        gpu.position.x = viewMode === "Compare" ? -3 : 0;
        scene.add(gpu);

        // Create H100 for comparison
        gpuH100 = new THREE.Group();
        gpuH100.position.x = 3;
        gpuH100.visible = viewMode === "Compare";
        scene.add(gpuH100);

        // PCB Base
        const pcbGeometry = new THREE.BoxGeometry(5, 0.15, 4);
        const pcbMaterial = new THREE.MeshStandardMaterial({
          color: 0x1a3d1a,
          metalness: 0.4,
          roughness: 0.6,
        });
        const pcb = new THREE.Mesh(pcbGeometry, pcbMaterial);
        pcb.castShadow = true;
        pcb.receiveShadow = true;
        gpu.add(pcb);

        // GPU Die Core
        const dieGeometry = new THREE.BoxGeometry(1.8, 0.35, 1.8);
        const dieMaterial = new THREE.MeshStandardMaterial({
          color: 0x0a0a0a,
          metalness: 0.95,
          roughness: 0.1,
          emissive: 0x76b900,
          emissiveIntensity: 0.4,
        });
        const die = new THREE.Mesh(dieGeometry, dieMaterial);
        die.position.set(0, 0.35, 0);
        die.castShadow = true;
        gpu.add(die);

        // LED grid
        for (let i = 0; i < 15; i++) {
          for (let j = 0; j < 15; j++) {
            const ledGeometry = new THREE.SphereGeometry(0.015, 8, 8);
            const ledMaterial = new THREE.MeshStandardMaterial({
              color: 0x76b900,
              emissive: 0x76b900,
              emissiveIntensity: 1,
            });
            const led = new THREE.Mesh(ledGeometry, ledMaterial);
            led.position.set((i - 7) * 0.11, 0.53, (j - 7) * 0.11);
            gpu.add(led);
          }
        }

        // HBM3e Memory Stacks
        const memoryPositions = [
          [1.3, 0.35, 0],
          [-1.3, 0.35, 0],
          [0, 0.35, 1.1],
          [0, 0.35, -1.1],
        ];
        memoryPositions.forEach((pos) => {
          const stackGroup = new THREE.Group();
          for (let i = 0; i < 10; i++) {
            const layerGeometry = new THREE.BoxGeometry(0.6, 0.05, 0.6);
            const layerMaterial = new THREE.MeshStandardMaterial({
              color: i % 2 === 0 ? 0x1e90ff : 0x0066cc,
              metalness: 0.9,
              roughness: 0.15,
              emissive: 0x00bfff,
              emissiveIntensity: 0.25,
            });
            const layer = new THREE.Mesh(layerGeometry, layerMaterial);
            layer.position.y = i * 0.06;
            layer.castShadow = true;
            stackGroup.add(layer);
          }
          stackGroup.position.set(...pos);
          gpu.add(stackGroup);
        });

        // Vapor Chamber
        const chamberGeometry = new THREE.BoxGeometry(4.2, 0.25, 3.5);
        const chamberMaterial = new THREE.MeshStandardMaterial({
          color: 0x00ffff,
          metalness: 0.95,
          roughness: 0.05,
          transparent: true,
          opacity: 0.5,
          emissive: 0x00ffff,
          emissiveIntensity: 0.4,
        });
        const chamber = new THREE.Mesh(chamberGeometry, chamberMaterial);
        chamber.position.set(0, 0.85, 0);
        chamber.castShadow = true;
        gpu.add(chamber);

        // Cooling Pipes
        for (let i = 0; i < 8; i++) {
          const pipeGeometry = new THREE.CylinderGeometry(0.06, 0.06, 4, 16);
          const pipeMaterial = new THREE.MeshStandardMaterial({
            color: 0x00dddd,
            metalness: 1,
            roughness: 0.15,
            emissive: 0x00ffff,
            emissiveIntensity: 0.2,
          });
          const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
          pipe.rotation.z = Math.PI / 2;
          pipe.position.set(0, 0.95, -1.4 + i * 0.4);
          pipe.castShadow = true;
          gpu.add(pipe);
        }

        // AI Power Controller
        const aiControllerGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.5);
        const aiControllerMaterial = new THREE.MeshStandardMaterial({
          color: 0xff6b35,
          metalness: 0.8,
          roughness: 0.25,
          emissive: 0xff6b35,
          emissiveIntensity: 0.5,
        });
        const aiController = new THREE.Mesh(
          aiControllerGeometry,
          aiControllerMaterial
        );
        aiController.position.set(-1.3, 0.35, -0.5);
        aiController.castShadow = true;
        gpu.add(aiController);

        // GaN VRM
        const vrmGeometry = new THREE.BoxGeometry(0.7, 0.25, 0.4);
        const vrmMaterial = new THREE.MeshStandardMaterial({
          color: 0x9d4edd,
          metalness: 0.85,
          roughness: 0.2,
          emissive: 0x9d4edd,
          emissiveIntensity: 0.4,
        });
        const vrm = new THREE.Mesh(vrmGeometry, vrmMaterial);
        vrm.position.set(-1.6, 0.2, 0.6);
        vrm.castShadow = true;
        gpu.add(vrm);

        // Tensor Cores
        const tensorGeometry = new THREE.BoxGeometry(0.9, 0.25, 0.9);
        const tensorMaterial = new THREE.MeshStandardMaterial({
          color: 0xffd60a,
          metalness: 0.8,
          roughness: 0.25,
          emissive: 0xffd60a,
          emissiveIntensity: 0.45,
        });
        const tensor = new THREE.Mesh(tensorGeometry, tensorMaterial);
        tensor.position.set(0.7, 0.25, 0.7);
        tensor.castShadow = true;
        gpu.add(tensor);

        // Heat Sink Fins
        for (let i = 0; i < 14; i++) {
          const finGeometry = new THREE.BoxGeometry(3.8, 0.03, 0.12);
          const finMaterial = new THREE.MeshStandardMaterial({
            color: 0xb0b0b0,
            metalness: 0.95,
            roughness: 0.25,
          });
          const fin = new THREE.Mesh(finGeometry, finMaterial);
          fin.position.set(0, 1.3 + i * 0.09, -1.5 + i * 0.25);
          fin.castShadow = true;
          gpu.add(fin);
        }

        // Build H100 (comparison model - less efficient)
        const buildH100 = () => {
          // H100 PCB
          const h100PcbGeometry = new THREE.BoxGeometry(5, 0.15, 4);
          const h100PcbMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            metalness: 0.4,
            roughness: 0.6,
          });
          const h100Pcb = new THREE.Mesh(h100PcbGeometry, h100PcbMaterial);
          h100Pcb.castShadow = true;
          h100Pcb.receiveShadow = true;
          gpuH100.add(h100Pcb);

          // H100 Die (larger, hotter)
          const h100DieGeometry = new THREE.BoxGeometry(2, 0.4, 2);
          const h100DieMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a0000,
            metalness: 0.95,
            roughness: 0.1,
            emissive: 0xff3333,
            emissiveIntensity: 0.6,
          });
          const h100Die = new THREE.Mesh(h100DieGeometry, h100DieMaterial);
          h100Die.position.set(0, 0.35, 0);
          h100Die.castShadow = true;
          gpuH100.add(h100Die);

          // H100 Memory (standard HBM3)
          const h100MemPositions = [
            [1.5, 0.35, 0],
            [-1.5, 0.35, 0],
            [0, 0.35, 1.2],
            [0, 0.35, -1.2],
          ];
          h100MemPositions.forEach((pos) => {
            const stackGroup = new THREE.Group();
            for (let i = 0; i < 8; i++) {
              const layerGeometry = new THREE.BoxGeometry(0.7, 0.06, 0.7);
              const layerMaterial = new THREE.MeshStandardMaterial({
                color: 0x666666,
                metalness: 0.8,
                roughness: 0.3,
                emissive: 0xff6666,
                emissiveIntensity: 0.15,
              });
              const layer = new THREE.Mesh(layerGeometry, layerMaterial);
              layer.position.y = i * 0.07;
              layer.castShadow = true;
              stackGroup.add(layer);
            }
            stackGroup.position.set(...pos);
            gpuH100.add(stackGroup);
          });

          // H100 Traditional Cooling (less efficient)
          const h100CoolerGeometry = new THREE.BoxGeometry(4.5, 0.3, 3.8);
          const h100CoolerMaterial = new THREE.MeshStandardMaterial({
            color: 0x444444,
            metalness: 0.7,
            roughness: 0.4,
            emissive: 0xff4444,
            emissiveIntensity: 0.3,
          });
          const h100Cooler = new THREE.Mesh(
            h100CoolerGeometry,
            h100CoolerMaterial
          );
          h100Cooler.position.set(0, 0.9, 0);
          h100Cooler.castShadow = true;
          gpuH100.add(h100Cooler);

          // H100 Heat Sink (larger due to more heat)
          for (let i = 0; i < 18; i++) {
            const finGeometry = new THREE.BoxGeometry(4.2, 0.04, 0.15);
            const finMaterial = new THREE.MeshStandardMaterial({
              color: 0x888888,
              metalness: 0.9,
              roughness: 0.3,
            });
            const fin = new THREE.Mesh(finGeometry, finMaterial);
            fin.position.set(0, 1.4 + i * 0.1, -1.8 + i * 0.2);
            fin.castShadow = true;
            gpuH100.add(fin);
          }
        };

        buildH100();

        // Create hotspot markers
        components.forEach((comp) => {
          const hotspotGroup = new THREE.Group();

          const ringGeometry = new THREE.TorusGeometry(0.18, 0.025, 16, 32);
          const ringMaterial = new THREE.MeshStandardMaterial({
            color: comp.color,
            emissive: comp.color,
            emissiveIntensity: 1,
            metalness: 0.8,
            roughness: 0.2,
          });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.x = Math.PI / 2;
          hotspotGroup.add(ring);

          const sphereGeometry = new THREE.SphereGeometry(0.1, 20, 20);
          const sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: comp.color,
            emissiveIntensity: 0.6,
            metalness: 0.9,
            roughness: 0.1,
          });
          const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
          hotspotGroup.add(sphere);

          const plusMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
          const hBarGeometry = new THREE.BoxGeometry(0.1, 0.02, 0.015);
          const vBarGeometry = new THREE.BoxGeometry(0.02, 0.1, 0.015);
          const hBar = new THREE.Mesh(hBarGeometry, plusMaterial);
          const vBar = new THREE.Mesh(vBarGeometry, plusMaterial);
          hBar.position.z = 0.105;
          vBar.position.z = 0.105;
          hotspotGroup.add(hBar);
          hotspotGroup.add(vBar);

          const canvas = document.createElement("canvas");
          canvas.width = 128;
          canvas.height = 128;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = comp.color;
          ctx.beginPath();
          ctx.arc(64, 64, 60, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#000000";
          ctx.font = "bold 70px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(comp.id.toString(), 64, 64);

          const texture = new THREE.CanvasTexture(canvas);
          const badgeGeometry = new THREE.PlaneGeometry(0.25, 0.25);
          const badgeMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.95,
          });
          const badge = new THREE.Mesh(badgeGeometry, badgeMaterial);
          badge.position.set(0.3, 0.3, 0);
          hotspotGroup.add(badge);

          hotspotGroup.position.set(...comp.position);
          hotspotGroup.userData = { componentId: comp.id };
          hotspotGroup.name = `hotspot-${comp.id}`;

          gpu.add(hotspotGroup);
          hotspots.push(hotspotGroup);
        });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseDown = (event) => {
          isDragging = true;
          autoRotate = false;
          previousMousePosition = { x: event.clientX, y: event.clientY };
        };

        const onMouseMove = (event) => {
          const rect = renderer.domElement.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          if (isDragging) {
            const deltaMove = {
              x: event.clientX - previousMousePosition.x,
              y: event.clientY - previousMousePosition.y,
            };
            targetRotation.y += deltaMove.x * 0.005;
            targetRotation.x += deltaMove.y * 0.005;
            targetRotation.x = Math.max(
              -Math.PI / 2,
              Math.min(Math.PI / 2, targetRotation.x)
            );
            previousMousePosition = { x: event.clientX, y: event.clientY };
          } else {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(hotspots, true);
            renderer.domElement.style.cursor =
              intersects.length > 0 ? "pointer" : "grab";
            hotspots.forEach((hotspot) => {
              const scale =
                intersects.length > 0 && intersects[0].object.parent === hotspot
                  ? 1.4
                  : 1;
              hotspot.scale.setScalar(scale);
            });
          }
        };

        const onMouseUp = () => {
          isDragging = false;
        };

        const onClick = (event) => {
          const rect = renderer.domElement.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(hotspots, true);

          if (intersects.length > 0) {
            const hotspot = intersects[0].object.parent;
            const componentId = hotspot.userData.componentId;
            const component = components.find((c) => c.id === componentId);
            if (component) {
              setSelectedComponent(component);
              isZooming = true;
              autoRotate = false;
              targetCameraPosition = new THREE.Vector3(
                ...component.cameraPosition
              );
              targetCameraLookAt = new THREE.Vector3(...component.cameraTarget);
            }
          }
        };

        renderer.domElement.addEventListener("mousedown", onMouseDown);
        renderer.domElement.addEventListener("mousemove", onMouseMove);
        renderer.domElement.addEventListener("mouseup", onMouseUp);
        renderer.domElement.addEventListener("click", onClick);
        renderer.domElement.style.cursor = "grab";

        const animate = () => {
          animationId = requestAnimationFrame(animate);

          if (autoRotate && !isPaused && !isZooming) {
            targetRotation.y += rotationSpeed;
          }

          currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
          currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;
          gpu.rotation.x = currentRotation.x;
          gpu.rotation.y = currentRotation.y;
          gpuH100.rotation.x = currentRotation.x;
          gpuH100.rotation.y = currentRotation.y;

          if (targetCameraPosition && targetCameraLookAt) {
            camera.position.lerp(targetCameraPosition, 0.05);
            const currentLookAt = new THREE.Vector3();
            camera.getWorldDirection(currentLookAt);
            currentLookAt.multiplyScalar(10);
            currentLookAt.add(camera.position);
            currentLookAt.lerp(targetCameraLookAt, 0.05);
            camera.lookAt(currentLookAt);

            if (camera.position.distanceTo(targetCameraPosition) < 0.1) {
              isZooming = false;
            }
          }

          hotspots.forEach((hotspot) => {
            hotspot.quaternion.copy(camera.quaternion);
          });

          renderer.render(scene, camera);
        };

        animate();
        setLoading(false);

        sceneRef.current = {
          scene,
          camera,
          renderer,
          gpu,
          gpuH100,
          hotspots,
          setTargetCamera: (pos, lookAt) => {
            targetCameraPosition = new THREE.Vector3(...pos);
            targetCameraLookAt = new THREE.Vector3(...lookAt);
            isZooming = true;
            autoRotate = false;
          },
          setAutoRotate: (val) => {
            autoRotate = val;
          },
          setRotationSpeed: (val) => {
            rotationSpeed = val;
          },
          resetCamera: () => {
            targetCameraPosition = new THREE.Vector3(0, 5, 10);
            targetCameraLookAt = new THREE.Vector3(0, 0, 0);
            isZooming = true;
            autoRotate = true;
          },
          updateViewMode: (mode) => {
            if (mode === "Compare") {
              gpu.position.x = -3;
              gpuH100.visible = true;
              camera.position.set(0, 6, 12);
              camera.lookAt(0, 0, 0);
            } else {
              gpu.position.x = 0;
              gpuH100.visible = false;
              camera.position.set(0, 5, 10);
              camera.lookAt(0, 0, 0);
            }
          },
        };
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    init();

    const handleResize = () => {
      if (sceneRef.current && mountRef.current) {
        const { camera, renderer } = sceneRef.current;
        camera.aspect =
          mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          mountRef.current.clientWidth,
          mountRef.current.clientHeight
        );
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (sceneRef.current?.renderer) {
        sceneRef.current.renderer.dispose();
        if (mountRef.current?.contains(sceneRef.current.renderer.domElement)) {
          mountRef.current.removeChild(sceneRef.current.renderer.domElement);
        }
      }
    };
  }, [isPaused, viewMode]);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    if (sceneRef.current) {
      sceneRef.current.updateViewMode(mode);
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (sceneRef.current) {
      const speeds = { Slow: 0.001, Normal: 0.002, Fast: 0.004 };
      sceneRef.current.setRotationSpeed(speeds[newSpeed]);
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    if (sceneRef.current) {
      sceneRef.current.resetCamera();
      setSelectedComponent(null);
      setIsPaused(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-950 via-teal-950 to-gray-950 relative overflow-hidden">
      <div
        ref={mountRef}
        className="w-full h-full"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
          <div className="text-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500 mx-auto mb-4"></div>
            <p className="text-green-500 text-xl font-bold">
              Loading Interactive Showcase...
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
          <div className="text-red-500 text-center p-8">
            <p className="text-2xl font-bold mb-4">Error Loading 3D Scene</p>
            <p className="text-lg">{error}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-teal-900 to-transparent p-6 pointer-events-none"
        style={{ pointerEvents: "none" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-1">
              NVIDIA <span className="text-green-400">Green GPU</span> -
              Interactive Technical Showcase
            </h1>
            <p className="text-gray-300 text-sm">
              Click [+] buttons to explore innovations
            </p>
          </div>
          <div className="flex gap-6 text-right">
            <div>
              <p className="text-gray-400 text-xs uppercase">Power</p>
              <p className="text-green-400 font-bold text-2xl">350W</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">Temp</p>
              <p className="text-cyan-400 font-bold text-2xl">65°C</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">Process</p>
              <p className="text-yellow-400 font-bold text-2xl">3nm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Innovation List Panel */}
      <div
        className="absolute left-6 top-24 bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-lg p-4 w-72 border border-teal-700"
        style={{ maxHeight: "calc(100vh - 200px)", pointerEvents: "auto" }}
      >
        <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wide">
          Innovation Map
        </h3>
        <p className="text-gray-400 text-xs mb-3">Click to explore</p>

        <div
          className="space-y-2 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 420px)" }}
        >
          {components.map((comp) => (
            <button
              key={comp.id}
              onClick={() => {
                setSelectedComponent(comp);
                if (sceneRef.current) {
                  sceneRef.current.setTargetCamera(
                    comp.cameraPosition,
                    comp.cameraTarget
                  );
                }
              }}
              className={`w-full text-left p-2 rounded-lg hover:bg-gray-800 transition-all flex items-start gap-2 border-2 ${
                selectedComponent?.id === comp.id
                  ? "border-opacity-100 bg-gray-800"
                  : "border-transparent"
              }`}
              style={{
                borderColor:
                  selectedComponent?.id === comp.id
                    ? comp.color
                    : "transparent",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg flex-shrink-0 shadow-lg"
                style={{ backgroundColor: comp.color }}
              >
                {comp.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-black"
                    style={{ backgroundColor: comp.color }}
                  >
                    {comp.id}
                  </span>
                  <span className="text-white text-xs font-semibold truncate">
                    {comp.name}
                  </span>
                </div>
                <p className="text-teal-400 text-[10px] font-medium mb-1 leading-tight">
                  {comp.subtitle}
                </p>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-green-400 font-semibold">
                    {comp.powerSavings}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-cyan-400 font-semibold">
                    {comp.thermal}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-gray-800 rounded p-1.5">
              <p className="text-green-400 font-bold text-sm">350W</p>
              <p className="text-gray-400 text-[9px]">Power</p>
            </div>
            <div className="bg-gray-800 rounded p-1.5">
              <p className="text-cyan-400 font-bold text-sm">65°C</p>
              <p className="text-gray-400 text-[9px]">Temp</p>
            </div>
            <div className="bg-gray-800 rounded p-1.5">
              <p className="text-yellow-400 font-bold text-sm">-50%</p>
              <p className="text-gray-400 text-[9px]">vs H100</p>
            </div>
            <div className="bg-gray-800 rounded p-1.5">
              <p className="text-purple-400 font-bold text-sm">3nm</p>
              <p className="text-gray-400 text-[9px]">Process</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Controls */}
      <div
        className="absolute left-6 bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-lg p-3 border border-teal-700 w-72"
        style={{ bottom: "24px", pointerEvents: "auto" }}
      >
        <h3 className="text-white font-bold mb-2 text-xs uppercase tracking-wide">
          Animation Controls
        </h3>

        <div className="space-y-2">
          <button
            onClick={handlePause}
            className="flex items-center justify-center gap-2 w-full px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded transition-colors text-sm"
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
            <span className="font-semibold">
              {isPaused ? "Resume" : "Pause"}
            </span>
          </button>

          <div>
            <p className="text-gray-400 text-[10px] mb-1 uppercase">Speed</p>
            <div className="flex gap-1">
              {["Slow", "Normal", "Fast"].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSpeedChange(s)}
                  className={`flex-1 px-2 py-1 rounded text-[10px] font-semibold transition-colors ${
                    speed === s
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-[10px] mb-1 uppercase">Camera</p>
            <div className="flex gap-1">
              <button
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-1 p-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors text-[10px]"
                title="Reset"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-[10px] mb-1 uppercase">View</p>
            <div className="flex gap-1">
              {["Single", "Compare"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleViewModeChange(mode)}
                  className={`flex-1 px-2 py-1 rounded text-[10px] font-semibold transition-colors ${
                    viewMode === mode
                      ? "bg-teal-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedComponent && (
        <div
          className="absolute right-6 bg-gray-900 bg-opacity-95 backdrop-blur-md rounded-xl p-5 w-[420px] border-2 shadow-2xl"
          style={{
            borderColor: selectedComponent.color,
            top: "96px",
            maxHeight: "calc(100vh - 120px)",
            overflowY: "auto",
            pointerEvents: "auto",
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                style={{ backgroundColor: selectedComponent.color }}
              >
                {selectedComponent.icon}
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">
                  {selectedComponent.name}
                </h2>
                <p className="text-teal-400 text-sm font-semibold">
                  {selectedComponent.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedComponent(null);
                if (sceneRef.current) sceneRef.current.resetCamera();
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-teal-400 font-bold mb-2 text-xs uppercase tracking-wide flex items-center gap-2">
                ⚡ Innovation Details
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {selectedComponent.details}
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3">
              <h3 className="text-teal-400 font-bold mb-2 text-xs uppercase tracking-wide">
                Technical Specifications
              </h3>
              <p className="text-gray-300 whitespace-pre-line text-xs leading-relaxed font-mono">
                {selectedComponent.specs}
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3">
              <h3 className="text-cyan-400 font-bold mb-2 text-xs uppercase tracking-wide">
                Thermal Profile
              </h3>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1">
                  <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                      style={{
                        width: `${
                          (parseFloat(selectedComponent.thermal) /
                            parseFloat(selectedComponent.maxTemp)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-cyan-400 font-bold text-base">
                  {selectedComponent.thermal}
                </span>
              </div>
              <p className="text-gray-400 text-xs">
                Max operating temperature: {selectedComponent.maxTemp}
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3">
              <h3 className="text-green-400 font-bold mb-2 text-xs uppercase tracking-wide">
                Performance Impact
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-green-400">
                  {selectedComponent.powerSavings}
                </span>
                <span className="text-xs text-gray-400">
                  average power savings
                </span>
              </div>
              <p className="text-gray-300 text-xs">
                {selectedComponent.impact}
              </p>
            </div>

            <div className="bg-teal-900 bg-opacity-30 rounded-lg p-3 border border-teal-700">
              <h3 className="text-teal-300 font-bold mb-2 text-xs uppercase tracking-wide flex items-center gap-2">
                ✓ Production Validated
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                {selectedComponent.validation}
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-30 rounded-lg p-2.5">
              <h3 className="text-yellow-400 font-bold mb-1.5 text-xs uppercase tracking-wide">
                Development Timeline
              </h3>
              <p className="text-gray-300 text-xs font-mono">
                {selectedComponent.timeline}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Labels */}
      {viewMode === "Compare" && (
        <>
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bg-green-900 bg-opacity-90 backdrop-blur-md rounded-lg p-4 text-center border-2 border-green-500">
              <h3 className="text-green-400 font-bold text-2xl mb-2">
                Green GPU
              </h3>
              <div className="space-y-1 text-sm">
                <p className="text-white">
                  <span className="text-green-400 font-bold">350W</span> Power
                </p>
                <p className="text-white">
                  <span className="text-cyan-400 font-bold">65°C</span> Temp
                </p>
                <p className="text-white">
                  <span className="text-yellow-400 font-bold">3nm</span> Process
                </p>
                <p className="text-green-400 font-bold text-lg mt-2">
                  50% Less Power
                </p>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bg-red-900 bg-opacity-90 backdrop-blur-md rounded-lg p-4 text-center border-2 border-red-500">
              <h3 className="text-red-400 font-bold text-2xl mb-2">H100</h3>
              <div className="space-y-1 text-sm">
                <p className="text-white">
                  <span className="text-red-400 font-bold">700W</span> Power
                </p>
                <p className="text-white">
                  <span className="text-orange-400 font-bold">85°C</span> Temp
                </p>
                <p className="text-white">
                  <span className="text-gray-400 font-bold">5nm</span> Process
                </p>
                <p className="text-red-400 font-bold text-lg mt-2">
                  Legacy Design
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Performance Stats */}
      <div
        className="absolute bottom-6 right-6 bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-lg p-4 border border-teal-700"
        style={{ pointerEvents: "auto" }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-green-400 font-bold text-3xl">99.97%</p>
            <p className="text-gray-400 text-xs uppercase">Uptime</p>
          </div>
          <div className="text-center">
            <p className="text-green-400 font-bold text-3xl">47-52%</p>
            <p className="text-gray-400 text-xs uppercase">Power Cut</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NvidiaGPUShowcase;
