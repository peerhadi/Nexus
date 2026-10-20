import * as THREE from "three";
import type { Shape } from "@/components/default/playground/types";

export function makeGeometry(shape: Shape): THREE.BufferGeometry {
  switch (shape) {
    case "Prism":
      return new THREE.OctahedronGeometry(1.18, 0);
    case "Crystal":
      return new THREE.IcosahedronGeometry(1.12, 1);
    case "Torus Knot":
      return new THREE.TorusKnotGeometry(0.76, 0.24, 240, 32, 2, 3);
    case "Helix":
      return new THREE.TorusKnotGeometry(0.72, 0.18, 240, 24, 3, 5);
    case "Dodecahedron":
      return new THREE.DodecahedronGeometry(1.12, 0);
    case "Torus":
      return new THREE.TorusGeometry(0.86, 0.27, 32, 120);
  }
}
