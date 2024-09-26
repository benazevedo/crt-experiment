import React, { useEffect } from 'react';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  Vector3,
  PostProcess,
  Effect,
} from '@babylonjs/core';
import { AdvancedDynamicTexture, TextBlock } from '@babylonjs/gui';

const BabylonScene: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new Engine(canvasRef.current, true);
      const scene = new Scene(engine);

      // Add a camera
      const camera = new ArcRotateCamera(
        'camera',
        Math.PI / 2,
        Math.PI / 2,
        5,
        Vector3.Zero(),
        scene,
      );
      camera.attachControl(canvasRef.current, true);

      // Add a light
      new HemisphericLight('light', new Vector3(0, 1, 0), scene);

      // Create a simple sphere
      const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);

      // GUI
      const guiTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
      const textBlock = new TextBlock();
      textBlock.text = 'Welcome to My Retro Site';
      textBlock.color = 'green';
      textBlock.fontSize = 50;
      guiTexture.addControl(textBlock);

      // Load the shader for CRT effect
      Effect.ShadersStore['crtFragmentShader'] = `
                precision highp float;
                uniform sampler2D textureSampler;
                varying vec2 vUV;

                void main(void) {
                    vec2 uv = vUV;
                    uv.y += sin(uv.x * 10.0) * 0.01; // Distortion effect
                    vec4 color = texture2D(textureSampler, uv);
                    color.rgb *= vec3(0.8, 1.0, 0.8); // Green tint for CRT look
                    gl_FragColor = color;
                }
            `;

      // CRT Post Process
      const crtPostProcess = new PostProcess(
        'crt',
        'crt',
        ['textureSampler'],
        null,
        1.0,
        camera,
      );
      scene.postProcesses.push(crtPostProcess);

      // Render loop
      engine.runRenderLoop(() => {
        scene.render();
      });

      // Resize event
      window.addEventListener('resize', () => {
        engine.resize();
      });

      return () => {
        engine.dispose();
      };
    }
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />;
};

export default BabylonScene;
