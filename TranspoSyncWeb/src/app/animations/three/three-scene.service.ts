import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({ providedIn: 'root' })
export class ThreeSceneService {
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private animationId!: number;
    private nodes: THREE.Mesh[] = [];
    private lines: THREE.Line[] = [];
    private particles!: THREE.Points;
    private time = 0;

    initScene(canvas: HTMLCanvasElement): void {
        this.nodes = [];
        this.lines = [];

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0f172a);
        this.scene.fog = new THREE.Fog(0x0f172a, 10, 30);

        const { width, height } = canvas.getBoundingClientRect();
        this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
        this.camera.position.set(0, 1.5, 9);

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;

        this._buildNetwork();
        this._addParticles();
        this._addLighting();
        this._animate();
    }

    private _buildNetwork(): void {
        const nodePositions: [number, number, number][] = [
            [-4, 2, 0], [-1.5, 3, 0.5], [1.8, 2.8, -0.5],
            [4, 0.8, 0], [2.2, -1.5, 0.5], [-2, -2, 0],
            [0.2, 0.2, 1.2], [-3.2, 0.2, -0.5], [0, -3, -0.5]
        ];

        const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
            [1, 6], [2, 6], [6, 4], [0, 7], [7, 5], [5, 8], [8, 4]
        ];

        const colors = [0x3b82f6, 0x8b5cf6, 0x06b6d4, 0x10b981, 0xf59e0b];

        nodePositions.forEach((pos, i) => {
            const geo = new THREE.SphereGeometry(0.18, 24, 24);
            const color = colors[i % colors.length];
            const mat = new THREE.MeshPhongMaterial({
                color,
                emissive: color,
                emissiveIntensity: 0.5,
                shininess: 120
            });
            const node = new THREE.Mesh(geo, mat);
            node.position.set(...pos);
            this.scene.add(node);
            this.nodes.push(node);

            const ringGeo = new THREE.RingGeometry(0.25, 0.32, 32);
            const ringMat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.set(...pos);
            this.scene.add(ring);
        });

        connections.forEach(([a, b]) => {
            const posA = new THREE.Vector3(...nodePositions[a]);
            const posB = new THREE.Vector3(...nodePositions[b]);
            const points = [posA, posB];
            const geo = new THREE.BufferGeometry().setFromPoints(points);
            const mat = new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.35 });
            const line = new THREE.Line(geo, mat);
            this.scene.add(line);
            this.lines.push(line);
        });
    }

    private _addParticles(): void {
        const count = 120;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 18;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.04, transparent: true, opacity: 0.6 });
        this.particles = new THREE.Points(geo, mat);
        this.scene.add(this.particles);
    }

    private _addLighting(): void {
        const ambient = new THREE.AmbientLight(0x1e3a5f, 3);
        this.scene.add(ambient);

        const blue = new THREE.PointLight(0x3b82f6, 6, 18);
        blue.position.set(2, 4, 4);
        this.scene.add(blue);

        const purple = new THREE.PointLight(0x8b5cf6, 4, 14);
        purple.position.set(-4, -2, 3);
        this.scene.add(purple);

        const cyan = new THREE.PointLight(0x06b6d4, 3, 12);
        cyan.position.set(0, -3, 2);
        this.scene.add(cyan);
    }

    private _animate(): void {
        this.animationId = requestAnimationFrame(() => this._animate());
        this.time += 0.004;

        this.scene.rotation.y = Math.sin(this.time * 0.25) * 0.35;
        this.scene.rotation.x = Math.sin(this.time * 0.18) * 0.12;

        this.nodes.forEach((node, i) => {
            const mat = node.material as THREE.MeshPhongMaterial;
            mat.emissiveIntensity = 0.4 + Math.sin(this.time * 2.5 + i * 0.9) * 0.3;
            node.scale.setScalar(1 + Math.sin(this.time * 1.5 + i * 1.2) * 0.05);
        });

        this.lines.forEach((line, i) => {
            const mat = line.material as THREE.LineBasicMaterial;
            mat.opacity = 0.25 + Math.sin(this.time * 1.8 + i * 0.6) * 0.18;
        });

        if (this.particles) {
            this.particles.rotation.y = this.time * 0.03;
        }

        this.renderer.render(this.scene, this.camera);
    }

    destroyScene(): void {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.renderer?.dispose();
    }

    onResize(canvas: HTMLCanvasElement): void {
        const { width, height } = canvas.getBoundingClientRect();
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}
