'use client';

import { ContentPadding } from '@/components/ContentPadding';
import { CloudShaderCanvas } from '@/components/Shaders/Cloud';
import { GradientCanvas } from '@/components/Shaders/Gradient';
import { MarcherCanvas } from '@/components/Shaders/Marcher';

export default function GLSLTestPage() {
  return (
    <ContentPadding>
      <h1>GLSL Shaders</h1>
      <div className="border h-[1000px] w-[1000px]">
        <GradientCanvas />
      </div>
      <div className="border h-[1000px] w-[1000px]">
        <MarcherCanvas />
      </div>
      <div className="border h-[1000px] w-[1000px]">
        <CloudShaderCanvas />
      </div>
    </ContentPadding>
  );
}
